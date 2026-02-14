import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, FolderOpen, CreditCard, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const shortcuts = [
    {
        title: "Create New",
        icon: Plus,
        href: "/create",
    },
    {
        title: "All Pixfolio",
        icon: FolderOpen,
        href: "/all-pixfolio",
    },
    {
        title: "Recharge",
        icon: CreditCard,
        href: "/recharge",
    },
    {
        title: "Profile",
        icon: User,
        href: "/profile",
    }
]

const DashboardShortcuts = () => {
    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your workspace efficiently</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {shortcuts.map((shortcut, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className="h-auto py-4 flex flex-col gap-2"
                            asChild
                        >
                            <Link to={shortcut.href}>
                                <shortcut.icon className="h-5 w-5" />
                                <span>{shortcut.title}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default DashboardShortcuts
