import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, AlertCircle, Check } from 'lucide-react'
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
import { cn } from '@/lib/utils'

const inputStyles = "w-full bg-[#F1F1F1] border-transparent focus:border-black focus:ring-1 focus:ring-black rounded-2xl px-5 py-3.5 text-[#111111] font-medium placeholder:text-[#CCCCCC] placeholder:font-normal outline-none transition-all"
const labelStyles = "text-xs font-semibold text-[#999999] uppercase tracking-wide ml-1"

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
                <Alert variant="destructive" className="mb-6 rounded-2xl border-none bg-red-50 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium text-sm ml-2">{error}</AlertDescription>
                </Alert>
            )}

            <Tabs
                defaultValue="photographer"
                className="w-full mb-8"
                onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, accountType: value }))
                    setError('')
                }}
            >
                <TabsList className="grid w-full grid-cols-2 bg-[#F1F1F1] rounded-2xl p-1 h-14">
                    <TabsTrigger value="photographer" className="rounded-xl text-[#777777] data-[state=active]:text-[#111111] data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold transition-all h-full">Creator</TabsTrigger>
                    <TabsTrigger value="lab" className="rounded-xl text-[#777777] data-[state=active]:text-[#111111] data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold transition-all h-full">Photo Lab</TabsTrigger>
                </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">

                {/* Dynamic Name Fields based on Account Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label htmlFor="nameInput" className={labelStyles}>
                            {isPhotographer ? "Full Name" : "Owner Name"} <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="nameInput"
                            name={isPhotographer ? "fullName" : "ownerName"}
                            required
                            value={isPhotographer ? formData.fullName : formData.ownerName}
                            onChange={handleInputChange}
                            placeholder={isPhotographer ? "John Doe" : "Jane Smith"}
                            className={inputStyles}
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="studioInput" className={labelStyles}>
                            {isPhotographer ? "Studio Name" : "Lab Name"} {!isPhotographer && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            id="studioInput"
                            name={isPhotographer ? "studioName" : "labName"}
                            required={!isPhotographer}
                            value={isPhotographer ? formData.studioName : formData.labName}
                            onChange={handleInputChange}
                            placeholder={isPhotographer ? "Lens Studio (Optional)" : "Pro Photo Lab"}
                            className={inputStyles}
                        />
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label htmlFor="email" className={labelStyles}>Email <span className="text-red-500">*</span></label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="name@example.com"
                            className={inputStyles}
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="phoneNumber" className={labelStyles}>Phone Number <span className="text-red-500">*</span></label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            required
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            maxLength={10}
                            placeholder="Enter 10-digit number"
                            className={inputStyles}
                        />
                    </div>
                </div>

                {/* Photographer Specifics */}
                {isPhotographer && (
                    <div className="space-y-1">
                        <label className={labelStyles}>Photography Specialty</label>
                        <Select onValueChange={(v) => handleSelectChange('specialty', v)} value={formData.specialty}>
                            <SelectTrigger className={cn(inputStyles, "h-[52px]")}>
                                <SelectValue placeholder={<span className="text-[#CCCCCC]">Select primary specialty</span>} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
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
                        <div className="space-y-1">
                            <label className={labelStyles}>Team Size</label>
                            <Select onValueChange={(v) => handleSelectChange('teamSize', v)} value={formData.teamSize}>
                                <SelectTrigger className={cn(inputStyles, "h-[52px]")}>
                                    <SelectValue placeholder={<span className="text-[#CCCCCC]">Select team size</span>} />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="1-5">1-5 Members</SelectItem>
                                    <SelectItem value="6-20">6-20 Members</SelectItem>
                                    <SelectItem value="21-50">21-50 Members</SelectItem>
                                    <SelectItem value="50+">50+ Members</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1">
                            <label className={labelStyles}>Photographers Served</label>
                            <Select onValueChange={(v) => handleSelectChange('photographersServed', v)} value={formData.photographersServed}>
                                <SelectTrigger className={cn(inputStyles, "h-[52px]")}>
                                    <SelectValue placeholder={<span className="text-[#CCCCCC]">Estimated clients</span>} />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
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
                    <div className="space-y-1">
                        <label htmlFor="city" className={labelStyles}>City</label>
                        <input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Enter city"
                            className={inputStyles}
                        />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="state" className={labelStyles}>State</label>
                        <input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="Enter state"
                            className={inputStyles}
                        />
                    </div>
                </div>

                {/* GST for Labs Only */}
                {!isPhotographer && (
                    <div className="space-y-1">
                        <label htmlFor="gstNumber" className={labelStyles}>GST Number (Optional)</label>
                        <input
                            id="gstNumber"
                            name="gstNumber"
                            value={formData.gstNumber}
                            onChange={handleInputChange}
                            placeholder="Enter GST Number"
                            className={inputStyles}
                        />
                    </div>
                )}

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label htmlFor="password" className={labelStyles}>Password <span className="text-red-500">*</span></label>
                        <div className="relative flex items-center bg-[#F1F1F1] rounded-2xl focus-within:ring-1 focus-within:ring-black focus-within:bg-white transition-all overflow-hidden pr-3">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-none px-5 py-3.5 text-[#111111] font-medium placeholder:text-[#CCCCCC] placeholder:font-normal outline-none"
                                placeholder="********"
                            />
                            {/* Fake Password Strength Indicator */}
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
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="confirmPassword" className={labelStyles}>Confirm Password <span className="text-red-500">*</span></label>
                        <div className="relative flex items-center bg-[#F1F1F1] rounded-2xl focus-within:ring-1 focus-within:ring-black focus-within:bg-white transition-all overflow-hidden pr-3">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-none px-5 py-3.5 text-[#111111] font-medium placeholder:text-[#CCCCCC] placeholder:font-normal outline-none"
                                placeholder="********"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="p-2 text-gray-400 hover:text-gray-800 transition-colors bg-white rounded-xl shadow-sm border border-gray-100 flex-shrink-0"
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
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
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                'Start your adventure'
                            )}
                        </div>
                    </button>
                </div>
            </form>
            <div className="text-center text-xs text-[#666666] mt-6 font-medium">
                By creating an account, you agree to our{" "}
                <a href="/terms" className="text-[#111111] hover:underline transition-colors">Terms of Service</a>{" "}
                and{" "}
                <a href="/privacy" className="text-[#111111] hover:underline transition-colors">Privacy Policy</a>.
            </div>
        </div>
    )
}

export default CreateAccountForm
