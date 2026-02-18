import React, { useState } from 'react'
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
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Settings() {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight">Settings</h1>
                <p className="text-muted-foreground text-lg">
                    Customize your account and application preferences.
                </p>
            </div>

            <Separator />

            <div className="space-y-8">
                {/* General Settings */}
                <Card className="border-none shadow-sm bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-2xl">General Settings</CardTitle>
                        <CardDescription>Update your basic account information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="siteName" className="font-semibold">Site Name</Label>
                                <Input id="siteName" defaultValue="Pixfolio" className="bg-background" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language" className="font-semibold">Display Language</Label>
                                <Select defaultValue="en">
                                    <SelectTrigger className="bg-background">
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English (US)</SelectItem>
                                        <SelectItem value="es">Spanish</SelectItem>
                                        <SelectItem value="fr">French</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border bg-background p-5 shadow-sm transition-all hover:border-primary/50">
                            <div className="space-y-0.5">
                                <Label className="text-base font-bold">Auto-save changes</Label>
                                <p className="text-sm text-muted-foreground">Automatically save changes as you type.</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="border-none shadow-sm bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-2xl">Notification Preferences</CardTitle>
                        <CardDescription>Control how you receive updates and alerts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-xl border bg-background p-5 shadow-sm transition-all hover:border-primary/50">
                            <div className="space-y-0.5">
                                <Label className="text-base font-bold">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive updates about your pixfolios via email.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between rounded-xl border bg-background p-5 shadow-sm transition-all hover:border-primary/50">
                            <div className="space-y-0.5">
                                <Label className="text-base font-bold">Marketing Emails</Label>
                                <p className="text-sm text-muted-foreground">Stay tuned with new features and offers.</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card className="border-none shadow-sm bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-2xl">Security</CardTitle>
                        <CardDescription>Manage your account security and password.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="current-password text-base font-bold">Current Password</Label>
                                <Input id="current-password" type="password" className="bg-background" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password text-base font-bold">New Password</Label>
                                <Input id="new-password" type="password" className="bg-background" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between rounded-xl border bg-background p-5 shadow-sm transition-all hover:border-primary/50">
                            <div className="space-y-0.5">
                                <Label className="text-base font-bold">Two-step verification</Label>
                                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-center pt-6">
                    <Button size="lg" className="px-12 h-12 text-lg font-bold rounded-full shadow-lg hover:shadow-primary/20 transition-all">
                        Save All Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}
