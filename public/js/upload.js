document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name');
    const form = document.getElementById('upload-form');

    if (!dropZone || !fileInput || !fileNameDisplay || !form) {
        return;
    }

    // --- Event Listeners ---

    // Open file selector when drop zone is clicked
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // Update file name when a file is selected via the dialog
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            updateFileName(fileInput.files[0]);
        }
    });

    // Drag and Drop events
    dropZone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            // Assign the dropped files to the file input
            fileInput.files = files;
            updateFileName(files[0]);
        }
    });

    // --- Helper Functions ---
    function updateFileName(file) {
        if (file) {
            fileNameDisplay.textContent = `Selected file: ${file.name}`;
        } else {
            fileNameDisplay.textContent = '';
        }
    }
});
