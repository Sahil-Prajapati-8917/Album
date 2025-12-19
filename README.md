# Pixora - Interactive Digital Flipbooks

A modern, fully-functional React application for creating and viewing interactive digital flipbooks. Designed for photographers, designers, and content creators who want to showcase their work in an engaging, interactive format.

## ✨ Features

### 🖥️ User Interface
- **Fully Responsive**: Mobile-first design that works beautifully on all devices
- **Modern Design**: Clean, professional interface built with Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion for delightful user experiences
- **Dark/Light Theme**: Toggle between light and dark themes with persistent preferences
- **Accessibility First**: WCAG compliant with proper ARIA labels and keyboard navigation

### 📖 Visual Book Viewer
- **Interactive Navigation**: Click, swipe, keyboard, or touch controls for page turning
- **Click-to-Flip**: Click directly on left/right pages to navigate forward/backward
- **Swipe Gestures**: Smooth drag gestures with visual page curl effects
- **Image Optimization**: All images use object-fit: cover for perfect scaling without distortion
- **Keyboard Shortcuts**: Full keyboard navigation support (arrow keys, spacebar, escape)
- **Page Indicators**: Visual page numbering and spread navigation

### 🔐 Authentication System
- **User Registration**: Secure signup with form validation
- **Login/Logout**: Persistent sessions with localStorage
- **Demo Account**: Quick access for testing features
- **Form Validation**: Real-time validation with helpful error messages

### 📊 Dashboard
- **Project Management**: View and manage all your flipbooks
- **Album Gallery**: Browse created Visual Book albums
- **Grid/List Views**: Flexible display options for your projects
- **Quick Actions**: Create new albums and manage existing ones
- **Modern Sidebar**: Collapsible navigation with shadcn/ui components
- **Responsive Design**: Optimized sidebar behavior for mobile and desktop

### 💼 Marketing Pages
- **Landing Page**: Compelling hero section with feature highlights
- **About Page**: Company story and information
- **Pricing Page**: Transparent pricing with feature comparisons
- **Contact Page**: Contact form with communication options

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd photo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) in your browser

## 🏗️ Project Structure

```
src/
├── components/           # Reusable React components
│   ├── ui/              # UI components (shadcn/ui)
│   ├── Header.jsx       # Navigation header
│   ├── Footer.jsx       # Site footer
│   ├── VisualBookViewer.jsx # Main visual book viewer
│   └── ...              # Additional components
├── pages/               # Page components
│   ├── Home.jsx         # Landing page
│   ├── About.jsx        # About page
│   ├── Pricing.jsx      # Pricing page
│   ├── Contact.jsx      # Contact page
│   ├── Login.jsx        # Login page
│   ├── Signup.jsx       # Registration page
│   ├── Dashboard.jsx    # User dashboard
│   └── ...              # Additional pages
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries and configurations
├── utils/               # Utility functions
│   └── helpers.js       # Helper functions and utilities
├── App.jsx              # Main app component with routing
├── main.jsx             # App entry point
├── App.css              # App-specific styles
└── index.css            # Global styles
```

## 🛠️ Technologies Used

- **React 19.2.0** - Modern React with hooks and concurrent features
- **React Router DOM 7.10.1** - Client-side routing
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Framer Motion 12.23.26** - Animation library for smooth interactions
- **Lucide React 0.556.0** - Beautiful, consistent icon library
- **Vite (with Rolldown)** - Fast build tool and development server
- **GSAP 3.14.1** - High-performance animation library
- **Radix UI** - Unstyled, accessible UI primitives
- **shadcn/ui** - Re-usable components built on Radix UI and Tailwind CSS
- **TanStack Table** - Headless UI for building powerful tables
- **TSParticles** - Lightweight TypeScript library for creating particles
- **Lenis** - Smooth scroll library
- **Next Themes** - Theme provider for Next.js (adapted for React)
- **Class Variance Authority** - Utility for managing component variants
- **Tailwind Merge** - Utility for merging Tailwind CSS classes
- **JavaScript (ES6+)** - Modern JavaScript with JSX

## 📱 Usage Guide

### Creating an Account
1. Visit the homepage and click "Sign Up"
2. Fill out the registration form with your details
3. Use the demo account for quick testing

### Using the Visual Book Viewer
- **Navigation**: Click directly on left/right pages, swipe gestures, or use keyboard arrows
- **Click-to-Flip**: Click on the left page to go backward, right page to go forward
- **Swipe Gestures**: Drag horizontally to flip pages with visual curl effects
- **Keyboard Navigation**: Use arrow keys (←/→) to navigate, Escape to exit
- **Page Indicators**: View current page numbers in the bottom corners

### Managing Projects
- Access your dashboard after logging in
- View all your created Visual Book albums
- Create new albums from the dashboard
- Browse and manage your collection

## 🎨 Customization

### Styling
The app uses Tailwind CSS with custom design tokens. Key colors and themes can be modified in `src/index.css`.

### Components
All components are built to be reusable and customizable. Props control styling variants and behavior.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Custom domain support included

#### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Deploy with one click

#### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting provider
3. Configure proper MIME types for JS/CSS files

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Code Style
- Functional components with React hooks
- Consistent naming conventions
- Proper error handling and loading states
- Accessibility-first approach
- Mobile-first responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper testing
4. Ensure responsive design and accessibility
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@pixora.com or use the contact form on our website.

## 🔄 Future Enhancements

- [ ] Photo upload and management system
- [ ] Real-time collaboration features
- [ ] Advanced customization options
- [ ] API integrations
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

Built with ❤️ for photographers and content creators worldwide.
