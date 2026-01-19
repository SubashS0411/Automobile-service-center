// Dashboard Animation Enhancements
document.addEventListener('DOMContentLoaded', () => {

    // Animated Number Counters
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    }

    // Animate stats on dashboard load
    const statNumbers = document.querySelectorAll('.card div[style*="font-size: 1.5rem"]');
    statNumbers.forEach(stat => {
        const text = stat.textContent.trim();
        const number = parseInt(text.replace(/[^0-9]/g, ''));

        if (!isNaN(number) && number > 0) {
            stat.textContent = '0';
            setTimeout(() => {
                animateCounter(stat, number, 1500);
            }, 300);
        }
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn, .card').forEach(element => {
        element.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and charts
    document.querySelectorAll('.card, .chart-card').forEach(element => {
        observer.observe(element);
    });

    // Add loading class to charts initially
    document.querySelectorAll('.chart-container-inner').forEach(chart => {
        chart.classList.add('loading');

        // Remove loading after chart renders (simulated delay)
        setTimeout(() => {
            chart.classList.remove('loading');
        }, 1500);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover sound effect (optional - can be enabled)
    const enableSoundEffects = false; // Set to true to enable

    if (enableSoundEffects) {
        const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS56+OcTgwOUKXi8LZjHAU5kdXzzHksBSF0xPDekEELFFux6OyrWBUIQ5zd8r5sIgUqgM3y2Yk2CBdju+vjnE4MDlCl4vC2YxwFOZHV88x5LAUhdMTw3pBBCxRbsejsq1gVCEOc3fK+bCIFKoDN8tmJNggXY7vr45xODA5QpeLwtmMcBTmR1fPMeSwFIXTE8N6QQQsUW7Ho7KtYFQhDnN3yvmwiBSqAzfLZiTYIF2O76+OcTgwOUKXi8LZjHAU5kdXzzHksBSF0xPDekEELFFux6OyrWBUIQ5zd8r5sIgUqgM3y2Yk2CBdju+vjnE4MDlCl4vC2YxwFOZHV88x5LAUhdMTw3pBBCxRbsejsq1gVCEOc3fK+bCIFKoDN8tmJNggXY7vr45xODA5QpeLwtmMcBTmR1fPMeSwFIXTE8N6QQQsUW7Ho7KtYFQhDnN3yvmwiBSqAzfLZiTYIF2O76+OcTgwOUKXi8LZjHAU5kdXzzHksBSF0xPDekEELFFux6OyrWBUIQ5zd8r5sIgUqgM3y2Yk2CBdju+vjnE4MDlCl4vC2YxwFOZHV88x5LAUhdMTw3pBBCxRbsejsq1gVCEOc3fK+bCIFKoDN8tmJNggXY7vr45xODA5QpeLwtmMcBTmR1fPMeSwFIXTE8N6QQQsUW7Ho7KtYFQhDnN3yvmwiBSqAzfLZiTYIF2O76+OcTgwOUKXi8LZjHAU5kdXzzHksBSF0xPDekEELFFux6OyrWBUIQ5zd8r5sIgUqgM3y2Yk2CBdju+vjnE4MDlCl4vC2YxwFOZHV88x5LAUhdMTw3pBBCxRbsejsq1gVCEOc3fK+bCIFKoDN8tmJNggXY7vr45xODA5QpeLwtmMcBTmR1fPMeSwFIXTE8N6QQQsUW7Ho7KtYFQhDnN3yvmwiBSqAzfLZiTYIF2O76+OcTgwOUKXi8LZjHAU5kdXzzHksBSF0xPDekEELFFux6OyrWBUIQ5zd8r5sIgUqgM3y2Yk2CBdju+vjnE4MDlCl4vC2YxwFOZHV88x5LAUhdMTw3pBBCxRbsejsq1gVCEOc3fK+bCIFKoDN8tmJNggXY7vr45xODA5QpeLwtmMcBTmR1fPMeSwFIXTE8N6QQQsUW7Ho7KtYFQhDnN3yvmwiBSqAzfLZiTYIF2O76+OcTgwOUKXi8LZjHAU5kdXzzHksBSF0xPDekEELFFux6OyrWBUIQ5zd8r5sIgUqgM3y2Yk2CBdju+vjnE4MDlCl4vC2Yx==');

        document.querySelectorAll('.btn, .card, .sidebar-menu a').forEach(element => {
            element.addEventListener('mouseenter', () => {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(() => { }); // Ignore errors
            });
        });
    }
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
