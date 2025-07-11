const express = require('express');
const multer = require('multer');
const { marked } = require('marked');
const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const app = express();
const port = 3000;

// --- Configuration ---
const UPLOADS_DIR = path.join(__dirname, 'data', 'uploads');
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// --- Middleware ---
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, UPLOADS_DIR),
        filename: (req, file, cb) => {
            const id = nanoid(8);
            req.fileId = id; // Pass ID to the request
            req.originalName = file.originalname;
            cb(null, `${id}.md`);
        }
    })
});

// --- Helper Functions ---
async function readDb() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') return []; // Return empty array if db doesn't exist
        throw error;
    }
}

async function writeDb(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// --- Routes ---
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('mdfile'), async (req, res) => {
    try {
        let id;
        let originalname = 'pasted-text';

        if (req.file) {
            // File was uploaded
            id = req.fileId;
            originalname = req.originalName;
        } else if (req.body.mdtext && req.body.mdtext.trim()) {
            // Text was pasted
            id = nanoid(8);
            const content = req.body.mdtext;
            await fs.writeFile(path.join(UPLOADS_DIR, `${id}.md`), content);
        } else {
            return res.render('index', { error: 'Please upload a file or paste some text.' });
        }

        const db = await readDb();
        db.push({
            id,
            originalname,
            createdAt: new Date().toISOString()
        });
        await writeDb(db);

        const url = `${req.protocol}://${req.get('host')}/view/${id}`;
        res.render('index', { url });

    } catch (error) {
        console.error(error);
        res.status(500).render('index', { error: 'An unexpected error occurred.' });
    }
});

app.get('/view/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const filePath = path.join(UPLOADS_DIR, `${id}.md`);
        const markdown = await fs.readFile(filePath, 'utf8');
        const content = marked(markdown);
        res.render('view', { content });
    } catch (error) {
        console.error(error);
        res.status(404).send('Not Found');
    }
});

app.get('/admin', async (req, res) => {
    try {
        const files = await readDb();
        // Sort by most recent first
        files.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.render('admin', { files });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error reading database');
    }
});

app.post('/admin/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await readDb();
        
        const fileToDelete = db.find(f => f.id === id);
        if (!fileToDelete) {
            return res.status(404).send('File not found in database.');
        }

        // Delete the .md file
        await fs.unlink(path.join(UPLOADS_DIR, `${id}.md`));

        // Remove from db
        const newDb = db.filter(f => f.id !== id);
        await writeDb(newDb);

        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting file.');
    }
});


// --- Server ---
async function startServer() {
    try {
        await fs.mkdir(UPLOADS_DIR, { recursive: true });
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
}

startServer();
