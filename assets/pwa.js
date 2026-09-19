(function() {
    function isPWA() {
        return window.matchMedia('(display-mode: standalone)').matches ||
               window.matchMedia('(display-mode: minimal-ui)').matches ||
               window.matchMedia('(display-mode: fullscreen)').matches ||
               window.matchMedia('(display-mode: window-controls-overlay)').matches ||
               window.navigator.standalone === true ||
               (window.matchMedia('(display-mode: browser)').matches === false);
    }
    
    // Always apply these mobile optimizations for a native feel
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = "viewport";
        document.head.appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover';
    
    document.documentElement.style.touchAction = 'pan-x pan-y';
    document.body.style.touchAction = 'pan-x pan-y';

    if (isPWA()) {
        const preventZoom = function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
            }
        };

        const preventKeyZoom = function(e) {
            if ((e.ctrlKey || e.metaKey) && 
                (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
                e.preventDefault();
            }
        };

        const opts = { passive: false, capture: true };
        window.addEventListener('wheel', preventZoom, opts);
        document.addEventListener('wheel', preventZoom, opts);
        window.addEventListener('keydown', preventKeyZoom, opts);
        
        // Touch Pinch
        const preventPinch = function(e) {
            if (e.touches && e.touches.length > 1) {
                e.preventDefault();
            }
        };
        window.addEventListener('touchstart', preventPinch, opts);
        window.addEventListener('touchmove', preventPinch, opts);
        
        // Safari Gestures
        const preventGesture = function(e) { e.preventDefault(); };
        window.addEventListener('gesturestart', preventGesture, opts);
        window.addEventListener('gesturechange', preventGesture, opts);
        window.addEventListener('gestureend', preventGesture, opts);
    }
})();
