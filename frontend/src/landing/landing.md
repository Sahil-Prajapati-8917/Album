# Pixfolio Landing Page Documentation

This directory contains the source code for the Pixfolio landing page, designed as a modular and configurable part of the application.

## Directory Structure

```
src/landing/
├── Landing.jsx        # Main entry point component
├── landing.css        # Scoped styles and Tailwind overrides
├── sections/          # Individual page sections (Hero, Features, etc.)
├── components/        # Reusable UI components specific to landing
├── hooks/             # Custom hooks (e.g., scroll animations)
└── lib/               # Utility functions
```

## Configuration (`main.jsx`)

The entire content of the landing page is driven by `src/main.jsx`. This allows for easy updates to text, images, and links without modifying the React components.

Key configuration objects:
- `siteConfig`: General site metadata (title, description).
- `heroConfig`: Hero section text, images, and navigation links.
- `introGridConfig`: Images and text for the introductory grid.
- `featuredProjectsConfig`: Product showcase data.
- `servicesConfig`: Service offerings and icons.
- `whyChooseMeConfig`: Statistics and value proposition.
- `testimonialsConfig`: Client testimonials.
- `faqConfig`: Frequently asked questions.
- `footerConfig`: Footer links and contact info.

## Styling

- **Styles**: The landing page uses a mix of Tailwind CSS and custom CSS defined in `landing.css`.
- **Theming**: It introduces a "Luxury Gold" theme using CSS variables like `--pixfolio-gold` (#C6A75E) and `--pixfolio-charcoal` (#111111).
- **Scoped Styles**: To prevent conflicts with the admin panel, some styles are scoped or use specific class names.
- **Animations**: Uses GSAP (GreenSock) for scroll-triggered animations and parallax effects.

## Key Components

- **Landing.jsx**: Orchestrates the page layout, initializes smooth scrolling (Lenis), and renders sections.
- **Hero.jsx**: Full-screen hero with parallax background and mobile navigation.
- **IntroGrid.jsx**: Masonry-style grid for portfolio showcase.
- **Services.jsx**: Grid of service cards with hover effects.
- **Testimonials.jsx**: Swiper.js carousel for client reviews.

## Assets

Images are stored in `public/images/` and referenced in `main.jsx` via absolute paths (e.g., `/images/hero-bride.png`).

## Development

To make changes:
1.  **Content**: Edit `src/main.jsx`.
2.  **Styles**: Edit `src/landing/landing.css`.
3.  **Structure**: Edit components in `src/landing/sections/`.
