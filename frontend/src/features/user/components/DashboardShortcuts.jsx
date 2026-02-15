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
        <Card className="shadow-sm border-muted rounded-xl h-full flex flex-col bg-card overflow-hidden">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-foreground">Quick Actions</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Manage your workspace efficiently</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                    {shortcuts.map((shortcut, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className="h-auto py-5 flex flex-col gap-3 rounded-xl border-muted bg-background hover:bg-muted/50 hover:text-foreground transition-colors group"
                            asChild
                        >
                            <Link to={shortcut.href}>
                                <div className="p-2 bg-muted rounded-lg group-hover:bg-background group-hover:shadow-sm transition-all text-muted-foreground group-hover:text-primary">
                                    <shortcut.icon className="h-5 w-5" />
                                </div>
                                <span className="text-xs font-semibold tracking-tight">{shortcut.title}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default DashboardShortcuts
