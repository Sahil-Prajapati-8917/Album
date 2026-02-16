import { useState, useEffect } from 'react'
import { getUser } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"

const Profile = () => {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    const userData = getUser()
    if (userData) {
      setUser(userData)
    } else {
      setUser({ name: 'Demo User', email: 'demo@pixfolio.com' })
    }
  }, [])

  const sideNav = [
    { id: 'general', label: 'General' },
    { id: 'profile', label: 'Profile' },
    { id: 'billing', label: 'Billing' },
  ]

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile information and preferences.
        </p>
      </div>

      <Separator />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {/* Side Navigation */}
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

        {/* Content */}
        <div className="flex-1 lg:max-w-2xl">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">General</h3>
                <p className="text-sm text-muted-foreground">
                  Update your general account settings.
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user?.name || ''} placeholder="Your name" />
                  <p className="text-[0.8rem] text-muted-foreground">
                    This is the name that will be displayed on your profile.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ''} placeholder="Your email" />
                  <p className="text-[0.8rem] text-muted-foreground">
                    Your email address is used for notifications.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-[0.8rem] text-muted-foreground">
                    This is the language used in the dashboard.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="ist">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST (UTC-5)</SelectItem>
                      <SelectItem value="pst">PST (UTC-8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Save changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your public profile information.
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-lg">
                      {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'DU'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <Button variant="outline" size="sm">Change avatar</Button>
                    <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" defaultValue={user?.name || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself" className="resize-none" rows={4} />
                  <p className="text-[0.8rem] text-muted-foreground">
                    Brief description for your profile. Max 160 characters.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://example.com" />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>Public Profile</Label>
                    <p className="text-[0.8rem] text-muted-foreground">
                      Make your profile visible to everyone.
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Update profile</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Billing</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your billing information and subscription.
                </p>
              </div>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Current Plan</CardTitle>
                  <CardDescription>You are currently on the Free plan.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">Free</p>
                      <p className="text-sm text-muted-foreground">5 pixfolios, 1GB storage</p>
                    </div>
                    <Button>Upgrade plan</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Payment Method</CardTitle>
                  <CardDescription>Add a payment method to upgrade your plan.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-16 rounded bg-muted flex items-center justify-center text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
