import React from 'react'
import { Link } from 'react-router-dom'

import { Separator } from '@/shared/ui/separator'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#12110e] pt-24 pb-12 px-6 md:px-20 border-t border-zinc-100 dark:border-zinc-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/Pixfolio_Logo.svg" alt="Pixfolio" className="h-10 w-auto" />
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xs text-sm">
              Crafting premium visual narratives for global celebrations. A sanctuary for artistic wedding photography.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold  [0.2em] text-[11px] text-zinc-400">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <li><Link className="hover:text-gold transition-colors duration-300" to="/">Home</Link></li>
              <li><Link className="hover:text-gold transition-colors duration-300" to="/demo">Demo</Link></li>
              <li><Link className="hover:text-gold transition-colors duration-300" to="/pricing">Pricing Plans</Link></li>
              <li><Link className="hover:text-gold transition-colors duration-300" to="/login">Sign In</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold  [0.2em] text-[11px] text-zinc-400">Connect</h4>
            <ul className="space-y-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <li><a className="hover:text-gold transition-colors duration-300" href="#">Instagram</a></li>
              <li><a className="hover:text-gold transition-colors duration-300" href="#">Pinterest</a></li>
              <li><a className="hover:text-gold transition-colors duration-300" href="#">Vimeo Showcase</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold  [0.2em] text-[11px] text-zinc-400">Inquiries</h4>
            <div className="space-y-4 text-sm font-bold text-zinc-900 dark:text-white  widest">
              <p className="cursor-pointer hover:text-gold transition-colors">studio@pixfolio.com</p>
              <p className="cursor-pointer hover:text-gold transition-colors">+1 (555) 892-0123</p>
            </div>
          </div>
        </div>

        <Separator className="bg-zinc-100 dark:bg-zinc-800/50 mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-zinc-400  [0.2em] font-medium">
            © {new Date().getFullYear()} Pixfolio Studio. All Rights Reserved.
          </p>
          <div className="flex gap-10 text-[10px] text-zinc-400  [0.2em] font-bold">
            <Link className="hover:text-zinc-900 dark:hover:text-white transition-colors" to="/privacy">Privacy Policy</Link>
            <Link className="hover:text-zinc-900 dark:hover:text-white transition-colors" to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
