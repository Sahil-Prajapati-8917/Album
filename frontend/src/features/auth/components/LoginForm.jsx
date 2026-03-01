import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { Alert, AlertDescription } from '@/shared/ui/alert'
import { loginUser } from '@/shared/api/api'
import { cn } from '@/lib/utils'
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Label } from "@/shared/ui/label"

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
            <form className="space-y-6" onSubmit={handleSubmit}>
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <Alert variant="destructive" className="mb-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="font-medium text-sm ml-2">
                                    {error === 'User not found' ? (
                                        <div className="flex flex-col gap-1">
                                            <span>This account doesn't exist.</span>
                                            <Link to="/signup" className="text-foreground font-medium hover:underline flex items-center gap-1">
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

                <div className="space-y-4">
                    {/* Email/Mobile Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="username"
                            placeholder="name@domain.com"
                            type="text"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2 relative">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="password">
                                Password
                            </Label>
                            <Link to="/forgot-password" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        <div className="relative flex items-center">
                            <Input
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                className="pr-10"
                                required
                            />
                            <button
                                className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Primary Action */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-6 text-base shadow-sm"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </div>

                <div className="text-center pt-2">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-foreground font-semibold hover:underline transition-colors">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </form>
        </motion.div>
    )
}

export default LoginForm