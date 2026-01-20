/* Theme Toggle Logic */

document.addEventListener('DOMContentLoaded', () => {
    const themeParams = {
        key: 'theme',
        dark: 'dark',
        light: 'light',
        toggleBtnId: 'theme-toggle-btn'
    };

    // Check saved preference or system preference
    const savedTheme = localStorage.getItem(themeParams.key);
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === themeParams.dark || (!savedTheme && systemDark)) {
        document.documentElement.setAttribute('data-theme', themeParams.dark);
    } else {
        document.documentElement.setAttribute('data-theme', themeParams.light);
    }

    // Toggle Button Listener (Support Multiple)
    const btns = document.querySelectorAll('.theme-toggle-btn, #theme-toggle-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === themeParams.dark ? themeParams.light : themeParams.dark;

            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem(themeParams.key, target);
        });
    });
});
