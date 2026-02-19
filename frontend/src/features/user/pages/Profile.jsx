import React, { useState } from 'react'
import {
  User,
  Mail,
  MapPin,
  Phone,
  Building2,
  Briefcase,
  CameraIcon,
  MessageSquare,
  CheckCircle2
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

export default function Profile() {
  return (
    <div className="flex-1 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Manage your personal and business identity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative inline-block group">
              <Avatar className="h-24 w-24 border-2 border-background shadow-sm ring-1 ring-border">
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" />
                <AvatarFallback className="text-2xl bg-muted">SP</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-1 -right-1 rounded-full shadow-md h-8 w-8 border border-background"
              >
                <CameraIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Profile Picture</h4>
              <p className="text-xs text-muted-foreground">Click the icon to upload a new avatar. JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>

          <Separator />

          {/* Form Fields */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
              <div className="relative">
                <Input id="fullName" defaultValue="Sahil Prajapati" placeholder="Your full name" className="pr-10" />
                <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              </div>
              <p className="text-[10px] text-muted-foreground">This is your public display name.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="studioName" className="text-sm font-medium">Studio / Lab Name</Label>
              <Input id="studioName" defaultValue="Sahil Photography Studio" placeholder="Studio name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input id="email" defaultValue="sahil@example.com" disabled className="bg-muted/50 cursor-not-allowed" />
              <p className="text-[10px] text-muted-foreground font-medium text-primary">Verified</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-sm font-medium">Mobile Number</Label>
              <Input id="mobile" defaultValue="+91 98765 43210" placeholder="+91" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp Number</Label>
              <div className="flex gap-2">
                <Input id="whatsapp" defaultValue="+91 98765 43210" placeholder="+91" />
                <Button variant="outline" size="icon" className="shrink-0">
                  <MessageSquare className="h-4 w-4 text-emerald-500" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst" className="text-sm font-medium">GST Number (Optional)</Label>
              <Input id="gst" placeholder="27XXXXX0000X1Z5" />
            </div>
          </div>

          <Separator />

          {/* Address Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Business Address</h4>
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">Street Address</Label>
                <Textarea id="address" defaultValue="402, Sunshine Business Park, Andheri East" className="min-h-[80px]" />
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">City</Label>
                  <Input id="city" defaultValue="Mumbai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">State</Label>
                  <Input id="state" defaultValue="Maharashtra" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode" className="text-sm font-medium">Pincode</Label>
                  <Input id="pincode" defaultValue="400069" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 border-t px-6 py-4 flex justify-end">
          <Button>Update Account</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
