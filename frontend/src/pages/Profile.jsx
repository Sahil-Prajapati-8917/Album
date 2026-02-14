import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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
  Award,
  ShieldCheck,
  Mail,
  Phone,
  Building,
  MapPin,
  Lock,
  Sparkles,
  Globe
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
    bio: 'Capturing life\'s most precious moments through a premium lens. Specialized in high-end wedding and cinematic visual storytelling.',
    specialization: 'Wedding & Cinematic Master',
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
          const response = await getUserProfile()
          if (response.success) {
            setProfileData(prev => ({
              ...prev,
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
            }))
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#181611] dark:text-white italic">Curator Profile</h1>
          <p className="mt-2 text-sm text-gray-500 font-light tracking-wide uppercase">Defining your artistic identity</p>
        </div>
        <div className="flex items-center text-gold bg-gold/5 px-4 py-2 rounded-full border border-gold/10">
          <Award className="h-4 w-4 mr-2" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Verified Artist</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-[#2a261d] rounded-3xl border border-gold/10 p-8 text-center"
          >
            <div className="relative inline-block group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gold/20 p-1 mb-4 shadow-xl">
                {profileData.profilePicture ? (
                  <img src={profileData.profilePicture} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="w-full h-full bg-pearl dark:bg-ebony flex items-center justify-center rounded-full text-gold">
                    <User className="h-12 w-12" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-4 right-0 w-10 h-10 bg-white dark:bg-[#181611] rounded-full border border-gold/20 shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Camera className="h-4 w-4 text-gold" />
                <input type="file" id="profile-picture" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <h3 className="text-2xl font-serif text-[#181611] dark:text-white mt-4">{profileData.personalName || 'Visual Artist'}</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold mt-1">{profileData.specialization}</p>

            <div className="mt-8 flex justify-center space-x-3">
              {socialMediaPlatforms.slice(0, 3).map(platform => (
                <Button key={platform.key} variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-gray-400 hover:text-gold hover:bg-gold/5 border border-gold/5">
                  <platform.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="bg-gold/5 rounded-3xl p-8 border border-gold/10">
            <div className="flex items-center mb-6">
              <ShieldCheck className="h-4 w-4 text-gold mr-3" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">Security Snapshot</h4>
            </div>
            <p className="text-xs text-gray-500 font-light italic mb-6">Your data is secured with industry-standard encryption protocols.</p>
            <Button variant="outline" className="w-full border-gold/20 text-gold hover:bg-gold/5 h-12 text-[10px] font-bold uppercase tracking-widest">
              <Lock className="h-3.5 w-3.5 mr-2" />
              Update Passkey
            </Button>
          </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-[#2a261d] rounded-3xl border border-gold/10 p-10"
          >
            <div className="mb-10">
              <h2 className="text-2xl font-serif italic text-gray-900 dark:text-white">Artistic Details</h2>
              <div className="w-12 h-px bg-gold mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Personal Name</label>
                <Input
                  name="personalName"
                  value={profileData.personalName}
                  onChange={handleInputChange}
                  className="h-12 border-gold/10 focus:border-gold bg-pearl/30 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Studio Name</label>
                <Input
                  name="studioName"
                  value={profileData.studioName}
                  onChange={handleInputChange}
                  className="h-12 border-gold/10 focus:border-gold bg-pearl/30 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                <Input
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="h-12 border-gold/10 focus:border-gold bg-pearl/30 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Mobile Number</label>
                <Input
                  name="mobileNumber"
                  value={profileData.mobileNumber}
                  onChange={handleInputChange}
                  className="h-12 border-gold/10 focus:border-gold bg-pearl/30 rounded-xl"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Studio Address</label>
                <Textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="min-h-[80px] border-gold/10 focus:border-gold bg-pearl/30 rounded-xl"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Bio / Vision</label>
                <Textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  className="min-h-[120px] border-gold/10 focus:border-gold bg-pearl/30 rounded-xl py-4"
                />
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gold hover:bg-gold/90 text-white h-14 px-12 rounded-xl font-serif italic text-lg shadow-xl shadow-gold/20"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                ) : saveSuccess ? (
                  <CheckCircle className="h-5 w-5 mr-3" />
                ) : (
                  <Save className="h-5 w-5 mr-3" />
                )}
                {isSaving ? 'Preserving...' : saveSuccess ? 'Vision Saved' : 'Save Legacy Details'}
              </Button>
            </div>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#2a261d] rounded-3xl border border-gold/10 p-10"
          >
            <div className="mb-10">
              <h2 className="text-xl font-serif italic text-gray-900 dark:text-white">Social Connections</h2>
              <div className="w-12 h-px bg-gold mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialMediaPlatforms.map((platform) => (
                <div key={platform.key} className="space-y-2">
                  <label className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                    <platform.icon className="h-3.5 w-3.5 mr-2 text-gold/60" />
                    {platform.name}
                  </label>
                  <Input
                    value={profileData.socialMedia[platform.key]}
                    onChange={(e) => handleSocialMediaChange(platform.key, e.target.value)}
                    placeholder={platform.placeholder}
                    className="h-10 border-gold/10 focus:border-gold bg-pearl/30 rounded-xl text-xs"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Profile
