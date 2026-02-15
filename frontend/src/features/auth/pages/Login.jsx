import React from 'react'
import LoginForm from '../components/LoginForm'
import { LayoutGrid, ShieldCheck, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Column: Brand & Social Proof (Dark) */}
      <div className="hidden lg:flex flex-col justify-between relative h-full w-full bg-zinc-900 p-12 text-white overflow-hidden">
        {/* Abstract Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="size-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10">
            <LayoutGrid className="size-6 text-zinc-900" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight block leading-none">Pixfolio</span>
            <span className="text-[10px] font-medium tracking-[0.2em] text-zinc-400 uppercase">Enterprise Suite</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="relative z-10 grid grid-cols-3 gap-8 py-12">
          <div>
            <p className="text-3xl font-bold tracking-tight">99.9%</p>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">Uptime</p>
          </div>
          <div>
            <p className="text-3xl font-bold tracking-tight">10k+</p>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">Photographers</p>
          </div>
          <div>
            <p className="text-3xl font-bold tracking-tight">50M+</p>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">Photos Delivered</p>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="relative z-10 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-8 rounded-2xl">
          <p className="text-lg text-zinc-200 leading-relaxed font-medium mb-6">
            "The real-time analytics have completely changed how we make decisions. We're catching issues before they become problems."
          </p>
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">
              MR
            </div>
            <div>
              <p className="font-bold text-white">Maria Rodriguez</p>
              <p className="text-sm text-zinc-400">Operations Director, BioPharm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Auth Form (Light) */}
      <div className="flex flex-col items-center justify-center p-6 bg-zinc-50/50 min-h-screen">
        <div className="w-full max-w-[550px] bg-white rounded-3xl shadow-xl shadow-zinc-200/50 p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">Welcome back</h1>
            <p className="text-zinc-500">Enter your credentials to access your workspace</p>
          </div>

          <LoginForm />

          <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
            <p className="text-sm text-zinc-500">
              New to Pixfolio?{" "}
              <Link to="/signup" className="font-semibold text-zinc-900 hover:text-zinc-700 inline-flex items-center group">
                Create account
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </p>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-8 flex items-center gap-6 text-xs text-zinc-400 font-medium">
          <div className="flex items-center gap-1.5 hover:text-zinc-600 transition-colors cursor-help">
            <ShieldCheck className="size-4" />
            <span>256-bit encryption</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-zinc-600 transition-colors cursor-help">
            <Lock className="size-3.5" />
            <span>SOC 2 Type II</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
