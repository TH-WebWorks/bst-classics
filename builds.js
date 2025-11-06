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
        // FORCE HIDE MODAL ON PAGE LOAD
        hideModalOnLoad();
        loadProjectsData();
        setupFilterListeners();
        setupLoadMoreListener();
    }

    // Force hide modal on page load
    function hideModalOnLoad() {
        const modalOverlay = document.getElementById('project-modal-overlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            // Let CSS handle the hiding, just ensure no active class
            document.body.style.overflow = '';
        }
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

    // Create individual project card - SIMPLE AND WORKING
    function createProjectCard(project) {
        const card = document.createElement('a');
        card.href = '#';
        card.className = 'project-card';
        card.style.display = 'block';
        card.style.textDecoration = 'none';
        card.style.color = 'inherit';
        // Add accessibility attributes
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
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
                        <span>Click to View</span>
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
        
        // Click and keyboard handler
        function handleCardActivation(e) {
            e.preventDefault();
            console.log('CARD ACTIVATED for project:', project.title, 'with ID:', project.id);
            console.log('Calling openProjectModal with ID:', project.id);
            openProjectModal(project.id);
        }
        
        card.addEventListener('click', handleCardActivation);
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                handleCardActivation(e);
            }
        });
        
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

    // Setup modal functionality
    setupModalListeners();

    // Global function for project modal
    window.openProjectModal = function(projectId) {
        console.log('openProjectModal called with projectId:', projectId);
        console.log('All projects:', allProjects);
        const project = allProjects.find(p => p.id === projectId);
        
        if (project) {
            console.log('Project found:', project);
            showProjectModal(project);
        } else {
            console.error('Project not found:', projectId);
            console.log('Available projects:', allProjects.map(p => p.id));
        }
    };

    // Setup modal event listeners
    function setupModalListeners() {
        const modalOverlay = document.getElementById('project-modal-overlay');
        const modalClose = document.getElementById('modal-close');
        const modalCloseBtn = document.getElementById('modal-close-btn');

        // Close modal when clicking overlay
        modalOverlay?.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeProjectModal();
            }
        });

        // Close modal with close button
        modalClose?.addEventListener('click', closeProjectModal);
        modalCloseBtn?.addEventListener('click', closeProjectModal);

        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
                closeProjectModal();
            }
        });

        // Setup tab functionality
        setupModalTabs();
    }

    // Setup modal tab functionality
    function setupModalTabs() {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal-tab')) {
                const targetTab = e.target.dataset.tab;
                switchModalTab(targetTab);
            }
        });
    }

    // Switch between modal tabs
    function switchModalTab(targetTab) {
        // Update tab buttons
        const tabs = document.querySelectorAll('.modal-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === targetTab);
        });

        // Update tab panels
        const panels = document.querySelectorAll('.tab-panel');
        panels.forEach(panel => {
            panel.classList.toggle('active', panel.id === `tab-${targetTab}`);
        });
    }

    // Slideshow state
    let currentSlideIndex = 0;
    let slideshowImages = [];

    // Show project modal with data
    function showProjectModal(project) {
        console.log('showProjectModal called for project:', project.title);
        const modalOverlay = document.getElementById('project-modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const modalImage = document.getElementById('modal-image');
        const modalBadges = document.getElementById('modal-badges');
        const modalSpecs = document.getElementById('modal-specs');
        const modalCategories = document.getElementById('modal-categories');

        if (!modalOverlay) {
            console.error('Modal overlay not found!');
            return;
        }
        
        console.log('Modal overlay found, adding active class');

        // Set modal content
        if (modalTitle) {
            modalTitle.textContent = project.title || 'Classic Car Project';
        }

        // Initialize slideshow
        initializeSlideshow(project);

        if (modalImage) {
            const imageSrc = project.modalImage || project.image || project.thumbnail || 'images/_dev/placeholder.webp';
            console.log('Setting modal image:', imageSrc, 'for project:', project.title);
            modalImage.src = imageSrc;
            modalImage.alt = project.alt || project.title || 'Classic Car Project';
            modalImage.onerror = function() {
                console.log('Image failed to load:', imageSrc);
                this.src = 'images/_dev/placeholder.webp';
            };
        }

        // Set badges
        if (modalBadges) {
            modalBadges.innerHTML = '';
            
            if (project.year) {
                const yearBadge = document.createElement('span');
                yearBadge.className = 'modal-badge modal-badge--primary';
                yearBadge.textContent = project.year;
                modalBadges.appendChild(yearBadge);
            }
            
            if (project.type) {
                const typeBadge = document.createElement('span');
                typeBadge.className = 'modal-badge';
                typeBadge.textContent = project.type;
                modalBadges.appendChild(typeBadge);
            }
        }

        // Set overview tab content
        const modalSummary = document.getElementById('modal-summary');
        const modalHighlights = document.getElementById('modal-highlights');
        const modalStory = document.getElementById('modal-story');
        
        if (modalSummary) {
            const summary = project.description || 'Professional restoration project showcasing expert craftsmanship and attention to detail.';
            modalSummary.innerHTML = `
                <h3>Project Overview</h3>
                <p>${summary}</p>
            `;
        }
        
        if (modalHighlights && project.details) {
            modalHighlights.innerHTML = `
                <h4>Key Features</h4>
                <div class="features-list">
                    ${project.details.split('•').map(feature => 
                        feature.trim() ? `<span class="feature-tag">${feature.trim()}</span>` : ''
                    ).join('')}
                </div>
            `;
        }
        
        if (modalStory && project.story) {
            modalStory.innerHTML = `
                <h3>The Complete Story</h3>
                <div class="story-content">
                    <p>${project.story}</p>
            </div>
            `;
        }

        // Set specifications
        if (modalSpecs) {
            modalSpecs.innerHTML = `
                <div class="specs-section">
                    <h3><i class="fas fa-cogs"></i> Project Specifications</h3>
                    <div class="specs-grid" id="specs-grid-container"></div>
                </div>
            `;
            
            const specsContainer = modalSpecs.querySelector('#specs-grid-container');
            
            // Add common specifications with icons
            const specs = [
                { label: 'Year', value: project.year || 'Classic', icon: 'fas fa-calendar-alt' },
                { label: 'Make', value: project.make || 'Classic', icon: 'fas fa-industry' },
                { label: 'Model', value: project.model || 'Restoration', icon: 'fas fa-car' },
                { label: 'Type', value: project.type || 'Restoration', icon: 'fas fa-wrench' },
                { label: 'Duration', value: project.duration || '6-12 Months', icon: 'fas fa-clock' },
                { label: 'Status', value: project.status || 'Completed', icon: 'fas fa-check-circle' }
            ];

            specs.forEach(spec => {
                const specItem = document.createElement('div');
                specItem.className = 'spec-item';
                specItem.innerHTML = `
                    <div class="spec-icon">
                        <i class="${spec.icon}"></i>
                    </div>
                    <div class="spec-content">
                        <div class="spec-label">${spec.label}</div>
                        <div class="spec-value">${spec.value}</div>
                    </div>
                `;
                specsContainer.appendChild(specItem);
            });
        }

        // Set categories
        if (modalCategories && project.categories) {
            modalCategories.innerHTML = `
                <div class="categories-section">
                    <h3><i class="fas fa-tags"></i> Services Included</h3>
                    <div class="category-tags" id="category-tags-container"></div>
                </div>
            `;
            
            const categoryContainer = modalCategories.querySelector('#category-tags-container');
            
            project.categories.forEach(category => {
                const tag = document.createElement('span');
                tag.className = 'category-tag';
                tag.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                categoryContainer.appendChild(tag);
            });
        }

        // Reset to overview tab
        switchModalTab('overview');
        
        // Show modal
        console.log('Adding active class to modal overlay');
        modalOverlay.classList.add('active');
        console.log('Modal overlay classes after adding active:', modalOverlay.className);
        document.body.style.overflow = 'hidden';
    }

    // Initialize slideshow for a project
    function initializeSlideshow(project) {
        // Reset slideshow state
        currentSlideIndex = 0;
        slideshowImages = [];
        
        // Get slideshow images from project data
        if (project.slideshowImages && project.slideshowImages.length > 0) {
            slideshowImages = project.slideshowImages;
        } else {
            // If no slideshow images, use the main image only
            slideshowImages = [project.modalImage || project.image || project.thumbnail || 'images/_dev/placeholder.webp'];
        }
        
        console.log('Slideshow initialized with', slideshowImages.length, 'images for', project.title);
        
        // Update slideshow UI
        updateSlideshow();
        createSlideshowDots();
        setupSlideshowListeners();
    }
    
    // Update slideshow display
    function updateSlideshow() {
        const modalImage = document.getElementById('modal-image');
        const currentSlideSpan = document.getElementById('current-slide');
        const totalSlidesSpan = document.getElementById('total-slides');
        const prevBtn = document.getElementById('slideshow-prev');
        const nextBtn = document.getElementById('slideshow-next');
        
        if (modalImage && slideshowImages.length > 0) {
            modalImage.src = slideshowImages[currentSlideIndex];
            modalImage.onerror = function() {
                console.log('Slideshow image failed to load:', slideshowImages[currentSlideIndex]);
                this.src = 'images/_dev/placeholder.webp';
            };
        }
        
        if (currentSlideSpan) {
            currentSlideSpan.textContent = currentSlideIndex + 1;
        }
        
        if (totalSlidesSpan) {
            totalSlidesSpan.textContent = slideshowImages.length;
        }
        
        // Update dot indicators
        const dots = document.querySelectorAll('.slideshow-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
        
        // Show/hide navigation based on number of images
        const showNav = slideshowImages.length > 1;
        if (prevBtn) prevBtn.style.display = showNav ? 'flex' : 'none';
        if (nextBtn) nextBtn.style.display = showNav ? 'flex' : 'none';
        
        const slideshowCounter = document.getElementById('slideshow-counter');
        const slideshowDots = document.getElementById('slideshow-dots');
        if (slideshowCounter) slideshowCounter.style.display = showNav ? 'block' : 'none';
        if (slideshowDots) slideshowDots.style.display = showNav ? 'flex' : 'none';
    }
    
    // Create dot indicators
    function createSlideshowDots() {
        const dotsContainer = document.getElementById('slideshow-dots');
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        
        slideshowImages.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slideshow-dot';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Navigate to specific slide
    function goToSlide(index) {
        if (index >= 0 && index < slideshowImages.length) {
            currentSlideIndex = index;
            updateSlideshow();
        }
    }
    
    // Navigate to next slide
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slideshowImages.length;
        updateSlideshow();
    }
    
    // Navigate to previous slide
    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slideshowImages.length) % slideshowImages.length;
        updateSlideshow();
    }
    
    // Setup slideshow event listeners
    function setupSlideshowListeners() {
        const prevBtn = document.getElementById('slideshow-prev');
        const nextBtn = document.getElementById('slideshow-next');
        
        // Remove existing listeners to avoid duplicates
        if (prevBtn) {
            const newPrevBtn = prevBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
            newPrevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            const newNextBtn = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
            newNextBtn.addEventListener('click', nextSlide);
        }
        
        // Keyboard navigation (arrow keys)
        document.addEventListener('keydown', handleSlideshowKeyboard);
    }
    
    // Handle keyboard navigation for slideshow
    function handleSlideshowKeyboard(e) {
        const modalOverlay = document.getElementById('project-modal-overlay');
        if (!modalOverlay || !modalOverlay.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
        }
    }

    // Close project modal
    function closeProjectModal() {
        const modalOverlay = document.getElementById('project-modal-overlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Remove keyboard listener
        document.removeEventListener('keydown', handleSlideshowKeyboard);
        
        // Reset slideshow
        currentSlideIndex = 0;
        slideshowImages = [];
    }

    // Make closeProjectModal available globally
    window.closeProjectModal = closeProjectModal;

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