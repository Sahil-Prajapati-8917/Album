import React from 'react'
import { Link } from 'react-router-dom'
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
import { Search } from "lucide-react"

export function AdminHeader({ user, breadcrumbs = [] }) {
    return (
        <header className="bg-background z-50 flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink asChild>
                                <Link to="/">Pixfolio</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex w-full justify-between">
                {/* Search Input - Visual only for now, matching reference style */}
                <div className="relative hidden md:flex items-center">
                    <Search className="absolute left-1.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="h-8 w-full justify-start rounded-md border border-input bg-muted/25 text-muted-foreground px-9 text-sm font-normal shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:w-40 lg:w-56 xl:w-64 sm:pr-12 relative"
                    />
                    <kbd className="bg-muted pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <UserNav user={user} />
                </div>
            </div>
        </header>
    )
}