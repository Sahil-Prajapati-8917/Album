import React, { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Loader2, AlertCircle, ChevronDown } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { registerUser } from '@/services/api'
import { cn } from '@/lib/utils'
import { Country, State, City } from 'country-state-city/lib/cjs/index.js'

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
        country: 'IN', // Default to India
        state: '',
        city: '', // Using city as district/city
        district: '',

        // Photographer Fields
        full_name: '',
        studio_name: '',
        specialty: '',

        // Lab Fields
        labName: '',
        ownerName: '',
        teamSize: '',
        photographersServed: '',
        gst: ''
    })

    // Memoize location data for performance
    const countries = useMemo(() => Country.getAllCountries(), [])
    const states = useMemo(() => State.getStatesOfCountry(formData.country), [formData.country])
    const cities = useMemo(() => City.getCitiesOfState(formData.country, formData.state), [formData.country, formData.state])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target

        if (name === 'mobile') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10)
            setFormData(prev => ({ ...prev, [name]: numericValue }))
            return
        }

        if (name === 'country') {
            setFormData(prev => ({ ...prev, [name]: value, state: '', city: '', district: '' }))
            return
        }

        if (name === 'state') {
            setFormData(prev => ({ ...prev, [name]: value, city: '', district: '' }))
            return
        }

        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value, district: name === 'city' ? value : prev.district }))
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

        try {
            const selectedCountry = countries.find(c => c.isoCode === formData.country)?.name
            const selectedState = states.find(s => s.isoCode === formData.state)?.name

            const baseData = {
                accountType: accountType,
                email: formData.email,
                password: formData.password,
                mobileNumber: formData.mobile,
                country: selectedCountry,
                state: selectedState,
                city: formData.city, // The city name
                district: formData.city, // Same as city for now as per "destrict" request
                address: ''
            }

            let finalData = {}
            if (accountType === 'photographer') {
                finalData = {
                    ...baseData,
                    personalName: formData.full_name,
                    studioName: formData.studio_name,
                    specialty: formData.specialty || 'other',
                }
            } else {
                finalData = {
                    ...baseData,
                    personalName: formData.ownerName,
                    ownerName: formData.ownerName,
                    studioName: formData.labName,
                    teamSize: formData.teamSize || '1-5',
                    photographersServed: formData.photographersServed || '1-50',
                    gstNumber: formData.gst,
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

    const LocationFields = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Country</label>
                    <div className="relative">
                        <select
                            name="country" value={formData.country} onChange={handleInputChange} required
                            className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm text-slate-900 outline-none transition-all duration-300 appearance-none pr-8"
                        >
                            {countries.map(country => (
                                <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">State</label>
                    <div className="relative">
                        <select
                            name="state" value={formData.state} onChange={handleInputChange} required
                            className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm text-slate-900 outline-none transition-all duration-300 appearance-none pr-8"
                        >
                            <option value="" disabled>Select State</option>
                            {states.map(state => (
                                <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">District / City</label>
                <div className="relative">
                    <select
                        name="city" value={formData.city} onChange={handleInputChange} required
                        disabled={!formData.state}
                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm text-slate-900 outline-none transition-all duration-300 appearance-none pr-8 disabled:opacity-50"
                    >
                        <option value="" disabled>{formData.state ? "Select District/City" : "Select State first"}</option>
                        {cities.map(city => (
                            <option key={city.name} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
            </div>
        </div>
    )

    return (
        <div className="w-full flex flex-col z-10 pt-2 lg:pt-0">
            {/* Header Section */}
            <div className="space-y-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                    Create Account
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                    {isPhotographer ? "Elevate your portfolio" : "Establish your lab"}
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[320px]">
                    {isPhotographer ? "Join the exclusive collective of world-class photographers." : "Join the exclusive network of professional labs."}
                </p>
            </div>

            {error && (
                <Alert variant="destructive" className="max-w-[420px] w-full mb-8 rounded-xl border-none bg-red-50 text-red-600 animate-in fade-in">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium text-sm ml-2">{error}</AlertDescription>
                </Alert>
            )}

            <div className="w-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-8">
                <form onSubmit={handleSubmit} className={cn("space-y-8", !isPhotographer && "space-y-10")}>

                    {/* Account Type Selector */}
                    <div className={cn("flex flex-col gap-3 mb-8", isPhotographer ? "" : "border-b border-slate-100 pb-8")}>
                        <div className="flex bg-slate-100/80 p-1.5 rounded-xl">
                            <button
                                type="button"
                                onClick={() => setAccountType('photographer')}
                                className={cn(
                                    "flex-1 text-[11px] font-bold uppercase tracking-wider py-2.5 rounded-lg transition-all duration-300",
                                    accountType === 'photographer'
                                        ? "bg-white text-black shadow-sm"
                                        : "text-slate-500 hover:text-black hover:bg-slate-200/50"
                                )}
                            >
                                Photographer
                            </button>
                            <button
                                type="button"
                                onClick={() => setAccountType('lab')}
                                className={cn(
                                    "flex-1 text-[11px] font-bold uppercase tracking-wider py-2.5 rounded-lg transition-all duration-300",
                                    accountType === 'lab'
                                        ? "bg-white text-black shadow-sm"
                                        : "text-slate-500 hover:text-black hover:bg-slate-200/50"
                                )}
                            >
                                Lab
                            </button>
                        </div>
                    </div>

                    {isPhotographer ? (
                        <>
                            {/* Photographer Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text" name="full_name" required value={formData.full_name} onChange={handleInputChange} autoComplete="name"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Studio Name (Optional)</label>
                                    <input
                                        type="text" name="studio_name" value={formData.studio_name} onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="JD Studios"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email" name="email" required value={formData.email} onChange={handleInputChange} autoComplete="email"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="name@domain.com"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Mobile Number</label>
                                    <input
                                        type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} autoComplete="tel"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="9876543210"
                                    />
                                </div>
                            </div>

                            <LocationFields />

                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Specialty</label>
                                <div className="relative">
                                    <select
                                        name="specialty"
                                        value={formData.specialty}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm text-slate-900 outline-none transition-all duration-300 appearance-none pr-8"
                                    >
                                        <option value="" disabled>Select Specialty *</option>
                                        <option value="wedding">Wedding</option>
                                        <option value="pre_wedding">Pre Wedding</option>
                                        <option value="engagement">Engagement</option>
                                        <option value="reception">Reception</option>
                                        <option value="birthday">Birthday</option>
                                        <option value="maternity">Maternity</option>
                                        <option value="newborn">Newborn</option>
                                        <option value="family">Family</option>
                                        <option value="corporate">Corporate</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Lab Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Lab Name</label>
                                    <input
                                        type="text" name="labName" required value={formData.labName} onChange={handleInputChange} autoComplete="organization"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="The Alchemist Lab"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Owner Full Name</label>
                                    <input
                                        type="text" name="ownerName" required value={formData.ownerName} onChange={handleInputChange} autoComplete="name"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="Julian Vane"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email" name="email" required value={formData.email} onChange={handleInputChange} autoComplete="email"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="contact@lab.co"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Mobile Number</label>
                                    <input
                                        type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} autoComplete="tel"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="9876543210"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Team Size</label>
                                    <div className="relative">
                                        <select
                                            name="teamSize" value={formData.teamSize} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm text-slate-900 outline-none transition-all duration-300 appearance-none pr-8"
                                        >
                                            <option value="" disabled>Select Team Size</option>
                                            <option value="1-5">1-5 Employees</option>
                                            <option value="6-15">6-15 Employees</option>
                                            <option value="16-50">16-50 Employees</option>
                                            <option value="50+">50+ Employees</option>
                                        </select>
                                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Monthly Volume</label>
                                    <div className="relative">
                                        <select
                                            name="photographersServed" value={formData.photographersServed} onChange={handleInputChange} required
                                            className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm text-slate-900 outline-none transition-all duration-300 appearance-none pr-8"
                                        >
                                            <option value="" disabled>Monthly Volume</option>
                                            <option value="1-50">1-50 clients/mo</option>
                                            <option value="51-200">51-200 clients/mo</option>
                                            <option value="200+">200+ clients/mo</option>
                                        </select>
                                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <LocationFields />

                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">GST Number (Optional)</label>
                                <input
                                    type="text" name="gst" value={formData.gst} onChange={handleInputChange}
                                    className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                    placeholder="GSTIN..."
                                />
                            </div>
                        </>
                    )}

                    {/* Shared Password Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                        <div className="space-y-1.5 relative">
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleInputChange} autoComplete="new-password"
                                    className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none pr-8"
                                    placeholder="••••••••"
                                />
                                <button type="button" className="absolute right-0 text-slate-400 hover:text-black transition-colors focus:outline-none pb-1" onClick={() => setShowPassword(!showPassword)}>
                                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-1.5 relative">
                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Confirm Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showConfirmPassword ? "text" : "password"} name="confirm_password" required value={formData.confirm_password} onChange={handleInputChange} autoComplete="new-password"
                                    className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none pr-8"
                                    placeholder="••••••••"
                                />
                                <button type="button" className="absolute right-0 text-slate-400 hover:text-black transition-colors focus:outline-none pb-1" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <span className="material-symbols-outlined text-lg">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-center gap-3 pt-2">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox" name="terms" id="terms" required checked={formData.terms} onChange={handleInputChange}
                                className="peer appearance-none h-5 w-5 rounded-md border-2 border-slate-200 checked:bg-black checked:border-black transition-all cursor-pointer"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <label htmlFor="terms" className="cursor-pointer select-none text-sm text-slate-600 font-medium">
                            I accept the <Link to="/term" className="text-black hover:underline transition-colors font-bold">Terms & Conditions</Link>
                        </label>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                        <button type="submit" disabled={isLoading} className={cn("w-full bg-black hover:bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-black/10 hover:shadow-black/20 transform active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-3 text-sm tracking-wide uppercase", isLoading && "opacity-80 pointer-events-none")}>
                            {isLoading ? (
                                <><Loader2 className="h-5 w-5 animate-spin" /><span>CREATING ACCOUNT...</span></>
                            ) : (
                                <span>{isPhotographer ? "Create Professional Account" : "Create Lab Account"}</span>
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-10">
                    <p className="text-sm text-slate-500">
                        {isPhotographer ? "Already part of the collective? " : "Already a member? "}
                        <Link to="/login" className="text-black font-bold hover:underline transition-all duration-300">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CreateAccountForm
