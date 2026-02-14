import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#1a1813] pt-24 pb-12 px-6 md:px-20 border-t border-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Logo className="h-10 w-auto" />
              <h2 className="text-xl font-serif font-bold tracking-widest uppercase text-black dark:text-white">Pixfolio</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              Fine art wedding photography for global celebrations of love. Available for travel worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-black dark:text-white">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link className="hover:text-gold transition-colors" to="/">Home</Link></li>
              <li><Link className="hover:text-gold transition-colors" to="/demo">Demo</Link></li>
              <li><Link className="hover:text-gold transition-colors" to="/pricing">Pricing</Link></li>
              <li><Link className="hover:text-gold transition-colors" to="/login">Sign In</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-black dark:text-white">Connect</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><a className="hover:text-gold transition-colors" href="#">Instagram</a></li>
              <li><a className="hover:text-gold transition-colors" href="#">Pinterest</a></li>
              <li><a className="hover:text-gold transition-colors" href="#">Vimeo</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-black dark:text-white">Inquiries</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">studio@pixfolio.com</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">+1 (555) 892-0123</p>
          </div>
        </div>
        <div className="border-t border-gold/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest">© {new Date().getFullYear()} Pixfolio Studio. All Rights Reserved.</p>
          <div className="flex gap-8 text-xs text-gray-400 uppercase tracking-widest">
            <Link className="hover:text-gold transition-colors" to="/privacy">Privacy</Link>
            <Link className="hover:text-gold transition-colors" to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
