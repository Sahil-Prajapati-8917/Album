# Pixfolio - Interactive Digital Visual Books (Frontend)

A state-of-the-art React application for creating and viewing interactive digital Visual Books. Designed for photographers and content creators to showcase their work through a premium, immersive digital experience.

## ✨ Core Features

### 🖥️ User Experience & Interface
- **Modern Design System**: Clean, premium interface built with Tailwind CSS v4 and shadcn/ui.
- **Dynamic Animations**: Seamless transitions powered by Framer Motion v12 and GSAP.
- **Strict Theme System**: Pixel-perfect Light/Dark modes with persistent user preferences.
- **Responsive & Accessible**: Mobile-first architecture with full keyboard and touch navigation support.
- **Smooth Scrolling**: Integrated Lenis for a buttery-smooth desktop experience.

### 📖 Immersive Visual Book Viewer
- **Realistic Page Flipping**: Natural page-turning physics via `react-pageflip`.
- **Artistic Post-Processing**: Vignette effects, sepia overlays, and watercolor edge blending.
- **Multiple Navigation Modes**: Click-to-flip, keyboard arrows, and intuitive touch gestures.
- **Adaptive Layouts**: Full-bleed imagery, inset photo overlays, and elegant typography.

### 🔐 Multi-Role Dashboard
- **Photographer & Lab Workspaces**: Specialized views and tools for different user types.
- **Project Management**: Centralized hub for creating, editing, and managing all flipbooks.
- **Credits & Recharge**: Transparent balance tracking and easy credit management.
- **Advanced Profile Settings**: Comprehensive personal and social media integration.

### 🛡️ Administrative Control
- **Master Admin Panel**: Secure portal for system overview and user moderation.
- **Analytics & Tracking**: Real-time performance metrics for all hosted albums.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Sahil-Prajapati-8917/Album.git
cd photo/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Technologies Used

### Core Frameworks
- **React 19.2.0** - Latest React features with concurrent rendering.
- **Vite (Rolldown)** - Ultra-fast build tool and development server.
- **React Router 7.10.1** - Advanced nested routing and protection guards.

### Styling & Animation
- **Tailwind CSS 4.1.17** - Next-gen utility-first CSS.
- **Framer Motion 12.23.26** - Interactive production-ready animations.
- **GSAP 3.14.1** - Performance-focused animation orchestration.
- **Radix UI** - Unstyled, accessible component primitives.

### Specialized tools
- **react-pageflip** - Realistic book physics.
- **TSParticles** - Dynamic background particle systems.
- **Recharts** - Data visualization for dashboard analytics.
- **qrcode.react** - Instant QR generation for album sharing.

## 📁 Project Structure

```bash
frontend/
├── src/
│   ├── app/                # Root routes and providers
│   ├── features/           # Feature-based architecture (album, auth, user, admin)
│   ├── components/         # Shared UI and Layout components
│   ├── pages/              # Standalone landing and policy pages
│   ├── services/           # Backend API integration layers
│   └── utils/              # Shared logic and styling helpers
└── public/                 # Static assets and media
```

## ROADMAP
- [ ] Direct Photo Upload to Cloud Storage
- [ ] Real-time Collaboration Tools
- [ ] PWA Support for Offline Viewing
- [ ] Multi-language (i18n) Integration

---
Built with ❤️ by Sahil Prajapati
