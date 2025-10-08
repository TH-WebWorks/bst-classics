# Careers Page - BST Classics

## Overview
Created a professional careers page for BST Classics to help Brandon recruit new employees.

## What Was Created

### 1. New Careers Page (`careers.html`)
- **Hero Section**: Eye-catching header with title "JOIN THE BST CLASSICS TEAM"
- **Why Work Here**: 6 benefit cards highlighting:
  - Work on Dream Cars
  - Learn & Grow
  - State-of-the-Art Facility
  - Great Team Culture
  - Competitive Pay
  - Work-Life Balance

### 2. Current Job Openings
Three positions currently listed:
- **Automotive Restoration Technician** (Full-Time)
  - Requires 3+ years experience
  - Mechanical restoration, engine work, electrical systems
  
- **Body & Paint Specialist** (Full-Time)
  - Requires 3+ years experience
  - Metal fabrication, custom paint, show-quality finishes
  
- **Automotive Apprentice** (Full-Time)
  - Entry level position
  - For motivated individuals wanting to learn restoration

### 3. Application Form
- Integrated with EmailJS (same configuration as contact form)
- Fields include:
  - Personal information (name, email, phone, location)
  - Position applying for
  - Experience level
  - Experience & skills description
  - Why they want to join BST Classics
  - Availability to start
- Note about emailing resume separately

## Files Modified

### HTML Files (Navigation Updated)
All navigation menus updated to include "Careers" link:
- index.html
- about.html
- contact.html
- restoration.html
- process.html
- builds.html
- terms.html
- privacy.html
- 404.html

### CSS (styles.css)
Added comprehensive styles for:
- `.careers-hero` - Hero section styling
- `.benefits-grid`, `.benefit-card` - Benefits section
- `.job-listings`, `.job-card` - Job posting cards
- `.application-layout`, `.application-form` - Application section
- Responsive styles for mobile devices

### SEO Files
- **sitemap.xml**: Added careers.html with weekly update frequency
- **robots.txt**: Added careers.html to important pages list

## Customization Notes

### To Add/Edit Job Listings
1. Open `careers.html`
2. Find the "Current Openings" section (starts around line 145)
3. Copy an existing `<div class="job-card">` block
4. Modify the title, description, responsibilities, and requirements

### To Change Benefits
1. Open `careers.html`
2. Find the benefits grid section (starts around line 95)
3. Each benefit is in a `<div class="benefit-card">` block
4. Modify icon (`<i class="fas fa-ICON"></i>`), title, and description

### Email Configuration
- Uses the same EmailJS setup as the contact form
- Service ID: `service_y03xglr`
- Template ID: `template_w0vffia`
- Applications are formatted as messages and sent to the configured email

## Future Enhancements
Consider adding:
- Photo gallery of the team/facility
- Employee testimonials
- Video tour of the shop
- Application status tracking
- Benefits package details (health insurance, retirement, etc.)
- More specific salary ranges if comfortable sharing

## Testing Checklist
- [ ] Verify careers page loads correctly
- [ ] Test navigation links from all pages
- [ ] Test application form submission
- [ ] Verify email receipt of applications
- [ ] Check mobile responsiveness
- [ ] Verify all job descriptions are accurate
- [ ] Test on different browsers

## Notes
The careers page follows the same design language as the rest of the BST Classics website, using the existing color scheme (red/white/black - #dd0000 accent color) and styling patterns for consistency.
