# Oomer Shariff - Portfolio Website

This is a modern, responsive portfolio website built with HTML, CSS, and JavaScript. It features a dark-themed design ("AI-style"), a typing animation hero, and sections for Experience, Projects, and Skills.

## New Features (UI Enhancements)
- **Architecture Showcase**: A custom, interactive "circuit board" style map of the YouTube Agentic Microservices system.
    - Visualize the Kubernetes Cluster, GPU Workers, and Data Flow.
    - Hover over nodes to see technical details (e.g., "FastAPI Backend", "Redis Broker").
- **Mobile Menu**: Responsive hamburger menu that slides down on smaller screens.
- **Theme Customization**: A settings panel (gear icon) that allows you to:
    - Change Accent Colors (Blue, Purple, Green, Orange).
    - Toggle Light/Dark Mode.
    - Preferences are saved automatically (Local Storage).

## Project Structure
- `index.html`: Main content file (now includes Settings Panel and Architecture Map).
- `style.css`: Styles and animations (includes Theme Variables and Architecture Grid).
- `script.js`: Interactive elements (typing effect, smooth scroll, theme logic, modal logic).

## How to Run Locally
Simply open the `index.html` file in your preferred web browser.
1. Go to the folder `d:\pyprojects\portfolio`.
2. Double-click `index.html`.

## Deployment (Netlify)

### Option 1: Drag and Drop (Easiest)
1. Log in to [Netlify](https://app.netlify.com/).
2. Go to the "Sites" tab.
3. Drag the `portfolio` folder onto the "Drag and drop your site output folder here" area.

### Option 2: Netlify CLI
1. Open a terminal in this directory.
2. Run `netlify deploy --prod`.
