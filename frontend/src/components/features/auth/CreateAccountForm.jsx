import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Phone, Mail, Lock, Building, MapPin, Globe, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import { AuthCard } from '@/components/custom/AuthCard'
import { FormInput } from '@/components/custom/FormInput'
import { PrimaryButton } from '@/components/custom/PrimaryButton'
import { SecondaryButton } from '@/components/custom/SecondaryButton'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { registerUser } from '@/services/api'
import * as csc from 'country-state-city'
const { Country, State, City } = csc

const CreateAccountForm = () => {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // Form data now stores Country/State objects or codes
    const [formData, setFormData] = useState({
        fullName: '',
        studioName: '',
        phoneNumber: '',
        email: '',
        country: '', // This will store ISO Code
        state: '',   // This will store ISO Code
        city: '',    // This will store city name
        pincode: '',
        password: '',
        confirmPassword: ''
    })

    // Separate derived state for names to display/submit
    const [locationNames, setLocationNames] = useState({
        countryName: '',
        stateName: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSelectChange = (name, value) => {
        setFormData(prev => {
            const newData = { ...prev, [name]: value }

            // Reset dependent fields
            if (name === 'country') {
                newData.state = ''
                newData.city = ''
                // Update country name for display/submit
                const countryObj = Country.getCountryByCode(value)
                setLocationNames(prevNames => ({
                    ...prevNames,
                    countryName: countryObj ? countryObj.name : '',
                    stateName: ''
                }))
            } else if (name === 'state') {
                newData.city = ''
                // Update state name for display/submit
                const stateObj = State.getStateByCodeAndCountry(value, formData.country)
                setLocationNames(prevNames => ({
                    ...prevNames,
                    stateName: stateObj ? stateObj.name : ''
                }))
            }

            return newData
        })
    }

    const nextStep = () => {
        if (currentStep === 1) {
            if (!formData.fullName || !formData.phoneNumber || !formData.email || !formData.password || !formData.confirmPassword) {
                setError('Please fill all personal details')
                return
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match')
                return
            }
            setError('')
        }
        setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            // Construct address using NAMES not codes
            const addressString = `${formData.city}, ${locationNames.stateName || formData.state}, ${locationNames.countryName || formData.country} - ${formData.pincode}`.trim()

            const signupData = {
                email: formData.email,
                password: formData.password,
                personalName: formData.fullName,
                studioName: formData.studioName,
                mobileNumber: formData.phoneNumber,
                address: addressString
            }

            const response = await registerUser(signupData)

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

    // Get options for dropdowns dynamically
    const countries = Country.getAllCountries()
    const states = formData.country ? State.getStatesOfCountry(formData.country) : []
    const cities = (formData.country && formData.state) ? City.getCitiesOfState(formData.country, formData.state) : []

    const footerContent = (
        <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
                Already a member?{' '}
                <Link to="/login" className="font-medium text-gold hover:text-gold/80 transition-colors">
                    Sign In
                </Link>
            </p>
        </div>
    )

    return (
        <AuthCard
            title="Create Account"
            description="Join our exclusive community of artists"
            footer={footerContent}
            className="max-w-2xl" // Wider card for signup
        >
            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Progress Indicator */}
            <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${currentStep >= 1 ? 'bg-gold text-white' : 'bg-muted text-muted-foreground'}`}>
                        1
                    </div>
                    <div className={`w-16 h-0.5 transition-all duration-500 ${currentStep >= 2 ? 'bg-gold' : 'bg-muted'}`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${currentStep >= 2 ? 'bg-gold text-white' : 'bg-muted text-muted-foreground'}`}>
                        2
                    </div>
                </div>
            </div>

            <div className="mb-6 text-center">
                <h3 className="text-xs uppercase tracking-widest text-gold font-bold">
                    {currentStep === 1 ? 'Personal Details' : 'Business Details'}
                </h3>
            </div>

            {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-1">
                        <FormInput
                            id="fullName"
                            name="fullName"
                            label="Full Name"
                            required
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="md:col-span-1">
                        <FormInput
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone"
                            required
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 000"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <FormInput
                            id="email"
                            name="email"
                            type="email"
                            label="Email Address"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="artist@pixfolio.com"
                        />
                    </div>
                    <div className="md:col-span-1 relative">
                        <FormInput
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            className="pr-10"
                        />
                        <div className="absolute top-[2.1rem] right-0 pr-0 flex items-center">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPassword(!showPassword)}
                                className="h-9 w-9 p-0 hover:bg-transparent"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                            </Button>
                        </div>
                    </div>
                    <div className="md:col-span-1 relative">
                        <FormInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            label="Confirm"
                            required
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            className="pr-10"
                        />
                        <div className="absolute top-[2.1rem] right-0 pr-0 flex items-center">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="h-9 w-9 p-0 hover:bg-transparent"
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                            </Button>
                        </div>
                    </div>
                    <div className="md:col-span-2 pt-4">
                        <PrimaryButton onClick={nextStep} className="w-full">
                            Next Step
                        </PrimaryButton>
                    </div>
                </div>
            )}

            {currentStep === 2 && (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <FormInput
                            id="studioName"
                            name="studioName"
                            label="Studio Name"
                            required
                            value={formData.studioName}
                            onChange={handleInputChange}
                            placeholder="Dreamscape Studio"
                        />
                    </div>

                    {/* Country Selector */}
                    <div className="md:col-span-1 space-y-2">
                        <Label className="text-sm font-medium">Country</Label>
                        <Select onValueChange={(v) => handleSelectChange('country', v)} value={formData.country}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent>
                                {countries.map(c => (
                                    <SelectItem key={c.isoCode} value={c.isoCode}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* State Selector */}
                    <div className="md:col-span-1 space-y-2">
                        <Label className="text-sm font-medium">State / Province</Label>
                        <Select
                            onValueChange={(v) => handleSelectChange('state', v)}
                            value={formData.state}
                            disabled={!formData.country}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={!formData.country ? "Select Country First" : "Select State"} />
                            </SelectTrigger>
                            <SelectContent>
                                {states.length > 0 ? (
                                    states.map(s => (
                                        <SelectItem key={s.isoCode} value={s.isoCode}>
                                            {s.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="p-2 text-sm text-muted-foreground text-center">No states found</div>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* City Selector */}
                    <div className="md:col-span-1 space-y-2">
                        <Label className="text-sm font-medium">City / District</Label>
                        <Select
                            onValueChange={(v) => handleSelectChange('city', v)}
                            value={formData.city}
                            disabled={!formData.state}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={!formData.state ? "Select State First" : "Select City"} />
                            </SelectTrigger>
                            <SelectContent>
                                {cities.length > 0 ? (
                                    cities.map(ct => (
                                        <SelectItem key={ct.name} value={ct.name}>
                                            {ct.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="p-2 text-sm text-muted-foreground text-center">No cities found</div>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="md:col-span-1">
                        <FormInput
                            id="pincode"
                            name="pincode"
                            label="Pincode / Zip Code"
                            required
                            value={formData.pincode}
                            onChange={handleInputChange}
                            placeholder="110001"
                        />
                    </div>
                    <div className="md:col-span-2 flex gap-4 pt-4">
                        <SecondaryButton type="button" onClick={prevStep} className="flex-1">
                            Previous
                        </SecondaryButton>
                        <PrimaryButton type="submit" disabled={isLoading} className="flex-1">
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creating...
                                </div>
                            ) : (
                                'Complete Registration'
                            )}
                        </PrimaryButton>
                    </div>
                </form>
            )}
        </AuthCard>
    )
}

export default CreateAccountForm
