import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { loginUser } from '@/services/api'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            await loginUser({
                email: formData.email,
                password: formData.password
            })
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full">
            {error && (
                <Alert variant="destructive" className="mb-6 rounded-xl border-destructive/20 bg-destructive/10 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium text-xs uppercase tracking-tight ml-2">{error}</AlertDescription>
                </Alert>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Email address</Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                <Mail className="h-5 w-5" />
                            </div>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-11 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm group-hover:border-zinc-300 text-base"
                                placeholder="Enter your email address"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Password</Label>
                            <a href="#" className="text-xs font-bold text-zinc-900 hover:text-gold transition-colors uppercase tracking-widest">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                <Lock className="h-4 w-4" />
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="pl-11 pr-11 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm tracking-widest placeholder:tracking-normal group-hover:border-zinc-300 text-base"
                                placeholder="Enter your password"
                            />
                            <div className="absolute inset-y-0 right-0 pr-0 flex items-center">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="h-9 w-9 p-0 mr-1 hover:bg-transparent text-zinc-400 hover:text-zinc-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-indigo-600 hover:to-blue-600 text-black font-bold rounded-xl shadow-lg shadow-zinc-900/10 hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-2 text-[15px] uppercase tracking-widest"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Sign In to Pixfolio
                                        <ChevronRight className="w-5 h-5 ml-1" />
                                    </>
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-zinc-900 text-white border-zinc-800 rounded-lg px-3 py-1.5 shadow-xl font-bold uppercase tracking-widest text-[10px] mb-2">
                            Securely access your account
                        </TooltipContent>
                    </Tooltip>

                    <div className="mt-8 text-center pt-4 border-t border-zinc-100">
                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">
                            Secured and Encrypted Access
                        </p>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" className="text-black hover:text-zinc-900 gap-2 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-zinc-100">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Explore as Guest
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="bg-zinc-900 text-white border-zinc-800 rounded-lg px-3 py-1.5 shadow-xl font-bold uppercase tracking-widest text-[10px] mt-2">
                                Browse without an account
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
