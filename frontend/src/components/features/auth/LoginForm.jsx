import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle } from 'lucide-react'
import { FormInput } from '@/components/custom/FormInput'
import { PrimaryButton } from '@/components/custom/PrimaryButton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
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
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-[13px] font-medium text-zinc-700">Email address</Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                <Mail className="h-5 w-5" />
                            </div>
                            <FormInput
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-11 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm group-hover:border-zinc-300"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-[13px] font-medium text-zinc-700">Password</Label>
                            <a href="#" className="text-xs font-semibold text-zinc-900 hover:text-indigo-600 transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                <Lock className="h-4 w-4" />
                            </div>
                            <FormInput
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="pl-11 pr-11 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm tracking-widest placeholder:tracking-normal group-hover:border-zinc-300"
                                placeholder="••••••••"
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
                    <PrimaryButton
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-zinc-900 hover:bg-black text-white font-bold rounded-xl shadow-lg shadow-zinc-900/10 hover:shadow-zinc-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-[15px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Signing In...
                            </>
                        ) : (
                            <>
                                Sign In
                                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </PrimaryButton>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-zinc-500">
                            By signing in, you agree to our <Link to="/terms" className="underline hover:text-zinc-800">Terms</Link> and <Link to="/privacy" className="underline hover:text-zinc-800">Privacy Policy</Link>
                        </p>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <Button variant="ghost" className="text-zinc-500 hover:text-zinc-900 gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Try demo account
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
