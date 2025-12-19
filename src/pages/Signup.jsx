import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import Header from '../components/Header'
// import Footer from '../components/Footer'

const Signup = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
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

  return (
    // <Header />
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-xl max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
          </div>
        </div>

        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold">
            {currentStep === 1 ? 'Personal Details' : 'Business Details'}
          </h3>
        </div>

        {currentStep === 1 && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-2">
              <Button onClick={nextStep} className="w-full">
                Next
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studioName">Studio Name</Label>
              <Input
                id="studioName"
                name="studioName"
                type="text"
                value={formData.studioName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-span-2 flex space-x-4">
              <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                Previous
              </Button>
              <Button type="submit" className="flex-1">
                Create Account
              </Button>
            </div>
          </form>
        )}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
    // <Footer />
  )
}

export default Signup
