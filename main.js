console.log('main.js is loaded');

// Prevent Overscroll Bounce Effect on iOS
document.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, { passive: false });