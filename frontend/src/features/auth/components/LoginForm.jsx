import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, AlertCircle } from 'lucide-react'
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
        <form className="space-y-8" onSubmit={handleSubmit}>
            {error && (
                <Alert variant="destructive" className="mb-2 rounded-lg border-none bg-red-50 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium text-sm ml-2">{error}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-6">
                {/* Email/Mobile Field */}
                <div className="group">
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-2 group-focus-within:text-primary transition-colors">
                        Identity
                    </label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-0 border-b border-slate-200 focus:ring-0 focus:border-primary px-0 py-3 text-base placeholder:text-slate-300 transition-all duration-300 font-light text-slate-900"
                        placeholder="Email or Mobile Number"
                        type="text"
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="group relative">
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-2 group-focus-within:text-primary transition-colors">
                        Security
                    </label>
                    <div className="relative flex items-center">
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-transparent border-0 border-b border-slate-200 focus:ring-0 focus:border-primary px-0 py-3 text-base placeholder:text-slate-300 transition-all duration-300 font-light text-slate-900"
                            placeholder="Enter Password"
                            type={showPassword ? "text" : "password"}
                            required
                        />
                        <button
                            className="absolute right-0 text-slate-300 hover:text-primary transition-colors focus:outline-none"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <span className="material-symbols-outlined text-xl">
                                {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Auxiliary Controls */}
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                        <input
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="peer appearance-none w-4 h-4 rounded border border-slate-300 checked:bg-primary checked:border-primary transition-all cursor-pointer"
                            type="checkbox"
                        />
                        <span className="material-symbols-outlined text-[12px] text-white absolute hidden peer-checked:block pointer-events-none">check</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-xs font-medium text-primary/70 hover:text-primary transition-colors underline underline-offset-4">
                    Forgot Password?
                </Link>
            </div>

            {/* Primary Action */}
            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                        "w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-lg tracking-widest uppercase text-[11px] shadow-xl shadow-primary/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2",
                        isLoading && "opacity-80 pointer-events-none"
                    )}
                >
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isLoading ? 'ACCESSING SESSION' : 'ACCESS WORKSPACE'}
                </button>
            </div>

            <div className="text-center pt-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    Not part of the collective? <Link to="/signup" className="text-primary font-bold hover:underline">Apply Here</Link>
                </p>
            </div>
        </form>
    )
}

export default LoginForm
