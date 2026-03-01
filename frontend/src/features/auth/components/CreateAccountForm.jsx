import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { Alert, AlertDescription } from '@/shared/ui/alert'
import { registerUser } from '@/shared/api/api'
import { cn } from '@/lib/utils'
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Label } from "@/shared/ui/label"
import { Checkbox } from "@/shared/ui/checkbox"

const CreateAccountForm = ({ accountType, setAccountType }) => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        // Shared
        mobile: '',
        email: '',
        password: '',
        confirm_password: '',
        terms: false,

        // Photographer Fields
        full_name: '',
        studio_name: '',

        // Lab Fields
        labName: '',
        ownerName: '',
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target

        if (name === 'mobile') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10)
            setFormData(prev => ({ ...prev, [name]: numericValue }))
            return
        }

        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        if (formData.password !== formData.confirm_password) {
            setError('Passwords do not match')
            setIsLoading(false)
            return
        }

        if (!formData.terms) {
            setError('Please accept the terms and conditions')
            setIsLoading(false)
            return
        }

        try {
            const baseData = {
                accountType: accountType,
                email: formData.email,
                password: formData.password,
                mobileNumber: formData.mobile,
                // Provide empty defaults to satisfy backend schemas if they expect strings
                country: '',
                state: '',
                city: '',
                district: '',
                address: ''
            }

            let finalData = {}
            if (accountType === 'photographer') {
                finalData = {
                    ...baseData,
                    personalName: formData.full_name,
                    studioName: formData.studio_name,
                }
            } else {
                finalData = {
                    ...baseData,
                    personalName: formData.ownerName,
                    ownerName: formData.ownerName,
                    studioName: formData.labName,
                    // Provide defaults for removed lab fields
                    teamSize: '1-5',
                    photographersServed: '1-50',
                    gstNumber: '',
                }
            }

            const response = await registerUser(finalData)

            if (response.success) {
                navigate('/dashboard')
            } else {
                setError(response.message || 'Registration failed')
            }
        } catch (err) {
            setError(err.message || 'An error occurred during registration')
        } finally {
            setIsLoading(false)
        }
    }

    const isPhotographer = accountType === 'photographer'

    return (
        <div className="w-full flex flex-col z-10 pt-2 lg:pt-0">
            {/* Header Section */}
            <div className="space-y-2 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-block bg-muted text-muted-foreground text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    Create Account
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    {isPhotographer ? "Elevate your portfolio" : "Establish your lab"}
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[320px]">
                    {isPhotographer ? "Join the exclusive collective of world-class photographers." : "Join the exclusive network of professional labs."}
                </p>
            </div>

            {error && (
                <Alert variant="destructive" className="max-w-[420px] w-full mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium text-sm ml-2">{error}</AlertDescription>
                </Alert>
            )}

            <div className="w-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Account Type Selector */}
                    <div className={cn("flex flex-col gap-3 mb-6", isPhotographer ? "" : "border-b pb-6")}>
                        <div className="flex bg-muted p-1 rounded-lg">
                            <button
                                type="button"
                                onClick={() => setAccountType('photographer')}
                                className={cn(
                                    "flex-1 text-sm font-semibold py-2 rounded-md transition-all duration-200",
                                    accountType === 'photographer'
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                Photographer
                            </button>
                            <button
                                type="button"
                                onClick={() => setAccountType('lab')}
                                className={cn(
                                    "flex-1 text-sm font-semibold py-2 rounded-md transition-all duration-200",
                                    accountType === 'lab'
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                Lab
                            </button>
                        </div>
                    </div>

                    {isPhotographer ? (
                        <div className="space-y-4">
                            {/* Photographer Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input
                                        id="full_name" type="text" name="full_name" required value={formData.full_name} onChange={handleInputChange} autoComplete="name" placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="studio_name">Studio Name (Optional)</Label>
                                    <Input
                                        id="studio_name" type="text" name="studio_name" value={formData.studio_name} onChange={handleInputChange} placeholder="JD Studios"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email" type="email" name="email" required value={formData.email} onChange={handleInputChange} autoComplete="email" placeholder="name@domain.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mobile">Mobile Number</Label>
                                    <Input
                                        id="mobile" type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} autoComplete="tel" placeholder="9876543210"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Lab Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="labName">Lab Name</Label>
                                    <Input
                                        id="labName" type="text" name="labName" required value={formData.labName} onChange={handleInputChange} autoComplete="organization" placeholder="The Alchemist Lab"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ownerName">Owner Full Name</Label>
                                    <Input
                                        id="ownerName" type="text" name="ownerName" required value={formData.ownerName} onChange={handleInputChange} autoComplete="name" placeholder="Julian Vane"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email" type="email" name="email" required value={formData.email} onChange={handleInputChange} autoComplete="email" placeholder="contact@lab.co"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mobile">Mobile Number</Label>
                                    <Input
                                        id="mobile" type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} autoComplete="tel" placeholder="9876543210"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Shared Password Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2 relative">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative flex items-center">
                                <Input
                                    id="password" type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleInputChange} autoComplete="new-password" placeholder="••••••••" className="pr-10"
                                />
                                <button type="button" className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2 relative">
                            <Label htmlFor="confirm_password">Confirm Password</Label>
                            <div className="relative flex items-center">
                                <Input
                                    id="confirm_password" type={showConfirmPassword ? "text" : "password"} name="confirm_password" required value={formData.confirm_password} onChange={handleInputChange} autoComplete="new-password" placeholder="••••••••" className="pr-10"
                                />
                                <button type="button" className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox 
                            id="terms" 
                            name="terms" 
                            checked={formData.terms} 
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, terms: checked }))} 
                        />
                        <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            I accept the <Link to="/term" className="text-foreground hover:underline font-medium transition-colors">Terms & Conditions</Link>
                        </Label>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                        <Button type="submit" disabled={isLoading} className="w-full py-6 text-base shadow-sm">
                            {isLoading ? (
                                <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Creating account...</>
                            ) : (
                                isPhotographer ? "Create Professional Account" : "Create Lab Account"
                            )}
                        </Button>
                    </div>
                </form>

                <div className="text-center mt-8">
                    <p className="text-sm text-muted-foreground">
                        {isPhotographer ? "Already part of the collective? " : "Already a member? "}
                        <Link to="/login" className="text-foreground font-semibold hover:underline transition-colors">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CreateAccountForm