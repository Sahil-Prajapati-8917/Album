import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'

const Login = () => {
  useEffect(() => {
    const linkManrope = document.createElement('link')
    linkManrope.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap'
    linkManrope.rel = 'stylesheet'
    document.head.appendChild(linkManrope)

    const linkPlayfair = document.createElement('link')
    linkPlayfair.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap'
    linkPlayfair.rel = 'stylesheet'
    document.head.appendChild(linkPlayfair)

    const linkSymbols = document.createElement('link')
    linkSymbols.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
    linkSymbols.rel = 'stylesheet'
    document.head.appendChild(linkSymbols)

    return () => { }
  }, [])

  return (
    <div className="bg-background-light text-slate-900 overflow-hidden h-screen w-screen flex flex-col font-display selection:bg-primary/20">
      {/* Top Navigation Bar */}
      <header className="w-full px-8 py-6 flex justify-between items-center absolute top-0 left-0 z-10">
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="text-primary group-hover:scale-105 transition-transform">
            <svg fill="none" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
            </svg>
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-primary">Pixfolio</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <a className="text-xs font-semibold tracking-widest uppercase text-slate-500 hover:text-primary transition-colors" href="#">System Status</a>
          <a className="text-xs font-semibold tracking-widest uppercase text-slate-500 hover:text-primary transition-colors" href="/privacy">Privacy</a>
        </div>
      </header>

      {/* Main Content Area: Massive Whitespace & Centered Form */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[420px] space-y-12 z-10 animate-fade-in">
          {/* Branding & Title */}
          <div className="text-center space-y-3">
            <h1 className="font-serif text-5xl text-slate-900 font-normal">Welcome back.</h1>
            <p className="text-slate-500 font-light tracking-wide text-sm">Enter your workspace to continue.</p>
          </div>

          {/* Form Component */}
          <LoginForm />

          {/* Bottom Security Indicator */}
          <div className="flex justify-center items-center gap-2 opacity-40">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-900">End-to-End Encrypted Session</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 absolute bottom-0 left-0 z-10">
        <div className="mb-4 md:mb-0">
          © 2024 Pixfolio Elite Portfolios.
        </div>
        <div className="flex gap-8">
          <a className="hover:text-primary transition-colors" href="#">Help Center</a>
          <a className="hover:text-primary transition-colors" href="/terms">Terms of Service</a>
        </div>
      </footer>

      {/* Abstract background element for luxury feel */}
      <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[60%] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
    </div>
  )
}

export default Login
