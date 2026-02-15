import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AdminHeader } from "@/components/AdminHeader"
import { getUser } from '@/services/api'

export default function DashboardLayout() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = () => {
      const userData = getUser()
      if (userData) {
        setUser(userData)
      } else {
        setUser({ name: 'Demo User', email: 'demo@pixfolio.com' })
      }
    }
    fetchUser()
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <AdminHeader user={user} />
        <div className="flex-1 w-full overflow-y-auto">
          <main className="max-w-7xl mx-auto p-6 space-y-6">
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
