import { useState, useRef } from 'react'
import {
  User,
  Mail,
  Camera,
  MapPin,
  Link as LinkIcon,
  Calendar,
  CheckCircle2,
  Shield
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

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
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
          <p className="text-xl text-muted-foreground font-medium">Professional Photographer • Mumbai, India</p>
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

      <div className="grid gap-10">
        <Card className="border-none shadow-xl bg-gradient-to-br from-background to-muted/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <User className="h-6 w-6 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>This information will be displayed on your public profile and pixfolios.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                <Input id="fullName" defaultValue="Sahil Prajapati" className="h-12 bg-background/50 border-muted focus:bg-background transition-all" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                <Input id="email" defaultValue="sahil@example.com" disabled className="h-12 bg-muted/30 border-dashed" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="location" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="location" defaultValue="Mumbai, India" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="website" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Portfolio URL</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="website" defaultValue="pixfolio.me/sahil" className="h-12 pl-12 bg-background/50 border-muted focus:bg-background transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="bio" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Biography</Label>
              <Textarea
                id="bio"
                placeholder="Tell your clients a bit about yourself and your style..."
                className="min-h-[160px] bg-background/50 border-muted focus:bg-background transition-all resize-none text-base leading-relaxed"
                defaultValue="Capturing moments that tell a story. Specialized in portrait and architectural photography with over 5 years of experience in creating visual narratives."
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button size="lg" className="px-10 h-12 font-bold rounded-full shadow-lg hover:shadow-primary/20">
                Update Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
