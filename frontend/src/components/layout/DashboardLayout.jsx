import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AdminHeader } from "@/components/AdminHeader"
import { getUser } from '@/services/api'

export default function DashboardLayout() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = getUser()
    if (userData) {
      setUser(userData)
    }
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader user={user} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
            <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
