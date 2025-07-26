// ===== MOBILE NAVIGATION =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('show-menu')) {
            // Close menu
            hideMenu();
        } else {
            // Open menu
            navMenu.classList.add('show-menu');
            navToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
}

// Hide mobile menu
function hideMenu() {
    navMenu.classList.remove('show-menu');
    navToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', hideMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        hideMenu();
    }
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
        header.style.background = 'linear-gradient(180deg, rgba(10, 10, 10, 0.98) 0%, rgba(10, 10, 10, 0.95) 100%)';
        header.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.6)';
        header.style.borderBottom = '1px solid rgba(196, 30, 58, 0.4)';
    } else {
        header.style.background = 'linear-gradient(180deg, rgba(10, 10, 10, 0.98) 0%, rgba(10, 10, 10, 0.95) 100%)';
        header.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.4)';
        header.style.borderBottom = '1px solid rgba(196, 30, 58, 0.2)';
    }
});

// ===== ACTIVE NAVIGATION LINK =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const correspondingNavLink = document.querySelector('.nav__link[href*=' + sectionId + ']');

        if (correspondingNavLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingNavLink.classList.add('active');
            } else {
                correspondingNavLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !phone || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        if (!isValidPhone(phone)) {
            showNotification('Please enter a valid phone number.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // In a real implementation, you would send the data to your server here
            // Example:
            // fetch('/contact', {
            //     method: 'POST',
            //     body: formData
            // }).then(response => {
            //     // Handle response
            // });
            
        }, 2000);
    });
}

// ===== FORM VALIDATION HELPERS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.querySelector('.notification__content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    notification.querySelector('.notification__close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification__close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add notification animation styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service__card, .process__step, .gallery__item, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ===== GALLERY LIGHTBOX EFFECT =====
const galleryItems = document.querySelectorAll('.gallery__item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Add a subtle scale effect
        item.style.transform = 'scale(0.98)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 150);
        
        // In a real implementation, you could open a lightbox here
        showNotification('Lightbox functionality would open here with project details.', 'info');
    });
    
    // Add cursor pointer
    item.style.cursor = 'pointer';
});

// ===== PHONE NUMBER FORMATTING =====
const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        
        e.target.value = value;
    });
}

// ===== SCROLL TO TOP FUNCTIONALITY =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--secondary-color, #c0392b);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(100px)';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PRELOADER =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove any loading animations
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => el.remove());
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        hideMenu();
    }
});

// Focus management for mobile menu
navToggle.addEventListener('click', () => {
    setTimeout(() => {
        const firstNavLink = navMenu.querySelector('.nav__link');
        if (firstNavLink) {
            firstNavLink.focus();
        }
    }, 100);
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollActive = throttle(scrollActive, 100);
window.removeEventListener('scroll', scrollActive);
window.addEventListener('scroll', throttledScrollActive);

// ===== TESTIMONIALS CAROUSEL =====
const testimonialsSlider = document.getElementById('testimonials-slider');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const dotsContainer = document.getElementById('testimonials-dots');

let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

// Create dots
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(i));
        dotsContainer.appendChild(dot);
    }
}

// Update slider position
function updateSlider() {
    if (testimonialsSlider) {
        testimonialsSlider.style.transform = `translateX(-${currentTestimonial * 100}%)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
        
        // Update button states
        if (prevBtn) prevBtn.disabled = currentTestimonial === 0;
        if (nextBtn) nextBtn.disabled = currentTestimonial === totalTestimonials - 1;
    }
}

// Go to specific testimonial
function goToTestimonial(index) {
    currentTestimonial = index;
    updateSlider();
}

// Next testimonial
function nextTestimonial() {
    if (currentTestimonial < totalTestimonials - 1) {
        currentTestimonial++;
    } else {
        currentTestimonial = 0; // Loop back to start
    }
    updateSlider();
}

// Previous testimonial
function prevTestimonial() {
    if (currentTestimonial > 0) {
        currentTestimonial--;
    } else {
        currentTestimonial = totalTestimonials - 1; // Loop to end
    }
    updateSlider();
}

// Auto-scroll testimonials
let testimonialsInterval;

function startTestimonialsAutoScroll() {
    if (totalTestimonials > 1) {
        testimonialsInterval = setInterval(nextTestimonial, 4000); // Change every 4 seconds for more fluid experience
    }
}

function stopTestimonialsAutoScroll() {
    clearInterval(testimonialsInterval);
}

// Initialize testimonials
function initTestimonials() {
    if (testimonialsSlider && totalTestimonials > 0) {
        createDots();
        updateSlider();
        startTestimonialsAutoScroll();
        
        // Add event listeners
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextTestimonial();
            stopTestimonialsAutoScroll();
            setTimeout(startTestimonialsAutoScroll, 10000); // Restart auto-scroll after 10s
        });
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevTestimonial();
            stopTestimonialsAutoScroll();
            setTimeout(startTestimonialsAutoScroll, 10000); // Restart auto-scroll after 10s
        });
        
        // Pause auto-scroll on hover
        testimonialsSlider.addEventListener('mouseenter', stopTestimonialsAutoScroll);
        testimonialsSlider.addEventListener('mouseleave', startTestimonialsAutoScroll);
        
        // Touch support for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        testimonialsSlider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopTestimonialsAutoScroll();
        });
        
        testimonialsSlider.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        testimonialsSlider.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    nextTestimonial();
                } else {
                    prevTestimonial();
                }
            }
            
            setTimeout(startTestimonialsAutoScroll, 10000);
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initTestimonials);

// ===== PORTFOLIO FILTERS =====
const filterTabs = document.querySelectorAll('.filter-tab');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterTabs.length > 0 && portfolioItems.length > 0) {
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    // Animate in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    
                    // Hide after animation
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== PORTFOLIO ITEM INTERACTIONS =====
const portfolioItemBtns = document.querySelectorAll('.portfolio-item__btn');

portfolioItemBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const portfolioItem = btn.closest('.portfolio-item');
        const title = portfolioItem.querySelector('.portfolio-item__title').textContent;
        
        // In a real implementation, this would open a detailed view/modal
        showNotification(`Viewing details for ${title} - Feature coming soon!`, 'info');
    });
});

// ===== LOAD MORE PROJECTS =====
const loadMoreBtn = document.querySelector('.portfolio-grid__load-more .btn');

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        // Simulate loading more projects
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Additional projects loaded! (Feature coming soon)', 'success');
            loadMoreBtn.textContent = 'Load More Projects';
            loadMoreBtn.disabled = false;
        }, 1500);
    });
}

console.log('BST Classics website loaded successfully! 🚗'); 