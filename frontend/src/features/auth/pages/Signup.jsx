import React from 'react'
import CreateAccountForm from '../components/CreateAccountForm'
import { Link, useLocation } from 'react-router-dom'
import { ChevronLeft, GripHorizontal, Compass } from 'lucide-react'
import { cn } from '@/lib/utils'

const AuthContainer = ({ children, title, subtitle }) => {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] font-sans relative overflow-hidden">
      {/* Background Topographic Pattern overlay (optional subtle texture) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 Q 50 90 90 10" stroke="black" fill="none"/></svg>')`, backgroundSize: '150px' }}
      />

      {/* Top Left Nav */}
      <div className="absolute top-8 left-8 z-10 flex gap-4">
        <Link to="/" className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors">
          <ChevronLeft className="h-5 w-5 text-gray-700" strokeWidth={1.5} />
        </Link>
        <button className="flex h-12 w-[72px] items-center justify-center rounded-2xl bg-white shadow-sm hover:bg-gray-50 transition-colors">
          <GripHorizontal className="h-5 w-5 text-gray-700" strokeWidth={1.5} />
        </button>
      </div>

      {/* Main Card */}
      <div className="m-4 md:m-8 lg:m-12 flex flex-1 overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-white shadow-2xl z-10 relative">

        {/* Top Right Location Button (Visible on large screens) */}
        <div className="absolute top-8 right-8 z-20 hidden lg:flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 shadow-sm">
          <span className="text-sm font-medium">🇨🇦 Canada</span>
        </div>

        {/* Left Section (Form) */}
        <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col pt-24 pb-12 px-8 md:px-16 xl:px-24 overflow-y-auto custom-scrollbar">

          <div className="max-w-md w-full mx-auto flex flex-col">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Join Explore</h1>
              <p className="text-gray-500 font-medium">This is the start of something good.</p>
            </div>

            {/* Auth Toggle */}
            <div className="flex p-1 bg-gray-100 rounded-full mb-10 mx-auto w-fit">
              <Link to="/signup" className={cn("px-8 py-2.5 rounded-full text-sm font-semibold transition-all", !isLogin ? "bg-black text-black shadow-md" : "text-gray-500 hover:text-gray-900")}>
                Register
              </Link>
              <Link to="/login" className={cn("px-8 py-2.5 rounded-full text-sm font-semibold transition-all", isLogin ? "bg-black text-black shadow-md" : "text-gray-500 hover:text-gray-900")}>
                Login
              </Link>
            </div>

            {/* Social Logins */}
            <div className="flex justify-center gap-4 mb-8">
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 transition-colors shadow-sm">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-black hover:bg-gray-800 transition-colors shadow-sm">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.437.987 3.96.948 1.637-.026 2.62-1.496 3.604-2.947 1.139-1.683 1.605-3.313 1.622-3.396-.033-.013-3.15-.121-3.184-3.593-.028-2.903 2.378-4.322 2.493-4.39-1.353-1.98-3.411-2.227-4.15-2.261-1.928-.205-3.791 1.124-4.773 1.124zm-.316-1.235c.846-1.04 1.417-2.486 1.262-3.92-1.238.05-2.736.837-3.605 1.876-.78.93-1.439 2.404-1.259 3.815 1.385.109 2.76-.69 3.602-1.771z" />
                </svg>
              </button>
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white border hover:bg-gray-50 transition-colors shadow-sm">
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                  </g>
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-sm text-gray-400 font-medium">or</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Render Form */}
            {children}

          </div>
        </div>

        {/* Right Section (Hero Image) */}
        <div className="hidden lg:flex flex-1 relative bg-gray-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden p-8 m-2">
          <img
            src="https://images.unsplash.com/photo-1518182170546-076616fdcbca?q=80&w=2938&auto=format&fit=crop"
            alt="Adventure Road"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          {/* Subtle gradient for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="relative h-full w-full flex flex-col justify-end pb-12 px-8">
            <h2 className="text-black text-4xl xl:text-5xl font-bold leading-tight mb-4">
              Your next adventure<br />starts <span className="inline-block bg-[#B2D8D8] text-teal-900 px-4 py-1 rounded-full italic transform -rotate-2">here</span>
            </h2>
            <p className="text-black text-lg max-w-md mb-12">
              Discover the best RV, camper van or travel trailer rental for your next vacation.
            </p>

            {/* Destinations Pills */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-1">
                <Compass className="h-4 w-4" /> Destinations
              </div>
              <div className="flex flex-wrap gap-3">
                {['Banff', 'Yasper', 'Pacific Rim', 'Gwaii Haanas'].map((dest, i) => (
                  <div key={i} className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-black/60 transition-colors cursor-pointer">
                    <div className={cn("w-2 h-2 rounded-full", ["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"][i])}></div>
                    {dest}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

const Signup = () => {
  return (
    <AuthContainer>
      <div className="w-full">
        <CreateAccountForm />
      </div>
    </AuthContainer>
  )
}

export default Signup
