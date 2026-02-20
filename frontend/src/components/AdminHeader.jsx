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
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function AdminHeader({ user }) {
    const location = useLocation()

    const pathSegments = location.pathname.split('/').filter(Boolean)
    const pageName = pathSegments.length > 0
        ? pathSegments[pathSegments.length - 1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Dashboard'

    return (
        <header className="sticky top-0 z-10 bg-white dark:bg-black flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 flex-1">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink asChild>
                                <Link to="/dashboard">
                                    Pixfolio
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{pageName}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex-1 max-w-sm hidden md:block">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-8 h-9 w-full bg-muted/40 border-none"
                    />
                    <kbd className="pointer-events-none absolute right-2.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <ThemeToggle />
            </div>
        </header>
    )
}