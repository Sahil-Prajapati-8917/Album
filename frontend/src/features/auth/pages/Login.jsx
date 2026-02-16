import React from 'react'
import LoginForm from '../components/LoginForm'
import { LayoutGrid, ShieldCheck, Lock, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Reusable Cinematic Background for Auth Pages
const AuthBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-zinc-50">
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0],
        x: ['-2%', '2%', '-2%'],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.1)_0%,transparent_50%)] blur-[120px]"
    />
    <motion.div
      animate={{
        scale: [1.1, 1, 1.1],
        rotate: [0, -5, 0],
        x: ['2%', '-2%', '2%'],
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_70%_70%,rgba(245,158,11,0.08)_0%,transparent_50%)] blur-[120px]"
    />
    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
  </div>
)

const Login = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4 lg:p-0">
      <AuthBackground />

      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="fixed top-4 left-4 lg:top-8 lg:left-8 group flex items-center gap-2.5 lg:gap-3 px-4 py-2 lg:px-5 lg:py-2.5 rounded-full border border-zinc-200 bg-white/60 backdrop-blur-md hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-500 shadow-sm z-[100]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold">Back to Home</span>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-zinc-900 text-white border-zinc-800 rounded-lg px-3 py-1.5 shadow-xl font-bold uppercase tracking-widest text-[10px]">
          Return to Landing Page
        </TooltipContent>
      </Tooltip>

      <div className="w-full max-w-6xl min-h-[min(800px,90vh)] lg:h-[min(800px,90vh)] bg-white rounded-[40px] shadow-2xl shadow-zinc-200/50 flex flex-col lg:flex-row overflow-hidden relative z-10 border border-zinc-100">
        {/* Left Column: Brand & Visuals */}
        <div className="hidden lg:flex w-[45%] flex-col justify-between relative h-full bg-zinc-900 p-12 text-white overflow-hidden">
          {/* Animated Background for Dark Column */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex items-center gap-4"
          >
            <div className="size-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-white/20">
              <LayoutGrid className="size-7 text-zinc-900" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight block leading-none">Pixfolio</span>
              <span className="text-[11px] font-bold tracking-[0.3em] text-zinc-500 uppercase mt-1 block">Enterprise Room</span>
            </div>
          </motion.div>

          <div className="relative z-10 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold leading-[1.1] mb-6">
                Capture the <span className="text-zinc-500 italic font-serif">Perfect</span> Workflow.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">
                Join 10k+ professional photographers managing their legacy with Pixfolio.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-8"
            >
              <div className="space-y-1">
                <p className="text-3xl font-black">99.9%</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Global Uptime</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black">24/7</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Expert Support</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[32px]"
          >
            <p className="text-zinc-300 leading-relaxed font-medium mb-6 italic">
              "The real-time analytics have completely changed how we make decisions. We're catching issues before they become problems."
            </p>
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 font-bold text-sm">
                MR
              </div>
              <div>
                <p className="font-bold text-sm">Maria Rodriguez</p>
                <p className="text-xs text-zinc-500">Operations Director, BioPharm</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Auth Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 bg-white relative overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <div className="mb-10">
              <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-3">Welcome Back</h1>
              <p className="text-zinc-500 font-medium">Continue your visual journey with Pixfolio.</p>
            </div>

            <LoginForm />

            <div className="mt-10 pt-8 border-t border-zinc-100 text-center">
              <p className="text-sm text-zinc-500 font-medium">
                Don't have an account?{" "}
                <Link to="/signup" className="text-zinc-900 font-bold hover:underline underline-offset-4 ml-1">
                  Create Account
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Security Footer */}
          <div className="mt-8 flex justify-center gap-8 text-[10px] text-zinc-400 font-bold uppercase tracking-widest pb-6 lg:pb-0 lg:absolute lg:bottom-8 lg:left-0 lg:right-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-3.5" />
              <span>AES-256 Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="size-3.5" />
              <span>SOC2 Type II</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

