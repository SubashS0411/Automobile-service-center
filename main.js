/* Main Application Logic */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    console.log('Mobile Toggle Found:', mobileBtn);
    console.log('Nav Links Found:', navLinks);

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing immediately
            navLinks.classList.toggle('active');
            console.log('Mobile toggle clicked! Active:', navLinks.classList.contains('active'));
        });

        // Close nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Close nav when clicking a regular link (not dropdown triggers)
        navLinks.querySelectorAll('a:not(.dropdown-trigger)').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Dropdown Toggle Logic for Mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('.dropdown-trigger');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    // Only prevent default on mobile/tablet widths where hover isn't primary
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
    }

    // --- Sidebar Toggle (Dashboard) ---
    const sidebarBtn = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (sidebarBtn && sidebar) {
        sidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // --- Scroll Animations (Reveal on Scroll) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-fade, .reveal-up, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter-value');
    const counterObserver = new IntersectionObserver((entries, obserber) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obserber.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el) {
        const target = +el.getAttribute('data-target');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = prefix + target.toLocaleString() + suffix;
                clearInterval(timer);
            } else {
                el.innerText = prefix + Math.ceil(current).toLocaleString() + suffix;
            }
        }, 16);
    }
});

// Helper for parallax (optional smooth effect)
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    }
});
