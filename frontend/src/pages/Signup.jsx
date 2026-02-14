import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Phone, Mail, Lock, Building, MapPin, Globe, Eye, EyeOff, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '../components/Logo'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const LOCATION_DATA = {
  "India": {
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "West Delhi"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"]
  },
  "United States": {
    "California": ["Los Angeles", "San Francisco", "San Diego"],
    "New York": ["New York City", "Buffalo", "Rochester"],
    "Texas": ["Houston", "Austin", "Dallas"]
  }
}

const Signup = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    studioName: '',
    phoneNumber: '',
    email: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    password: '',
    confirmPassword: ''
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
      } else if (name === 'state') {
        newData.city = ''
      }

      return newData
    })
  }

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate step 1
      if (!formData.fullName || !formData.phoneNumber || !formData.email || !formData.password || !formData.confirmPassword) {
        alert('Please fill all personal details')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match')
        return
      }
    }
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simulate successful account creation
    console.log('Account created with data:', formData)

    // Store user data in localStorage (mock user creation)
    const userData = {
      name: formData.fullName,
      email: formData.email,
      studioName: formData.studioName,
      phone: formData.phoneNumber,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      password: formData.password, // Note: In real app, never store plain password
      createdAt: new Date().toISOString()
    }

    localStorage.setItem('user', JSON.stringify(userData))

    // Redirect to dashboard after successful account creation
    navigate('/dashboard')
  }

  // Get options for dropdowns
  const countries = Object.keys(LOCATION_DATA)
  const states = formData.country ? Object.keys(LOCATION_DATA[formData.country] || {}) : []
  const cities = (formData.country && formData.state) ? (LOCATION_DATA[formData.country][formData.state] || []) : []

  return (
    <div className="min-h-screen bg-white dark:bg-ebony flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link to="/" className="flex items-center justify-center space-x-3 mb-8 group">
            <Logo className="h-12 w-auto group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-serif font-bold tracking-widest uppercase text-black dark:text-white">Pixfolio</span>
          </Link>
          <h2 className="text-4xl font-serif text-[#181611] dark:text-white italic">
            Create Account
          </h2>
          <p className="mt-4 text-sm text-gray-500 font-light tracking-wide uppercase">
            Join our exclusive community of artists
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-[#2a261d] py-10 px-8 shadow-2xl rounded-2xl border border-gold/10 hover:border-gold/30 transition-all"
        >
          {/* Progress Indicator */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${currentStep >= 1 ? 'bg-gold text-white scale-110 shadow-lg shadow-gold/20' : 'bg-gray-100 text-gray-400'}`}>
                1
              </div>
              <div className={`w-16 h-0.5 transition-all duration-500 ${currentStep >= 2 ? 'bg-gold' : 'bg-gray-100'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${currentStep >= 2 ? 'bg-gold text-white scale-110 shadow-lg shadow-gold/20' : 'bg-gray-100 text-gray-400'}`}>
                2
              </div>
            </div>
          </div>

          <div className="mb-8 text-center">
            <h3 className="text-sm uppercase tracking-widest text-gold font-bold">
              {currentStep === 1 ? 'Personal Details' : 'Business Details'}
            </h3>
          </div>

          {currentStep === 1 && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-1">
                <Label htmlFor="fullName" className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Full Name</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="pl-9 h-11 text-sm border-gray-100 focus:border-gold/50"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <Label htmlFor="phoneNumber" className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Phone</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="pl-9 h-11 text-sm border-gray-100 focus:border-gold/50"
                    placeholder="+1 (555) 000"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Email Address</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-9 h-11 text-sm border-gray-100 focus:border-gold/50"
                    placeholder="artist@pixfolio.com"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <Label htmlFor="password" className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Password</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="pl-9 pr-9 h-11 text-sm border-gray-100 focus:border-gold/50"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="h-auto p-1 text-gray-400 hover:text-gold"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <Label htmlFor="confirmPassword" className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Confirm</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="pl-9 pr-9 h-11 text-sm border-gray-100 focus:border-gold/50"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="h-auto p-1 text-gray-400 hover:text-gold"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-span-2 pt-4">
                <Button onClick={nextStep} className="w-full h-12 bg-gold hover:bg-gold/90 text-white font-bold uppercase tracking-widest text-xs shadow-lg shadow-gold/20">
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div className="col-span-2">
                <Label htmlFor="studioName" className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Studio Name</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="studioName"
                    name="studioName"
                    type="text"
                    value={formData.studioName}
                    onChange={handleInputChange}
                    required
                    className="pl-9 h-11 text-sm border-gray-100 focus:border-gold/50"
                    placeholder="Dreamscape Studio"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <Label htmlFor="country" className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Country</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Globe className="h-4 w-4 text-gray-400" />
                  </div>
                  <Select onValueChange={(v) => handleSelectChange('country', v)} value={formData.country}>
                    <SelectTrigger className="pl-9 h-11 text-sm border-gray-100 focus:border-gold/50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="col-span-1">
                <Label htmlFor="state" className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">State</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <Select
                    onValueChange={(v) => handleSelectChange('state', v)}
                    value={formData.state}
                    disabled={!formData.country}
                  >
                    <SelectTrigger className="pl-9 h-11 text-sm border-gray-100 focus:border-gold/50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="col-span-1">
                <Label htmlFor="city" className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">City</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <Select
                    onValueChange={(v) => handleSelectChange('city', v)}
                    value={formData.city}
                    disabled={!formData.state}
                  >
                    <SelectTrigger className="pl-9 h-11 text-sm border-gray-100 focus:border-gold/50">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(ct => (
                        <SelectItem key={ct} value={ct}>{ct}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="col-span-1">
                <Label htmlFor="pincode" className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Pincode</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    className="pl-9 h-11 text-sm border-gray-100 focus:border-gold/50"
                    placeholder="110001"
                  />
                </div>
              </div>
              <div className="col-span-2 flex space-x-4 pt-4">
                <Button type="button" onClick={prevStep} variant="outline" className="flex-1 h-12 border-gold/30 text-gold hover:bg-gold/5 font-bold uppercase tracking-widest text-xs">
                  Previous
                </Button>
                <Button type="submit" className="flex-1 h-12 bg-gold hover:bg-gold/90 text-white font-bold uppercase tracking-widest text-xs shadow-lg shadow-gold/20">
                  Complete
                </Button>
              </div>
            </form>
          )}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-light">
              Already a member? <Link to="/login" className="text-gold hover:text-gold/80 font-bold transition-colors">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Signup
