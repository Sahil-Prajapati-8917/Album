import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  ChevronDown
} from 'lucide-react'

const CreateAccount = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Create Your Account
            </h1>
            <p className="text-gray-600 text-sm">
              Join our community of professional photographers
            </p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="pl-10 pr-4 py-3"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Studio Name */}
            <div>
              <label htmlFor="studioName" className="block text-sm font-medium text-gray-700 mb-2">
                Studio Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  id="studioName"
                  name="studioName"
                  className="pl-10 pr-4 py-3"
                  placeholder="Enter your studio name"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                      +1 (US)
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Country Code</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>+1 (US)</DropdownMenuItem>
                    <DropdownMenuItem>+91 (India)</DropdownMenuItem>
                    <DropdownMenuItem>+44 (UK)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="pl-10 pr-4 py-3 rounded-l-none"
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="pl-10 pr-4 py-3"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full pl-10 pr-10 py-3 justify-between">
                      <span className="ml-7">Select Country</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>Select Country</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>United States</DropdownMenuItem>
                    <DropdownMenuItem>India</DropdownMenuItem>
                    <DropdownMenuItem>United Kingdom</DropdownMenuItem>
                    <DropdownMenuItem>Canada</DropdownMenuItem>
                    <DropdownMenuItem>Australia</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full pl-10 pr-10 py-3 justify-between">
                      <span className="ml-7">Select State</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>Select State</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>California</DropdownMenuItem>
                    <DropdownMenuItem>Texas</DropdownMenuItem>
                    <DropdownMenuItem>New York</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full pl-10 pr-10 py-3 justify-between">
                      <span className="ml-7">Select City</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>Select City</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Los Angeles</DropdownMenuItem>
                    <DropdownMenuItem>San Francisco</DropdownMenuItem>
                    <DropdownMenuItem>New York City</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* 6-Digit Pincode */}
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                6-Digit Pincode *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="pl-10 pr-4 py-3"
                  placeholder="Enter 6-digit pincode"
                  maxLength={6}
                />
              </div>
            </div>

            {/* Create 4-Digit PIN */}
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                Create 4-Digit PIN *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  id="pin"
                  name="pin"
                  className="pl-10 pr-12 py-3"
                  placeholder="Enter 4-digit PIN"
                  maxLength={4}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Toggle PIN visibility"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Confirm 4-Digit PIN */}
            <div>
              <label htmlFor="confirmPin" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm 4-Digit PIN *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  id="confirmPin"
                  name="confirmPin"
                  className="pl-10 pr-12 py-3"
                  placeholder="Confirm your PIN"
                  maxLength={4}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Toggle PIN visibility"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Join Button - Full Width */}
            <div className="col-span-full mt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg focus:ring-4 focus:ring-blue-300 hover:shadow-lg transition-all duration-200"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
