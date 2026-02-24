# Pixfolio Frontend - Dashboard & Digital Visual Book System

This is the frontend for **Pixfolio**, a high-end SaaS platform for photographers and digital labs to create, manage, and showcase interactive digital visual books.

## 🚀 Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4.0, Lucide Icons
- **UI Components**: Shadcn/UI (Radix UI)
- **Animation**: Framer Motion 12, GSAP, Lenis Smooth Scroll
- **Specialized**: react-pageflip (3D book physics), Recharts (Analytics), Swiper (Carousels)

---

## 📂 Project Structure

```bash
frontend/
├── src/
│   ├── app/                # Route definitions & global providers
│   ├── components/         # Shared UI (shadcn), Layouts, and common blocks
│   ├── features/           # Modular features (Main logic here)
│   │   ├── admin/          # Master Admin Dashboard & moderation
│   │   ├── album/          # Album creation (Pixfolio) & 3D Viewer
│   │   ├── auth/           # Login & Signup flows
│   │   ├── landing/        # Landing page & Pricing
│   │   └── user/           # User dashboard, Profile, Recharge, Photographers
│   ├── services/           # API communication layer (api.js)
│   ├── utils/              # Formatting, validation, and constants
│   └── styles/             # Global CSS & Tailwind configuration
└── public/                 # Static assets
```

---

## 🛠 Core Feature Integration

### 1. User Authentication & Profile
- **Status**: **Fully Integrated**
- **Details**: JWT-based auth. Social profile management and studio details synchronization.

### 2. Pixfolio (Albums) Management
- **Status**: **Fully Integrated**
- **Details**: Full CRUD support synchronized with the backend MongoDB database. Supports 3D flip effects and dynamic music.

### 3. Photographer Directory
- **Status**: **Fully Integrated**
- **Details**: Management of photography partner profiles, fully persisted in the backend.

### 4. Billing & Credits
- **Status**: **Fully Integrated**
- **Details**: Real-time credit monitoring and billing history retrieval from the API.

---

## 📡 API Endpoints (Referenced)

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/users/register` | POST | Create new account | No |
| `/api/users/login` | POST | Get JWT token | No |
| `/api/users/me` | GET | Current user info | Yes |
| `/api/users/profile` | PUT | Update studio/socials | Yes |
| `/api/albums` | GET/POST | Manage pixfolios | Yes |
| `/api/photographers` | GET/POST | Manage partners | Yes |
| `/api/billing/history` | GET | Transaction logs | Yes |
| `/api/billing/purchase` | POST | Credit top-ups | Yes |

---

---

## 🛠 Setup & Development

1. **Install Deps**: `npm install`
2. **Run Dev**: `npm run dev`
3. **Environment**: Update `VITE_API_URL` (if added) or modify `src/services/api.js` for custom backend URLs.

---

## 🏗 Admin Access
- **Path**: `/admin`
- **Master Admin Password**: Currently set in code for demo purposes. Backend should manage admin session validation separately.

---
Built with ❤️ by Sahil Prajapati
