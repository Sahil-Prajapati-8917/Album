import React, { useEffect, useState } from 'react'
import CreateAccountForm from '../components/CreateAccountForm'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

const Signup = () => {
  const [accountType, setAccountType] = useState('photographer')

  useEffect(() => {
    return () => { }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-8 text-slate-900 dark:text-slate-100 selection:bg-primary/15">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-black/5 dark:shadow-black/30 flex w-full max-w-[1200px] min-h-[700px] max-h-[90vh] overflow-hidden border border-slate-200/80 dark:border-slate-800 relative">

        {/* Left Form Area (Scrollable if needed) */}
        <div className="w-full lg:w-1/2 flex flex-col relative z-10 overflow-y-auto custom-scrollbar">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col min-h-full">
            {/* Top Navigation Bar inside Card */}
            <div className="w-full flex justify-between items-center mb-10">
              <Link to="/" className="flex items-center gap-3 cursor-pointer group">
                <div className="size-6 text-slate-900 dark:text-white group-hover:scale-105 transition-transform flex items-center justify-center">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                  </svg>
                </div>
                <span className="text-[20px] font-bold tracking-tight text-slate-900 dark:text-white">Pixfolio</span>
              </Link>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="w-full max-w-[420px] animate-fade-in mx-auto ml-0">
                <CreateAccountForm accountType={accountType} setAccountType={setAccountType} />
              </div>
            </div>

            {/* Footer Text */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                Join the {accountType === 'lab' ? 'Professional Photographic Standards' : 'exclusive collective'}.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="hidden lg:block w-1/2 relative bg-slate-100 dark:bg-slate-800">
          <img
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Photography Setup"
            className="absolute inset-0 w-full h-full object-cover rounded-r-[2rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-r-[2rem]"></div>
        </div>

      </div>

      {/* Global minimal custom scrollbar style for this page if needed, or rely on global index.css */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>
    </div>
  )
}

export default Signup
