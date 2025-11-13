// ===== BUILDS PAGE JAVASCRIPT - FRESH START =====
// Clean, simple implementation that works perfectly with projects.json

document.addEventListener('DOMContentLoaded', function() {
    let allProjects = [];
    let currentFilter = 'all';
    let projectsLoaded = 0;
    const projectsPerLoad = 6;

    // Initialize the builds page
    initBuildsPage();

    function initBuildsPage() {
        loadProjectsData();
        setupFilterListeners();
        setupLoadMoreListener();
    }

// Load projects from JSON
async function loadProjectsData() {
    try {
            showLoading();
        const response = await fetch('projects.json');
            const data = await response.json();
            allProjects = data.projects || [];
        
            if (allProjects.length === 0) {
                showError('No projects found');
                return;
        }
        
            displayProjects();
            updateCounter();
        
    } catch (error) {
            console.error('Error loading projects:', error);
            showError('Failed to load projects. Please try again later.');
        }
    }

    // Setup filter event listeners
    function setupFilterListeners() {
        // Desktop filter tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const filter = this.dataset.filter;
                setActiveFilter(filter);
                applyFilter(filter);
            });
        });

        // Mobile filter dropdown
        const mobileSelect = document.getElementById('builds-mobile-select');
        if (mobileSelect) {
            mobileSelect.addEventListener('change', function() {
                const filter = this.value;
                applyFilter(filter);
                
                // Sync desktop tabs
                filterTabs.forEach(tab => {
                    tab.classList.toggle('active', tab.dataset.filter === filter);
                });
            });
        }
    }

    // Setup load more button
    function setupLoadMoreListener() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                displayProjects(true); // append mode
            });
        }
    }

    // Set active filter for desktop tabs
    function setActiveFilter(filter) {
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.filter === filter);
        });
        
        // Sync mobile dropdown
        const mobileSelect = document.getElementById('builds-mobile-select');
        if (mobileSelect) {
            mobileSelect.value = filter;
        }
    }

    // Apply filter and reset view
    function applyFilter(filter) {
        currentFilter = filter;
        projectsLoaded = 0;
        
        // Clear existing projects
        const grid = document.getElementById('projects-grid');
        grid.innerHTML = '';
        
        displayProjects();
    }

    // Display projects based on current filter
    function displayProjects(append = false) {
        const filteredProjects = getFilteredProjects();
        const startIndex = append ? projectsLoaded : 0;
        const endIndex = Math.min(startIndex + projectsPerLoad, filteredProjects.length);
        const projectsToShow = filteredProjects.slice(startIndex, endIndex);

        const grid = document.getElementById('projects-grid');
        
        if (!append) {
            grid.innerHTML = '';
            projectsLoaded = 0;
        }

        // Create and append project cards
        projectsToShow.forEach((project, index) => {
            const card = createProjectCard(project);
            card.style.animationDelay = `${(startIndex + index) * 0.1}s`;
            grid.appendChild(card);
        });

        projectsLoaded = endIndex;
        updateCounter();
        updateLoadMoreButton(filteredProjects.length);
    }

    // Get filtered projects based on current filter
    function getFilteredProjects() {
        if (currentFilter === 'all') {
            return allProjects;
        }
        
        const filtered = allProjects.filter(project => {
            if (!project.categories) return false;
            return project.categories.includes(currentFilter);
        });
        
        console.log(`Filter "${currentFilter}" found ${filtered.length} projects:`, filtered.map(p => p.title));
        return filtered;
    }

    // Create individual project card - Links to detail page
    function createProjectCard(project) {
        const card = document.createElement('a');
        // Link to individual build detail page
        card.href = `build-detail.html?id=${project.id}`;
        card.className = 'project-card';
        card.style.display = 'block';
        card.style.textDecoration = 'none';
        card.style.color = 'inherit';
        // Add accessibility attributes
        card.setAttribute('aria-label', `View details for ${project.title || 'Classic Car Project'}`);
        
        // Get project data with fallbacks
        const title = project.title || 'Classic Car Project';
        const description = project.details || project.description || 'Professional restoration showcasing expert craftsmanship and attention to detail.';
        const year = project.year || 'Classic';
        const type = project.type || 'Restoration';
        const thumbnail = project.image || project.thumbnail || 'images/_dev/placeholder.webp';
        
        console.log('Creating card for project:', title, 'with image:', thumbnail);
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${thumbnail}" 
                     alt="${title}" 
                     class="project-img"
                     loading="lazy"
                     onerror="this.src='images/_dev/placeholder.webp'">
                <div class="project-overlay">
                    <div class="project-view-indicator">
                        <i class="fas fa-eye"></i>
                        <span>View Project</span>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${title}</h3>
                <p class="project-description">${description}</p>
                <div class="project-meta">
                    <span class="project-year">${year}</span>
                    <span class="project-type">${type}</span>
                </div>
            </div>
        `;
        
        return card;
    }

    // Update project counter
    function updateCounter() {
        const filteredProjects = getFilteredProjects();
        const counter = document.getElementById('projects-counter');
        
        if (counter) {
            const filterText = currentFilter === 'all' ? 'projects' : `${currentFilter} projects`;
            counter.textContent = `Showing ${projectsLoaded} of ${filteredProjects.length} ${filterText}`;
        }
    }

    // Update load more button visibility
    function updateLoadMoreButton(totalProjects) {
        const loadMoreBtn = document.getElementById('load-more-btn');
        const loadMoreSection = document.getElementById('load-more-section');
        
        if (loadMoreBtn && loadMoreSection) {
            if (projectsLoaded >= totalProjects) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
        }
    }

    // Show loading state
    function showLoading() {
        const grid = document.getElementById('projects-grid');
        if (grid) {
            grid.innerHTML = '<div class="projects-loading"><i class="fas fa-spinner fa-spin"></i> Loading projects...</div>';
        }
    }

    // Show error state
    function showError(message) {
        const grid = document.getElementById('projects-grid');
        if (grid) {
            grid.innerHTML = `<div class="projects-error"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;
        }
        
        const counter = document.getElementById('projects-counter');
        if (counter) {
            counter.textContent = 'Unable to load projects';
        }
    }

    // Modal code removed - using individual build detail pages instead

    // Handle responsive changes
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        const mobileFilter = document.querySelector('.builds-mobile-filter');
        const desktopFilters = document.querySelector('.builds-filters');
        
        if (mobileFilter && desktopFilters) {
            mobileFilter.style.display = isMobile ? 'block' : 'none';
            desktopFilters.style.display = isMobile ? 'none' : 'block';
        }
    }

    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();

    // Smooth scroll for filter changes on mobile
    function scrollToProjects() {
        const projectsSection = document.querySelector('.builds-projects');
        if (projectsSection && window.innerWidth <= 768) {
            projectsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }

    // Add scroll to projects after filter change on mobile
    document.getElementById('builds-mobile-select')?.addEventListener('change', function() {
        setTimeout(scrollToProjects, 300);
    });
});