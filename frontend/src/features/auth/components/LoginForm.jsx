import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
        <motion.div
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
        >
            <form className="space-y-8" onSubmit={handleSubmit}>
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <Alert variant="destructive" className="mb-2 rounded-xl border-none bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 shadow-sm">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="font-medium text-sm ml-2">
                                    {error === 'User not found' ? (
                                        <div className="flex flex-col gap-1">
                                            <span>This account doesn't exist.</span>
                                            <Link to="/signup" className="text-slate-900 dark:text-white font-bold hover:underline flex items-center gap-1">
                                                Create a free account instead?
                                            </Link>
                                        </div>
                                    ) : (
                                        error
                                    )}
                                </AlertDescription>
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="space-y-6">
                    {/* Email/Mobile Field */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Email Address
                        </label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="username"
                            className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-600 focus:ring-0 focus:border-slate-900 dark:focus:border-white px-0 py-2.5 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-300 text-slate-900 dark:text-white outline-none"
                            placeholder="name@domain.com"
                            type="text"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5 relative">
                        <div className="flex justify-between items-center">
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                Password
                            </label>
                            <Link to="/forgot-password" className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        <div className="relative flex items-center">
                            <input
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-600 focus:ring-0 focus:border-slate-900 dark:focus:border-white px-0 py-2.5 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-300 text-slate-900 dark:text-white outline-none pr-8"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                required
                            />
                            <button
                                className="absolute right-0 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors focus:outline-none pb-1"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span className="material-symbols-outlined text-lg">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>



                {/* Primary Action */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            "w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-medium py-3 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 text-sm shadow-sm hover:shadow-md",
                            isLoading && "opacity-80 pointer-events-none"
                        )}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </button>
                </div>

                <div className="text-center pt-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-slate-900 dark:text-white font-semibold hover:underline transition-all duration-300">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </form>
        </motion.div>
    )
}

export default LoginForm
