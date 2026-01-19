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

    // Toggle Button Listener
    const btn = document.getElementById(themeParams.toggleBtnId);
    if (btn) {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === themeParams.dark ? themeParams.light : themeParams.dark;
            
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem(themeParams.key, target);
            
            // Update Icon if needed (assumed element inside btn with class 'theme-icon')
            // Can add specific logic here if icon change is purely JS based, 
            // but CSS usually handles it via generic classes.
        });
    }
});
