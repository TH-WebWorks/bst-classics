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
    
    console.log(`Found ${buildsNavLinks.length} navigation links and ${projectItems.length} projects`);
    
    // Filter functionality
    buildsNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.dataset.filter;
            console.log(`Filtering by: ${filter}`);
            
            // Update active link
            buildsNavLinks.forEach(lnk => lnk.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
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
            
            // Scroll active tab into view
            scrollActiveTabIntoView(this);
        });
    });
    
    // Touch scrolling improvements for mobile
    if (buildsNavContainer) {
        buildsNavContainer.addEventListener('touchstart', () => {
            // Enable smooth touch scrolling
        });
    }
}

// Function to scroll active tab into view
function scrollActiveTabIntoView(activeLink) {
    const buildsNavContainer = document.querySelector('.builds-nav__container');
    if (buildsNavContainer && activeLink) {
        const containerRect = buildsNavContainer.getBoundingClientRect();
        const activeRect = activeLink.getBoundingClientRect();
        
        if (activeRect.left < containerRect.left || activeRect.right > containerRect.right) {
            const scrollLeft = activeLink.offsetLeft - (buildsNavContainer.offsetWidth / 2) + (activeLink.offsetWidth / 2);
            buildsNavContainer.scrollTo({
                left: scrollLeft,
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
            const projectCard = this.closest('.project-item');
            
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



console.log('🎯 Builds.js loaded successfully!'); 