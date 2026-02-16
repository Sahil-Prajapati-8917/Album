import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from "@/components/ui/switch"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Settings() {
    const [activeTab, setActiveTab] = useState('general')

    const sideNav = [
        { id: 'general', label: 'General' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'security', label: 'Security' },
    ]

    return (
        <div className="flex-1 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preference.
                </p>
            </div>

            <Separator />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="lg:w-1/5">
                    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                        {sideNav.map((item) => (
                            <Button
                                key={item.id}
                                variant={activeTab === item.id ? "secondary" : "ghost"}
                                className={`justify-start ${activeTab === item.id ? 'bg-muted font-medium' : ''}`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </nav>
                </aside>

                <div className="flex-1 lg:max-w-2xl">
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>General Settings</CardTitle>
                                    <CardDescription>Update your basic account information.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="siteName">Site Name</Label>
                                        <Input id="siteName" defaultValue="Pixfolio" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="language">Display Language</Label>
                                        <Select defaultValue="en">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="es">Spanish</SelectItem>
                                                <SelectItem value="fr">French</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <Label>Auto-save changes</Label>
                                            <p className="text-sm text-muted-foreground">Automatically save changes as you type.</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="flex gap-2">
                                <Button>Save Settings</Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notification Preferences</CardTitle>
                                    <CardDescription>Control how you receive updates and alerts.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <Label>Email Notifications</Label>
                                            <p className="text-sm text-muted-foreground">Receive updates about your pixfolios via email.</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <Label>Marketing Emails</Label>
                                            <p className="text-sm text-muted-foreground">Stay tuned with new features and offers.</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="flex gap-2">
                                <Button>Update Preferences</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
