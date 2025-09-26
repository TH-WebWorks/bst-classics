// BST Classics - Builds Page Functionality
console.log('🚗 Builds page loading...');

// ===== DATA LOADING =====
let projectsData = {
    projects: [],
    categories: [],
    settings: {}
};

// Load projects from JSON
async function loadProjectsData() {
    try {
        console.log('📋 Loading projects data from JSON...');
        const response = await fetch('projects.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        projectsData = await response.json();
        console.log(`✅ Loaded ${projectsData.projects.length} projects`);
        
        return projectsData;
    } catch (error) {
        console.error('❌ Failed to load projects data:', error);
        
        // Fallback to empty structure
        projectsData = {
            projects: [],
            categories: [
                { id: 'all', name: 'All Projects', slug: 'all' }
            ],
            settings: { projectsPerPage: 6, defaultCategory: 'all' }
        };
        
        return projectsData;
    }
}

// Wait for page to load completely
document.addEventListener('DOMContentLoaded', async function() {
    console.log('✅ Builds page ready!');
    
    // Load data first, then initialize
    await loadProjectsData();
    
    // Render initial projects
    renderProjects();
    
    // Initialize all functionality
    initFilters();
    initLoadMore();
    initModals();
});

// ===== PROJECT RENDERING =====
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) {
        console.error('❌ Projects container not found!');
        return;
    }
    
    // Clear existing projects (in case of re-render)
    container.innerHTML = '';
    
    // Render initial projects (first batch based on settings)
    const projectsPerPage = projectsData.settings.projectsPerPage || 6;
    const initialProjects = projectsData.projects.slice(0, projectsPerPage);
    
    console.log(`🎨 Rendering ${initialProjects.length} initial projects`);
    
    initialProjects.forEach(project => {
        const projectHTML = createProjectHTML(project);
        container.insertAdjacentHTML('beforeend', projectHTML);
    });
    
    // Update project counter
    updateProjectCounter();
}

function updateProjectCounter() {
    const counter = document.getElementById('project-counter');
    if (counter) {
        const visibleProjects = document.querySelectorAll('.project-item:not([style*="display: none"])').length;
        const totalProjects = projectsData.projects.length;
        counter.textContent = `Showing ${visibleProjects} of ${totalProjects} completed projects`;
    }
}

// ===== BUILDS NAVIGATION FUNCTIONALITY =====
function initFilters() {
    const buildsNavLinks = document.querySelectorAll('.builds-nav__link');
    const projectItems = document.querySelectorAll('.project-item');
    const buildsNavContainer = document.querySelector('.builds-nav__container');
    const mobileDropdown = document.getElementById('builds-filter-select');
    
    console.log(`Found ${buildsNavLinks.length} navigation links and ${projectItems.length} projects`);
    
    // Mobile dropdown functionality
    if (mobileDropdown) {
        mobileDropdown.addEventListener('change', function(e) {
            const filter = this.value;
            console.log(`Mobile filtering by: ${filter}`);
            
            // Update desktop active link to match
            buildsNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.filter === filter) {
                    link.classList.add('active');
                }
            });
            
            // Apply filter
            applyFilter(filter);
        });
    }
    
    // Desktop tab functionality
    buildsNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.dataset.filter;
            console.log(`Desktop filtering by: ${filter}`);
            
            // Update active link
            buildsNavLinks.forEach(lnk => lnk.classList.remove('active'));
            this.classList.add('active');
            
            // Update mobile dropdown to match
            if (mobileDropdown) {
                mobileDropdown.value = filter;
            }
            
            // Apply filter
            applyFilter(filter);
            
            // Scroll active tab into view
            scrollActiveTabIntoView(this);
        });
    });
    
    // Centralized filter application function
    function applyFilter(filter) {
        const projectItems = document.querySelectorAll('.project-item');
        
        projectItems.forEach(item => {
            const categories = item.dataset.category || '';
            
            if (filter === 'all' || categories.includes(filter)) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Update project counter after filtering
        updateProjectCounter();
    }
    
    // Enhanced touch scrolling and mobile improvements
    if (buildsNavContainer) {
        let isScrolling = false;
        let startX = 0;
        let scrollLeft = 0;
        
        // Touch events for better mobile scrolling
        buildsNavContainer.addEventListener('touchstart', (e) => {
            isScrolling = true;
            startX = e.touches[0].pageX - buildsNavContainer.offsetLeft;
            scrollLeft = buildsNavContainer.scrollLeft;
            buildsNavContainer.style.scrollSnapType = 'none';
        });
        
        buildsNavContainer.addEventListener('touchmove', (e) => {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.touches[0].pageX - buildsNavContainer.offsetLeft;
            const walk = (x - startX) * 1.5; // Scroll speed multiplier
            buildsNavContainer.scrollLeft = scrollLeft - walk;
        });
        
        buildsNavContainer.addEventListener('touchend', () => {
            isScrolling = false;
            setTimeout(() => {
                buildsNavContainer.style.scrollSnapType = 'x mandatory';
            }, 100);
        });
        
        // Add momentum scrolling for iOS
        buildsNavContainer.style.webkitOverflowScrolling = 'touch';
    }
    
    // Mobile-specific initialization
    if (window.innerWidth <= 768) {
        initMobileEnhancements();
    }
    
    // Ensure mobile dropdown starts with "All Projects" selected
    if (mobileDropdown) {
        mobileDropdown.value = 'all';
    }
}

// Enhanced function to scroll active tab into view with mobile optimization
function scrollActiveTabIntoView(activeLink) {
    const buildsNavContainer = document.querySelector('.builds-nav__container');
    if (buildsNavContainer && activeLink) {
        const containerRect = buildsNavContainer.getBoundingClientRect();
        const activeRect = activeLink.getBoundingClientRect();
        
        // More responsive scrolling for mobile
        const isMobile = window.innerWidth <= 768;
        const scrollPadding = isMobile ? 20 : 40;
        
        if (activeRect.left < containerRect.left + scrollPadding || 
            activeRect.right > containerRect.right - scrollPadding) {
            
            let scrollLeft;
            if (isMobile) {
                // On mobile, scroll to center the active tab
                scrollLeft = activeLink.offsetLeft - (buildsNavContainer.offsetWidth / 2) + (activeLink.offsetWidth / 2);
            } else {
                // On desktop, scroll with padding
                scrollLeft = activeRect.left < containerRect.left ? 
                    activeLink.offsetLeft - scrollPadding : 
                    activeLink.offsetLeft - buildsNavContainer.offsetWidth + activeLink.offsetWidth + scrollPadding;
            }
            
            buildsNavContainer.scrollTo({
                left: Math.max(0, scrollLeft),
                behavior: 'smooth'
            });
        }
    }
}

// ===== LOAD MORE FUNCTIONALITY =====
let additionalProjectsLoaded = false;

function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProjects);
    }
}

function loadMoreProjects() {
    if (additionalProjectsLoaded) return;
    
    console.log('Loading more projects...');
    
    const container = document.getElementById('projects-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (!container) {
        console.error('Projects container not found!');
        return;
    }
    
    // Show loading state
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    // Get currently displayed projects count
    const currentProjects = document.querySelectorAll('.project-item').length;
    const totalProjects = projectsData.projects.length;
    const projectsPerPage = projectsData.settings.projectsPerPage || 6;
    
    // Calculate remaining projects to load
    const remainingProjects = projectsData.projects.slice(currentProjects);
    
    if (remainingProjects.length === 0) {
        loadMoreBtn.textContent = 'All Projects Loaded';
        loadMoreBtn.disabled = true;
        additionalProjectsLoaded = true;
        return;
    }
    
    // Add projects after short delay
    setTimeout(() => {
        remainingProjects.forEach((project, index) => {
            const projectHTML = createProjectHTML(project);
            container.insertAdjacentHTML('beforeend', projectHTML);
        });
        
        // Update UI
        const newTotal = document.querySelectorAll('.project-item').length;
        
        if (newTotal >= totalProjects) {
            loadMoreBtn.textContent = 'All Projects Loaded';
            loadMoreBtn.disabled = true;
            additionalProjectsLoaded = true;
        } else {
            loadMoreBtn.textContent = 'Load More Projects';
            loadMoreBtn.disabled = false;
        }
        
        // Update counter
        updateProjectCounter();
        
        // Re-initialize modals for new projects
        initModals();
        
        console.log(`✅ Loaded ${remainingProjects.length} additional projects!`);
        
    }, 1000);
}

// ===== PROJECT HTML GENERATOR =====
function createProjectHTML(project) {
    // Convert categories array to space-separated string for data-category
    const categoryStr = Array.isArray(project.categories) ? project.categories.join(' ') : project.categories || '';
    
    return `
        <div class="project-item" data-category="${categoryStr}">
            <div class="project-card">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.alt || project.title}" class="project-img">
                    <div class="project-overlay">
                        <button class="view-btn" data-project-id="${project.id}">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-type">${project.type}</p>
                    <p class="project-details">${project.details}</p>
                    <div class="project-meta">
                        <span class="project-year">${project.year}</span>
                        <span class="project-duration">${project.duration}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== MODAL FUNCTIONALITY =====
function initModals() {
    // Add click handlers to existing view buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    console.log(`🔍 Found ${viewButtons.length} view buttons for modal initialization`);
    
    viewButtons.forEach((button, index) => {
        // Remove any existing event listeners to prevent duplicates
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-query after replacing nodes
    const freshButtons = document.querySelectorAll('.view-btn');
    
    freshButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`🎯 View button ${index} clicked`);
            
            const projectId = this.getAttribute('data-project-id');
            const projectCard = this.closest('.project-card');
            
            if (!projectCard) {
                console.error('❌ Project card not found!');
                return;
            }
            
            // Find the project data
            const project = projectsData.projects.find(p => p.id === projectId);
            if (!project) {
                console.error('❌ Project data not found!');
                return;
            }
            
            console.log(`📋 Opening modal for: ${project.title}`);
            openProjectModal(
                project.title, 
                project.type, 
                project.details, 
                project.year, 
                project.duration, 
                project.story, 
                project.modalImage || project.image
            );
        });
    });
    
    console.log(`✅ Modal initialization complete for ${freshButtons.length} buttons`);
}

// ===== MODAL FUNCTIONS =====
function openProjectModal(title, type, details, year, duration, story, modalImage = 'images/_dev/placeholder.webp') {
    console.log(`Opening modal for: ${title}`);
    
    // Remove existing modal
    const existingModal = document.getElementById('project-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.className = 'modal-overlay';
    
    modal.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close" aria-label="Close project details">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-content">
                <div class="modal-image-container">
                    <div class="modal-image">
                        <img src="${modalImage}" alt="${title} - ${type} by BST Classics" class="modal-img">
                    </div>
                </div>
                
                <div class="modal-info">
                    <div class="modal-project-header">
                        <div class="modal-badges">
                            <span class="badge badge-type">${type}</span>
                            <span class="badge badge-year">${year}</span>
                            <span class="badge badge-duration">${duration}</span>
                        </div>
                    </div>
                    
                    <div class="modal-sections">
                        <div class="modal-section specifications">
                            <h3>Specifications</h3>
                            <p>${details}</p>
                        </div>
                        
                        <div class="modal-section">
                            <h3>Project Story</h3>
                            <p>${story}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn--secondary">
                    <i class="fas fa-times"></i> Close
                </button>
                <a href="contact.html" class="btn btn--primary">
                    <i class="fas fa-envelope"></i> Start Your Project
                </a>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
    
    // Show modal by adding active class
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Add event listeners for closing
    const closeBtn = modal.querySelector('.modal-close');
    const footerCloseBtn = modal.querySelector('.btn--secondary');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ X button clicked');
            window.closeProjectModal();
        });
    }
    
    if (footerCloseBtn) {
        footerCloseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Footer close button clicked');
            window.closeProjectModal();
        });
    }
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            console.log('🖱️ Backdrop clicked');
            window.closeProjectModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', handleEscapeKey);
}

// Make closeProjectModal globally available
window.closeProjectModal = function() {
    console.log('🔐 Closing modal...');
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        
        // Wait for animation to complete before removing
        setTimeout(() => {
            modal.remove();
            document.body.classList.remove('modal-open');
            document.removeEventListener('keydown', handleEscapeKey);
            console.log('✅ Modal closed successfully');
        }, 300);
    } else {
        console.error('❌ Modal not found');
    }
};

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        console.log('⌨️ Escape key pressed');
        window.closeProjectModal();
    }
}



// ===== MOBILE ENHANCEMENT FUNCTIONS =====
function initMobileEnhancements() {
    console.log('📱 Initializing mobile enhancements...');
    
    // Add touch-friendly project card interactions
    enhanceProjectCardInteractions();
    
    // Improve modal touch behavior
    enhanceMobileModals();
    
    // Add swipe gesture support for project filtering
    addSwipeGestures();
    
    console.log('✅ Mobile enhancements initialized');
}

function enhanceProjectCardInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add visual feedback on touch
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
        
        // Don't prevent default on touchend as it breaks button clicks
        // Just prevent double-tap zoom with touch-action CSS
    });
}

function enhanceMobileModals() {
    // Override modal opening for better mobile experience
    const originalOpenModal = window.openProjectModal;
    
    // Add mobile-specific modal handling
    document.addEventListener('touchmove', function(e) {
        if (document.body.classList.contains('modal-open')) {
            const modal = document.getElementById('project-modal');
            if (modal && e.target === modal) {
                e.preventDefault();
            }
        }
    }, { passive: false });
}

function addSwipeGestures() {
    const buildsNavContainer = document.querySelector('.builds-nav__container');
    if (!buildsNavContainer) return;
    
    let startX = 0;
    let startY = 0;
    let isSwipe = false;
    
    buildsNavContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwipe = true;
    });
    
    buildsNavContainer.addEventListener('touchmove', function(e) {
        if (!isSwipe) return;
        
        const deltaX = Math.abs(e.touches[0].clientX - startX);
        const deltaY = Math.abs(e.touches[0].clientY - startY);
        
        // If it's more vertical than horizontal, it's not a swipe
        if (deltaY > deltaX) {
            isSwipe = false;
        }
    });
    
    buildsNavContainer.addEventListener('touchend', function(e) {
        if (!isSwipe) return;
        
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;
        
        // Minimum swipe distance
        if (Math.abs(deltaX) > 50) {
            const activeLink = document.querySelector('.builds-nav__link.active');
            if (activeLink) {
                const links = Array.from(document.querySelectorAll('.builds-nav__link'));
                const currentIndex = links.indexOf(activeLink);
                
                let nextIndex;
                if (deltaX > 0 && currentIndex > 0) {
                    // Swipe right - go to previous
                    nextIndex = currentIndex - 1;
                } else if (deltaX < 0 && currentIndex < links.length - 1) {
                    // Swipe left - go to next
                    nextIndex = currentIndex + 1;
                }
                
                if (nextIndex !== undefined) {
                    links[nextIndex].click();
                }
            }
        }
        
        isSwipe = false;
    });
}

// Handle responsive navigation on window resize
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 768;
    const activeLink = document.querySelector('.builds-nav__link.active');
    
    if (isMobile && activeLink) {
        // Ensure active tab is visible on orientation change
        setTimeout(() => scrollActiveTabIntoView(activeLink), 100);
    }
});

// Add viewport height fix for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial viewport height
setViewportHeight();

// Update viewport height on resize and orientation change
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
});

console.log('🎯 Builds.js loaded successfully!'); 