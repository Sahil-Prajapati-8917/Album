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
  Edit2,
  CameraIcon
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Profile() {
  const [useCredits, setUseCredits] = useState(650)
  const totalCredits = 1000

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Left Column: Summary Card (ca. 30%) */}
        <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
          <Card className="border-none shadow-2xl bg-gradient-to-b from-background to-muted/20 overflow-hidden">
            <div className="h-32 bg-primary/10 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>
            <CardContent className="relative -mt-16 text-center space-y-6 pb-8 px-6">
              <div className="relative inline-block group">
                <Avatar className="h-32 w-32 border-4 border-background shadow-2xl ring-1 ring-border mx-auto transition-transform duration-300 group-hover:scale-105">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" />
                  <AvatarFallback className="text-4xl bg-muted">SP</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-1 right-1 rounded-full shadow-lg h-9 w-9 border-2 border-background opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <CameraIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-2xl font-black tracking-tight">Sahil Prajapati</h2>
                  <CheckCircle2 className="h-5 w-5 text-primary fill-primary/10" />
                </div>
                <p className="text-sm font-bold text-muted-foreground/80 uppercase tracking-widest">Sahil Photography Studio</p>
              </div>

              <Separator className="bg-muted-foreground/10" />

              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <span>Joined January 2024</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/5 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-emerald-500" />
                  </div>
                  <span>Pro Visionary Plan</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <div className="h-8 w-8 rounded-lg bg-blue-500/5 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-blue-500" />
                  </div>
                  <span>Mumbai, India</span>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full rounded-2xl h-11 border-muted-foreground/20 hover:bg-muted font-bold transition-all">
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Credit Overview Widget */}
          <Card className="border-none shadow-xl bg-primary text-primary-foreground p-5 rounded-3xl">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs font-black uppercase tracking-widest opacity-80">Credits Available</p>
                <TrendingUp className="h-4 w-4 opacity-80" />
              </div>
              <p className="text-3xl font-black">{totalCredits - useCredits} <span className="text-xs font-bold opacity-60">/ {totalCredits}</span></p>
              <div className="space-y-2">
                <Progress value={((totalCredits - useCredits) / totalCredits) * 100} className="h-1.5 bg-white/20 indicator-white" />
                <p className="text-[10px] font-bold opacity-70">Next recharge due in 15 days</p>
              </div>
            </div>
          </Card>
        </aside>

        {/* Right Column: Main Content (ca. 70%) */}
        <main className="flex-1 w-full space-y-8">
          <Tabs defaultValue="personal" className="w-full">
            <div className="bg-muted/30 p-1.5 rounded-2xl border border-muted-foreground/5 mb-8 inline-flex">
              <TabsList className="bg-transparent h-12 gap-1 p-0">
                <TabsTrigger
                  value="personal"
                  className="rounded-xl px-5 h-9 data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:text-primary gap-2 font-bold transition-all text-sm"
                >
                  <User className="h-3.5 w-3.5" />
                  Personal
                </TabsTrigger>
                <TabsTrigger
                  value="recharge"
                  className="rounded-xl px-5 h-9 data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:text-primary gap-2 font-bold transition-all text-sm"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  Recharge
                </TabsTrigger>
                <TabsTrigger
                  value="social"
                  className="rounded-xl px-5 h-9 data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:text-primary gap-2 font-bold transition-all text-sm"
                >
                  <Globe className="h-3.5 w-3.5" />
                  Social Media
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="personal" className="focus-visible:outline-none animate-in fade-in-50 duration-500">
              <Card className="border-none shadow-2xl bg-background rounded-3xl overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-transform hover:rotate-6">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-black tracking-tight">Basic Information</CardTitle>
                  <CardDescription className="text-base">Manage your personal and business identity.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="fullName" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Full Name</Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input id="fullName" defaultValue="Sahil Prajapati" className="h-14 pl-12 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all rounded-2xl font-medium" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="studioName" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Studio / Lab Name</Label>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input id="studioName" defaultValue="Sahil Photography Studio" className="h-14 pl-12 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all rounded-2xl font-medium" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Email Address</Label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="email" defaultValue="sahil@example.com" disabled className="h-14 pl-12 bg-muted/50 border-dashed border-muted-foreground/20 rounded-2xl font-medium opacity-70" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="mobile" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Mobile Number</Label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input id="mobile" defaultValue="+91 98765 43210" className="h-14 pl-12 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all rounded-2xl font-medium" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="whatsapp" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">WhatsApp Number</Label>
                      <div className="relative group">
                        <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-emerald-500 transition-colors" />
                        <Input id="whatsapp" defaultValue="+91 98765 43210" className="h-14 pl-12 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-emerald-500/20 transition-all rounded-2xl font-medium" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="gst" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">GST Number (Optional)</Label>
                      <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input id="gst" placeholder="27XXXXX0000X1Z5" className="h-14 pl-12 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all rounded-2xl font-medium" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="address" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Full Address</Label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Textarea id="address" defaultValue="402, Sunshine Business Park, Andheri East" className="min-h-[100px] pl-12 pt-4 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all rounded-2xl font-medium resize-none" />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-3">
                      <Label htmlFor="city" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">City</Label>
                      <Input id="city" defaultValue="Mumbai" className="h-14 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all rounded-2xl font-medium" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="state" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">State</Label>
                      <Input id="state" defaultValue="Maharashtra" className="h-14 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all rounded-2xl font-medium" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="pincode" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Pincode</Label>
                      <Input id="pincode" defaultValue="400069" className="h-14 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all rounded-2xl font-medium" />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button size="lg" className="px-12 h-14 font-black rounded-3xl shadow-xl shadow-primary/20 text-base transition-all hover:scale-[1.02] hover:shadow-primary/30">
                      Save Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recharge" className="focus-visible:outline-none animate-in fade-in-50 duration-500">
              <Card className="border-none shadow-2xl bg-background rounded-3xl overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 transition-transform hover:rotate-6">
                    <CreditCard className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-3xl font-black tracking-tight">Plan & Subscription</CardTitle>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-black px-5 py-1.5 rounded-full text-xs">
                      ACTIVE
                    </Badge>
                  </div>
                  <CardDescription className="text-base text-muted-foreground">Monitor and manage your credit usage.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-12">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="p-5 rounded-3xl bg-muted/20 border border-muted-foreground/5 space-y-1 group hover:bg-muted/30 transition-all">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Active Plan</p>
                      <p className="text-lg font-black text-primary">Pro Visionary</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-muted/20 border border-muted-foreground/5 space-y-1 group hover:bg-muted/30 transition-all">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Recharged on</p>
                      <p className="text-lg font-black">15 Jan 2025</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-muted/20 border border-muted-foreground/5 space-y-1 group hover:bg-muted/30 transition-all">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Expires on</p>
                      <p className="text-lg font-black text-red-500">15 Jan 2026</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 space-y-1 group hover:bg-emerald-500/10 transition-all">
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600/70">Usage</p>
                      <p className="text-lg font-black text-emerald-600">450 Coins</p>
                    </div>
                  </div>

                  <div className="space-y-6 p-8 rounded-[40px] bg-gradient-to-br from-muted/30 to-background border border-muted-foreground/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-125" />
                    <div className="relative flex justify-between items-end">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-primary animate-pulse" />
                          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/80">Detailed Usage</span>
                        </div>
                        <p className="text-5xl font-black tracking-tight">{totalCredits - useCredits} <span className="text-sm font-black text-muted-foreground uppercase ml-1">Credits Left</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-muted-foreground/60 uppercase tracking-widest mb-1">Total Allocated</p>
                        <p className="text-2xl font-black">{totalCredits}</p>
                      </div>
                    </div>
                    <Progress value={((totalCredits - useCredits) / totalCredits) * 100} className="h-5 rounded-full p-1 bg-muted/50 transition-all" />
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground/60 pt-2 px-1">
                      <span>Consumed: {useCredits}</span>
                      <span>Capacity: {totalCredits}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
                    <Button variant="outline" size="lg" className="h-14 px-8 rounded-3xl border-muted-foreground/20 hover:bg-muted font-black text-base gap-3 transition-all">
                      <Download className="h-5 w-5" />
                      Latest Invoice
                    </Button>
                    <Button size="lg" className="h-14 px-12 rounded-3xl bg-emerald-600 hover:bg-emerald-700 font-black text-base shadow-2xl shadow-emerald-600/30 transition-all hover:scale-[1.02]">
                      Recharge Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="focus-visible:outline-none animate-in fade-in-50 duration-500">
              <Card className="border-none shadow-2xl bg-background rounded-3xl overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 transition-transform hover:rotate-6">
                    <Globe className="h-6 w-6 text-blue-500" />
                  </div>
                  <CardTitle className="text-3xl font-black tracking-tight">Social Media Links</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">Manage your external presence and portfolio links.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-10">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label htmlFor="social-whatsapp" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">WhatsApp</Label>
                      <div className="relative group">
                        <MessageSquare className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                        <Input id="social-whatsapp" defaultValue="wa.me/919876543210" className="h-14 pl-14 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-emerald-500/20 rounded-2xl font-medium" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="social-instagram" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Instagram</Label>
                      <div className="relative group">
                        <Instagram className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-pink-500" />
                        <Input id="social-instagram" defaultValue="@sahil_photo" className="h-14 pl-14 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-pink-500/20 rounded-2xl font-medium" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="social-facebook" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Facebook</Label>
                      <div className="relative group">
                        <Facebook className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
                        <Input id="social-facebook" defaultValue="facebook.com/sahilstudio" className="h-14 pl-14 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-blue-600/20 rounded-2xl font-medium" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="social-twitter" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Twitter / X</Label>
                      <div className="relative group">
                        <Twitter className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-400" />
                        <Input id="social-twitter" defaultValue="x.com/sahil_p" className="h-14 pl-14 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-sky-400/20 rounded-2xl font-medium" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="social-youtube" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">YouTube</Label>
                      <div className="relative group">
                        <Youtube className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-red-600" />
                        <Input id="social-youtube" defaultValue="youtube.com/@sahilclicks" className="h-14 pl-14 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-red-600/20 rounded-2xl font-medium" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="social-website" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Website URL</Label>
                      <div className="relative group">
                        <ExternalLink className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input id="social-website" defaultValue="www.sahilphotography.in" className="h-14 pl-14 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20 rounded-2xl font-medium" />
                      </div>
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label htmlFor="social-portfolio" className="text-xs font-black uppercase tracking-widest text-muted-foreground/70">Visual Portfolio Link</Label>
                      <div className="relative group">
                        <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input id="social-portfolio" defaultValue="pixfolio.me/sahil" className="h-14 pl-14 bg-muted/20 border-transparent focus:bg-background focus:ring-2 focus:ring-primary/20 rounded-2xl font-black text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button size="lg" className="px-12 h-14 font-black rounded-3xl shadow-xl shadow-primary/20 text-base transition-all hover:scale-[1.02]">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit All Links
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
