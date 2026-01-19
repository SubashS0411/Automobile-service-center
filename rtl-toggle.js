/* RTL Toggle Logic */

document.addEventListener('DOMContentLoaded', () => {
    const dirParams = {
        key: 'direction',
        rtl: 'rtl',
        ltr: 'ltr',
        toggleBtnId: 'rtl-toggle-btn'
    };

    // Check saved preference
    const savedDir = localStorage.getItem(dirParams.key);
    if (savedDir) {
        document.documentElement.setAttribute('dir', savedDir);
    } else {
        // Default LTR
        document.documentElement.setAttribute('dir', dirParams.ltr);
    }

    // Toggle Button Listener
    const btn = document.getElementById(dirParams.toggleBtnId);
    if (btn) {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('dir');
            const target = current === dirParams.rtl ? dirParams.ltr : dirParams.rtl;

            document.documentElement.setAttribute('dir', target);
            localStorage.setItem(dirParams.key, target);
        });
    }
});
