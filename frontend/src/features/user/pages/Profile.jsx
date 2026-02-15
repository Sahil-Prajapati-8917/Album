import { useState, useEffect } from 'react'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Loader2,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Twitter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { getUserProfile, updateUserProfile, getUser } from '@/services/api'
import { useToast } from "@/components/ui/use-toast"

const Profile = () => {
  const { toast } = useToast()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    personalName: '',
    studioName: '',
    email: '',
    mobileNumber: '',
    address: '',
    bio: '',
    specialization: '',
    website: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      youtube: '',
      twitter: ''
    }
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const userData = getUser()
      if (userData) setUser(userData)

      const profile = await getUserProfile()
      if (profile.success) {
        setFormData({
          personalName: profile.data.personalName || '',
          studioName: profile.data.studioName || '',
          email: profile.data.email || '',
          mobileNumber: profile.data.mobileNumber || '',
          address: profile.data.address || '',
          bio: profile.data.bio || '',
          specialization: profile.data.specialization || '',
          website: profile.data.website || '',
          socialMedia: profile.data.socialMedia || {
            instagram: '',
            facebook: '',
            youtube: '',
            twitter: ''
          }
        })
      }
    } catch (error) {
      console.error("Failed to load profile", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '')
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateUserProfile(formData)
      toast({
        title: "Profile updated",
        description: "Your profile details have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profile & Settings</h2>
          <p className="text-muted-foreground">
            Manage your personal information and studio details.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Click to upload a new avatar.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="relative group cursor-pointer">
              <Avatar className="h-32 w-32 border-4 border-muted">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-4xl">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-lg">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-5">
          <CardHeader>
            <CardTitle>Studio Information</CardTitle>
            <CardDescription>Details about your photography business.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studioName">Studio Name</Label>
                  <Input id="studioName" name="studioName" value={formData.studioName} onChange={handleChange} placeholder="e.g. Pixel Perfect Studios" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personalName">Contact Person</Label>
                  <Input id="personalName" name="personalName" value={formData.personalName} onChange={handleChange} placeholder="Your Full Name" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" value={formData.email} onChange={handleChange} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Phone Number</Label>
                  <Input id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Studio Address</Label>
                <Textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Full address of your studio..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio / Vision</Label>
                <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about your photography style..." className="min-h-[100px]" />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Social & Web</CardTitle>
          <CardDescription>Connect your social media profiles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" /> Website</Label>
              <Input name="website" value={formData.website} onChange={handleChange} placeholder="https://www.yourstudio.com" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Instagram className="h-3.5 w-3.5" /> Instagram</Label>
              <Input name="social_instagram" value={formData.socialMedia.instagram} onChange={handleChange} placeholder="@username" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Facebook className="h-3.5 w-3.5" /> Facebook</Label>
              <Input name="social_facebook" value={formData.socialMedia.facebook} onChange={handleChange} placeholder="facebook.com/page" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Youtube className="h-3.5 w-3.5" /> YouTube</Label>
              <Input name="social_youtube" value={formData.socialMedia.youtube} onChange={handleChange} placeholder="Channel URL" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile
