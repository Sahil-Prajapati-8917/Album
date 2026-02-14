import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background dark:bg-ebony transition-colors duration-300">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8 space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
