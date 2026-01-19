/**
 * Cinematic Page Transitions
 * Handles car driving animation on the new page after navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const ANIMATION_DURATION = 1500; // ms
    const carImageSrc = 'Assets/car.svg';

    // --- Create Transition Overlay ---
    // Prevent duplicates
    if (document.querySelector('.transition-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    // Use the car image
    overlay.innerHTML = `
        <img src="${carImageSrc}" class="transition-car" id="transition-car" alt="Driving...">
    `;
    document.body.appendChild(overlay);

    const car = document.getElementById('transition-car');

    // --- 1. Check for Transition Flag (Page Load) ---
    // We check sessionStorage to see if we should play the animation
    const shouldPlay = sessionStorage.getItem('play-transition');

    if (shouldPlay) {
        // Clear flag immediately to prevent any replays
        sessionStorage.removeItem('play-transition');

        // Play Animation - show overlay and start car animation
        overlay.classList.add('active');

        // Small delay to ensure overlay is visible before car starts
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                car.classList.add('car-drive-out');
            });
        });

        // Clean up after animation completes
        setTimeout(() => {
            overlay.classList.remove('active');
            // Don't remove the car class to prevent it from resetting and showing again
        }, ANIMATION_DURATION);
    }

    // --- 2. Intercept Link Clicks (Set Flag) ---
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        // Basic validation
        if (!link) return;
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript:') || link.target === '_blank') return;

        // Check if internal (works for file:// too)
        // If protocol and host match, it's internal
        if (link.protocol === window.location.protocol && link.host === window.location.host) {
            // Set flag for the NEXT page
            sessionStorage.setItem('play-transition', 'true');
            // We do NOT preventDefault(); we let the browser navigate naturally.
            // The animation will play on the new page.
        }
    });
});
