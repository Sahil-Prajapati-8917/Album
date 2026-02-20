import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { loginUser } from '@/services/api'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
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
                <Alert variant="destructive" className="mb-6 rounded-md border-destructive/20 bg-destructive/10 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium text-xs ml-2">{error}</AlertDescription>
                </Alert>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-background border-input"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="pr-10 bg-background border-input"
                                placeholder="********"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-primary-foreground font-medium rounded-md shadow"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Please wait
                            </div>
                        ) : (
                            'Login'
                        )}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground mt-4">
                        Don't have an account?{" "}
                        <Link to="/signup" className="underline underline-offset-4 hover:text-primary">
                            Sign up
                        </Link>
                    </div>

                    <div className="text-center text-xs text-muted-foreground mt-4 pt-4 border-t">
                        By clicking login, you agree to our{" "}
                        <a href="/terms" className="underline underline-offset-4 hover:text-primary">Terms of Service</a>{" "}
                        and{" "}
                        <a href="/privacy" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
