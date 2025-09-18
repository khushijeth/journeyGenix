// Newsletter subscription handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                alert(`Thank you for subscribing, ${email}!`);
                form.reset();
            }
        });
    }
});

// Hamburger menu toggle (optional, if you use it)
document.querySelector('.hamburger')?.addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});