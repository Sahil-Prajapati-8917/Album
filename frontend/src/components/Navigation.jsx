import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gold/10 bg-pearl/80 backdrop-blur-md dark:bg-ebony/80 px-6 md:px-20 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo className="h-10 w-auto group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-serif font-bold tracking-widest uppercase text-black dark:text-white">Pixfolio</h2>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link className="text-xs font-semibold uppercase tracking-widest hover:text-gold transition-colors" to="/">Home</Link>
          <Link className="text-xs font-semibold uppercase tracking-widest hover:text-gold transition-colors" to="/demo">Demo</Link>
          <Link className="text-xs font-semibold uppercase tracking-widest hover:text-gold transition-colors" to="/pricing">Pricing</Link>
          <Link className="text-xs font-semibold uppercase tracking-widest hover:text-gold transition-colors" to="/login">Sign In</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/signup" className="hidden sm:inline-block bg-gold text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gold/90 transition-all shadow-sm">
            Join Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black dark:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-pearl dark:bg-ebony border-b border-gold/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link
            className="text-sm font-semibold uppercase tracking-widest hover:text-gold transition-colors"
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="text-sm font-semibold uppercase tracking-widest hover:text-gold transition-colors"
            to="/demo"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Demo
          </Link>
          <Link
            className="text-sm font-semibold uppercase tracking-widest hover:text-gold transition-colors"
            to="/pricing"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-semibold uppercase tracking-widest hover:text-gold transition-colors"
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-gold text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-widest text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Join Now
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navigation
