import React, { useEffect, useState } from 'react'
import CreateAccountForm from '../components/CreateAccountForm'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const Signup = () => {
  const [accountType, setAccountType] = useState('photographer')

  useEffect(() => {
    const linkManrope = document.createElement('link')
    linkManrope.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap'
    linkManrope.rel = 'stylesheet'
    document.head.appendChild(linkManrope)

    const linkPlayfair = document.createElement('link')
    linkPlayfair.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap'
    linkPlayfair.rel = 'stylesheet'
    document.head.appendChild(linkPlayfair)

    return () => { }
  }, [])

  return (
    <div className="bg-background-light text-slate-900 min-h-screen flex flex-col items-center justify-center p-6 md:p-12 font-display relative selection:bg-primary/20">
      {/* Background elements */}
      <div className="fixed top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]"></div>
      </div>

      {/* Header / Logo */}
      <header className="fixed top-8 left-0 w-full px-8 md:px-12 flex justify-between items-center z-20">
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="size-6 text-primary group-hover:scale-105 transition-transform flex items-center justify-center">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
            </svg>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight luxury-tracking uppercase font-display hidden sm:block" style={{ letterSpacing: '0.15em' }}>Pixfolio</h1>
        </Link>

        <div className="flex items-center gap-4">
          {/* Subtle Toggle for Account Type */}
          <div className="flex bg-slate-200/50 rounded-full p-1 backdrop-blur-sm mr-2 md:mr-6">
            <button
              onClick={() => setAccountType('photographer')}
              className={cn(
                "text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300",
                accountType === 'photographer'
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Photographer
            </button>
            <button
              onClick={() => setAccountType('lab')}
              className={cn(
                "text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300",
                accountType === 'lab'
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              Photo Lab
            </button>
          </div>

          <Link to="/login" className="text-xs font-semibold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors hidden sm:block">
            Sign In
          </Link>
        </div>
      </header>

      <CreateAccountForm accountType={accountType} />

      {/* Footer */}
      <footer className="fixed bottom-6 left-0 w-full px-12 flex justify-center text-[10px] uppercase tracking-[0.3em] text-slate-400 font-light z-10 pointer-events-none text-center">
        © 2024 Pixfolio {accountType === 'lab' ? '• Professional Photographic Standards' : 'Collective'}
      </footer>
    </div>
  )
}

export default Signup
