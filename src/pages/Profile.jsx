import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  User,
  Camera,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Twitter,
  Save,
  CheckCircle,
} from 'lucide-react'
import { getUserProfile, updateUserProfile, getUser } from '@/services/api'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [profileData, setProfileData] = useState({
    personalName: '',
    studioName: '',
    address: '',
    mobileNumber: '',
    email: '',
    profilePicture: null,
    socialMedia: {
      instagram: '',
      facebook: '',
      youtube: '',
      whatsapp: '',
      twitter: ''
    }
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const userData = getUser()
        if (userData) {
          setUser(userData)
          
          // Get full profile data from API
          const response = await getUserProfile()
          if (response.success) {
            setProfileData({
              personalName: response.data.personalName || '',
              studioName: response.data.studioName || '',
              address: response.data.address || '',
              mobileNumber: response.data.mobileNumber || '',
              email: response.data.email || '',
              profilePicture: response.data.profilePicture || null,
              socialMedia: response.data.socialMedia || {
                instagram: '',
                facebook: '',
                youtube: '',
                whatsapp: '',
                twitter: ''
              }
            })
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfileData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSocialMediaChange = (platform, value) => {
    setProfileData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profilePicture: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateUserProfile(profileData)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving profile:', error)
      // You could show an error message here
    } finally {
      setIsSaving(false)
    }
  }

  const socialMediaPlatforms = [
    { key: 'instagram', name: 'Instagram', icon: Instagram, placeholder: '@username' },
    { key: 'facebook', name: 'Facebook', icon: Facebook, placeholder: 'facebook.com/username' },
    { key: 'youtube', name: 'YouTube', icon: Youtube, placeholder: 'youtube.com/channel/...' },
    { key: 'whatsapp', name: 'WhatsApp Channel', icon: MessageCircle, placeholder: 'wa.me/123...' },
    { key: 'twitter', name: 'Twitter', icon: Twitter, placeholder: '@username' }
  ]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account information and social media links</p>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Picture */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                    {profileData.profilePicture ? (
                      <img
                        src={profileData.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <label
                    htmlFor="profile-picture"
                    className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700"
                  >
                    <Camera className="h-4 w-4" />
                  </label>
                  <input
                    type="file"
                    id="profile-picture"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Upload a profile picture. Recommended size: 400x400px
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Name
              </label>
              <Input
                type="text"
                name="personalName"
                value={profileData.personalName}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Studio Name
              </label>
              <Input
                type="text"
                name="studioName"
                value={profileData.studioName}
                onChange={handleInputChange}
                placeholder="Enter studio name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <Input
                type="tel"
                name="mobileNumber"
                value={profileData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter mobile number"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your address"
              />
            </div>
          </div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Social Media Links</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialMediaPlatforms.map((platform) => (
              <div key={platform.key} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <platform.icon className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {platform.name}
                  </label>
                  <Input
                    type="text"
                    value={profileData.socialMedia[platform.key]}
                    onChange={(e) => handleSocialMediaChange(platform.key, e.target.value)}
                    placeholder={platform.placeholder}
                    className="text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Saved Successfully!
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
