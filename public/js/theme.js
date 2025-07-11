document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const fontSizeMinus = document.getElementById('font-size-minus');
    const fontSizePlus = document.getElementById('font-size-plus');
    const body = document.body;

    const FONT_SIZE_STEP = 0.1;
    const MIN_FONT_SIZE = 0.8;
    const MAX_FONT_SIZE = 1.5;

    // 1. Apply saved settings on load
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFontSize = parseFloat(localStorage.getItem('fontSize')) || 1.1;

    body.classList.add(`theme-${savedTheme}`);
    body.style.fontSize = `${savedFontSize}rem`;

    // 2. Theme switching logic
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newTheme = button.dataset.theme;
            
            body.classList.remove('theme-light', 'theme-dark', 'theme-sepia');
            body.classList.add(`theme-${newTheme}`);
            
            localStorage.setItem('theme', newTheme);
        });
    });

    // 3. Font size adjustment logic
    fontSizeMinus.addEventListener('click', () => {
        let currentSize = parseFloat(window.getComputedStyle(body).fontSize) / 16; // get rem
        let newSize = Math.max(MIN_FONT_SIZE, currentSize - FONT_SIZE_STEP);
        updateFontSize(newSize);
    });

    fontSizePlus.addEventListener('click', () => {
        let currentSize = parseFloat(window.getComputedStyle(body).fontSize) / 16; // get rem
        let newSize = Math.min(MAX_FONT_SIZE, currentSize + FONT_SIZE_STEP);
        updateFontSize(newSize);
    });

    function updateFontSize(size) {
        body.style.fontSize = `${size}rem`;
        localStorage.setItem('fontSize', size);
    }
});
