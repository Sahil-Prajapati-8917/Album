import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SidebarTrigger } from "@/shared/ui/sidebar"
import { Separator } from "@/shared/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb"
import { ThemeToggle } from "@/shared/ui/ThemeToggle"
import { Input } from "@/shared/ui/input"
import { Search } from "lucide-react"

export function AdminHeader({ user }) {
    const location = useLocation()

    const pathSegments = location.pathname.split('/').filter(Boolean)
    const pageName = pathSegments.length > 0
        ? pathSegments[pathSegments.length - 1].split('-').map(word => word.toUpperCase().charAt(0) + word.slice(1)).join(' ')
        : 'Dashboard'

    return (
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl backdrop-saturate-150 flex h-14 shrink-0 items-center gap-2 border-b border-border/50 px-4 transition-[width,height] duration-200 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                <div
                    className="relative cursor-pointer group"
                    onClick={() => {
                        document.dispatchEvent(
                            new KeyboardEvent("keydown", {
                                key: "k",
                                metaKey: true,
                                bubbles: true,
                            })
                        )
                    }}
                >
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-8 h-8 w-full bg-muted/50 border-transparent hover:bg-muted/70 cursor-pointer pointer-events-none text-muted-foreground text-sm rounded-lg transition-colors duration-200"
                        readOnly
                        tabIndex={-1}
                    />
                    <kbd className="pointer-events-none absolute right-2.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded-md border border-border/60 bg-muted/80 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex group-hover:bg-muted transition-colors duration-200">
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