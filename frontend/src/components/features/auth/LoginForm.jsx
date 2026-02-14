import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { AuthCard } from '@/components/custom/AuthCard'
import { FormInput } from '@/components/custom/FormInput'
import { PrimaryButton } from '@/components/custom/PrimaryButton'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { loginUser } from '@/services/api'
import { Loader2, AlertCircle } from 'lucide-react'

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

    const footerContent = (
        <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-gold hover:text-gold/80 transition-colors">
                    Sign up for free
                </Link>
            </p>
        </div>
    )

    return (
        <AuthCard
            title="Welcome Back"
            description="Sign in to your artistic portal"
            footer={footerContent}
        >
            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 top-[2.1rem]">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <FormInput
                            id="email"
                            name="email"
                            type="email"
                            label="Email address"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 top-[2.1rem]">
                            <Lock className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <FormInput
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            autoComplete="current-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="pl-10 pr-10"
                            placeholder="Enter your password"
                        />
                        <div className="absolute inset-y-0 right-0 pr-0 flex items-center top-[1.6rem]">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPassword(!showPassword)}
                                className="h-9 w-9 p-0 hover:bg-transparent"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember-me"
                            checked={formData.rememberMe}
                            onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked })}
                        />
                        <Label htmlFor="remember-me" className="text-sm cursor-pointer">
                            Remember me
                        </Label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-gold hover:text-gold/80 hover:underline transition-colors">
                            Forgot password?
                        </a>
                    </div>
                </div>

                <PrimaryButton
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Signing in...
                        </div>
                    ) : (
                        'Sign in'
                    )}
                </PrimaryButton>
            </form>
        </AuthCard>
    )
}

export default LoginForm
