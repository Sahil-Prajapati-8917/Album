# Pixfolio Backend

Robust REST API for the Pixfolio digital album platform. Manages secure authentication, industrial-scale album processing, photographer partnerships, and credit-based transaction logging.

## Tech Stack

- **Node.js 18+** with **Express 5**
- **MongoDB** with **Mongoose 9** for reliable data modeling
- **JWT** for stateless authentication
- **bcryptjs** for industry-standard password security
- **CORS** & **Helmet** for hardened API security

## Setup

```bash
cd Backend
npm install
cp .env.example .env   # Configure MONGO_URI, JWT_SECRET, and PORT
npm run dev             # Hot-reloading development server
```

## API Core Architecture

### Authentication
| Method | Endpoint | Use Case |
|--------|----------|----------|
| POST | `/api/users/register` | New Lab/Photographer signup |
| POST | `/api/users/login` | Secure JWT acquisition |

### "Visual Book" Management
| Method | Endpoint | Auth | Impact |
|--------|----------|------|--------|
| GET | `/api/albums` | Yes | Retrieve user-owned album collection |
| POST | `/api/albums` | Yes | Provision new album (debits 1 account credit) |
| GET | `/api/albums/:id` | **No** | Publicly accessible fetch; automatically bumps view metrics |
| PUT | `/api/albums/:id` | Yes | Update spreads, metadata, or branding |
| DELETE | `/api/albums/:id` | Yes | Permanent removal of album data |

### Photographer Directory
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/photographers` | Fetch linked photographer profiles |
| POST | `/api/photographers` | Create new photographer identity |

## Data Schemas

### User (Lab/Photographer Profile)
Stores core identity and studio branding. Includes `credits` balance and `studioName` which is used for dynamic viewer branding.

### Album ("Visual Book")
- `albumId`: Unique platform identifier (format `PF-<uuid>`).
- `spreads`: Array of logical page pairs (left/right) with high-res image URLs.
- `views`: Real-time engagement counter.
- `photographerId`: Join-reference to the specific branding profile.

### Transaction
Immutable record of credit purchases, plan types, and payment gateway responses.

## Security & Reliability

- **Rate Limiting**: Throttles brute-force attempts on sensitive auth routes.
- **Data Integrity**: Enforces whitelisted fields on all `PUT` operations to prevent unauthorized field mutation.
- **Ownership Middleware**: Strict validation ensures users can only access or modify records they own.
- **Sanitization**: Automatic sanitization of incoming MongoDB queries to prevent NoSQL injection.

---
Developed by Sahil Prajapati
