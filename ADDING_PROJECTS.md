# Adding New Projects to BST Classics Website

## Quick Start
To add new projects to your website, simply edit the `projects.json` file. No coding knowledge required!

## How to Add a Project

1. **Open** the `projects.json` file
2. **Find** the `"projects"` section
3. **Copy** an existing project entry
4. **Paste** it after the last project (don't forget the comma!)
5. **Update** the information for your new project
6. **Save** the file

## Project Template
```json
{
  "id": "unique-project-name",
  "title": "Project Display Name",
  "type": "Type of Work Done",
  "categories": ["category1", "category2"],
  "details": "Key specs • Engine info • Special features",
  "year": "2024",
  "duration": "X Months",
  "image": "images/_dev/placeholder.webp",
  "modalImage": "images/_dev/placeholder.webp",
  "alt": "Descriptive text for search engines",
  "story": "Detailed description of the work performed and results achieved.",
  "featured": false
}
```

## Available Categories
- `restoration` - Complete restorations
- `custom` - Custom builds and modifications  
- `paint` - Paint and bodywork
- `performance` - Performance modifications
- `interior` - Interior work
- `engine` - Engine builds and swaps

## Tips
- **ID**: Use lowercase letters and hyphens (no spaces)
- **Categories**: Can use multiple categories in the array
- **Image**: Main project image shown in the grid (square format works best)
- **Modal Image**: Larger, detailed image shown in the popup (landscape format recommended)
- **Images**: Put new images in `images/builds/[ProjectName]/` folder
- **Featured**: Set to `true` for special showcase projects
- **Story**: Write a compelling description for potential customers

## Image Guidelines
- **Grid Image** (`image`): Should be square (500x500px) for consistent grid display
- **Modal Image** (`modalImage`): Can be larger landscape (1200x800px) showing more project details
- **Format**: Use `.webp` for best performance, `.jpg` as fallback
- **Naming**: Use descriptive names like `nova-1972.webp` and `nova-1972-modal.webp`
- **Folder Structure**: Create a folder for each project: `images/builds/ProjectName/`

## Example Addition
```json
{
  "id": "nova-1972-ss",
  "title": "1972 Nova SS",
  "type": "LS Swap Build",
  "categories": ["custom", "performance"],
  "details": "LS3 376 • 6L80E Auto • Modern Suspension",
  "year": "2024", 
  "duration": "10 Months",
  "image": "images/builds/Nova1972/nova-1972.webp",
  "modalImage": "images/builds/Nova1972/nova-1972-modal.webp",
  "alt": "1972 Chevrolet Nova SS LS3 engine swap custom build by BST Classics",
  "story": "This 1972 Nova SS received a complete modern drivetrain swap featuring an LS3 376 engine paired with a 6L80E automatic transmission. We also upgraded the suspension with modern components for improved handling while maintaining the classic muscle car appearance.",
  "featured": false
}
```

## File Organization

For each project, create a folder structure like this:

```
images/
  builds/
    Firebird/
      firebird.jpg        (grid image)
      firebird-modal.jpg  (popup image)
    Nova1972/
      nova-1972.webp
      nova-1972-modal.webp
    YourProject/
      your-image.webp
      your-image-modal.webp
```

**Remember**: Always add a comma after the previous project entry when adding a new one! 