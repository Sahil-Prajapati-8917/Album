# Pixfolio Frontend

The React 19 single-page application (SPA) for the Pixfolio platform. It provides a premium dashboard for labs/photographers and a high-performance "Visual Book" viewer for clients.

## Tech Stack

- **React 19** with Vite
- **Tailwind CSS v4** for high-performance styling
- **shadcn/ui** (New York style) & Radix primitives for accessible, premium UI
- **Framer Motion** for smooth cinematic transitions
- **Lucide React** for consistent iconography
- **React Router v7** for modern routing architectures

## Project Structure

```
src/
├── app/              # Routes (routes.jsx), ProtectedRoute, providers
├── components/       # Shared UI
│   ├── ui/           # shadcn components (button, card, input, etc.)
│   ├── layout/       # DashboardLayout, MainLayout
│   └── ...           # Sidebar, Header, Error Boundary
├── features/
│   ├── album/
│   │   ├── components/
│   │   │   └── VisualBookViewer.jsx   # Premium "Visual Book" viewer
│   │   └── pages/
│   │       ├── CreateNew.jsx          # 3-step album creation wizard
│   │       └── AllPixfolio.jsx        # Album management & QR codes
│   ├── auth/             # Login, Signup, and account creation
│   ├── admin/            # Master Admin dashboard
│   ├── landing/          # Marketing landing page
│   └── user/             # Profile, Billing, Settings, Photographers
├── services/
│   └── api.js            # Central API client (Axios-based)
├── styles/
│   └── index.css         # Global design system & dark mode tokens
└── lib/
    └── utils.js          # Tailwind class merging helper
```

## Key Pages & Routes

| Route | Component | Auth | Description |
|-------|-----------|------|-------------|
| `/` | Landing | No | High-conversion marketing page |
| `/login` | Login | No | Secure login portal |
| `/dashboard` | Dashboard | Yes | Portfolio overview & analytics |
| `/create` | CreateNew | Yes | Multi-step "Visual Book" builder |
| `/all-pixfolio` | AllPixfolio | Yes | Album gallery with sharing & QR tools |
| `/viewer/:id` | VisualBookViewer | No | **Public Visual Book** — Distraction-free photography viewer |
| `/profile` | Profile | Yes | Studio & Photographer branding settings |
| `/recharge` | Recharge | Yes | Credit purchase and billing history |
| `/admin/*` | Admin | Admin | Master platform management |

## The "Visual Book" Experience

The viewer at `/viewer/:id` is Pixfolio's flagship feature. It provides an "app-less" mobile-first experience:
- **Zero Distractions**: All action buttons and UI overlays are removed to focus on the imagery.
- **Brand First**: The header dynamically pulls Photographer/Studio branding details derived from the backend.
- **Seamless Flow**: Optimized for vertical scrolling with lazy-loaded high-resolution spreads.
- **Universal Access**: Shares via a simple URL or auto-generated QR code.

## Development

```bash
npm install
npm run dev        # Local dev server: http://localhost:5173
npm run build      # Optimized production build
```

The frontend uses a proxy configuration to communicate with the Backend API. Ensure the backend is running at the configured URL.

---
Built by Sahil Prajapati
