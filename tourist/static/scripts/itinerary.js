// Simple animation for itinerary days
window.addEventListener('DOMContentLoaded', function() {
  const days = document.querySelectorAll('.itinerary-day');
  days.forEach((day, idx) => {
    day.style.opacity = 0;
    setTimeout(() => {
      day.style.transition = 'opacity 0.6s';
      day.style.opacity = 1;
    }, 200 * idx);
  });

  // Scroll to itinerary result after generation
  const form = document.querySelector('.itinerary-form form');
  if (form) {
    form.addEventListener('submit', function() {
      setTimeout(() => {
        const result = document.querySelector('.itinerary-result');
        if (result) {
          result.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    });
  }
});
