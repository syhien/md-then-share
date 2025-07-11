# MD then Share

A simple web service to quickly upload, render, and share Markdown files.

## Features

- **Upload or Paste:** Upload a `.md` file or paste Markdown text directly.
- **Instant Sharing:** Generates a unique, shareable link for every submission.
- **Beautiful Rendering:** Displays Markdown content in a clean, readable, and responsive format, inspired by GitHub's style.
- **Simple Admin Panel:** A dashboard at `/admin` to view and manage all created documents.
- **Containerized:** Comes with a `Dockerfile` and `docker-compose.yml` for easy, one-command deployment.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript templates)
- **Markdown Parsing:** `marked`
- **File Uploads:** `multer`
- **Unique IDs:** `nanoid`
- **Styling:** Basic CSS with GitHub Markdown CSS for rendering.
- **Deployment:** Docker, Docker Compose

## Project Structure

```
/md-then-share
├── data/
│   ├── db.json         # Lightweight JSON database for metadata
│   └── uploads/        # Storage for .md files
├── public/
│   └── css/
│       └── style.css   # Custom stylesheets
├── views/
│   ├── admin.ejs       # Admin panel template
│   ├── index.ejs       # Homepage/upload template
│   └── view.ejs        # Markdown rendering template
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── index.js            # Main Express application file
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)

### Option 1: Running with Docker (Recommended)

This is the easiest way to get the service running.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/md-then-share.git
    cd md-then-share
    ```

2.  **Build and run the container:**
    ```bash
    docker-compose up -d
    ```

3.  **Access the application:**
    Open your browser and navigate to `http://localhost:3000`.

The `data` directory is mounted as a volume, so your uploaded files and database will persist even if you stop or restart the container.

### Option 2: Running Locally with Node.js

1.  **Clone the repository and install dependencies:**
    ```bash
    git clone https://github.com/your-username/md-then-share.git
    cd md-then-share
    npm install
    ```

2.  **Start the server:**
    ```bash
    node index.js
    ```

3.  **Access the application:**
    Open your browser and navigate to `http://localhost:3000`.

## How to Use

1.  **Go to the homepage (`/`)**:
    - Drag and drop a `.md` file into the file input area, or click to select one.
    - Alternatively, paste your Markdown content into the text area.
2.  **Generate Link**:
    - Click the "Generate Link" button.
3.  **Share**:
    - The page will display a unique URL (`/view/:id`). Copy this link and share it with anyone.
4.  **Admin**:
    - Navigate to `/admin` to see a list of all submissions, with options to view or delete them.

---
*This project was bootstrapped with the help of Gemini.*
