import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ThemeToggle } from "@/components/ThemeToggle"
import { UserNav } from "@/components/UserNav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, HelpCircle } from "lucide-react"

export function AdminHeader({ user }) {
    const location = useLocation()

    // Simple breadcrumb logic based on pathname
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const pageName = pathSegments.length > 0
        ? pathSegments[pathSegments.length - 1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Dashboard'

    return (
        <header className="h-[60px] border-b bg-background sticky top-0 z-50 flex items-center px-6 gap-4">
            <div className="flex items-center gap-4 flex-1">
                <SidebarTrigger className="-ml-1 hover:bg-muted/50" />
                <Separator orientation="vertical" className="h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                                    Pixfolio Admin
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-sm font-semibold text-foreground">{pageName}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex-1 max-w-md hidden md:block">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-9 h-9 w-full rounded-full bg-muted/30 border-input focus:bg-background transition-all outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <HelpCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-background"></span>
                </Button>
                <Separator orientation="vertical" className="h-4 mx-1" />
                <ThemeToggle />
                <UserNav user={user} />
            </div>
        </header>
    )
}