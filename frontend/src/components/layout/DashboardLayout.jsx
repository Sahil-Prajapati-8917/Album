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
      if (userData) {
        setUser(userData)
      } else {
        setUser({ name: 'Demo User', email: 'demo@pixfolio.com' })
      }
    }
    fetchUser()
  }, [])

  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <AdminHeader user={user} />
        <div className="flex-1 w-full overflow-y-auto">
          <main className="max-w-7xl mx-auto p-6 space-y-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`

                  return (
                    <React.Fragment key={to}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {last ? (
                          <BreadcrumbPage className="capitalize">
                            {value.replace(/-/g, ' ')}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={to} className="capitalize">
                              {value.replace(/-/g, ' ')}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
