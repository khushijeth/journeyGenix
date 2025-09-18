// Home page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Counter animation for statistics
    animateCounters();
    
    // Newsletter form handling
    setupNewsletterForm();
    
    // Destination card interactions
    setupDestinationCards();
    
    // Hero scroll indicator
    setupHeroScroll();
});

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Animation speed

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const count = parseInt(counter.textContent);
                const increment = target / speed;

                if (count < target) {
                    counter.textContent = Math.ceil(count + increment);
                    setTimeout(() => {
                        animateCounter(counter, target, increment);
                    }, 10);
                } else {
                    counter.textContent = target;
                }
                
                observer.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => {
        counter.textContent = '0';
        observer.observe(counter);
    });
}

function animateCounter(counter, target, increment) {
    const count = parseInt(counter.textContent);
    
    if (count < target) {
        counter.textContent = Math.ceil(count + increment);
        setTimeout(() => {
            animateCounter(counter, target, increment);
        }, 10);
    } else {
        counter.textContent = target;
    }
}

// Newsletter form setup
function setupNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            const submitBtn = form.querySelector('button[type="submit"]');
            
            // Validate email
            if (!email || !validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            setLoadingState(submitBtn, true);
            
            // Simulate API call
            setTimeout(() => {
                setLoadingState(submitBtn, false);
                showNotification('Thank you for subscribing to our newsletter!');
                form.reset();
                
                // Track subscription
                trackEvent('Newsletter', 'Subscribe', email);
                
                // Save to local storage for future reference
                saveToStorage('newsletter_subscriber', {
                    email: email,
                    date: new Date().toISOString()
                });
            }, 1500);
        });
    }
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Destination cards interactions
function setupDestinationCards() {
    const cards = document.querySelectorAll('.destination-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
        });
        
        // Click tracking
        card.addEventListener('click', function() {
            const destination = this.getAttribute('data-destination');
            trackEvent('Destination', 'Click', destination);
        });
    });
}

// Hero scroll indicator
function setupHeroScroll() {
    const heroScroll = document.querySelector('.hero-scroll');
    const hero = document.querySelector('.hero');
    
    if (heroScroll && hero) {
        heroScroll.addEventListener('click', function() {
            const nextSection = hero.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Hide scroll indicator when scrolling
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                heroScroll.style.opacity = '0';
            } else {
                heroScroll.style.opacity = '1';
            }
            
            // Show again after scroll stops
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.scrollY <= 50) {
                    heroScroll.style.opacity = '1';
                }
            }, 1000);
        });
    }
}

// Parallax effect for hero background
function setupParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax on load
window.addEventListener('load', setupParallax);

// Feature cards animation on scroll
function setupFeatureAnimation() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Staggered animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize feature animation
document.addEventListener('DOMContentLoaded', setupFeatureAnimation);

// Testimonials or reviews rotation (if added later)
function setupTestimonialRotation() {
    // Placeholder for testimonial carousel functionality
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length > 0) {
        setInterval(() => {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }, 5000);
    }
}

// Hero button interactions
function setupHeroButtons() {
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

// Initialize hero button interactions
document.addEventListener('DOMContentLoaded', setupHeroButtons);

// Loading screen (optional)
function setupLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Jharkhand's Beauty...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        text-align: center;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loader-content p {
            margin: 0;
            font-size: 1.1rem;
            opacity: 0.9;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(loader);
    
    // Remove loader when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 300);
        }, 500);
    });
}

// Initialize loading screen
// setupLoadingScreen();