import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle, Check } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { loginUser } from '@/services/api'
import { cn } from '@/lib/utils'

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
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
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
        <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-[#000000] mb-2">
                    Join Explore
                </h1>
                <p className="text-[15px] text-[#666666] font-medium">
                    This is the start of something good.
                </p>
            </div>

            {error && (
                <Alert variant="destructive" className="mb-6 rounded-2xl border-none bg-red-50 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium text-sm ml-2">{error}</AlertDescription>
                </Alert>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-[#999999] uppercase tracking-wide ml-1">Username / Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#F1F1F1] border-transparent focus:border-black focus:ring-1 focus:ring-black rounded-2xl px-5 py-4 text-[#111111] font-medium placeholder:text-[#CCCCCC] placeholder:font-normal outline-none transition-all"
                        placeholder="john.doe@example.com"
                    />
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center justify-between ml-1">
                        <label htmlFor="password" className="text-xs font-semibold text-[#999999] uppercase tracking-wide">Password</label>
                        <Link
                            to="/forgot-password"
                            className="text-xs font-semibold text-[#666666] hover:text-black transition-colors"
                        >
                            Forgot?
                        </Link>
                    </div>
                    <div className="relative flex items-center bg-[#F1F1F1] rounded-2xl focus-within:ring-1 focus-within:ring-black focus-within:bg-white transition-all overflow-hidden pr-3">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-transparent border-none px-5 py-4 text-[#111111] font-medium placeholder:text-[#CCCCCC] placeholder:font-normal outline-none"
                            placeholder="••••••••"
                        />

                        {/* Fake Password Strength Indicator (Visual only, to match dribbble) */}
                        {formData.password.length > 5 && (
                            <div className="hidden sm:flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-md mr-1 whitespace-nowrap">
                                <span className="text-[10px] font-bold uppercase tracking-wider">Strong</span>
                                <Check className="w-3 h-3" />
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-2 text-gray-400 hover:text-gray-800 transition-colors bg-white rounded-xl shadow-sm border border-gray-100 flex-shrink-0"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-1 ml-1 cursor-pointer group" onClick={() => setFormData(p => ({ ...p, rememberMe: !p.rememberMe }))}>
                    <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 border-2",
                        formData.rememberMe
                            ? "bg-black border-black text-white"
                            : "bg-white border-gray-300 group-hover:border-gray-400"
                    )}>
                        {formData.rememberMe && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-sm font-medium text-[#666666] group-hover:text-black transition-colors select-none">
                        Remember me
                    </span>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            "w-full bg-black text-white font-bold text-lg rounded-2xl py-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-gray-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black relative overflow-hidden",
                            isLoading && "opacity-80 pointer-events-none"
                        )}
                    >
                        {/* Decorative dotted pattern overlay to match dribbble button */}
                        <div className="absolute inset-0 opacity-[0.15]"
                            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '12px 12px' }}
                        />

                        <div className="relative flex items-center justify-center gap-2">
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Logging in...</span>
                                </>
                            ) : (
                                'Start your adventure'
                            )}
                        </div>
                    </button>

                    <div className="text-center text-xs text-gray-400 mt-6 font-medium">
                        By logging in, you agree to our{" "}
                        <a href="/terms" className="text-gray-600 hover:text-black hover:underline transition-colors">Terms of Service</a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-gray-600 hover:text-black hover:underline transition-colors">Privacy Policy</a>.
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
