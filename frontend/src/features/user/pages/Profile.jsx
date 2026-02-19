import { useState } from 'react'
import {
  User,
  Mail,
  Camera,
  MapPin,
  Link as LinkIcon,
  Calendar,
  CheckCircle2,
  Shield,
  Phone,
  Building2,
  CreditCard,
  Download,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  MessageSquare,
  Briefcase,
  TrendingUp,
  ExternalLink,
  Edit2
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function Profile() {
  const [useCredits, setUseCredits] = useState(650)
  const totalCredits = 1000

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-8 pb-4">
        <div className="relative group">
          <Avatar className="h-40 w-40 border-8 border-background shadow-2xl ring-1 ring-border">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" />
            <AvatarFallback className="text-4xl bg-muted">JD</AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-2 right-2 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Camera className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h1 className="text-4xl font-black tracking-tight">Sahil Prajapati</h1>
            <CheckCircle2 className="h-6 w-6 text-primary fill-primary/10" />
          </div>
          <p className="text-xl text-muted-foreground font-medium">Sahil Photography Studio</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Joined January 2024
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              Pro Visionary Plan
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid gap-12">
        {/* 1. Basic Information Section */}
        <Card className="border-none shadow-xl bg-gradient-to-br from-background to-muted/20 overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <User className="h-6 w-6 text-primary" />
              Basic Information
            </CardTitle>
            <CardDescription>Manage your personal and business details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="fullName" defaultValue="Sahil Prajapati" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="studioName" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Studio / Lab Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="studioName" defaultValue="Sahil Photography Studio" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" defaultValue="sahil@example.com" disabled className="h-12 pl-12 bg-muted/30 border-dashed" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="mobile" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Mobile Number</Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="mobile" defaultValue="+91 98765 43210" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="whatsapp" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">WhatsApp Number</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="whatsapp" defaultValue="+91 98765 43210" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="gst" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">GST Number (Optional)</Label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="gst" placeholder="27XXXXX0000X1Z5" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="address" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Full Address</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                <Textarea id="address" defaultValue="402, Sunshine Business Park, Andheri East" className="min-h-[80px] pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <Label htmlFor="city" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">City</Label>
                <Input id="city" defaultValue="Mumbai" className="h-12 bg-background/50 border-muted focus:bg-background transition-all" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="state" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">State</Label>
                <Input id="state" defaultValue="Maharashtra" className="h-12 bg-background/50 border-muted focus:bg-background transition-all" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="pincode" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Pincode</Label>
                <Input id="pincode" defaultValue="400069" className="h-12 bg-background/50 border-muted focus:bg-background transition-all" />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button size="lg" className="px-10 h-12 font-bold rounded-full shadow-lg hover:shadow-primary/20">
                Update Information
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 2. Plan & Subscription Section */}
        <Card className="border-none shadow-xl bg-gradient-to-br from-background to-muted/20 overflow-hidden text-card-foreground">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-emerald-500" />
                Plan & Subscription
              </CardTitle>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200 font-bold px-4 py-1">
                ACTIVE
              </Badge>
            </div>
            <CardDescription>Monitor your credit usage and plan details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-2xl bg-background/40 border border-muted/50 space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Current Plan</p>
                <p className="text-xl font-black text-primary">Pro Visionary</p>
              </div>
              <div className="p-4 rounded-2xl bg-background/40 border border-muted/50 space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recharge Date</p>
                <p className="text-xl font-bold">15 Jan 2025</p>
              </div>
              <div className="p-4 rounded-2xl bg-background/40 border border-muted/50 space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Expiry Date</p>
                <p className="text-xl font-bold">15 Jan 2026</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600/70">Coins Used</p>
                <p className="text-xl font-black text-emerald-600">450 Coins</p>
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-3xl bg-muted/30 border border-muted-foreground/10">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold uppercase tracking-wider">Credit Usage</span>
                  </div>
                  <p className="text-3xl font-black">{totalCredits - useCredits} <span className="text-sm font-medium text-muted-foreground uppercase">Credits Left</span></p>
                </div>
                <p className="text-sm font-bold text-muted-foreground">Total: {totalCredits} Credits</p>
              </div>
              <Progress value={((totalCredits - useCredits) / totalCredits) * 100} className="h-3" />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
              <Button variant="outline" size="lg" className="rounded-full border-muted-foreground/20 hover:bg-muted font-bold gap-2">
                <Download className="h-4 w-4" />
                Download Latest Invoice
              </Button>
              <Button size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-700 font-bold px-12 shadow-lg shadow-emerald-500/20">
                Recharge Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 3. Social Media Links Section */}
        <Card className="border-none shadow-xl bg-gradient-to-br from-background to-muted/20 overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Globe className="h-6 w-6 text-blue-500" />
              Social Media Links
            </CardTitle>
            <CardDescription>Connect your online presence with your profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="social-whatsapp" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">WhatsApp</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                  <Input id="social-whatsapp" defaultValue="wa.me/919876543210" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="social-instagram" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Instagram</Label>
                <div className="relative">
                  <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-pink-500" />
                  <Input id="social-instagram" defaultValue="@sahil_photo" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="social-facebook" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Facebook</Label>
                <div className="relative">
                  <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
                  <Input id="social-facebook" defaultValue="facebook.com/sahilstudio" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="social-twitter" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Twitter / X</Label>
                <div className="relative">
                  <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-400" />
                  <Input id="social-twitter" defaultValue="x.com/sahil_p" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="social-youtube" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">YouTube</Label>
                <div className="relative">
                  <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-red-600" />
                  <Input id="social-youtube" defaultValue="youtube.com/@sahilclicks" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="social-website" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Website URL</Label>
                <div className="relative">
                  <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="social-website" defaultValue="www.sahilphotography.in" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="social-portfolio" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Portfolio Link</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="social-portfolio" defaultValue="pixfolio.me/sahil" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button size="lg" variant="secondary" className="px-10 h-12 font-bold rounded-full gap-2 border-muted hover:bg-muted transition-all">
                <Edit2 className="h-4 w-4" />
                Edit Social Links
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
