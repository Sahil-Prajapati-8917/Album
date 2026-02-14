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

import Footer from './components/Footer'

function AppContent() {
  const location = useLocation()
  const isDashboardPage = location.pathname.startsWith('/dashboard')
  const isVisualBookViewer = location.pathname.startsWith('/viewer')
  const isDemoPage = location.pathname === '/demo'
  const isPricingPage = location.pathname === '/pricing'
  const isSignupPage = location.pathname === '/signup'

  return (
    <div className="min-h-screen bg-background">
      {!isDashboardPage && !isVisualBookViewer && (
        <Navigation />
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
      {!isDashboardPage && !isVisualBookViewer && !isDemoPage && !isPricingPage && !isSignupPage && (
        <Footer />
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
