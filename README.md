# Pixfolio - Interactive Digital Visual Books Platform

Pixfolio is a premium, full-stack digital album platform designed for photographers and creators to showcase memories through immersive, interactive page-flipping stories. Built with a cutting-edge React frontend and a robust Node.js/Express backend.

## 🌟 Vision

Our goal is to transcend traditional photo galleries by providing a realistic, tactile digital experience. With advanced physics-based page turning and artistic post-processing effects, Pixfolio makes digital memories feel alive.

## ✨ Key Features

- **Realistic 3D Visual Book**: Interactive page-flipping with natural tilt, shadow effects, and background music integration.
- **Specialized Dashboards**: Tailored management hubs for independent photographers and high-volume digital labs.
- **Advanced Album Management**:
  - **Integrated Storage**: Albums, photographers, and billing data are fully synchronized with the backend.
  - **Engagement Tracking**: Real-time analytics for album views and user interactions.
  - **Instant Sharing**: One-click sharing via WhatsApp, Instagram, and other social platforms.
  - **Dynamic QR Codes**: Automated unique QR code generation for every digital book.
- **Secure Infrastructure**: JWT-based authentication, bcrypt hashing, and rate-limiting protection.
- **Modern UI/UX**: A dark-mode first design built with Tailwind CSS v4, Framer Motion, and GSAP.
- **Scalable Architecture**: Flexible MongoDB data models and a feature-based project structure.

## 🏗️ Project Architecture

The project is split into two main components:

### 1. [Frontend (React)](./frontend/README.md)
A high-performance interactive application built with Vite, React 19, and advanced animation libraries.
- **Integrated Features**: Authentication, Profile Management, Album Creation, Photographer Directory, and Billing/Credits.
- **Detailed Docs**: [Click here to view Frontend Documentation](./frontend/README.md)

### 2. [Backend (Express)](./Backend/README.md)
A secure RESTful API managing user sessions, profile logic, albums, photographers, and credits.
- **Technologies**: Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt.
- **Detailed Docs**: [Click here to view Backend Documentation](./Backend/README.md)

## 🚀 Quick Start

1. **Install Prerequisites**: Ensure you have Node.js 18+ and MongoDB installed.
2. **Setup Backend**:
   ```bash
   cd Backend && npm install
   cp .env.example .env # Update your variables (MONGO_URI, JWT_SECRET)
   npm run dev
   ```
3. **Setup Frontend**:
   ```bash
   cd frontend && npm install
   npm run dev
   ```
4. **Access Platform**: Visit `http://localhost:5173`.

## 📁 Repository Structure

```bash
photo/
├── README.md               # You are here
├── LICENSE                 # MIT License details
├── Backend/                # API Server source code
├── frontend/               # React Application source code
├── Lab.md                  # Comprehensive feature list for the Lab version
└── structure.md            # Detailed file and folder architecture
```

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for more information.

---
Created with passion by [Sahil Prajapati](https://github.com/Sahil-Prajapati-8917)