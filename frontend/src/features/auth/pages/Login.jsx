import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'

const Login = () => {
  useEffect(() => {
    const linkSymbols = document.createElement('link')
    linkSymbols.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
    linkSymbols.rel = 'stylesheet'
    document.head.appendChild(linkSymbols)

    return () => {
      if (linkSymbols.parentNode) document.head.removeChild(linkSymbols)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 text-slate-900 selection:bg-primary/20">
      <div className="bg-white rounded-[2rem] shadow-sm flex w-full max-w-[1200px] min-h-[700px] overflow-hidden border border-slate-100 relative">

        {/* Left Form Area */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col relative z-10">

          {/* Top Navigation Bar inside Card */}
          <div className="w-full flex justify-between items-center mb-16">
            <Link to="/" className="flex items-center gap-3 cursor-pointer group">
              <div className="size-6 text-black group-hover:scale-105 transition-transform flex items-center justify-center">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"></path>
                </svg>
              </div>
              <span className="text-[20px] font-bold tracking-tight text-black">Pixfolio</span>
            </Link>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="w-full max-w-[400px] space-y-8 animate-fade-in mx-auto ml-0">
              {/* Branding & Title */}
              <div className="space-y-3">
                <div className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                  Welcome Back
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Sign in to your account</h1>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[320px]">Enter your details below to access your workspace and manage your portfolio.</p>
              </div>

              {/* Form Component */}
              <LoginForm />
            </div>
          </div>

          <div className="mt-auto pt-8">
            <div className="flex items-center gap-2">
              {/* Small Avatars Stacked Example */}
              <div className="flex -space-x-2">
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Join 1000+ professionals</span>
            </div>
          </div>

        </div>

        {/* Right Image Area */}
        <div className="hidden lg:block w-1/2 relative bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Mountain Landscape"
            className="absolute inset-0 w-full h-full object-cover rounded-r-[2rem]"
          />
          {/* Subtle overlay gradient if needed for text over image, though figma didn't have one */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-r-[2rem]"></div>
        </div>
      </div>
    </div>
  )
}

export default Login
