# Portfolio Website

A personal portfolio website showcasing design and development work, skills, projects, notes, and interactive mini-playground experiences.

## Overview

This repository contains a static HTML/CSS/JavaScript portfolio site built around a friendly, playful UI. The homepage includes:

- Animated hero section with typed keywords and floating interaction effects
- About section describing IT support, knowledge management, and UX/UI learning
- Skills section with web development and design capabilities
- Project cards linking to related portfolio sections
- Interactive mini-playground with a Whack-a-Cat game and a draggable lost cat scene
- Notes section with a Japanese language note link
- Contact section with email and LinkedIn links

## Files

- `index.html` - main website homepage
- `style.css` - site styling and responsive layout
- `script.js` - site interactions and mini-game behavior
- `assets/` - image and icon assets used across the site
- `ai-integrations/` - AI-related project pages
- `certifications/` - certifications and credential pages
- `cloud-devops-projects/` - cloud and DevOps portfolio pages
- `front-end-development-projects/` - front-end project showcase pages
- `notes/` - personal notes, including Japanese language practice
- `service-now-projects/` - ServiceNow project portfolio pages

## Usage

1. Open `index.html` in a browser.
2. Navigate the portfolio using the header links.
3. Interact with the mini-playground and explore project sections.

## Live Website

- Ashima's website: <a href="https://ashimaridzuan.github.io" target="_blank" rel="noopener noreferrer">https://ashimaridzuan.github.io</a>

## Git Commands

Use these commands to update your local project and push changes to GitHub:

```bash
git add .
git commit -m "Add comment"
git push
```

## CSS, Website Layout, Website Components

### HTML structure 
- The site is built from `index.html` with a proper `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>` structure.
- It uses semantic sections such as `<header>`, `<section id="about">`, `<section id="skills">`, `<section id="projects">`, and `<section id="playground">`.
- Each section groups related content, so the About section contains biography text and the Projects section contains project cards.
- The header includes navigation links and icon images, which help users jump to page sections.

### CSS structure in this project
- All styling is stored in `style.css`, keeping visual rules separate from HTML content.
- The CSS file organizes styles for the body, header, hero section, skills cards, project cards, games, and responsive behaviors.
- It includes custom tag-like selectors such as `tagskill_webdev` and `tagskill_uiux` to style skill labels consistently.
- Comments and grouped blocks help maintain the layout for each page section.

### Styling the Website with CSS
- The site sets global typography and background colors with `body { ... }` and `a { ... }`.
- Header styling uses `display: flex`, `justify-content: space-between`, and `align-items: center` to create a sticky top bar.
- The hero section uses centered text and animation classes like `.ashima-bouncy` to make the introduction playful.
- Project cards and skill cards use shadows, border-radius, and hover transitions for a polished interface.
- Game components are styled with `.game-grid`, `.hole`, and `.cat` to create the Whack-a-Cat interaction.

### Linking CSS files
- The HTML file links the stylesheet with `<link rel="stylesheet" href="style.css">` inside the `<head>`.
- This single CSS file controls the whole site, so updating `style.css` changes the site appearance immediately.
- Learn more: <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/Getting_started" target="_blank" rel="noopener noreferrer">How to link CSS to HTML (opens in a new tab)</a>.

### Current layout techniques in Website
- The header uses Flexbox for horizontal navigation and alignment.
- The `.projects` section uses CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` to create fluid cards.
- The `.skills` section uses flex-wrap to keep skill cards responsive and aligned.
- Interactive sections like the mini-playground and lost cat scene are laid out with centered containers and grid/flex patterns.
- Learn more:
  - <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox" target="_blank" rel="noopener noreferrer">Flexbox (opens in a new tab)</a>
  - <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids" target="_blank" rel="noopener noreferrer">Grid (opens in a new tab)</a>

### Responsive design in this project
- The site already includes a mobile-friendly nav adjustment with `@media (max-width: 360px)`.
- The `projects` grid and skill cards automatically wrap on narrower screens using `auto-fit` and flex behavior.
- Relative padding and percentage-based widths help the page scale across devices.
- To improve responsiveness further, add additional media queries for tablet and mobile breakpoints.
- Responsive design makes this Website easier to use on phones, tablets, and desktop screens.

## Notes

- The site uses Google Fonts and Typed.js for animated text.
- The portfolio is designed for desktop and mobile-friendly viewing.
- Contact links are provided for email and LinkedIn.
