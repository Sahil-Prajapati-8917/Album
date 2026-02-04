# NotFound Component

A premium, luxury 404 page component for photography websites built with React.js + Tailwind CSS.

## Features

- **Luxury Design**: Clean white theme with elegant serif typography and generous white space
- **Hero Section**: Large 404 display with parallax scrolling effect
- **Interactive Gallery**: Searchable 3-6 thumbnail gallery with lightbox functionality
- **Responsive Layout**: Fully responsive design for all screen sizes
- **Accessibility**: ARIA attributes, keyboard navigation, semantic HTML
- **Micro-interactions**: Gentle parallax, hover effects, smooth animations
- **Professional Content**: Studio-quality messaging and CTAs

## Usage

### Basic Usage

```jsx
import NotFound from './components/NotFound'

function App() {
  return <NotFound />
}
```

### Custom Props

```jsx
<NotFound
  logo="/path/to/your/logo.png"
  heroImage="/path/to/hero-image.jpg"
  suggestedLinks={[
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" }
  ]}
  thumbnails={[
    {
      id: 1,
      src: "/path/to/image1.jpg",
      alt: "Wedding Photography",
      title: "Elegant Wedding"
    },
    {
      id: 2,
      src: "/path/to/image2.jpg",
      alt: "Portrait Session",
      title: "Studio Portrait"
    }
    // ... more thumbnails
  ]}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | string | `"/api/placeholder/120/40"` | Path to the logo image |
| `heroImage` | string | `"/api/placeholder/800/600"` | Path to the hero showcase image |
| `suggestedLinks` | array | See below | Array of navigation links |
| `thumbnails` | array | See below | Array of gallery thumbnails |

### suggestedLinks Structure

```javascript
[
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
  // ... more links
]
```

### thumbnails Structure

```javascript
[
  {
    id: 1,
    src: "/path/to/image.jpg",
    alt: "Alt text for accessibility",
    title: "Display title"
  },
  // ... more thumbnails
]
```

## Accessibility Features

- **Keyboard Navigation**: Arrow keys for lightbox navigation, Escape to close
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Logical tab order and focus trapping
- **Semantic HTML**: Proper heading hierarchy and landmark roles
- **Color Contrast**: High contrast ratios for readability

## Animation Features

- **Parallax Scrolling**: Hero image moves at different speed on scroll
- **Fade-in Animations**: Staggered entrance animations
- **Hover Effects**: Thumbnail lift and scale effects
- **Lightbox Transitions**: Smooth modal transitions
- **Respects `prefers-reduced-motion`**: Disabled animations for users who prefer reduced motion

## Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Medium screen breakpoints
- **Desktop Enhancement**: Large screen layouts
- **Touch Friendly**: Adequate touch targets for mobile interaction

## Dependencies

- React 18+
- React Router DOM (for navigation)
- Framer Motion (for animations)
- Tailwind CSS
- Lucide React (for icons)

## Demo Assets

The component includes placeholder images. For production use, replace with:

- **Logo**: High-resolution PNG or SVG (recommended: 120x40px)
- **Hero Image**: High-quality photography (recommended: 800x600px or larger)
- **Thumbnails**: Square aspect ratio images (recommended: 300x300px)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Installation

1. Copy the `NotFound.jsx` component to your components directory
2. Ensure all dependencies are installed
3. Import and use in your routing setup:

```jsx
import NotFound from './components/NotFound'

// In your router
<Route path="*" element={<NotFound />} />
```

## Customization

The component is highly customizable through props. You can:

- Change colors by modifying Tailwind classes
- Adjust typography by changing font classes
- Modify animations by updating Framer Motion props
- Extend functionality by adding new props

## Performance

- Lazy loading for images
- Optimized animations with `will-change` properties
- Minimal bundle size impact
- Efficient re-renders with React.memo if needed

## License

This component is provided as-is for educational and commercial use.
