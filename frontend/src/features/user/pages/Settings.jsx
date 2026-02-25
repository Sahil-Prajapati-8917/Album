import React, { useState } from 'react'
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
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AlertTriangle, ShieldCheck, Zap } from 'lucide-react'

export default function Settings() {
    return (
        <div className="flex-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Settings</CardTitle>
                    <CardDescription>
                        Manage your application preferences and account security.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Plan Overview - Inspired by target UI Banner */}
                    <Card className="border-none shadow-none bg-primary/5 border border-primary/10 rounded-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-semibold">Pro Visionary Plan</CardTitle>
                                <CardDescription>You are currently on the professional plan with full access.</CardDescription>
                            </div>
                            <Zap className="h-5 w-5 text-primary fill-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 mt-2">
                                <Button size="sm">Upgrade Plan</Button>
                                <Button size="sm" variant="outline">View Usage</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Site Configuration */}
                    <Card className="border border-border/60 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Site Configuration</CardTitle>
                            <CardDescription>Customize how your Pixfolio appears to others.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="siteName" className="text-sm font-medium">Site Name</Label>
                                    <Input id="siteName" defaultValue="Pixfolio" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="language" className="text-sm font-medium">Display Language</Label>
                                    <Select defaultValue="en">
                                        <SelectTrigger>
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
                            <div className="flex items-center justify-between space-x-2">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-medium">Auto-save changes</Label>
                                    <p className="text-xs text-muted-foreground">Automatically save changes as you type.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/30 border-t border-border/50 px-6 py-3 flex justify-end">
                            <Button size="sm">Save Changes</Button>
                        </CardFooter>
                    </Card>

                    {/* Security Section */}
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Card id="security" className="border border-border/60 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold">Security & Privacy</CardTitle>
                                <CardDescription>Manage your account security and password.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password" autoComplete="current-password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" autoComplete="new-password" />
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between space-x-2">
                                    <div className="space-y-0.5">
                                        <Label className="text-sm font-medium">Two-step verification</Label>
                                        <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/30 border-t border-border/50 px-6 py-3 flex justify-end">
                                <Button type="submit" size="sm">Update Password</Button>
                            </CardFooter>
                        </Card>
                    </form>

                    {/* Notifications Section */}
                    <Card id="notifications" className="border border-border/60 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Notification Preferences</CardTitle>
                            <CardDescription>Control how you receive updates and alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between space-x-2">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-medium">Email Notifications</Label>
                                    <p className="text-xs text-muted-foreground">Receive updates about your pixfolios via email.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-medium">Marketing Emails</Label>
                                    <p className="text-xs text-muted-foreground">Stay tuned with new features and offers.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Management - Danger Zone */}
                    <Card className="border-destructive/20 shadow-sm bg-destructive/5 rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-destructive">Account Management</CardTitle>
                            <CardDescription>Permanently delete or deactivate your account.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Once you delete your account, there is no going back. Please be certain.
                            </p>
                        </CardContent>
                        <CardFooter className="border-t border-destructive/10 px-6 py-3 flex flex-col sm:flex-row gap-3">
                            <Button variant="outline" className="border-destructive/20 text-destructive hover:bg-destructive/10">Deactivate Account</Button>
                            <Button variant="destructive">Delete Account</Button>
                        </CardFooter>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}
