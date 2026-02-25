# Pixfolio - Digital Album Platform for Photographers

Pixfolio is a full-stack digital album platform for photographers and labs to create, manage, and share photo albums with clients. Built with React 19 and Node.js/Express.

## Key Features

- **Minimal Album Viewer** — Clean, scrollable viewer that displays all album images. Fetches album data from the database via a public shareable link (`/viewer/:id`).
- **Album Management** — Full CRUD for albums with cover images, inner page spreads, photographer assignment, and event metadata.
- **Photographer Directory** — Manage photography partner profiles linked to albums.
- **Billing & Credits** — Credit-based system for album creation with purchase history.
- **Engagement Tracking** — View counts per album, tracked automatically on each viewer visit.
- **QR Code Sharing** — Auto-generated QR codes for instant album sharing.
- **Auth & Security** — JWT authentication, bcrypt password hashing, rate limiting.
- **Dark Mode** — Full dark mode support across all dashboard pages.
- **Admin Dashboard** — Master admin panel for user management, moderation, and analytics.

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite (rolldown-vite), Tailwind CSS v4, shadcn/ui, Framer Motion |
| Backend | Node.js 18+, Express 5, MongoDB + Mongoose 9 |
| Auth | JWT, bcryptjs (12 salt rounds), rate limiting |

## Project Structure

```
photo/
├── Backend/          # Express API server
│   ├── controllers/  # Route handlers
│   ├── models/       # Mongoose schemas (User, Album, Photographer, Transaction)
│   ├── routes/       # API endpoint definitions
│   ├── middleware/    # Auth, validation, rate limiting
│   └── index.js      # Entry point
├── frontend/         # React SPA
│   ├── src/
│   │   ├── app/          # Routes & providers
│   │   ├── components/   # Shared UI (shadcn), layouts, sidebar, header
│   │   ├── features/     # Feature modules
│   │   │   ├── album/    # Album creation & viewer
│   │   │   ├── auth/     # Login & signup
│   │   │   ├── admin/    # Admin dashboard
│   │   │   ├── landing/  # Landing page
│   │   │   └── user/     # Dashboard, profile, settings, billing
│   │   ├── services/     # API client (api.js)
│   │   └── styles/       # Global CSS
│   └── public/           # Static assets
└── README.md
```

## Quick Start

Prerequisites: Node.js 18+, MongoDB (local or Atlas).

```bash
# Backend
cd Backend && npm install
cp .env.example .env   # set MONGO_URI, JWT_SECRET
npm run dev

# Frontend (new terminal)
cd frontend && npm install
npm run dev
```

Open `http://localhost:5173`.

## Album Viewer

The viewer is a minimal, scrollable page at `/viewer/:id`. It fetches album data from `GET /api/albums/:id` (public endpoint) and renders all images vertically — front cover, every spread page, and back cover. No third-party page-flip libraries; pure React.

Used for sharing albums with clients via direct link or QR code.

## License

MIT — see [LICENSE](./LICENSE).

---
Created by [Sahil Prajapati](https://github.com/Sahil-Prajapati-8917)