import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Loader2, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { registerUser } from '@/services/api'
import { cn } from '@/lib/utils'

const CreateAccountForm = ({ accountType }) => {
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
        ownerName: ''
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
                city: '',
                state: '',
                address: ''
            }

            let finalData = {}
            if (accountType === 'photographer') {
                finalData = {
                    ...baseData,
                    personalName: formData.full_name,
                    studioName: formData.studio_name,
                    specialty: 'other',
                }
            } else {
                finalData = {
                    ...baseData,
                    personalName: formData.ownerName,
                    ownerName: formData.ownerName,
                    studioName: formData.labName,
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
        <main className="w-full max-w-[1100px] flex flex-col items-center justify-center z-10 pt-16 md:pt-12">

            {/* Header Section */}
            <div className="text-center mb-10 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-3 md:mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {isPhotographer ? "Elevate your portfolio." : "Establish Your Lab"}
                </h2>
                <p className={cn(
                    "font-light tracking-wide text-sm md:text-sm text-slate-500",
                    !isPhotographer && "uppercase tracking-widest text-xs"
                )}>
                    {isPhotographer ? "Join the exclusive collective of world-class photographers." : "Join the exclusive network of professional labs"}
                </p>
            </div>

            {error && (
                <Alert variant="destructive" className="max-w-[420px] w-full mb-6 rounded-lg border-none bg-red-50 text-red-600 animate-in fade-in">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-medium text-sm ml-2">{error}</AlertDescription>
                </Alert>
            )}

            <div className={cn(
                "w-full transition-all duration-500 animate-in fade-in slide-in-from-bottom-8",
                isPhotographer
                    ? "max-w-[420px]"
                    : "max-w-xl bg-white/40 backdrop-blur-md border border-white/20 rounded-xl p-8 md:p-12 shadow-sm"
            )}>
                <form onSubmit={handleSubmit} className={cn("space-y-5", !isPhotographer && "space-y-6")}>

                    {isPhotographer ? (
                        <>
                            {/* Photographer Layout */}
                            <div className="grid grid-cols-1 gap-5">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="full_name"
                                        name="full_name"
                                        placeholder="Full Name"
                                        required
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-primary px-0 py-3 text-sm font-light placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest transition-all text-slate-900"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="studio_name"
                                        name="studio_name"
                                        placeholder="Studio Name (Optional)"
                                        value={formData.studio_name}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-primary px-0 py-3 text-sm font-light placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest transition-all italic text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5">
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email Address"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-primary px-0 py-3 text-sm font-light placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest transition-all text-slate-900"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        placeholder="Mobile Number"
                                        required
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-300 focus:ring-0 focus:border-primary px-0 py-3 text-sm font-light placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest transition-all text-slate-900"
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Lab Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-1">Lab Name</label>
                                    <input
                                        type="text"
                                        placeholder="The Alchemist Lab"
                                        name="labName"
                                        required
                                        value={formData.labName}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-200 py-3 px-1 focus:ring-0 focus:border-primary transition-all duration-300 text-base placeholder:text-slate-300 font-light text-slate-900"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-1">Owner Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Julian Vane"
                                        name="ownerName"
                                        required
                                        value={formData.ownerName}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-200 py-3 px-1 focus:ring-0 focus:border-primary transition-all duration-300 text-base placeholder:text-slate-300 font-light text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="contact@lab.co"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-200 py-3 px-1 focus:ring-0 focus:border-primary transition-all duration-300 text-base placeholder:text-slate-300 font-light text-slate-900"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        name="mobile"
                                        required
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-0 border-b border-slate-200 py-3 px-1 focus:ring-0 focus:border-primary transition-all duration-300 text-base placeholder:text-slate-300 font-light text-slate-900"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Shared Password Fields */}
                    <div className={cn("grid", isPhotographer ? "grid-cols-2 gap-6" : "grid-cols-1 md:grid-cols-2 gap-6")}>
                        <div className={cn("relative", !isPhotographer && "flex flex-col gap-1 group")}>
                            {!isPhotographer && <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-1">Password</label>}
                            <div className={cn("relative w-full", !isPhotographer && "w-full")}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder={isPhotographer ? "Password" : "••••••••"}
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={cn(
                                        "w-full bg-transparent border-0 border-b focus:ring-0 focus:border-primary transition-all font-light text-slate-900",
                                        isPhotographer
                                            ? "border-slate-300 px-0 py-3 text-sm placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest"
                                            : "border-slate-200 py-3 px-1 text-base placeholder:text-slate-300"
                                    )}
                                />
                                {!isPhotographer && (
                                    <span
                                        className="material-symbols-outlined absolute right-2 bottom-3 text-slate-300 hover:text-primary transition-colors cursor-pointer text-lg"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={cn("relative", !isPhotographer && "flex flex-col gap-1 group")}>
                            {!isPhotographer && <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-1">Confirm Password</label>}
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirm_password"
                                placeholder={isPhotographer ? "Confirm" : "••••••••"}
                                required
                                value={formData.confirm_password}
                                onChange={handleInputChange}
                                className={cn(
                                    "w-full bg-transparent border-0 border-b focus:ring-0 focus:border-primary transition-all font-light text-slate-900",
                                    isPhotographer
                                        ? "border-slate-300 px-0 py-3 text-sm placeholder:text-slate-400 placeholder:uppercase placeholder:tracking-widest"
                                        : "border-slate-200 py-3 px-1 text-base placeholder:text-slate-300"
                                )}
                            />
                        </div>
                    </div>

                    {/* Terms */}
                    <div className={cn("flex items-center gap-3", isPhotographer ? "pt-4" : "pt-4")}>
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                name="terms"
                                id="terms"
                                required
                                checked={formData.terms}
                                onChange={handleInputChange}
                                className={cn(
                                    "appearance-none h-4 w-4 rounded-sm border border-slate-300 text-primary checked:bg-primary checked:border-primary focus:ring-primary/20 transition-all cursor-pointer relative",
                                    "before:content-[''] before:block before:w-1 bg-white before:h-2 before:absolute before:border-r-2 before:border-b-2 before:border-white before:top-[50%] before:left-[50%] before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:opacity-0 checked:before:opacity-100"
                                )}
                            />
                        </div>
                        <label htmlFor="terms" className={cn(
                            "cursor-pointer select-none",
                            isPhotographer
                                ? "text-[10px] uppercase tracking-widest text-slate-500 font-medium"
                                : "text-xs text-slate-500 font-light"
                        )}>
                            I accept the <Link to="/terms" className={cn(
                                "underline transition-colors hover:text-primary",
                                !isPhotographer && "text-primary font-medium underline-offset-4 decoration-primary/30"
                            )}>Terms &amp; Conditions</Link>
                        </label>
                    </div>

                    {/* Action Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                "w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all shadow-xl shadow-primary/10 flex justify-center items-center gap-2",
                                isPhotographer
                                    ? "luxury-tracking uppercase text-xs"
                                    : "duration-300 flex items-center justify-center gap-2 group",
                                isLoading && "opacity-80 pointer-events-none"
                            )}
                            style={isPhotographer ? { letterSpacing: '0.15em' } : {}}
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>{isPhotographer ? "Create Professional Account" : "Create Lab Account"}</span>
                            {!isPhotographer && !isLoading && (
                                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            )}
                        </button>
                    </div>
                </form>

                <div className={cn("text-center", isPhotographer ? "mt-8" : "mt-8")}>
                    <p className={cn(
                        "text-slate-400",
                        isPhotographer
                            ? "text-[10px] uppercase tracking-[0.2em]"
                            : "text-sm font-light"
                    )}>
                        {isPhotographer ? "Already part of the collective? " : "Already a member? "}
                        <Link to="/login" className="text-primary font-bold hover:underline transition-all">Log In</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default CreateAccountForm
