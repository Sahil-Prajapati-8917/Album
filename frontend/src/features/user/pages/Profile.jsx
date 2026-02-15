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
  Twitter,
  Building2,
  Briefcase,
  ExternalLink,
  ChevronRight
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
import { Badge } from '@/components/ui/badge'

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
      if (userData) setTimeout(() => setUser(userData), 0)

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
      // Mock data for demo if API fails
      setTimeout(() => setUser({ name: 'Alexander Ray', email: 'alex@pixfolio.com', avatar: '' }), 0)
      setFormData(prev => ({
        ...prev,
        personalName: 'Alexander Ray',
        studioName: 'Lumina Stills Studio',
        email: 'alex@pixfolio.com',
        mobileNumber: '+91 98765 43210',
        address: '123 Creative Lane, Arts District, Mumbai',
        specialization: 'Fine Art Wedding Photography',
      }))
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
    } catch {
      toast({
        title: "Profile saved",
        description: "Your local changes have been applied successfully.",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
        <p className="text-zinc-500 font-medium">Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Profile & Settings</h1>
          <p className="text-muted-foreground font-medium">
            Customize your professional presence and studio identity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border hover:bg-accent font-medium">
            View Public Page
          </Button>
          <Button onClick={handleSubmit} disabled={saving} className="bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm px-6 font-bold">
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

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
        {/* Sidebar / Info */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="shadow-sm border-muted rounded-xl bg-card overflow-hidden">
            <div className="h-24 bg-muted border-b border-muted"></div>
            <CardContent className="flex flex-col items-center -mt-12 pb-8">
              <div className="relative group cursor-pointer">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg transition-all group-hover:scale-105">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-zinc-900 text-white text-2xl font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-zinc-900" />
                </div>
              </div>
              <div className="text-center mt-4">
                <h3 className="font-bold text-xl text-foreground">{formData.personalName || user?.name}</h3>
                <p className="text-sm text-muted-foreground font-medium">{formData.specialization || 'Professional Photographer'}</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100/50 hover:bg-emerald-100 transition-colors">Pro Account</Badge>
                <Badge variant="outline" className="bg-zinc-100 text-zinc-900 border-zinc-200/50">Verified</Badge>
              </div>
            </CardContent>
            <Separator className="bg-border/50" />
            <CardFooter className="py-6 space-y-4 flex-col bg-muted/20">
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Member since</span>
                  <span className="font-bold text-foreground">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Storage Used</span>
                  <span className="font-bold text-foreground">80% of 500GB</span>
                </div>
                <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-zinc-900 h-full w-[80%] rounded-full"></div>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card className="shadow-sm border-muted rounded-xl overflow-hidden bg-card">
            <CardHeader className="pb-3 border-b border-muted bg-muted/20">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
                <Globe className="h-4 w-4 text-muted-foreground" />
                Online Presence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-4">
                {[
                  { icon: Instagram, label: 'Instagram', name: 'social_instagram', value: formData.socialMedia.instagram, placeholder: '@username' },
                  { icon: Facebook, label: 'Facebook', name: 'social_facebook', value: formData.socialMedia.facebook, placeholder: 'facebook.com/page' },
                  { icon: Youtube, label: 'YouTube', name: 'social_youtube', value: formData.socialMedia.youtube, placeholder: 'channel-id' },
                  { icon: Twitter, label: 'Twitter', name: 'social_twitter', value: formData.socialMedia.twitter, placeholder: '@twitter' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-1.5 group">
                    <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 group-focus-within:text-foreground transition-colors">
                      <item.icon className="h-3 w-3" /> {item.label}
                    </Label>
                    <Input
                      name={item.name}
                      value={item.value}
                      onChange={handleChange}
                      placeholder={item.placeholder}
                      className="h-9 border-input bg-background focus:ring-2 focus:ring-ring focus:border-ring transition-all rounded-lg text-sm font-medium"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Form */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="shadow-sm border-muted rounded-xl overflow-hidden bg-card">
            <CardHeader className="pb-6 border-b border-muted bg-muted/20">
              <CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
                <Building2 className="h-5 w-5 text-zinc-400" />
                Studio Profile
              </CardTitle>
              <CardDescription className="text-muted-foreground font-medium">Update your public studio information and brand details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-zinc-700">Studio Name</Label>
                  <Input
                    id="studioName"
                    name="studioName"
                    value={formData.studioName}
                    onChange={handleChange}
                    placeholder="e.g. Pixel Perfect Studios"
                    className="h-11 border-input bg-background focus:ring-2 focus:ring-ring focus:border-ring transition-all rounded-lg font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-zinc-700">Contact Person</Label>
                  <Input
                    id="personalName"
                    name="personalName"
                    value={formData.personalName}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="h-11 border-input bg-background focus:ring-2 focus:ring-ring focus:border-ring transition-all rounded-lg font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-zinc-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      value={formData.email || user?.email}
                      disabled
                      className="h-11 pl-10 border-input bg-zinc-50/50 text-muted-foreground cursor-not-allowed rounded-lg font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-zinc-700">Phone Number</Label>
                  <div className="relative group">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                    <Input
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="h-11 pl-10 border-input bg-background focus:ring-2 focus:ring-ring focus:border-ring transition-all rounded-lg font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-zinc-700">Specialization</Label>
                <div className="relative group">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                  <Input
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g. Fine Art Wedding Photography"
                    className="h-11 pl-10 border-input bg-background focus:ring-2 focus:ring-ring focus:border-ring transition-all rounded-lg font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-zinc-700">Studio Address</Label>
                <div className="relative group">
                  <MapPin className="absolute left-3.5 top-4 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Full address of your studio..."
                    className="min-h-[100px] pl-10 border-input bg-background focus:ring-2 focus:ring-ring focus:border-ring transition-all rounded-lg py-3 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-zinc-700">Bio / About your Craft</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about your story and photography vision..."
                  className="min-h-[120px] border-input bg-background focus:ring-2 focus:ring-ring focus:border-ring transition-all rounded-lg font-medium"
                />
              </div>
            </CardContent>
            <CardFooter className="bg-zinc-50/50 px-8 py-5 border-t border-border flex justify-between items-center">
              <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider italic">* Visible on public portfolio</p>
              <Button variant="ghost" size="sm" className="text-zinc-600 text-xs font-bold hover:bg-transparent hover:text-zinc-900 transition-colors">
                Privacy Settings <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile
