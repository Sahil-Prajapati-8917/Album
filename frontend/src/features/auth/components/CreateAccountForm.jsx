import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { registerUser } from '@/services/api'

const CreateAccountForm = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        accountType: 'photographer',

        // Shared
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        city: '',
        state: '',

        // Photographer Fields
        fullName: '',
        studioName: '',
        specialty: '',

        // Lab Fields
        labName: '',
        ownerName: '',
        teamSize: '',
        photographersServed: '',
        gstNumber: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target

        if (name === 'phoneNumber') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10)
            setFormData(prev => ({ ...prev, [name]: numericValue }))
            return
        }

        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            setIsLoading(false)
            return
        }

        try {
            const baseData = {
                accountType: formData.accountType,
                email: formData.email,
                password: formData.password,
                mobileNumber: formData.phoneNumber,
                city: formData.city,
                state: formData.state,
                address: `${formData.city}, ${formData.state}` // Fallback for old code
            }

            let finalData = {}
            if (formData.accountType === 'photographer') {
                finalData = {
                    ...baseData,
                    personalName: formData.fullName,
                    studioName: formData.studioName,
                    specialty: formData.specialty,
                }
            } else {
                finalData = {
                    ...baseData,
                    personalName: formData.ownerName,
                    ownerName: formData.ownerName,
                    studioName: formData.labName,
                    teamSize: formData.teamSize,
                    photographersServed: formData.photographersServed,
                    gstNumber: formData.gstNumber,
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

    const isPhotographer = formData.accountType === 'photographer'

    return (
        <div className="w-full">
            {error && (
                <Alert variant="destructive" className="mb-6 rounded-md border-destructive/20 bg-destructive/10 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium text-xs ml-2">{error}</AlertDescription>
                </Alert>
            )}

            <Tabs
                defaultValue="photographer"
                className="w-full mb-6"
                onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, accountType: value }))
                    setError('')
                }}
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="photographer">Creator</TabsTrigger>
                    <TabsTrigger value="lab">Photo Lab</TabsTrigger>
                </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">

                {/* Dynamic Name Fields based on Account Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="nameInput" className="text-sm font-medium">
                            {isPhotographer ? "Full Name" : "Owner Name"} <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="nameInput"
                            name={isPhotographer ? "fullName" : "ownerName"}
                            required
                            value={isPhotographer ? formData.fullName : formData.ownerName}
                            onChange={handleInputChange}
                            placeholder={isPhotographer ? "John Doe" : "Jane Smith"}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="studioInput" className="text-sm font-medium">
                            {isPhotographer ? "Studio Name" : "Lab Name"} {!isPhotographer && <span className="text-destructive">*</span>}
                        </Label>
                        <Input
                            id="studioInput"
                            name={isPhotographer ? "studioName" : "labName"}
                            required={!isPhotographer}
                            value={isPhotographer ? formData.studioName : formData.labName}
                            onChange={handleInputChange}
                            placeholder={isPhotographer ? "Lens Studio (Optional)" : "Pro Photo Lab"}
                        />
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email <span className="text-destructive">*</span></Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number <span className="text-destructive">*</span></Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            required
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            maxLength={10}
                            placeholder="Enter 10-digit number"
                        />
                    </div>
                </div>

                {/* Photographer Specifics */}
                {isPhotographer && (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Photography Specialty</Label>
                        <Select onValueChange={(v) => handleSelectChange('specialty', v)} value={formData.specialty}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select primary specialty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="wedding">Wedding Photography</SelectItem>
                                <SelectItem value="portrait">Portrait & Headshots</SelectItem>
                                <SelectItem value="real-estate">Real Estate</SelectItem>
                                <SelectItem value="event">Event Photography</SelectItem>
                                <SelectItem value="other">Other / Multiple</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                {/* Lab Specifics */}
                {!isPhotographer && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Team Size</Label>
                            <Select onValueChange={(v) => handleSelectChange('teamSize', v)} value={formData.teamSize}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select team size" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1-5">1-5 Members</SelectItem>
                                    <SelectItem value="6-20">6-20 Members</SelectItem>
                                    <SelectItem value="21-50">21-50 Members</SelectItem>
                                    <SelectItem value="50+">50+ Members</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Photographers Served</Label>
                            <Select onValueChange={(v) => handleSelectChange('photographersServed', v)} value={formData.photographersServed}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Estimated clients" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1-50">1-50 Photographers</SelectItem>
                                    <SelectItem value="51-200">51-200 Photographers</SelectItem>
                                    <SelectItem value="200+">200+ Photographers</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium">City</Label>
                        <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Enter city"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium">State</Label>
                        <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="Enter state"
                        />
                    </div>
                </div>

                {/* GST for Labs Only */}
                {!isPhotographer && (
                    <div className="space-y-2">
                        <Label htmlFor="gstNumber" className="text-sm font-medium">GST Number (Optional)</Label>
                        <Input
                            id="gstNumber"
                            name="gstNumber"
                            value={formData.gstNumber}
                            onChange={handleInputChange}
                            placeholder="Enter GST Number"
                        />
                    </div>
                )}

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">Password <span className="text-destructive">*</span></Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                className="pr-10"
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
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password <span className="text-destructive">*</span></Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="pr-10"
                                placeholder="********"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
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
                            'Create Account'
                        )}
                    </Button>
                </div>
            </form>
            <div className="text-center text-xs text-muted-foreground mt-4 pt-4 border-t">
                By creating an account, you agree to our{" "}
                <a href="/terms" className="underline underline-offset-4 hover:text-primary">Terms of Service</a>{" "}
                and{" "}
                <a href="/privacy" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
            </div>
        </div>
    )
}

export default CreateAccountForm
