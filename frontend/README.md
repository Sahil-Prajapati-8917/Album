# Pixfolio - Interactive Digital Visual Books (Frontend)

A modern React application for creating and viewing interactive digital Visual Books. Designed for photographers, designers, and content creators who want to showcase their work in an engaging, interactive format with premium page-flipping animations and artistic effects.

## ✨ Features

### 🖥️ User Interface
- **Fully Responsive**: Mobile-first design that works beautifully on all devices
- **Modern Design**: Clean, professional interface built with Tailwind CSS v4
- **Smooth Animations**: Powered by Framer Motion v12 and GSAP for delightful user experiences
- **Dark/Light Theme**: Toggle between light and dark themes with persistent preferences
- **Accessibility First**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Resizable Navigation**: Adaptive navbar with mobile menu support

### 📖 Visual Book Viewer
- **Interactive Page Flipping**: Realistic page-turning animations using react-pageflip
- **Premium Album Design**: Natural album tilt with shadow effects and vignette
- **Multiple Navigation Methods**: 
  - Click-to-Flip: Click directly on left/right pages to navigate
  - Keyboard Navigation: Arrow keys (←/→) for page navigation, Escape to exit
  - Touch/Swipe Support: Mobile-friendly gesture controls
- **Artistic Page Layouts**: 
  - Full-bleed main images with subtle sepia filters
  - Inset photo overlays on right pages
  - Watercolor edge blending effects
  - Page numbering with elegant styling
- **Responsive Sizing**: Adaptive book dimensions for different screen sizes
- **Reduced Motion Support**: Respects user accessibility preferences
- **Demo Mode**: Standalone demo page for showcasing viewer capabilities

### 🔐 Authentication System
- **User Registration**: Secure signup with form validation
- **Login/Logout**: Persistent sessions with localStorage
- **Protected Routes**: Dashboard and viewer pages require authentication
- **Form Validation**: Real-time validation with helpful error messages

### 📊 Dashboard & Management
- **Admin Kit Integration**: Modern dashboard interface with shadcn/ui and admin blocks
- **Project Management**: View and manage all your flipbooks (All Pixfolio)
- **Create New Projects**: Intuitive wizard for building new visual books
- **Profile Management**: Comprehensive user settings and profile customization
- **Settings**: Advanced account and application configuration
- **Help Center**: Integrated support and documentation hub
- **Recharge System**: Credit/balance management for premium features
- **Modern Sidebar**: Collapsible navigation with active state tracking

### 🛡️ Admin Panel (New)
- **Hidden Access**: Accessible via search query "admin panel" in the header or direct link `/admin`
- **Secure Entry**: Password-protected gateway (Default: `admin123`)
- **Master Dashboard**: Complete system overview and analytics
- **User Management**: Tools to manage registered users
- **Content Moderation**: Administrative control over platform content

### 💼 Marketing Pages
- **Landing Page**: Compelling hero section with feature highlights and interactive demos
- **Pricing Page**: Transparent pricing with feature comparisons
- **Zoom Parallax Demo**: Advanced scrolling effects showcase
- **Visual Book Demo**: Standalone demonstration of the visual book viewer
- **Footer Demo**: Showcase of animated footer component
- **Pulse Beam Demo**: Interactive pulse beam animation effects

### 💬 FAQ & Support
### 💰 Pricing Plans
- **Pay Per Album**: Flexible option for occasional creators
- **Monthly Plan**: Unlimited access with a recurring monthly fee
- **Yearly Plan**: Best value for long-term users with annual billing
- **Multilingual Support**: FAQ includes both English and Hindi content
- **Interactive Accordion**: Smooth expandable FAQ items with Radix UI

### 🎨 Advanced UI Components & Effects
- **Scroll Morph Hero**: Interactive hero section with morphing image animations and scroll-based transformations
- **Animated Modals**: Smooth modal transitions with backdrop effects
- **Interactive Buttons**: Hover effects and micro-interactions
- **Card Stacks**: Stacked card animations with 3D flip effects
- **Infinite Moving Cards**: Continuous carousel effects
- **Text Animations**: Typewriter, flip words, arc effects, and sparkles text
- **Particle Systems**: TSParticles for dynamic backgrounds
- **Smooth Scrolling**: Lenis for buttery-smooth scroll experiences
- **Zoom Parallax**: Advanced parallax scrolling with zoom effects
- **Magnetic Text**: Interactive text that responds to mouse movement
- **Animated Testimonials**: Dynamic testimonial displays
- **Feature Sections**: Hover effects and interactive feature showcases
- **Orbiting Circles**: Animated orbital elements for visual interest
- **Google Gemini Effect**: Advanced text animation effects
- **Container Scroll Animations**: Scroll-triggered animations for content reveals

## 🚀 Quick Start

Get Pixfolio running in minutes with these simple steps:

```bash
# Clone the repository (if applicable)
git clone <repository-url>
cd photo

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser
# Navigate to http://localhost:5173
```

That's it! You're ready to explore Pixfolio's interactive visual book capabilities.

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

### Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                 # App core (Routes, Providers)
│   ├── features/            # Feature-based logic and components
│   │   ├── album/           # Visual Book creation & viewing
│   │   ├── auth/            # Authentication (Login, Signup)
│   │   ├── landing/         # Landing page implementation
│   │   └── user/            # Dashboard, Profile, Settings
│   ├── components/          # Shared components (ui, layout)
│   ├── pages/               # Top-level standalone pages
│   ├── services/            # API integration
│   └── utils/               # Shared utilities
├── public/                  # Static assets
└── package.json             # Frontend dependencies
```

## 🛠️ Technologies Used

### Core Framework
- **React 19.2.0** - Modern React with hooks and concurrent features
- **React Router DOM 7.10.1** - Client-side routing with nested routes
- **Vite (with Rolldown 7.2.2)** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 4.1.17** - Utility-first CSS framework with Vite integration
- **Framer Motion 12.23.26** - Animation library for smooth interactions
- **GSAP 3.14.1** - High-performance animation library with React integration
- **Lucide React 0.556.0** - Beautiful, consistent icon library
- **React Icons 5.5.0** - Additional icon library
- **Tabler Icons React 3.36.0** - Extended icon collection

### UI Components & Libraries
- **Radix UI** - Unstyled, accessible UI primitives
  - Accordion, Avatar, Checkbox, Dialog, Dropdown Menu
  - Label, Radio Group, Separator, Tabs, Tooltip
- **shadcn/ui** - Re-usable components built on Radix UI and Tailwind CSS
- **Class Variance Authority 0.7.1** - Utility for managing component variants
- **Tailwind Merge 3.4.0** - Utility for merging Tailwind CSS classes
- **CLSX 2.1.1** - Utility for constructing className strings

### Specialized Libraries
- **react-pageflip 2.0.3** - Page flipping animation library for visual books
- **TSParticles 3.9.1** - Lightweight TypeScript library for creating particles
- **Lenis 1.3.15** - Smooth scroll library for buttery-smooth experiences
- **Next Themes 0.4.6** - Theme provider adapted for React
- **TanStack Table 8.21.3** - Headless UI for building powerful tables
- **OGL 1.0.11** - WebGL graphics library for advanced visual effects

### Development Tools & Performance
- **ESLint 9.39.1** - Code quality and linting with React hooks plugin
- **TypeScript Support** - Type checking with @types/react and @types/react-dom
- **tw-animate-css 1.4.0** - Additional Tailwind animation utilities
- **Rolldown Vite 7.2.2** - Next-generation bundler for faster builds and development
- **Modern Build Pipeline**: Optimized for production with tree-shaking and code splitting



### Language & Runtime
- **JavaScript (ES6+)** - Modern JavaScript with JSX
- **ES Modules** - Modern module system with type="module"

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
- **Artistic Effects**: Enjoy sepia filters, watercolor blending, and inset photo overlays
- **Responsive Design**: The viewer adapts to different screen sizes automatically

### Managing Projects
- Access your dashboard after logging in
- View all your created Visual Book albums
- Create new albums from the dashboard
- Browse and manage your collection
- Manage your profile and account settings
- Handle recharge and billing information

## 🛣️ Application Routes

### Public Routes
- `/` - Home/Landing page
- `/pricing` - Pricing plans
- `/login` - User login
- `/signup` - User registration
- `/zoom-parallax-demo` - Advanced scrolling effects showcase
- `/demo` - Visual Book Viewer standalone demo
- `/viewer/:id` - Visual book viewer for specific album (public access)

### Protected Routes (Require Authentication)
- `/dashboard` - Main user dashboard
- `/create` - Create new visual book
- `/all-pixfolio` - View and manage all albums
- `/recharge` - Account recharge and billing
- `/profile` - User profile management
- `/settings` - Advanced account settings
- `/help` - Help Center and support

### Demo & Development Pages
- `/zoom-parallax-demo` - Advanced parallax scrolling effects
- `/demo` - Standalone Visual Book Viewer demonstration
- `/test-loader` - Luma Spin animation demo

### Special Features
- **Nested Routing**: Dashboard uses React Router's nested routes
- **Route Protection**: Authentication guards for dashboard and viewer
- **404 Handling**: Custom NotFound page for invalid routes
- **Navigation State**: Mobile menu state management



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

For support, email support@pixfolio.com or use the contact form on our website.

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
