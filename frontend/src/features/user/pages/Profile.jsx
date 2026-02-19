import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  MapPin,
  Phone,
  Building2,
  Briefcase,
  CameraIcon,
  MessageSquare,
  CheckCircle2,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Globe,
  Link,
  FileText,
  CreditCard,
  Zap,
  Calendar,
  Download,
  ExternalLink,
  MessageCircle,
  Plus,
  Pencil,
  Save,
  X
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from 'sonner'

export default function Profile() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [creditUsage] = useState(65)

  // States for Edit Modals
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isEditSocialOpen, setIsEditSocialOpen] = useState(false)

  // Profile Data State
  const [profileData, setProfileData] = useState({
    fullName: "Sahil Prajapati",
    studioName: "Sahil Photography Studio",
    email: "sahil@example.com",
    mobile: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    gst: "27XXXXX0000X1Z5",
    address: "402, Sunshine Business Park, Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400069",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"
  })

  // Social Links State
  const [socialLinks, setSocialLinks] = useState({
    whatsapp: "wa.me/919876543210",
    instagram: "instagram.com/sahil_studio",
    facebook: "fb.com/sahilphotography",
    twitter: "twitter.com/sahil_p",
    youtube: "youtube.com/c/SahilVlogs",
    website: "www.sahilstudio.com",
    portfolio: "pixfolio.com/u/sahil"
  })

  // Temp states for edits
  const [tempProfile, setTempProfile] = useState(profileData)
  const [tempSocial, setTempSocial] = useState(socialLinks)

  const handleSaveProfile = () => {
    setProfileData(tempProfile)
    setIsEditProfileOpen(false)
    toast.success("Profile updated successfully")
  }

  const handleSaveSocial = () => {
    setSocialLinks(tempSocial)
    setIsEditSocialOpen(false)
    toast.success("Social links updated successfully")
  }

  const handlePhotoClick = () => {
    fileInputRef.current.click()
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData({ ...profileData, photo: reader.result })
        toast.success("Photo updated successfully")
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex-1 space-y-6 pb-12">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handlePhotoChange}
      />

      {/* 🔹 1. Basic Information Section */}
      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">Basic Information</CardTitle>
            <CardDescription>Manage your personal and business presence.</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              setTempProfile(profileData)
              setIsEditProfileOpen(true)
            }}
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative inline-block group cursor-pointer" onClick={handlePhotoClick}>
              <Avatar className="h-24 w-24 border-2 border-background shadow-sm ring-1 ring-border transition-opacity hover:opacity-80">
                <AvatarImage src={profileData.photo} />
                <AvatarFallback className="text-2xl bg-muted">SP</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
                <CameraIcon className="h-6 w-6 text-white" />
              </div>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-1 -right-1 rounded-full shadow-md h-8 w-8 border border-background"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePhotoClick()
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Profile Photo / Lab Logo</h4>
              <p className="text-xs text-muted-foreground">Click to change. JPG, GIF or PNG. 1MB max.</p>
              <Button variant="link" size="sm" className="h-auto p-0 text-primary" onClick={handlePhotoClick}>
                Change Photo
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Full Name", value: profileData.fullName, icon: User },
              { label: "Studio Name", value: profileData.studioName, icon: Building2 },
              { label: "Email", value: profileData.email, icon: Mail },
              { label: "Mobile", value: profileData.mobile, icon: Phone },
              { label: "WhatsApp", value: profileData.whatsapp, icon: MessageCircle },
              { label: "GST", value: profileData.gst || "Not provided", icon: FileText },
            ].map((field) => (
              <div key={field.label} className="space-y-1.5 p-3 rounded-md bg-muted/30 border border-transparent hover:border-border transition-colors">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <field.icon className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{field.label}</span>
                </div>
                <p className="text-sm font-semibold truncate">{field.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Full Address</h4>
            </div>
            <div className="p-4 rounded-md bg-muted/30 border">
              <p className="text-sm">{profileData.address}</p>
              <p className="text-sm font-medium mt-1">{profileData.city}, {profileData.state} - {profileData.pincode}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 2. Plan & Subscription Section */}
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl">Plan & Subscription</CardTitle>
              <CardDescription>Manage your subscription and credits.</CardDescription>
            </div>
            <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Active Plan</p>
              <p className="text-lg font-bold">Pro Visionary</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Plan Status</p>
              <p className="text-lg font-bold text-emerald-600">Active</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recharge Date</p>
              <p className="text-lg font-medium">Jan 15, 2025</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Expiry Date</p>
              <p className="text-lg font-medium">Jan 15, 2026</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Credit Usage</h4>
                <p className="text-xs text-muted-foreground">You have used 650 out of 1000 credits.</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">350 <span className="text-sm font-normal text-muted-foreground">Credits Left</span></p>
              </div>
            </div>

            <div className="space-y-2">
              <Progress value={creditUsage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Used: 650</span>
                <span>Total: 1000</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <CreditCard className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase">Coins Used</p>
                  <p className="font-bold">2,450 Coins</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Latest Invoice
                </Button>
                <Button size="sm" className="gap-2" onClick={() => navigate('/recharge')}>
                  <Plus className="h-4 w-4" />
                  Recharge Now
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 3. Social Media Links Section */}
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl">Social Media Links</CardTitle>
              <CardDescription>Connect with your clients across platforms.</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                setTempSocial(socialLinks)
                setIsEditSocialOpen(true)
              }}
            >
              <Pencil className="h-4 w-4" />
              Edit Social Links
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "WhatsApp", value: socialLinks.whatsapp, icon: MessageCircle, color: "text-emerald-500" },
              { label: "Instagram", value: socialLinks.instagram, icon: Instagram, color: "text-pink-500" },
              { label: "Facebook", value: socialLinks.facebook, icon: Facebook, color: "text-blue-600" },
              { label: "Twitter / X", value: socialLinks.twitter, icon: Twitter, color: "text-sky-500" },
              { label: "YouTube", value: socialLinks.youtube, icon: Youtube, color: "text-red-600" },
              { label: "Website", value: socialLinks.website, icon: Globe, color: "text-indigo-500" },
              { label: "Portfolio", value: socialLinks.portfolio, icon: Link, color: "text-slate-600" },
            ].map((social) => (
              <div key={social.label} className="flex items-center gap-3 p-3 border rounded-md bg-muted/20 hover:bg-muted/40 transition-colors">
                <social.icon className={`h-5 w-5 ${social.color}`} />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-medium text-muted-foreground">{social.label}</p>
                  <p className="text-sm truncate font-medium">{social.value}</p>
                </div>
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-40" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Modal */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile Information</DialogTitle>
            <DialogDescription>
              Update your personal and business contact details here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-fullName">Full Name</Label>
                <Input
                  id="edit-fullName"
                  value={tempProfile.fullName}
                  onChange={(e) => setTempProfile({ ...tempProfile, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-studioName">Studio Name</Label>
                <Input
                  id="edit-studioName"
                  value={tempProfile.studioName}
                  onChange={(e) => setTempProfile({ ...tempProfile, studioName: e.target.value })}
                />
              </div>
              <div className="space-y-2 text-muted-foreground">
                <Label htmlFor="edit-email">Email Address</Label>
                <Input
                  id="edit-email"
                  value={tempProfile.email}
                  disabled
                  className="bg-muted/50"
                />
                <p className="text-[10px]">Email cannot be changed contact support.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-mobile">Mobile Number</Label>
                <Input
                  id="edit-mobile"
                  value={tempProfile.mobile}
                  onChange={(e) => setTempProfile({ ...tempProfile, mobile: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-whatsapp">WhatsApp Number</Label>
                <Input
                  id="edit-whatsapp"
                  value={tempProfile.whatsapp}
                  onChange={(e) => setTempProfile({ ...tempProfile, whatsapp: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-gst">GST Number</Label>
                <Input
                  id="edit-gst"
                  value={tempProfile.gst}
                  onChange={(e) => setTempProfile({ ...tempProfile, gst: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Street Address</Label>
              <Textarea
                id="edit-address"
                value={tempProfile.address}
                onChange={(e) => setTempProfile({ ...tempProfile, address: e.target.value })}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="edit-city">City</Label>
                <Input
                  id="edit-city"
                  value={tempProfile.city}
                  onChange={(e) => setTempProfile({ ...tempProfile, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-state">State</Label>
                <Input
                  id="edit-state"
                  value={tempProfile.state}
                  onChange={(e) => setTempProfile({ ...tempProfile, state: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-pincode">Pincode</Label>
                <Input
                  id="edit-pincode"
                  value={tempProfile.pincode}
                  onChange={(e) => setTempProfile({ ...tempProfile, pincode: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProfile} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Social Links Modal */}
      <Dialog open={isEditSocialOpen} onOpenChange={setIsEditSocialOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Social Links</DialogTitle>
            <DialogDescription>
              Update your social media handles and website links.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="social-whatsapp" className="text-right text-xs">WhatsApp</Label>
              <Input
                id="social-whatsapp"
                value={tempSocial.whatsapp}
                onChange={(e) => setTempSocial({ ...tempSocial, whatsapp: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="social-instagram" className="text-right text-xs">Instagram</Label>
              <Input
                id="social-instagram"
                value={tempSocial.instagram}
                onChange={(e) => setTempSocial({ ...tempSocial, instagram: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="social-facebook" className="text-right text-xs">Facebook</Label>
              <Input
                id="social-facebook"
                value={tempSocial.facebook}
                onChange={(e) => setTempSocial({ ...tempSocial, facebook: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="social-twitter" className="text-right text-xs">Twitter / X</Label>
              <Input
                id="social-twitter"
                value={tempSocial.twitter}
                onChange={(e) => setTempSocial({ ...tempSocial, twitter: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="social-youtube" className="text-right text-xs">YouTube</Label>
              <Input
                id="social-youtube"
                value={tempSocial.youtube}
                onChange={(e) => setTempSocial({ ...tempSocial, youtube: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="social-website" className="text-right text-xs">Website</Label>
              <Input
                id="social-website"
                value={tempSocial.website}
                onChange={(e) => setTempSocial({ ...tempSocial, website: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="social-portfolio" className="text-right text-xs">Portfolio</Label>
              <Input
                id="social-portfolio"
                value={tempSocial.portfolio}
                onChange={(e) => setTempSocial({ ...tempSocial, portfolio: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditSocialOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSocial} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
