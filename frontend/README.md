# Pixfolio Frontend

React SPA for the Pixfolio digital album platform. Handles authentication, album creation, a minimal album viewer, photographer management, billing, and an admin dashboard.

## Tech Stack

- **React 19** with Vite (rolldown-vite 7.2.2)
- **Tailwind CSS v4** (`@tailwindcss/vite` plugin)
- **shadcn/ui** (New York style, Radix primitives)
- **Framer Motion** for page transitions
- **Lucide React** for icons
- **React Router v7** for routing

## Project Structure

```
src/
├── app/              # Routes (routes.jsx), ProtectedRoute, providers
├── components/       # Shared UI
│   ├── ui/           # shadcn components (button, card, input, etc.)
│   ├── layout/       # DashboardLayout, MainLayout
│   ├── AdminHeader.jsx
│   ├── AppSidebar.jsx
│   ├── ErrorBoundary.jsx
│   └── Footer.jsx
├── features/
│   ├── album/
│   │   ├── components/
│   │   │   └── VisualBookViewer.jsx   # Minimal scrollable album viewer
│   │   └── pages/
│   │       ├── CreateNew.jsx          # Album creation wizard
│   │       └── AllPixfolio.jsx        # Album listing + QR codes
│   ├── auth/
│   │   ├── components/   # LoginForm, CreateAccountForm
│   │   └── pages/        # Login, Signup
│   ├── admin/            # Admin dashboard + sub-pages
│   ├── landing/          # Landing page + config
│   └── user/
│       └── pages/        # Dashboard, Profile, Settings, Recharge, Photographers, HelpCenter
├── services/
│   └── api.js            # All API calls (auth, albums, photographers, billing)
├── styles/
│   └── index.css         # Global styles, CSS variables, dark mode tokens
└── lib/
    └── utils.js          # cn() helper
```

## Key Pages & Routes

| Route | Component | Auth | Description |
|-------|-----------|------|-------------|
| `/` | Landing | No | Marketing landing page |
| `/login` | Login | No | Login form |
| `/signup` | Signup | No | Registration form |
| `/dashboard` | Dashboard | Yes | Overview with stats |
| `/create` | CreateNew | Yes | Album creation wizard (3 steps) |
| `/all-pixfolio` | AllPixfolio | Yes | List all albums, share, QR codes |
| `/viewer/:id` | VisualBookViewer | No | **Public minimal viewer** — fetches album from API, displays all images |
| `/profile` | Profile | Yes | User profile & studio details |
| `/settings` | Settings | Yes | Account settings |
| `/recharge` | Recharge | Yes | Buy credits |
| `/photographers` | Photographers | Yes | Manage photographer partners |
| `/help` | HelpCenter | Yes | FAQ & support |
| `/admin` | AdminPasswordPage | No | Admin login |
| `/admin/dashboard/*` | MasterAdminDashboard | Admin | Admin panel (overview, users, albums, etc.) |

## Album Viewer

`/viewer/:id` is a public, minimal page. It calls `GET /api/albums/:id`, extracts all images (front cover, spread left/right pages, back cover), and renders them in a vertical scroll layout. No flip-book library — just images stacked vertically with lazy loading.

Also used inline by `CreateNew.jsx` in preview mode (receives data via props instead of fetching).

## API Layer

All API calls go through `src/services/api.js`. Key functions:

- `loginUser(email, password)` / `registerUser(data)` — auth
- `getMyAlbums()` / `createAlbum(data)` / `updateAlbum(id, data)` / `deleteAlbum(id)` — albums
- `getAlbumById(id)` — public album fetch (used by viewer)
- `getMyPhotographers()` / `createPhotographer(data)` — photographer directory
- `purchaseCredits(data)` / `getBillingHistory()` — billing

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build to dist/
```

Backend must be running at the URL configured in `api.js` (defaults to `/api` proxy).

---
Built by Sahil Prajapati
