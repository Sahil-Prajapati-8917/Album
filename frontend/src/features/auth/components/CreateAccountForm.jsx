import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Loader2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { registerUser } from '@/services/api'
import { cn } from '@/lib/utils'

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
        city: '',
        state: '',

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

        try {
            const baseData = {
                accountType: accountType,
                email: formData.email,
                password: formData.password,
                mobileNumber: formData.mobile,
                city: formData.city,
                state: formData.state,
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

    return (
        <div className="w-full flex flex-col z-10 pt-2 lg:pt-0">

            {/* Header Section */}
            <div className="space-y-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                    Create Account
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                    {isPhotographer ? "Elevate your portfolio" : "Establish your lab"}
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[320px]">
                    {isPhotographer ? "Join the exclusive collective of world-class photographers." : "Join the exclusive network of professional labs."}
                </p>
            </div>

            {error && (
                <Alert variant="destructive" className="max-w-[420px] w-full mb-8 rounded-lg border-none bg-red-50 text-red-600 animate-in fade-in">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium text-sm ml-2">{error}</AlertDescription>
                </Alert>
            )}

            <div className="w-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-8">
                <form onSubmit={handleSubmit} className={cn("space-y-6", !isPhotographer && "space-y-8")}>

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
                                    <label className="block text-xs font-semibold text-slate-700">Full Name</label>
                                    <input
                                        type="text" name="full_name" required value={formData.full_name} onChange={handleInputChange} autoComplete="name"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">Studio Name (Optional)</label>
                                    <input
                                        type="text" name="studio_name" value={formData.studio_name} onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="JD Studios"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">Email Address</label>
                                    <input
                                        type="email" name="email" required value={formData.email} onChange={handleInputChange} autoComplete="email"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="name@domain.com"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">Mobile Number</label>
                                    <input
                                        type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} autoComplete="tel"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="9876543210"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">City</label>
                                    <input
                                        type="text" name="city" required value={formData.city} onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="Mumbai"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">State</label>
                                    <input
                                        type="text" name="state" required value={formData.state} onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="Maharashtra"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-slate-700">Specialty</label>
                                <select
                                    name="specialty"
                                    value={formData.specialty}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm text-slate-900 outline-none transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_center]"
                                >
                                    <option value="" disabled className="text-slate-400">Select Specialty *</option>
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
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Lab Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">Lab Name</label>
                                    <input
                                        type="text" name="labName" required value={formData.labName} onChange={handleInputChange} autoComplete="organization"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="The Alchemist Lab"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">Owner Full Name</label>
                                    <input
                                        type="text" name="ownerName" required value={formData.ownerName} onChange={handleInputChange} autoComplete="name"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="Julian Vane"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">Email Address</label>
                                    <input
                                        type="email" name="email" required value={formData.email} onChange={handleInputChange} autoComplete="email"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="contact@lab.co"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">Mobile Number</label>
                                    <input
                                        type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} autoComplete="tel"
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="9876543210"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">Team Size</label>
                                    <select
                                        name="teamSize" value={formData.teamSize} onChange={handleInputChange} required
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm text-slate-900 outline-none transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_center]"
                                    >
                                        <option value="" disabled className="text-slate-400">Select Team Size</option>
                                        <option value="1-5">1-5 Employees</option>
                                        <option value="6-15">6-15 Employees</option>
                                        <option value="16-50">16-50 Employees</option>
                                        <option value="50+">50+ Employees</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">Photographers Served</label>
                                    <select
                                        name="photographersServed" value={formData.photographersServed} onChange={handleInputChange} required
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm text-slate-900 outline-none transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-no-repeat bg-[position:right_center]"
                                    >
                                        <option value="" disabled className="text-slate-400">Monthly Volume</option>
                                        <option value="1-50">1-50 clients/mo</option>
                                        <option value="51-200">51-200 clients/mo</option>
                                        <option value="200+">200+ clients/mo</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">City</label>
                                    <input
                                        type="text" name="city" required value={formData.city} onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="Mumbai"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold text-slate-700">State</label>
                                    <input
                                        type="text" name="state" required value={formData.state} onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                        placeholder="Maharashtra"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-xs font-semibold text-slate-700">GST Number (Optional)</label>
                                <input
                                    type="text" name="gst" value={formData.gst} onChange={handleInputChange}
                                    className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-black px-0 py-2.5 text-sm placeholder:text-slate-400 transition-all duration-300 text-slate-900 outline-none"
                                    placeholder="GSTIN..."
                                />
                            </div>
                        </>
                    )}

                    {/* Shared Password Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5 relative">
                            <label className="block text-xs font-semibold text-slate-700">Password</label>
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
                            <label className="block text-xs font-semibold text-slate-700">Confirm Password</label>
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
                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox" name="terms" id="terms" required checked={formData.terms} onChange={handleInputChange}
                            className="appearance-none h-4 w-4 rounded-sm border border-slate-300 text-black checked:bg-black checked:border-black focus:ring-1 focus:ring-black/20 transition-all cursor-pointer relative before:content-[''] before:block before:w-1 bg-white before:h-2 before:absolute before:border-r-2 before:border-b-2 before:border-white before:top-[50%] before:left-[50%] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:opacity-0 checked:before:opacity-100"
                        />
                        <label htmlFor="terms" className="cursor-pointer select-none text-xs text-slate-600 font-medium">
                            I accept the <Link to="/term" className="text-black hover:underline transition-colors font-semibold">Terms &amp; Conditions</Link>
                        </label>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                        <button type="submit" disabled={isLoading} className={cn("w-full bg-black hover:bg-slate-800 text-black font-medium py-3 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 text-sm", isLoading && "opacity-80 pointer-events-none")}>
                            {isLoading ? (
                                <><Loader2 className="h-4 w-4 animate-spin" /><span>CREATING ACCOUNT...</span></>
                            ) : (
                                <span>{isPhotographer ? "Create Professional Account" : "Create Lab Account"}</span>
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-6">
                    <p className="text-sm text-slate-500">
                        {isPhotographer ? "Already part of the collective? " : "Already a member? "}
                        <Link to="/login" className="text-black font-semibold hover:underline transition-all duration-300">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CreateAccountForm
