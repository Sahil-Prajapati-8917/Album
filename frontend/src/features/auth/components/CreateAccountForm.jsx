import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Phone, Mail, Lock, Building, MapPin, Globe, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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

    return (
        <div className="w-full">
            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Progress Indicator */}
            <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-3">
                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${currentStep >= 1 ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20' : 'bg-zinc-200 text-zinc-500'}`}>
                        1
                    </div>
                    <div className={`w-12 h-1 rounded-full transition-all duration-500 ${currentStep >= 2 ? 'bg-zinc-900' : 'bg-zinc-200'}`}></div>
                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${currentStep >= 2 ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20' : 'bg-zinc-200 text-zinc-500'}`}>
                        2
                    </div>
                </div>
            </div>

            <div className="mb-8 text-center">
                <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                    {currentStep === 1 ? 'Personal Details' : 'Business Details'}
                </h3>
            </div>

            {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Full Name</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                    <User className="h-4 w-4" />
                                </div>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="pl-10 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm group-hover:border-zinc-300 text-base"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Phone</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    required
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="pl-10 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm group-hover:border-zinc-300 text-base"
                                    placeholder="+1 (555) 000"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Email Address</Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                <Mail className="h-4 w-4" />
                            </div>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="pl-10 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm group-hover:border-zinc-300 text-base"
                                placeholder="artist@pixfolio.com"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Password</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                    <Lock className="h-4 w-4" />
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-10 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm tracking-widest placeholder:tracking-normal group-hover:border-zinc-300 text-base"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 pr-0 flex items-center">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="h-10 w-10 p-0 mr-1 hover:bg-transparent text-zinc-400 hover:text-zinc-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Confirm Password</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                    <Lock className="h-4 w-4" />
                                </div>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-10 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm tracking-widest placeholder:tracking-normal group-hover:border-zinc-300 text-base"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 pr-0 flex items-center">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="h-10 w-10 p-0 mr-1 hover:bg-transparent text-zinc-400 hover:text-zinc-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button onClick={nextStep} className="w-full h-12 bg-zinc-900 hover:bg-black text-white font-bold rounded-xl shadow-lg shadow-zinc-900/10 hover:shadow-zinc-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-[15px] uppercase tracking-widest">
                            Continue to Business Details <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            {currentStep === 2 && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="space-y-2">
                        <Label htmlFor="studioName" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Studio Name</Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                <Building className="h-4 w-4" />
                            </div>
                            <Input
                                id="studioName"
                                name="studioName"
                                required
                                value={formData.studioName}
                                onChange={handleInputChange}
                                className="pl-10 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm group-hover:border-zinc-300 text-base"
                                placeholder="Dreamscape Studio"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Country Selector */}
                        <div className="space-y-2">
                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Country</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                    <Globe className="h-4 w-4" />
                                </div>
                                <Select onValueChange={(v) => handleSelectChange('country', v)} value={formData.country}>
                                    <SelectTrigger className="pl-10 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm group-hover:border-zinc-300">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-zinc-200 shadow-xl max-h-[300px]">
                                        {countries.map(c => (
                                            <SelectItem key={c.isoCode} value={c.isoCode} className="focus:bg-zinc-100 rounded-lg mx-1 my-0.5">
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* State Selector */}
                        <div className="space-y-2">
                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">State / Province</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <Select
                                    onValueChange={(v) => handleSelectChange('state', v)}
                                    value={formData.state}
                                    disabled={!formData.country}
                                >
                                    <SelectTrigger className="pl-10 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm group-hover:border-zinc-300 disabled:opacity-50">
                                        <SelectValue placeholder={!formData.country ? "Select Country" : "Select State"} />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-zinc-200 shadow-xl max-h-[300px]">
                                        {states.length > 0 ? (
                                            states.map(s => (
                                                <SelectItem key={s.isoCode} value={s.isoCode} className="focus:bg-zinc-100 rounded-lg mx-1 my-0.5">
                                                    {s.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div className="p-4 text-xs font-bold uppercase tracking-widest text-zinc-400 text-center">No states found</div>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* City Selector */}
                        <div className="space-y-2">
                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">City / District</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <Select
                                    onValueChange={(v) => handleSelectChange('city', v)}
                                    value={formData.city}
                                    disabled={!formData.state}
                                >
                                    <SelectTrigger className="pl-10 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm group-hover:border-zinc-300 disabled:opacity-50">
                                        <SelectValue placeholder={!formData.state ? "Select State" : "Select City"} />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-zinc-200 shadow-xl max-h-[300px]">
                                        {cities.length > 0 ? (
                                            cities.map(ct => (
                                                <SelectItem key={ct.name} value={ct.name} className="focus:bg-zinc-100 rounded-lg mx-1 my-0.5">
                                                    {ct.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div className="p-4 text-xs font-bold uppercase tracking-widest text-zinc-400 text-center">No cities found</div>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pincode" className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Pincode</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <Input
                                    id="pincode"
                                    name="pincode"
                                    required
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    className="pl-10 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm group-hover:border-zinc-300 text-base"
                                    placeholder="110001"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex gap-4">
                        <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12 border-zinc-200 hover:bg-zinc-50 text-zinc-900 font-bold rounded-xl transition-all uppercase tracking-widest text-xs gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back
                        </Button>
                        <Button type="submit" disabled={isLoading} className="flex-1 h-12 bg-zinc-900 hover:bg-black text-white font-bold rounded-xl shadow-lg shadow-zinc-900/10 hover:shadow-zinc-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Finalizing...
                                </div>
                            ) : (
                                <>
                                    Complete Setup <ArrowRight className="h-4 w-4 ml-1" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default CreateAccountForm
