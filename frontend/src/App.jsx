import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { TooltipProvider } from '@/components/ui/tooltip'

// Layouts
import MainLayout from './components/layouts/MainLayout'
import DashboardLayout from './components/DashboardLayout'
import AuthLayout from './components/layouts/AuthLayout'

// Pages
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
import VisualBookDemo from './pages/VisualBookDemo'

// Components
import VisualBookViewer from './components/VisualBookViewer'


function AppContent() {
  return (
    <Routes>
      {/* Standalone Route (No Layout) */}
      <Route path="/" element={<Home />} />
      <Route path="/viewer/:id" element={<VisualBookViewer />} />

      {/* Public Routes with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/zoom-parallax-demo" element={<ZoomParallaxDemo />} />
        <Route path="/demo" element={<VisualBookDemo />} />
      </Route>

      {/* Auth Routes with Auth Layout */}
      {/* Auth Routes (Standalone) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected/Dashboard Routes with Dashboard Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateNew />} />
        <Route path="/all-pixfolio" element={<AllPixfolio />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
