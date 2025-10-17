document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const label = document.querySelector('label[for="theme-toggle"]');

    // Function to apply theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
            label.textContent = 'Light Mode';
        } else {
            body.classList.remove('dark-mode');
            themeToggle.checked = false;
            label.textContent = 'Dark Mode';
        }
    }

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Default to light mode if no preference is saved
        applyTheme('light');
    }

    // Listen for toggle changes
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        }
    });
});