// Community page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Member filtering
    setupMemberFiltering();
    
    // Registration modal
    setupRegistrationModal();
    
    // Contact modal
    setupContactModal();
    
    // Member animations
    setupMemberAnimations();
    
    // Category interactions
    setupCategoryInteractions();
});

// Member filtering setup
function setupMemberFiltering() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const memberCards = document.querySelectorAll('.member-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterCategory = this.getAttribute('data-tab');
            
            memberCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterCategory === 'all' || cardCategory === filterCategory) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
            
            // Track filter usage
            trackEvent('Community', 'Filter', filterCategory);
            
            // Re-animate visible cards
            animateVisibleMembers();
        });
    });
}

// Animate visible member cards
function animateVisibleMembers() {
    const visibleCards = document.querySelectorAll('.member-card:not(.hidden)');
    
    visibleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Registration modal setup
function setupRegistrationModal() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            
            // Validate form
            const requiredFields = ['regName', 'regEmail', 'regPhone', 'regCategory', 'regLocation', 'regExperience'];
            const errors = validateForm(formData, requiredFields);
            
            if (errors.length > 0) {
                showNotification(errors[0], 'error');
                return;
            }
            
            setLoadingState(submitBtn, true);
            
            // Simulate registration submission
            setTimeout(() => {
                setLoadingState(submitBtn, false);
                document.getElementById('registrationModal').style.display = 'none';
                
                showNotification('Registration submitted successfully! We will review your application and contact you soon.');
                form.reset();
                
                // Track registration
                trackEvent('Community', 'Register', formData.get('regCategory'));
                
                // Save registration to local storage
                const registration = {
                    name: formData.get('regName'),
                    email: formData.get('regEmail'),
                    phone: formData.get('regPhone'),
                    category: formData.get('regCategory'),
                    location: formData.get('regLocation'),
                    experience: formData.get('regExperience'),
                    services: formData.get('regServices'),
                    languages: formData.get('regLanguages'),
                    timestamp: new Date().toISOString()
                };
                
                const existingRegistrations = getFromStorage('community_registrations') || [];
                existingRegistrations.push(registration);
                saveToStorage('community_registrations', existingRegistrations);
                
            }, 2000);
        });
    }
}

// Contact modal setup
function setupContactModal() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            
            // Validate form
            const requiredFields = ['contactName', 'contactEmail', 'contactPhone', 'contactService'];
            const errors = validateForm(formData, requiredFields);
            
            if (errors.length > 0) {
                showNotification(errors[0], 'error');
                return;
            }
            
            setLoadingState(submitBtn, true);
            
            // Simulate contact submission
            setTimeout(() => {
                setLoadingState(submitBtn, false);
                document.getElementById('contactModal').style.display = 'none';
                
                showNotification('Message sent successfully! The member will contact you soon.');
                form.reset();
                
                // Track contact
                trackEvent('Community', 'Contact Member', formData.get('memberName'));
                
            }, 1500);
        });
    }
}

// Global function to open registration modal
function openRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.display = 'block';
        trackEvent('Community', 'Open Registration Modal');
    }
}

// Global function to contact member
function contactMember(memberName) {
    const modal = document.getElementById('contactModal');
    const modalTitle = document.getElementById('contactModalTitle');
    const form = document.getElementById('contactForm');
    
    if (modal && modalTitle) {
        modalTitle.textContent = `Connect with ${memberName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
        // Store member name in form
        let memberInput = form.querySelector('input[name="memberName"]');
        if (!memberInput) {
            memberInput = document.createElement('input');
            memberInput.type = 'hidden';
            memberInput.name = 'memberName';
            form.appendChild(memberInput);
        }
        memberInput.value = memberName;
        
        modal.style.display = 'block';
        
        trackEvent('Community', 'Open Contact Modal', memberName);
    }
}

// Member animations setup
function setupMemberAnimations() {
    const memberCards = document.querySelectorAll('.member-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    memberCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Category interactions setup
function setupCategoryInteractions() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
    });
}

// Global function to show category
function showCategory(category) {
    // Scroll to members section
    const membersSection = document.querySelector('.community-members');
    if (membersSection) {
        membersSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Filter members by category after a short delay
    setTimeout(() => {
        const tabButton = document.querySelector('[data-tab="${category}"]');
        if (tabButton) {
            tabButton.click();
        }
    }, 800);
    
    trackEvent('Community', 'Category Click', category);
}

// Member rating system
function setupMemberRating() {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        const rating = card.querySelector('.member-rating .stars');
        if (rating) {
            rating.addEventListener('click', function(e) {
                e.stopPropagation();
                // Future implementation for rating members
                showNotification('Rating feature coming soon!');
            });
        }
    });
}

// Initialize member rating
document.addEventListener('DOMContentLoaded', setupMemberRating);

// Search functionality for members
function setupMemberSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search community members...';
    searchInput.className = 'member-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 12px 16px;
        border: 2px solid var(--gray-300);
        border-radius: 8px;
        font-size: 1rem;
        margin-bottom: 2rem;
    `;
    
    const sectionHeader = document.querySelector('.section-header');
    if (sectionHeader) {
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = 'width: 100%; display: flex; justify-content: center;';
        searchContainer.appendChild(searchInput);
        sectionHeader.after(searchContainer);
    }
    
    // Search functionality with debounce
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = this.value.toLowerCase();
            const memberCards = document.querySelectorAll('.member-card');
            
            memberCards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const category = card.querySelector('.member-category').textContent.toLowerCase();
                const description = card.querySelector('.member-description').textContent.toLowerCase();
                
                const isMatch = name.includes(searchTerm) || 
                               category.includes(searchTerm) || 
                               description.includes(searchTerm);
                
                if (searchTerm === '' || isMatch) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
            
            if (searchTerm) {
                trackEvent('Community', 'Search', searchTerm);
            }
        }, 300);
    });
}

// Initialize member search
document.addEventListener('DOMContentLoaded', setupMemberSearch);

// Community statistics
function updateCommunityStats() {
    const stats = {
        totalMembers: document.querySelectorAll('.member-card').length,
        artisans: document.querySelectorAll('.member-card[data-category="artisans"]').length,
        guides: document.querySelectorAll('.member-card[data-category="guides"]').length,
        homestays: document.querySelectorAll('.member-card[data-category="homestays"]').length,
        transport: document.querySelectorAll('.member-card[data-category="transport"]').length
    };
    
    // Save stats to local storage
    saveToStorage('community_stats', {
        ...stats,
        lastUpdated: new Date().toISOString()
    });
    
    return stats;
}

// Load member testimonials (future feature)
function loadMemberTestimonials() {
    // Placeholder for loading testimonials
    const testimonials = [
        {
            member: 'Ravi Munda',
            text: 'Joining this platform has helped me reach tourists from around the world and share our traditional crafts.',
            rating: 5
        },
        {
            member: 'Sunita Oraon',
            text: 'I love showing visitors the beauty of our culture and nature. This platform makes it easy to connect.',
            rating: 5
        }
    ];
    
    return testimonials;
}

// Wishlist functionality for members
function setupMemberWishlist() {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        const wishlistBtn = document.createElement('button');
        wishlistBtn.className = 'wishlist-btn';
        wishlistBtn.innerHTML = '♡';
        wishlistBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        `;
        
        card.style.position = 'relative';
        card.appendChild(wishlistBtn);
        
        const memberName = card.querySelector('h3').textContent;
        const wishlist = getFromStorage('member_wishlist') || [];
        
        if (wishlist.includes(memberName)) {
            wishlistBtn.innerHTML = '♥';
            wishlistBtn.style.color = '#dc3545';
        }
        
        wishlistBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            let currentWishlist = getFromStorage('member_wishlist') || [];
            
            if (currentWishlist.includes(memberName)) {
                currentWishlist = currentWishlist.filter(name => name !== memberName);
                this.innerHTML = '♡';
                this.style.color = 'inherit';
                showNotification('Removed ${memberName} from wishlist');
            } else {
                currentWishlist.push(memberName);
                this.innerHTML = '♥';
                this.style.color = '#dc3545';
                showNotification('Added ${memberName} to wishlist');
            }
            
            saveToStorage('member_wishlist', currentWishlist);
            trackEvent('Community', 'Wishlist Toggle', memberName);
        });
    });
}

// Initialize wishlist functionality
document.addEventListener('DOMContentLoaded', setupMemberWishlist);