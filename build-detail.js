// ===== BUILD DETAIL PAGE JAVASCRIPT =====
// Loads and displays individual project details

document.addEventListener('DOMContentLoaded', function() {
    let currentProject = null;
    let allProjects = [];
    let currentImageIndex = 0;
    let galleryImages = [];

    // Initialize the build detail page
    initBuildDetailPage();

    function initBuildDetailPage() {
        const projectId = getProjectIdFromURL();
        if (!projectId) {
            showError('No project ID specified');
            return;
        }
        
        loadProjectData(projectId);
    }

    // Get project ID from URL parameter
    function getProjectIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    // Load project data from JSON
    async function loadProjectData(projectId) {
        try {
            const response = await fetch('projects.json');
            const data = await response.json();
            allProjects = data.projects || [];
            
            currentProject = allProjects.find(p => p.id === projectId);
            
            if (!currentProject) {
                showError('Project not found');
                return;
            }
            
            displayProjectDetails();
            loadMoreBuilds();
            
        } catch (error) {
            console.error('Error loading project:', error);
            showError('Failed to load project details');
        }
    }

    // Display all project details
    function displayProjectDetails() {
        if (!currentProject) return;
        
        // Update page title
        document.title = `${currentProject.title || 'Build Details'} | BST Classics`;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && currentProject.story) {
            const shortDescription = currentProject.story.substring(0, 155) + '...';
            metaDescription.setAttribute('content', shortDescription);
        }
        
        // Display hero images/gallery
        displayGallery();
        
        // Display title and subtitle
        const titleEl = document.getElementById('build-title');
        const subtitleEl = document.getElementById('build-subtitle');
        
        if (titleEl) {
            titleEl.textContent = currentProject.title || 'Classic Car Project';
        }
        
        if (subtitleEl) {
            subtitleEl.textContent = currentProject.details || currentProject.type || '';
        }
        
        // Display stats
        displayStats();
        
        // Display story
        displayStory();
        
        // Display specifications
        displaySpecifications();
        
        // Display features
        displayFeatures();
    }

    // Display image gallery
    function displayGallery() {
        // Prepare gallery images array
        if (currentProject.slideshowImages && currentProject.slideshowImages.length > 0) {
            galleryImages = currentProject.slideshowImages;
        } else {
            // Fallback to main image if no slideshow images
            const mainImage = currentProject.modalImage || currentProject.image || 'images/_dev/placeholder.webp';
            galleryImages = [mainImage];
        }
        
        // Set main image
        updateMainImage();
        
        // Create thumbnails
        createThumbnails();
        
        // Setup navigation
        setupGalleryNavigation();
        
        // Update counter
        updateGalleryCounter();
    }

    // Update the main gallery image
    function updateMainImage() {
        const mainImg = document.getElementById('main-image');
        if (mainImg && galleryImages.length > 0) {
            mainImg.src = galleryImages[currentImageIndex];
            mainImg.alt = currentProject.title || 'Build Image';
            mainImg.onerror = function() {
                this.src = 'images/_dev/placeholder.webp';
            };
        }
    }

    // Create thumbnail navigation
    function createThumbnails() {
        const thumbnailsContainer = document.getElementById('gallery-thumbnails');
        if (!thumbnailsContainer) return;
        
        thumbnailsContainer.innerHTML = '';
        
        // Only show thumbnails if there are multiple images
        if (galleryImages.length <= 1) {
            thumbnailsContainer.style.display = 'none';
            return;
        }
        
        galleryImages.forEach((imageSrc, index) => {
            const thumbnail = document.createElement('button');
            thumbnail.className = 'gallery-thumbnail';
            if (index === currentImageIndex) {
                thumbnail.classList.add('active');
            }
            
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `${currentProject.title} - Image ${index + 1}`;
            img.onerror = function() {
                this.src = 'images/_dev/placeholder.webp';
            };
            
            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => goToImage(index));
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    // Setup gallery navigation
    function setupGalleryNavigation() {
        const prevBtn = document.getElementById('gallery-prev');
        const nextBtn = document.getElementById('gallery-next');
        const counter = document.getElementById('gallery-counter');
        
        // Hide navigation if only one image
        if (galleryImages.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (counter) counter.style.display = 'none';
            return;
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateGallery();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                updateGallery();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', handleGalleryKeyboard);
    }

    // Handle keyboard navigation
    function handleGalleryKeyboard(e) {
        if (galleryImages.length <= 1) return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateGallery();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateGallery();
        }
    }

    // Go to specific image
    function goToImage(index) {
        currentImageIndex = index;
        updateGallery();
    }

    // Update gallery display
    function updateGallery() {
        updateMainImage();
        updateThumbnailsActive();
        updateGalleryCounter();
    }

    // Update active thumbnail
    function updateThumbnailsActive() {
        const thumbnails = document.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
    }

    // Update gallery counter
    function updateGalleryCounter() {
        const currentEl = document.getElementById('current-image');
        const totalEl = document.getElementById('total-images');
        
        if (currentEl) {
            currentEl.textContent = currentImageIndex + 1;
        }
        
        if (totalEl) {
            totalEl.textContent = galleryImages.length;
        }
    }

    // Display stats
    function displayStats() {
        const yearEl = document.getElementById('stat-year');
        const durationEl = document.getElementById('stat-duration');
        const statusEl = document.getElementById('stat-status');
        
        if (yearEl) {
            yearEl.textContent = currentProject.year || 'Classic';
        }
        
        if (durationEl) {
            durationEl.textContent = currentProject.duration || '-';
        }
        
        if (statusEl) {
            statusEl.textContent = currentProject.status || 'Completed';
        }
    }

    // Display story section
    function displayStory() {
        const storyContent = document.getElementById('story-content');
        if (!storyContent) return;
        
        if (currentProject.story) {
            storyContent.innerHTML = `<p>${currentProject.story}</p>`;
        } else {
            storyContent.innerHTML = '<p>No story available for this project.</p>';
        }
    }

    // Display specifications
    function displaySpecifications() {
        const specsGrid = document.getElementById('specs-grid');
        if (!specsGrid) return;
        
        specsGrid.innerHTML = '';
        
        const specs = [
            { label: 'Make', value: currentProject.make || 'Classic', icon: 'fas fa-industry' },
            { label: 'Model', value: currentProject.model || currentProject.title, icon: 'fas fa-car' },
            { label: 'Year', value: currentProject.year || 'Classic', icon: 'fas fa-calendar-alt' },
            { label: 'Type', value: currentProject.type || 'Restoration', icon: 'fas fa-wrench' },
            { label: 'Duration', value: currentProject.duration || '-', icon: 'fas fa-clock' },
            { label: 'Status', value: currentProject.status || 'Completed', icon: 'fas fa-check-circle' }
        ];
        
        specs.forEach(spec => {
            const specCard = document.createElement('div');
            specCard.className = 'spec-card';
            specCard.innerHTML = `
                <div class="spec-card__icon">
                    <i class="${spec.icon}"></i>
                </div>
                <div class="spec-card__content">
                    <div class="spec-card__label">${spec.label}</div>
                    <div class="spec-card__value">${spec.value}</div>
                </div>
            `;
            specsGrid.appendChild(specCard);
        });
    }

    // Display features
    function displayFeatures() {
        const featuresGrid = document.getElementById('features-grid');
        if (!featuresGrid) return;
        
        featuresGrid.innerHTML = '';
        
        // Parse features from details string
        if (currentProject.details) {
            const features = currentProject.details.split('•').filter(f => f.trim());
            
            if (features.length > 0) {
                features.forEach(feature => {
                    const featureCard = document.createElement('div');
                    featureCard.className = 'feature-card';
                    featureCard.innerHTML = `
                        <div class="feature-card__icon">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="feature-card__text">${feature.trim()}</div>
                    `;
                    featuresGrid.appendChild(featureCard);
                });
            } else {
                featuresGrid.innerHTML = '<p class="no-features">No specific features listed for this build.</p>';
            }
        } else if (currentProject.categories && currentProject.categories.length > 0) {
            // If no details, show categories as features
            currentProject.categories.forEach(category => {
                const featureCard = document.createElement('div');
                featureCard.className = 'feature-card';
                featureCard.innerHTML = `
                    <div class="feature-card__icon">
                        <i class="fas fa-tag"></i>
                    </div>
                    <div class="feature-card__text">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
                `;
                featuresGrid.appendChild(featureCard);
            });
        } else {
            featuresGrid.innerHTML = '<p class="no-features">No specific features listed for this build.</p>';
        }
    }

    // Load more builds
    function loadMoreBuilds() {
        const moreBuildsGrid = document.getElementById('more-builds-grid');
        if (!moreBuildsGrid) return;
        
        moreBuildsGrid.innerHTML = '';
        
        // Get other projects (max 3)
        const otherProjects = allProjects
            .filter(p => p.id !== currentProject.id)
            .slice(0, 3);
        
        if (otherProjects.length === 0) {
            moreBuildsGrid.innerHTML = '<p class="no-more-builds">Check out our gallery for more builds!</p>';
            return;
        }
        
        otherProjects.forEach(project => {
            const card = createMoreBuildCard(project);
            moreBuildsGrid.appendChild(card);
        });
    }

    // Create more build card
    function createMoreBuildCard(project) {
        const card = document.createElement('a');
        card.href = `build-detail.html?id=${project.id}`;
        card.className = 'more-build-card';
        
        const thumbnail = project.image || 'images/_dev/placeholder.webp';
        
        card.innerHTML = `
            <div class="more-build-card__image">
                <img src="${thumbnail}" 
                     alt="${project.title || 'Build'}" 
                     loading="lazy"
                     onerror="this.src='images/_dev/placeholder.webp'">
            </div>
            <div class="more-build-card__content">
                <h3 class="more-build-card__title">${project.title || 'Classic Build'}</h3>
                <p class="more-build-card__type">${project.type || 'Restoration'}</p>
            </div>
        `;
        
        return card;
    }

    // Show error message
    function showError(message) {
        const mainEl = document.querySelector('.main');
        if (mainEl) {
            mainEl.innerHTML = `
                <div class="error-container">
                    <div class="error-content">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h2>Error</h2>
                        <p>${message}</p>
                        <a href="builds.html" class="btn btn--primary">
                            <i class="fas fa-arrow-left"></i>
                            Back to Gallery
                        </a>
                    </div>
                </div>
            `;
        }
    }
});

