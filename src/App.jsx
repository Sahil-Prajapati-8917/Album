import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'
import { Navbar, NavBody, NavItems, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, NavbarLogo, NavbarButton } from './components/ui/resizable-navbar'
// import Header from './components/Header'
import { Footer as AnimatedFooter } from './components/ui/modem-animated-footer'
import { Camera, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import DashboardLayout from './components/DashboardLayout'
import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CreateNew from './pages/CreateNew'
import AllPixora from './pages/AllPixora'
import Recharge from './pages/Recharge'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import ZoomParallaxDemo from './pages/ZoomParallaxDemo'
import VisualBookViewer from './components/VisualBookViewer'

function AppContent() {
  const location = useLocation()
  const isDashboardPage = location.pathname.startsWith('/dashboard')
  const isVisualBookViewer = location.pathname.startsWith('/viewer')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Pricing", link: "/pricing" },
    { name: "Contact", link: "/contact" },
  ]

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
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {!isDashboardPage && !isVisualBookViewer && (
        <Navbar className="fixed inset-x-0 top-0 z-50 w-full bg-transparent">
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Login
              </Link>
              <NavbarButton href="/signup" variant="primary">
                Join Now
              </NavbarButton>
            </div>
          </NavBody>
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>
            <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="block py-2 text-black dark:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t pt-4 mt-4 space-y-2">
                <Link
                  to="/login"
                  className="block py-2 text-blue-600 dark:text-blue-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 bg-blue-600 text-white text-center rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Now
                </Link>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      )}
      <main id="main-content" className={isDashboardPage ? "pt-0" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/zoom-parallax-demo" element={<ZoomParallaxDemo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="create" element={<CreateNew />} />
            <Route path="pixora" element={<AllPixora />} />
            <Route path="recharge" element={<Recharge />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/viewer/:id" element={<VisualBookViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDashboardPage && !isVisualBookViewer && (
        <AnimatedFooter
          brandName="Pixora"
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
