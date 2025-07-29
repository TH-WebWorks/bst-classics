// BST Classics - Builds Page Functionality
console.log('🚗 Builds page loading...');

// Wait for page to load completely
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Builds page ready!');
    
    // Initialize all functionality
    initFilters();
    initLoadMore();
    initModals();
});

// ===== FILTER FUNCTIONALITY =====
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    console.log(`Found ${filterButtons.length} filters and ${projectItems.length} projects`);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            console.log(`Filtering by: ${filter}`);
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
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
        });
    });
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
    
    // Show loading state
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    // Additional projects data
    const additionalProjects = [
        {
            title: '1968 Mustang GT 390',
            type: 'Frame-Off Restoration',
            category: 'restoration engine',
            details: '390 FE Big Block • C6 Automatic • Highland Green',
            year: '2023',
            duration: '16 Months',
            story: 'A complete frame-off restoration of a Highland Green 1968 Mustang GT 390 Fastback, bringing this classic muscle car back to its original glory with period-correct specifications and show-quality finish.'
        },
        {
            title: '1969 Nova SS',
            type: 'Pro-Touring Build', 
            category: 'custom engine',
            details: 'LS7 7.0L • T56 6-Speed • Modern Suspension',
            year: '2022',
            duration: '12 Months',
            story: 'A pro-touring build combining classic Nova styling with modern LS7 power and contemporary suspension technology for the perfect blend of vintage looks and modern performance.'
        },
        {
            title: '1970 Plymouth Cuda',
            type: 'Numbers Matching Restoration',
            category: 'restoration paint',
            details: '440 Six Pack • 4-Speed • In Violet',
            year: '2021', 
            duration: '22 Months',
            story: 'A comprehensive numbers-matching restoration of a rare In Violet Cuda with the legendary 440 Six Pack engine, restored to concours condition with authentic period details.'
        }
    ];
    
    // Add projects after short delay
    setTimeout(() => {
        additionalProjects.forEach((project, index) => {
            const projectHTML = createProjectHTML(project);
            container.insertAdjacentHTML('beforeend', projectHTML);
        });
        
        // Update UI
        loadMoreBtn.textContent = 'All Projects Loaded';
        loadMoreBtn.disabled = true;
        additionalProjectsLoaded = true;
        
        // Update counter
        const counter = document.getElementById('project-counter');
        if (counter) {
            counter.textContent = 'Showing all 9 completed projects';
        }
        
        // Re-initialize modals for new projects
        initModals();
        
        console.log('✅ Additional projects loaded!');
        
    }, 1000);
}

// ===== PROJECT HTML GENERATOR =====
function createProjectHTML(project) {
    return `
        <div class="project-item" data-category="${project.category}">
            <div class="project-card">
                <div class="project-image">
                    <img src="images/placeholder.png" alt="${project.title}" class="project-img">
                    <div class="project-overlay">
                        <button class="view-btn" onclick="openProjectModal('${project.title}', '${project.type}', '${project.details}', '${project.year}', '${project.duration}', '${project.story}')">
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
    document.querySelectorAll('.view-btn').forEach(button => {
        if (button.onclick) return; // Skip if already has onclick
        
        button.addEventListener('click', function() {
            const projectCard = this.closest('.project-item');
            const title = projectCard.querySelector('.project-title').textContent;
            const type = projectCard.querySelector('.project-type').textContent;
            const details = projectCard.querySelector('.project-details').textContent;
            const year = projectCard.querySelector('.project-year').textContent;
            const duration = projectCard.querySelector('.project-duration').textContent;
            const story = `This ${title} represents one of our signature restoration projects. Every detail was carefully planned and executed to exceed factory specifications while maintaining authentic character.`;
            
            openProjectModal(title, type, details, year, duration, story);
        });
    });
}

// ===== MODAL FUNCTIONS =====
function openProjectModal(title, type, details, year, duration, story) {
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
                <button class="modal-close" onclick="closeProjectModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-content">
                <div class="modal-image">
                    <img src="images/placeholder.png" alt="${title}" class="modal-img">
                </div>
                
                <div class="modal-info">
                    <div class="modal-badges">
                        <span class="badge badge-type">${type}</span>
                        <span class="badge badge-year">Completed ${year}</span>
                        <span class="badge badge-duration">${duration}</span>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Project Details</h3>
                        <p>${details}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Project Story</h3>
                        <p>${story}</p>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeProjectModal()">Close</button>
                <a href="contact.html" class="btn btn-primary">Start Your Project</a>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', handleEscapeKey);
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.remove();
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', handleEscapeKey);
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
}

console.log('🎯 Builds.js loaded successfully!'); 