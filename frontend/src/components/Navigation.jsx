import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ThemeToggle } from './ThemeToggle'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { PrimaryButton } from "@/components/custom/PrimaryButton"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Demo', path: '/demo' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Sign In', path: '/login' },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gold/10 bg-pearl/80 backdrop-blur-md dark:bg-ebony/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/Pixfolio_Logo.svg" alt="Pixfolio" className="h-10 w-auto group-hover:scale-110 transition-transform" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-semibold uppercase tracking-widest hover:text-gold transition-colors ${location.pathname === link.path ? 'text-gold' : 'text-foreground'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle variant="switch" size="md" className="hidden md:block" />

          <Link to="/signup" className="hidden sm:inline-block">
            <PrimaryButton className="h-9 px-6 text-xs uppercase tracking-widest">
              Join Now
            </PrimaryButton>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-gold/10 bg-pearl dark:bg-ebony pt-10">
              <nav className="flex flex-col gap-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Theme</span>
                  <ThemeToggle variant="switch" size="md" />
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-lg font-serif font-medium hover:text-gold transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <PrimaryButton className="w-full">
                    Join Now
                  </PrimaryButton>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navigation
