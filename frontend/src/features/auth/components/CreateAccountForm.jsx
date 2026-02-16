import React, { useState, useEffect, useMemo } from 'react'
import { cn } from "@/lib/utils"
import { Link, useNavigate } from 'react-router-dom'
import { User, Phone, Mail, Lock, Building, MapPin, Globe, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft, ArrowRight, Camera } from 'lucide-react'
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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/landing-ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/landing-ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Check, ChevronsUpDown, CheckCircle2 } from "lucide-react"
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
        specialty: '', // New specialty field
        country: 'IN', // Default to India for convenience
        state: '',   // This will store ISO Code
        city: '',    // This will store city name
        pincode: '',
        password: '',
        confirmPassword: ''
    })

    const [locationNames, setLocationNames] = useState({
        countryName: '',
        stateName: ''
    })

    // Sync location names whenever country or state changes
    useEffect(() => {
        try {
            const countryObj = (formData.country && Country && typeof Country.getCountryByCode === 'function')
                ? Country.getCountryByCode(formData.country)
                : null;

            const stateObj = (formData.country && formData.state && State && typeof State.getStateByCodeAndCountry === 'function')
                ? State.getStateByCodeAndCountry(formData.state, formData.country)
                : null;

            setLocationNames({
                countryName: countryObj ? countryObj.name : '',
                stateName: stateObj ? stateObj.name : ''
            });
        } catch (err) {
            // Silently fail to avoid crashing the whole form
        }
    }, [formData.country, formData.state]);

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
            } else if (name === 'state') {
                newData.city = ''
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

    // Get options for dropdowns dynamically with robust error handling
    const countries = useMemo(() => {
        try {
            return (Country && typeof Country.getAllCountries === 'function') ? Country.getAllCountries() : []
        } catch (err) {
            return []
        }
    }, [])

    const states = useMemo(() => {
        try {
            return (formData.country && State && typeof State.getStatesOfCountry === 'function')
                ? State.getStatesOfCountry(formData.country)
                : []
        } catch (err) {
            return []
        }
    }, [formData.country])

    const cities = useMemo(() => {
        try {
            return (formData.country && formData.state && City && typeof City.getCitiesOfState === 'function')
                ? City.getCitiesOfState(formData.country, formData.state)
                : []
        } catch (err) {
            return []
        }
    }, [formData.country, formData.state])

    // Reusable Searchable Select Component
    const SearchableSelect = ({ options, value, onValueChange, placeholder, disabled, icon: Icon, labelKey = 'name', valueKey = 'isoCode' }) => {
        const [open, setOpen] = React.useState(false)

        const selectedOption = useMemo(() =>
            options.find((opt) => opt[valueKey] === value),
            [options, value, valueKey])

        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="w-full">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    disabled={disabled}
                                    className={cn(
                                        "w-full pl-10 h-12 justify-between bg-white border-zinc-200 hover:bg-zinc-50 rounded-xl transition-all shadow-sm text-left font-normal",
                                        !value && "text-zinc-400"
                                    )}
                                >
                                    <div className="absolute left-3.5 flex items-center pointer-events-none text-zinc-400">
                                        {Icon && <Icon className="h-4 w-4" />}
                                    </div>
                                    <span className="truncate">
                                        {selectedOption ? selectedOption[labelKey] : placeholder}
                                    </span>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl border-zinc-200 shadow-2xl z-[150] bg-white mt-1">
                                <Command className="rounded-xl bg-white">
                                    <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} className="h-10 text-sm border-none focus:ring-0" />
                                    <CommandList className="max-h-[300px] overflow-y-auto">
                                        <CommandEmpty className="py-4 text-xs font-bold uppercase tracking-widest text-zinc-400">Not found.</CommandEmpty>
                                        <CommandGroup>
                                            {options.map((option) => (
                                                <CommandItem
                                                    key={option[valueKey]}
                                                    value={option[labelKey]} // Use label for filtering
                                                    onSelect={() => {
                                                        onValueChange(option[valueKey])
                                                        setOpen(false)
                                                    }}
                                                    className="rounded-lg mx-1 my-0.5 text-sm cursor-pointer data-[selected='true']:bg-zinc-100"
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === option[valueKey] ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {option[labelKey]}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-zinc-900 text-white border-zinc-800 rounded-lg px-3 py-1.5 shadow-xl font-bold uppercase tracking-widest text-[10px] mb-2">
                    {selectedOption ? selectedOption[labelKey] : placeholder}
                </TooltipContent>
            </Tooltip>
        )
    }

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
                    {currentStep === 1 ? 'Step 1: Personal Details' : 'Step 2: Business Details'}
                </h3>
            </div>

            {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                    <div className="space-y-2">
                        <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Photography Specialty</Label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 text-zinc-400 group-focus-within:text-zinc-900 transition-colors">
                                <Camera className="h-4 w-4" />
                            </div>
                            <Select onValueChange={(v) => handleSelectChange('specialty', v)} value={formData.specialty}>
                                <SelectTrigger className="pl-10 h-12 bg-white border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 rounded-xl transition-all shadow-sm group-hover:border-zinc-300">
                                    <SelectValue placeholder="Select Specialty" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-zinc-200 shadow-xl max-h-[300px]">
                                    <SelectItem value="wedding" className="focus:bg-zinc-100 rounded-lg mx-1 my-0.5">Wedding Photography</SelectItem>
                                    <SelectItem value="portrait" className="focus:bg-zinc-100 rounded-lg mx-1 my-0.5">Portrait & Headshots</SelectItem>
                                    <SelectItem value="real-estate" className="focus:bg-zinc-100 rounded-lg mx-1 my-0.5">Real Estate</SelectItem>
                                    <SelectItem value="fashion" className="focus:bg-zinc-100 rounded-lg mx-1 my-0.5">Fashion & Editorial</SelectItem>
                                    <SelectItem value="event" className="focus:bg-zinc-100 rounded-lg mx-1 my-0.5">Event Photography</SelectItem>
                                    <SelectItem value="other" className="focus:bg-zinc-100 rounded-lg mx-1 my-0.5">Other / Multiple</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={nextStep}
                                    className="w-full h-12 bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-indigo-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-zinc-900/10 hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-2 text-[15px] uppercase tracking-widest"
                                >
                                    Continue to Business Details <ArrowRight className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-zinc-900 text-white border-zinc-800 rounded-lg px-3 py-1.5 shadow-xl font-bold uppercase tracking-widest text-[10px] mb-2">
                                Go to business information step
                            </TooltipContent>
                        </Tooltip>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Country Selector */}
                        <div className="space-y-2">
                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Country</Label>
                            <SearchableSelect
                                options={countries}
                                value={formData.country}
                                onValueChange={(v) => handleSelectChange('country', v)}
                                placeholder="Select Country"
                                icon={Globe}
                            />
                        </div>

                        {/* State Selector */}
                        <div className="space-y-2">
                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">State / Province</Label>
                            <SearchableSelect
                                options={states}
                                value={formData.state}
                                onValueChange={(v) => handleSelectChange('state', v)}
                                placeholder={!formData.country ? "Select Country First" : "Select State"}
                                disabled={!formData.country}
                                icon={MapPin}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* District Selector */}
                        <div className="space-y-2">
                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">District / City</Label>
                            <SearchableSelect
                                options={cities}
                                value={formData.city}
                                onValueChange={(v) => handleSelectChange('city', v)}
                                placeholder={!formData.state ? "Select State First" : "Select District"}
                                disabled={!formData.state}
                                icon={MapPin}
                                valueKey="name" // For cities, we use name as value
                            />
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
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="button" variant="outline" onClick={prevStep} className="flex-1 h-12 border-zinc-200 hover:bg-zinc-50 text-zinc-900 font-bold rounded-xl transition-all uppercase tracking-widest text-xs gap-2">
                                    <ArrowLeft className="h-4 w-4" /> Back
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-zinc-900 text-white border-zinc-800 rounded-lg px-3 py-1.5 shadow-xl font-bold uppercase tracking-widest text-[10px] mb-2">
                                Return to profile details
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 h-12 bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-indigo-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-zinc-900/10 hover:shadow-indigo-500/20 active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                                >
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
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-zinc-900 text-white border-zinc-800 rounded-lg px-3 py-1.5 shadow-xl font-bold uppercase tracking-widest text-[10px] mb-2">
                                Finish registration and create your account
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </form>
            )}
        </div>
    )
}

export default CreateAccountForm
