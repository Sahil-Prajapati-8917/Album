import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'
import Navigation from './components/Navigation'
// import Header from './components/Header'
import { Footer as AnimatedFooter } from './components/ui/modem-animated-footer'
import { Camera, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import DashboardLayout from './components/DashboardLayout'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CreateNew from './pages/CreateNew'
import AllPixfolio from './pages/AllPixfolio'
import Recharge from './pages/Recharge'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import ZoomParallaxDemo from './pages/ZoomParallaxDemo'
import VisualBookViewer from './components/VisualBookViewer'
import VisualBookDemo from './pages/VisualBookDemo'

function AppContent() {
  const location = useLocation()
  const isDashboardPage = location.pathname.startsWith('/dashboard')
  const isVisualBookViewer = location.pathname.startsWith('/viewer')
  const isDemoPage = location.pathname === '/demo'

  const socialLinks = [
    {
      icon: <Facebook className="w-6 h-6" />,
      href: "#",
      label: "Facebook",
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      href: "#",
      label: "Twitter",
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      href: "#",
      label: "Instagram",
    },
    {
      icon: <Youtube className="w-6 h-6" />,
      href: "#",
      label: "Youtube",
    },
  ];

  const footerNavLinks = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {!isDashboardPage && !isVisualBookViewer && !isDemoPage && (
        <div className="fixed inset-x-0 top-0 z-50 w-full bg-white/80 backdrop-blur-sm">
          <Navigation />
        </div>
      )}
      <main id="main-content" className={isDashboardPage ? "pt-0" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/zoom-parallax-demo" element={<ZoomParallaxDemo />} />
          <Route path="/demo" element={<VisualBookDemo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="create" element={<CreateNew />} />
            <Route path="pixfolio" element={<AllPixfolio />} />
            <Route path="recharge" element={<Recharge />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/viewer/:id" element={<VisualBookViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDashboardPage && !isVisualBookViewer && !isDemoPage && (
        <AnimatedFooter
          brandName="Pixfolio"
          brandDescription="Create stunning interactive Visual Books from your photos. Perfect for photographers, designers, and content creators."
          socialLinks={socialLinks}
          navLinks={footerNavLinks}
          brandIcon={<Camera className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-background drop-shadow-lg" />}
        />
      )}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
