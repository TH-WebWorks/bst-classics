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

// ===== WINDOW RESIZE HANDLER =====
// Fix mobile menu flash during window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    // Immediately close menu and disable transitions during resize
    hideMenu();
    
    // Add no-transition class to prevent animations during resize
    if (navMenu) {
        navMenu.classList.add('no-transition');
    }
    
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Re-enable transitions after resize is complete
        if (navMenu) {
            navMenu.classList.remove('no-transition');
        }
    }, 150);
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
    
    // Close modals with Escape key
    if (e.key === 'Escape') {
        closeModal();
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

// ===== SIMPLE PORTFOLIO FUNCTIONALITY =====

// Run immediately when script loads - no event listeners needed
setTimeout(function() {
    console.log('Setting up portfolio functionality...');
    
    // 1. FILTER FUNCTIONALITY
    const filterButtons = document.querySelectorAll('.filter-tab');
    const portfolioItems = document.querySelectorAll('.builds-item');
    
    console.log('Found', filterButtons.length, 'filter buttons and', portfolioItems.length, 'portfolio items');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(function(button) {
            button.onclick = function() {
                console.log('Filter clicked:', this.textContent);
                
                const filterValue = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter items
                portfolioItems.forEach(function(item) {
                    const categories = item.getAttribute('data-category') || '';
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            };
        });
        console.log('Filter functionality added!');
    }
    
    // 2. LOAD MORE FUNCTIONALITY
    const loadMoreBtn = document.querySelector('.builds-grid__load-more .btn');
    let projectsLoaded = false;
    
    if (loadMoreBtn) {
        loadMoreBtn.onclick = function() {
            console.log('Load more clicked');
            
            if (!projectsLoaded) {
                const container = document.querySelector('.builds-grid__container');
                
                // Add new projects
                const newProjects = `
                    <div class="builds-item" data-category="restoration engine">
                        <div class="builds-item__image">
                            <img src="images/placeholder.png" alt="1968 Mustang GT 390" class="builds-item__img">
                            <div class="builds-item__overlay">
                                <div class="builds-item__info">
                                    <h4 class="builds-item__title">1968 Mustang GT 390</h4>
                                    <p class="builds-item__type">Frame-Off Restoration</p>
                                    <div class="builds-item__details">
                                        <span>390 FE Big Block • C6 Automatic • Highland Green</span>
                                    </div>
                                </div>
                                <button class="builds-item__btn" onclick="showProject('1968 Mustang GT 390', 'Frame-Off Restoration', '390 FE Big Block • C6 Automatic • Highland Green', '2023', '16 Months')">View Details</button>
                            </div>
                        </div>
                        <div class="builds-item__quick-info">
                            <span class="builds-item__year">2023</span>
                            <span class="builds-item__duration">16 Months</span>
                        </div>
                    </div>
                    
                    <div class="builds-item" data-category="custom engine">
                        <div class="builds-item__image">
                            <img src="images/placeholder.png" alt="1969 Nova SS" class="builds-item__img">
                            <div class="builds-item__overlay">
                                <div class="builds-item__info">
                                    <h4 class="builds-item__title">1969 Nova SS</h4>
                                    <p class="builds-item__type">Pro-Touring Build</p>
                                    <div class="builds-item__details">
                                        <span>LS7 7.0L • T56 6-Speed • Modern Suspension</span>
                                    </div>
                                </div>
                                <button class="builds-item__btn" onclick="showProject('1969 Nova SS', 'Pro-Touring Build', 'LS7 7.0L • T56 6-Speed • Modern Suspension', '2022', '12 Months')">View Details</button>
                            </div>
                        </div>
                        <div class="builds-item__quick-info">
                            <span class="builds-item__year">2022</span>
                            <span class="builds-item__duration">12 Months</span>
                        </div>
                    </div>
                    
                    <div class="builds-item" data-category="restoration paint">
                        <div class="builds-item__image">
                            <img src="images/placeholder.png" alt="1970 Plymouth Cuda" class="builds-item__img">
                            <div class="builds-item__overlay">
                                <div class="builds-item__info">
                                    <h4 class="builds-item__title">1970 Plymouth Cuda</h4>
                                    <p class="builds-item__type">Numbers Matching Restoration</p>
                                    <div class="builds-item__details">
                                        <span>440 Six Pack • 4-Speed • In Violet</span>
                                    </div>
                                </div>
                                <button class="builds-item__btn" onclick="showProject('1970 Plymouth Cuda', 'Numbers Matching Restoration', '440 Six Pack • 4-Speed • In Violet', '2021', '22 Months')">View Details</button>
                            </div>
                        </div>
                        <div class="builds-item__quick-info">
                            <span class="builds-item__year">2021</span>
                            <span class="builds-item__duration">22 Months</span>
                        </div>
                    </div>
                `;
                
                container.insertAdjacentHTML('beforeend', newProjects);
                
                this.textContent = 'All Projects Loaded';
                this.disabled = true;
                projectsLoaded = true;
                
                const note = document.querySelector('.load-more-note');
                if (note) {
                    note.textContent = 'Showing all 9 completed projects';
                }
                
                console.log('New projects added!');
            }
        };
        console.log('Load more functionality added!');
    }
    
    // 3. VIEW DETAILS FUNCTIONALITY
    const viewButtons = document.querySelectorAll('.builds-item__btn');
    viewButtons.forEach(function(btn) {
        btn.onclick = function() {
            console.log('View details clicked');
            
            const item = this.closest('.builds-item');
            const title = item.querySelector('.builds-item__title').textContent;
            const type = item.querySelector('.builds-item__type').textContent;
            const details = item.querySelector('.builds-item__details span').textContent;
            const year = item.querySelector('.builds-item__year').textContent;
            const duration = item.querySelector('.builds-item__duration').textContent;
            
            showProject(title, type, details, year, duration);
        };
    });
    
    console.log('Portfolio setup complete!');
    
}, 1000); // Wait 1 second for page to fully load

// Simple modal function
function showProject(title, type, details, year, duration) {
    console.log('Showing project:', title);
    
    // Remove existing modal
    const existing = document.getElementById('project-modal');
    if (existing) existing.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px;">
            <div style="background: #1a1a1a; border-radius: 8px; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto; border: 1px solid #333;">
                <div style="padding: 20px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center;">
                    <h2 style="color: #c41e3a; margin: 0; font-size: 24px;">${title}</h2>
                    <button onclick="closeProject()" style="background: none; border: none; color: #fff; font-size: 24px; cursor: pointer;">&times;</button>
                </div>
                <div style="padding: 20px;">
                    <div style="margin-bottom: 20px;">
                        <div style="width: 100%; height: 200px; background: #333; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 18px;">${title}</div>
                    </div>
                    <div style="display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap;">
                        <span style="background: #2a2a2a; color: #fff; padding: 8px 15px; border-radius: 20px; font-size: 14px;">${type}</span>
                        <span style="background: #2a2a2a; color: #fff; padding: 8px 15px; border-radius: 20px; font-size: 14px;">Completed ${year}</span>
                        <span style="background: #2a2a2a; color: #fff; padding: 8px 15px; border-radius: 20px; font-size: 14px;">${duration}</span>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <h3 style="color: #c41e3a; margin-bottom: 10px;">Project Details</h3>
                        <p style="color: #ccc; line-height: 1.6;">${details}</p>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <h3 style="color: #c41e3a; margin-bottom: 10px;">Project Story</h3>
                        <p style="color: #ccc; line-height: 1.6;">This ${title} represents one of our signature restoration projects. Every detail was carefully planned and executed to exceed factory specifications while maintaining authentic character.</p>
                    </div>
                    <div style="text-align: center; padding-top: 20px; border-top: 1px solid #333;">
                        <a href="contact.html" style="background: #c41e3a; color: white; padding: 12px 30px; border-radius: 4px; text-decoration: none; display: inline-block; margin-right: 15px;">Start Your Project</a>
                        <button onclick="closeProject()" style="background: #333; color: white; padding: 12px 30px; border: none; border-radius: 4px; cursor: pointer;">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close on backdrop click
    modal.onclick = function(e) {
        if (e.target === modal) closeProject();
    };
}

function closeProject() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Initialize builds page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    console.log('Current page URL:', window.location.href);
    console.log('Page title:', document.title);
    
    // Debug: Check for all possible selectors
    console.log('Checking for builds-related elements:');
    console.log('- .builds-grid:', document.querySelector('.builds-grid'));
    console.log('- .builds-grid__container:', document.querySelector('.builds-grid__container'));
    console.log('- .filter-tab:', document.querySelectorAll('.filter-tab').length);
    console.log('- .builds-item:', document.querySelectorAll('.builds-item').length);
    console.log('- .builds-grid__load-more:', document.querySelector('.builds-grid__load-more'));
    
    // Only initialize builds functionality on builds page
    const buildsGrid = document.querySelector('.builds-grid');
    console.log('Builds grid found:', buildsGrid);
    
    if (buildsGrid) {
        console.log('Initializing builds page...');
        initBuildsPage();
    } else {
        console.log('Not on builds page, skipping builds initialization');
        console.log('Available sections:', document.querySelectorAll('section').length);
        document.querySelectorAll('section').forEach((section, i) => {
            console.log(`Section ${i}:`, section.className);
        });
    }
});

console.log('BST Classics website loaded successfully! 🚗'); 