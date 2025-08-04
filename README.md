# 🚗 BST Classic Rod & Custom Website

<div align="center">

![BST Classics Logo](images/bst-logo.webp)

**Professional Classic Car Restoration & Custom Builds**  
*Bringing classic cars back to life since 2010*

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)](https://github.com/pages)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[Live Website](https://bstclassics.com) • [View Projects](builds.html) • [Contact Us](contact.html)

</div>

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Project Structure](#️-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📝 Adding New Projects](#-adding-new-projects)
- [🎨 Design System](#-design-system)
- [📱 Mobile Optimization](#-mobile-optimization)
- [🔍 SEO Features](#-seo-features)
- [⚙️ Technical Details](#️-technical-details)
- [🚢 Deployment](#-deployment)
- [📞 Support](#-support)

## 🎯 Overview

BST Classic Rod & Custom's professional website showcases premium automotive restoration and custom build services. Built with modern web standards while maintaining compatibility and performance, this site serves as both a portfolio showcase and lead generation platform.

### 🏢 Business Focus
- **Frame-Off Restorations** - Complete vehicle rebuilds to factory specifications
- **Custom Builds** - Modern performance with classic aesthetics  
- **Engine Swaps** - LS conversions and performance upgrades
- **Paint & Body** - Show-quality refinishing and bodywork
- **Interior Restoration** - Period-correct upholstery and trim work

## ✨ Features

### 🖥️ **Core Website Features**
- **Responsive Design** - Mobile-first approach with perfect scaling
- **Performance Optimized** - Fast loading times and smooth animations
- **SEO Optimized** - Complete meta tags, structured data, and social sharing
- **Accessibility Ready** - WCAG compliant with proper ARIA labels
- **GitHub Pages Ready** - Zero-config deployment and hosting

### 📊 **Dynamic Project Management**
- **JSON-Based Projects** - Easy content management without code changes
- **Modal Showcases** - Professional project presentation with image galleries
- **Category Filtering** - Organized by restoration type and services
- **Load More System** - Progressive content loading for better performance
- **Image Management** - Optimized asset organization and delivery

### 📱 **Mobile Excellence**
- **Touch-Optimized** - 48px minimum touch targets and swipe gestures
- **Performance First** - Hardware acceleration and optimized animations
- **Safe Area Support** - Perfect display on notched devices
- **Zoom Prevention** - Prevents accidental zoom on form inputs

## 🏗️ Project Structure

```
bst-classics/
├── 📄 Pages
│   ├── index.html          # Homepage - Company overview
│   ├── builds.html         # Portfolio showcase (dynamic)
│   ├── restoration.html    # Restoration services
│   ├── process.html        # Work process explanation
│   ├── about.html          # Company story & team
│   └── contact.html        # Contact form & information
├── 🎨 Styles & Scripts
│   ├── styles.css          # Main stylesheet (3,600+ lines)
│   ├── script.js           # Global site functionality
│   └── builds.js           # Portfolio page functionality
├── 📊 Data Management
│   ├── projects.json       # Project database
│   └── ADDING_PROJECTS.md  # Project management guide
├── 🖼️ Assets
│   ├── images/
│   │   ├── builds/         # Project photos by folder
│   │   ├── heros/          # Hero section backgrounds
│   │   ├── profiles/       # Team member photos
│   │   └── plaques/        # Service badges
│   ├── favicon.png         # Site icon
│   └── robots.txt          # Search engine directives
└── 📚 Documentation
    └── README.md           # This file
```

## 🚀 Getting Started

### 📋 Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime, etc.)
- Basic understanding of HTML/CSS/JavaScript
- Git for version control

### 🛠️ Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/bst-classics.git
   cd bst-classics
   ```

2. **Open in Browser**
   ```bash
   # Using Python (if available)
   python -m http.server 8000
   
   # Using Node.js (if available)  
   npx serve .
   
   # Or simply open index.html in your browser
   open index.html
   ```

3. **Start Developing**
   - Edit HTML files for content changes
   - Modify `styles.css` for design updates
   - Update `projects.json` for new portfolio items
   - Test across different devices and browsers

### 🔄 File Watching (Optional)
For automatic browser refresh during development:
```bash
# Using live-server (Node.js)
npm install -g live-server
live-server

# Using browser-sync
npm install -g browser-sync
browser-sync start --server --files "*.html, *.css, *.js"
```

## 📝 Adding New Projects

The website uses a JSON-based system for easy project management. **No coding required!**

### 🎯 Quick Start Guide

1. **Open** `projects.json`
2. **Copy** an existing project entry
3. **Update** the information for your new project
4. **Add images** to `images/builds/YourProjectName/`
5. **Save** and test

### 📸 Image Organization

```
images/builds/
├── ProjectName1/
│   ├── main-image.webp      # Grid thumbnail (500x500px recommended)
│   └── modal-image.webp     # Detail view (1200x800px recommended)
├── ProjectName2/
│   ├── project-thumb.jpg
│   └── project-detail.jpg
└── ...
```

### 🏷️ Project Template

```json
{
  "id": "unique-project-id",
  "title": "1967 Camaro SS",
  "type": "Frame-Off Restoration", 
  "categories": ["restoration", "custom"],
  "details": "396 Big Block • 4-Speed • Rally Wheels",
  "year": "2024",
  "duration": "14 Months",
  "image": "images/builds/Camaro1967/camaro-thumb.webp",
  "modalImage": "images/builds/Camaro1967/camaro-detail.webp",
  "alt": "1967 Camaro SS restoration by BST Classics",
  "story": "Complete project description and restoration details...",
  "featured": false
}
```

### 📚 **Detailed Guide:** See `ADDING_PROJECTS.md` for complete instructions

## 🎨 Design System

### 🎨 Color Palette
```css
/* Primary Colors */
--primary-color: #ffffff      /* White text */
--secondary-color: #dd0000    /* BST Red */
--background-dark: #0a0a0a    /* Main background */
--background-light: #1a1a1a   /* Card backgrounds */

/* Text Colors */
--text-dark: #ffffff          /* Primary text */
--text-medium: #e0e0e0        /* Secondary text */
--text-light: #a0a0a0         /* Subtle text */

/* Border Colors */
--border-light: #2a2a2a       /* Subtle borders */
--border-medium: #333333      /* Standard borders */
```

### 📝 Typography Scale
```css
--text-xs: 0.75rem     /* 12px - Small labels */
--text-sm: 0.875rem    /* 14px - Body text */
--text-base: 1rem      /* 16px - Base size */
--text-lg: 1.125rem    /* 18px - Subheadings */
--text-xl: 1.25rem     /* 20px - Small titles */
--text-2xl: 1.5rem     /* 24px - Section titles */
--text-3xl: 1.75rem    /* 28px - Page titles */
--text-4xl: 2rem       /* 32px - Hero titles */
```

### 📏 Spacing System
```css
--space-xs: 0.25rem    /* 4px */
--space-sm: 0.5rem     /* 8px */
--space-md: 0.75rem    /* 12px */
--space-lg: 1rem       /* 16px */
--space-xl: 1.5rem     /* 24px */
--space-2xl: 2rem      /* 32px */
--space-3xl: 2.5rem    /* 40px */
--space-4xl: 3rem      /* 48px */
--space-5xl: 4rem      /* 64px */
```

## 📱 Mobile Optimization

### 🎯 Performance Features
- **Hardware Acceleration** - Smooth animations on all devices
- **Touch Optimizations** - 48px minimum touch targets
- **Swipe Gestures** - Navigation menu swipe-to-close
- **Safe Area Support** - Perfect display on notched devices
- **Zoom Prevention** - Disabled on form inputs

### 📐 Responsive Breakpoints
```css
/* Mobile First Approach */
@media (max-width: 480px)  /* Small phones */
@media (max-width: 768px)  /* Tablets */
@media (max-width: 968px)  /* Small laptops */
@media (max-width: 1200px) /* Large screens */
```

### 🔧 Mobile-Specific Features
- **Collapsible Navigation** - Hamburger menu with smooth animations
- **Touch-Friendly Forms** - Larger inputs and better spacing
- **Optimized Images** - Responsive sizing and lazy loading
- **Simplified Layouts** - Single-column stacking on small screens

## 🔍 SEO Features

### 📊 Comprehensive Meta Tags
- **Open Graph** - Facebook, LinkedIn sharing optimization
- **Twitter Cards** - Enhanced Twitter sharing
- **Canonical URLs** - Prevent duplicate content issues
- **Geographic Tags** - Local search optimization (Norwalk, Iowa)

### 🏢 Structured Data (JSON-LD)
- **LocalBusiness** - Google My Business integration
- **Organization** - Company information
- **Service** - Business services markup
- **Review** - Customer testimonials
- **ContactPoint** - Business contact information

### 🖼️ Image Optimization
- **Descriptive Alt Text** - All images have SEO-optimized descriptions
- **WebP Format** - Modern image format for better compression
- **Responsive Images** - Multiple sizes for different devices

### 🔍 Search Engine Directives
```
robots.txt configured for:
✅ Allow all main pages
✅ Allow important images  
❌ Disallow development assets
❌ Disallow admin sections
```

## ⚙️ Technical Details

### 🛠️ **Technology Stack**
- **HTML5** - Semantic markup and modern standards
- **CSS3** - Flexbox, Grid, Custom Properties, Animations
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **JSON** - Data management and configuration

### 🏗️ **Architecture Principles**
- **Mobile-First Design** - Responsive from the ground up
- **Progressive Enhancement** - Works without JavaScript
- **Component-Based CSS** - Modular and maintainable styles
- **Performance-First** - Optimized for speed and efficiency

### 📦 **Key JavaScript Features**
```javascript
// Dynamic project loading
fetch('projects.json') → Render portfolio

// Interactive modals  
openProjectModal() → Professional project showcase

// Mobile navigation
Touch events → Smooth menu interactions

// Form validation
Real-time feedback → Better user experience
```

### 🎨 **CSS Architecture**
```css
/* Organization Structure */
1. CSS Variables        /* Design tokens */
2. Base Styles         /* Reset and typography */
3. Components          /* Reusable UI elements */
4. Layout              /* Page structure */
5. Pages               /* Page-specific styles */
6. Mobile Overrides    /* Responsive adjustments */
```

## 🚢 Deployment

### 🌐 GitHub Pages (Recommended)

1. **Push to Repository**
   ```bash
   git add .
   git commit -m "Update website content"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to Repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Select "/ (root)" folder
   - Click "Save"

3. **Custom Domain (Optional)**
   ```bash
   # Add CNAME file with your domain
   echo "bstclassics.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

### 🖥️ **Alternative Hosting**
- **Netlify** - Drag and drop deployment
- **Vercel** - Git-based automatic deployments  
- **Traditional Web Hosting** - Upload files via FTP

### ✅ **Pre-Deployment Checklist**
- [ ] Test all pages and functionality
- [ ] Verify mobile responsiveness
- [ ] Check image optimization
- [ ] Validate HTML and CSS
- [ ] Test contact form submission
- [ ] Verify SEO meta tags

## 📞 Support

### 🐛 **Issue Reporting**
Found a bug or have a suggestion? Please:
1. Check existing issues first
2. Create detailed bug reports
3. Include browser and device information
4. Provide steps to reproduce

### 💡 **Feature Requests**
- Use GitHub Issues with "enhancement" label
- Provide detailed descriptions and use cases
- Include mockups or examples when helpful

### 📖 **Documentation**
- **Project Management**: See `ADDING_PROJECTS.md`
- **Technical Questions**: Check code comments
- **Business Inquiries**: Contact BST Classics directly

### 🤝 **Contributing**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

<div align="center">

**🚗 Built with ❤️ for BST Classic Rod & Custom**

*Showcasing automotive craftsmanship since 2010*

[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://bstclassics.com)
[![Email](https://img.shields.io/badge/Email-Contact-blue)](mailto:info@bstclassics.com)
[![Phone](https://img.shields.io/badge/Phone-Call-green)](tel:+15155551234)

</div>