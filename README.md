# Pixfolio - Interactive Digital Visual Books Platform

A modern full-stack web application for creating and viewing interactive digital Visual Books. Designed for photographers, designers, and content creators who want to showcase their work in an engaging, interactive format with premium page-flipping animations and artistic effects.

## 🌟 Overview

Pixfolio is a comprehensive platform that combines a React frontend with a Node.js/Express backend to deliver a seamless experience for creating, managing, and viewing interactive digital albums. The application features advanced animations, user authentication, project management, and a beautiful modern interface.

## ✨ Key Features

### 🎨 Visual Book Viewer
- **Interactive Page Flipping**: Realistic page-turning animations using react-pageflip
- **Premium Album Design**: Natural album tilt with shadow effects and vignette
- **Multiple Navigation Methods**: Click-to-flip, keyboard arrows, touch/swipe support
- **Artistic Page Layouts**: Full-bleed images, sepia filters, watercolor edge blending
- **Responsive Sizing**: Adaptive book dimensions for all screen sizes
- **Reduced Motion Support**: Respects user accessibility preferences

### 🔐 Authentication & User Management
- **Secure Registration**: Email-based signup with form validation
- **JWT Authentication**: Persistent sessions with secure token management
- **User Profiles**: Comprehensive profile management with social media links
- **Protected Routes**: Dashboard and viewer pages require authentication
- **Password Security**: bcrypt hashing with 12 salt rounds

### 📊 Dashboard & Project Management
- **Admin Kit Integration**: Modern dashboard built with shadcn/ui and admin blocks
- **Project Gallery**: View and manage all created Visual Book albums
- **Create New Projects**: Intuitive wizard for building new visual books
- **Settings & Help Center**: Advanced account configuration and support hub
- **Recharge System**: Credit/balance management for premium features
- **Modern Sidebar**: Collapsible navigation with active state tracking

### 🎪 Advanced UI Components & Effects
- **Scroll Morph Hero**: Interactive hero with morphing animations
- **Animated Modals**: Smooth transitions with backdrop effects
- **Card Stacks**: 3D flip effects and infinite moving cards
- **Text Animations**: Typewriter, flip words, arc effects, sparkles text
- **Particle Systems**: TSParticles for dynamic backgrounds
- **Smooth Scrolling**: Lenis for buttery-smooth experiences
- **Zoom Parallax**: Advanced parallax scrolling with zoom effects
- **Interactive Elements**: Hover effects, magnetic text, orbiting circles

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for all devices
- **Touch Gestures**: Swipe and tap interactions
- **Adaptive Layout**: Dynamic component sizing
- **Accessibility**: WCAG compliant with ARIA labels

## 🏗️ Project Architecture

### Technology Stack

#### Frontend
- **React 19.2.0** - Modern React with hooks and concurrent features
- **Vite (with Rolldown 7.2.2)** - Fast build tool and development server
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Framer Motion 12.23.26** - Animation library
- **GSAP 3.14.1** - High-performance animations
- **React Router DOM 7.10.1** - Client-side routing
- **Radix UI + shadcn/ui** - Accessible UI components

#### Backend
- **Node.js + Express 5.2.1** - Server framework
- **MongoDB + Mongoose 9.0.2** - Database and ODM
- **JWT Authentication** - Secure token-based auth
- **bcryptjs 3.0.3** - Password hashing
- **CORS** - Cross-origin resource sharing

#### Development Tools
- **ESLint 9.39.1** - Code quality and linting
- **Nodemon 3.1.11** - Auto-restart development server
- **dotenv 17.2.3** - Environment variable management

## 📁 Project Structure

```
photo/
├── README.md                    # This file
├── .gitignore                   # Git ignore patterns
│
├── Backend/                     # Backend API server
│   ├── README.md               # Backend documentation
│   ├── index.js                 # Main server entry point
│   ├── package.json             # Backend dependencies
│   ├── models/                  # Database models
│   ├── controllers/             # Request handlers
│   ├── routes/                  # API endpoints
│   └── middleware/              # Auth & validation
│
└── frontend/                    # React frontend application
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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/Sahil-Prajapati-8917/Album.git
cd photo
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env  # (or create manually)

# Update .env with your configuration:
MONGO_URI="mongodb://localhost:27017/pixfolio"
# or for MongoDB Atlas:
# MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/pixfolio"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

### Database Setup

#### Option A: MongoDB Atlas (Recommended for Production)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Add your IP address to the whitelist
4. Get the connection string
5. Update `Backend/.env` with the connection string

#### Option B: Local MongoDB (For Development)
1. Install MongoDB locally:
   ```bash
   # macOS
   brew install mongodb-community
   
   # Ubuntu
   sudo apt-get install mongodb
   
   # Windows
   # Download from mongodb.com
   ```
2. Start MongoDB service:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Ubuntu
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```
3. Update `Backend/.env`:
   ```
   MONGO_URI="mongodb://localhost:27017/pixfolio"
   ```

### Environment Variables

Create a `.env` file in the `Backend/` directory:

```env
# Database
MONGO_URI="mongodb://localhost:27017/pixfolio"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key-min-32-characters"

# Server Port
PORT=5000

# CORS Frontend URL (if different from default)
FRONTEND_URL="http://localhost:5173"
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "personalName": "John Doe",
  "studioName": "Awesome Studio",
  "mobileNumber": "+1234567890",
  "address": "123 Main St, City, Country"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer JWT_TOKEN
```

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer JWT_TOKEN
```

#### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
  "personalName": "John Smith",
  "studioName": "Awesome Studio",
  "mobileNumber": "+1234567890",
  "address": "123 New St, City, Country",
  "socialMedia": {
    "instagram": "@johnsmith",
    "facebook": "facebook.com/johnsmith",
    "youtube": "youtube.com/johnsmith",
    "whatsapp": "+1234567890",
    "twitter": "@johnsmith"
  }
}
```

### Response Format

Success Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "personalName": "John Doe"
    }
  },
  "token": "jwt_token_here"
}
```

Error Response:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## 🛣️ Application Routes

### Public Routes
- `/` - Home/Landing page
- `/pricing` - Pricing plans and features
- `/login` - User login page
- `/signup` - User registration page
- `/demo` - Visual Book Viewer standalone demo
- `/zoom-parallax-demo` - Advanced scrolling effects showcase
- `/viewer/:id` - Public visual book viewer (direct access)

### Protected Routes (Require Authentication)
- `/dashboard` - Main user dashboard
- `/create` - Create new visual book
- `/all-pixfolio` - View and manage all albums
- `/recharge` - Account recharge and billing
- `/profile` - User profile management
- `/settings` - Advanced account settings
- `/help` - Help Center and support

### Demo & Development Pages
- `/demo` - Standalone Visual Book Viewer demonstration
- `/test-loader` - Luma Spin animation demo
- `/zoom-parallax-demo` - Advanced parallax scrolling effects

## 🎨 Features Deep Dive

### Visual Book Viewer
The core feature of Pixfolio is the interactive visual book viewer:

**Navigation Methods:**
- **Click-to-Flip**: Click on left page to go backward, right page to go forward
- **Keyboard Navigation**: Arrow keys (←/→) for page navigation, Escape to exit
- **Touch/Swipe Support**: Mobile-friendly gesture controls with visual feedback

**Artistic Effects:**
- Sepia filters on main images for vintage feel
- Watercolor edge blending for artistic transitions
- Inset photo overlays on right pages
- Elegant page numbering with subtle styling
- Natural album tilt with realistic shadow effects

**Responsive Design:**
- Automatic book resizing based on screen dimensions
- Touch-optimized for mobile devices
- Reduced motion support for accessibility

### Authentication System
Secure user management with comprehensive features:

**Security Measures:**
- Password hashing with bcrypt (12 salt rounds)
- JWT tokens with 30-day expiration
- Rate limiting (5 requests/15min for register, 10 requests/15min for login)
- Input validation and sanitization
- CORS configuration for cross-origin security

**User Profile Features:**
- Personal information (name, studio, contact)
- Social media integration (Instagram, Facebook, YouTube, WhatsApp, Twitter)
- Profile picture support
- Address and contact information
- Account settings and preferences

### UI Components Library
Extensive collection of modern UI components:

**Animation Components:**
- Animated modals with backdrop effects
- Card stacks with 3D flip animations
- Infinite moving cards carousel
- Text animations (typewriter, flip words, arc effects)
- Particle systems with TSParticles
- Scroll-triggered animations

**Interactive Elements:**
- Hover effects and micro-interactions
- Magnetic text responding to mouse movement
- Orbiting circles for visual interest
- Google Gemini effect for text animations
- Container scroll animations for content reveals

**Layout Components:**
- Resizable navigation with mobile support
- Collapsible sidebar with shadcn/ui
- Responsive grid layouts
- Feature sections with hover effects

## 🔒 Security Features

### Backend Security
- **Password Security**: bcrypt hashing with 12 salt rounds
- **Authentication**: JWT tokens with expiration and validation
- **Input Validation**: Email format validation, field length limits
- **Rate Limiting**: Prevents brute force attacks
- **CORS Configuration**: Secure cross-origin request handling
- **Error Handling**: Secure error responses without information leakage

### Frontend Security
- **Token Storage**: Secure localStorage usage with validation
- **Route Protection**: Authentication guards for protected pages
- **Input Sanitization**: Form validation and sanitization
- **XSS Prevention**: Safe rendering of user content
- **HTTPS Ready**: Production deployment supports secure connections

## 📱 Responsive Design

### Mobile Optimization
- Touch-friendly interface elements
- Swipe gestures for navigation
- Optimized animations for mobile performance
- Adaptive layouts for different screen sizes
- Mobile-first CSS approach with Tailwind

### Desktop Experience
- Keyboard navigation support
- Hover states and micro-interactions
- Larger viewport optimizations
- Mouse-driven interactions
- Full-screen viewing capabilities

## 🚀 Deployment

### Production Build

#### Frontend
```bash
cd frontend
npm run build
```

The build output will be in the `dist/` directory.

#### Backend
```bash
cd Backend
npm start
```

### Deployment Options

#### Vercel (Recommended for Frontend)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `cd frontend && npm install`
3. Deploy automatically on every push

#### Netlify
1. Build command: `cd frontend && npm run build`
2. Publish directory: `frontend/dist`
3. Environment variables for API URL

#### Railway/Render (Backend)
1. Connect GitHub repository
2. Set environment variables
3. Deploy Node.js application

#### Docker Deployment
Create `Dockerfile` for containerized deployment:

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY Backend/package*.json ./
RUN npm install --production
COPY Backend/ .
EXPOSE 5000
CMD ["npm", "start"]
```

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration flow
- [ ] User login/logout functionality
- [ ] Profile creation and updates
- [ ] Visual book viewer navigation
- [ ] Responsive design on different devices
- [ ] API endpoint functionality
- [ ] Error handling validation
- [ ] Authentication protection

### API Testing
Use tools like Postman or curl to test API endpoints:

```bash
# Test registration
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","personalName":"Test User"}'

# Test login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## 🔧 Development

### Available Scripts

#### Backend
```bash
cd Backend
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests (placeholder)
```

#### Frontend
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Code Style Guidelines
- Use functional components with React hooks
- Follow consistent naming conventions
- Implement proper error handling and loading states
- Prioritize accessibility with ARIA labels
- Use mobile-first responsive design
- Write meaningful commit messages
- Comment complex logic

### Git Workflow
```bash
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature description"
git push origin feature/new-feature
# Create pull request for review
```

## 🐛 Troubleshooting

### Common Issues

#### Backend Won't Start
- Check if MongoDB is running
- Verify environment variables in `.env`
- Check if port 5000 is available
- Review error logs for specific issues

#### Frontend Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for conflicting dependency versions
- Verify Vite configuration

#### Database Connection Issues
- Verify MongoDB URI is correct
- Check network connectivity to MongoDB
- Ensure MongoDB service is running
- Check firewall settings

#### Authentication Problems
- Verify JWT_SECRET is set in `.env`
- Check token expiration settings
- Review CORS configuration
- Ensure frontend is sending correct headers

### Debug Mode
Enable detailed logging by setting:
```env
NODE_ENV=development
DEBUG=pixfolio:*
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'feat: add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Review Process
- Ensure code follows project style guidelines
- Add tests for new features
- Update documentation as needed
- Request review from maintainers
- Address feedback promptly

### Bug Reports
- Use the GitHub issue tracker
- Provide detailed reproduction steps
- Include environment details
- Add screenshots if applicable

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and inquiries:

- **Email**: support@pixfolio.com
- **GitHub Issues**: [Create an issue](https://github.com/Sahil-Prajapati-8917/Album/issues)
- **Documentation**: Check this README and `/frontend/USER_DATABASE_SYSTEM.md`

## 🗺️ Roadmap

### Upcoming Features
- [ ] Photo upload and management system
- [ ] Real-time collaboration features
- [ ] Advanced customization options
- [ ] API integrations (Cloudinary, AWS S3)
- [ ] Mobile app development (React Native)
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] Template library for visual books
- [ ] Social sharing capabilities
- [ ] Export functionality (PDF, video)

### Technical Improvements
- [ ] Progressive Web App (PWA) support
- [ ] WebSocket integration for real-time features
- [ ] Redis for session management
- [ ] Microservices architecture
- [ ] GraphQL API implementation
- [ ] Automated testing suite
- [ ] CI/CD pipeline setup
- [ ] Performance monitoring and optimization

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **shadcn/ui** - For the beautiful UI components
- **Framer Motion** - For the smooth animations
- **GSAP** - For the high-performance animations
- **MongoDB** - For the flexible database solution
- **All Contributors** - Who help improve this project

---

Built with ❤️ for photographers, designers, and content creators worldwide.

**Pixfolio** - Where memories come to life through interactive digital stories.