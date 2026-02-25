import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AdminHeader } from "@/components/AdminHeader"
import { getUser } from '@/services/api'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLocation, Link } from 'react-router-dom'

export default function DashboardLayout() {
  const [user, setUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const fetchUser = () => {
      const userData = getUser()
      setUser(userData)
    }
    fetchUser()
  }, [])

  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <AdminHeader user={user} />
        <div className="flex-1 w-full overflow-y-auto scroll-smooth">
          <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
            {/* Breadcrumb removed as per request */}
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
