import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'

const DashboardLayout = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [navigate])

  if (!user) return null

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-pearl dark:bg-ebony/95 relative">
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b border-gold/10 px-6 bg-white/70 backdrop-blur-xl dark:bg-ebony/70 transition-all duration-300">
          <SidebarTrigger className="-ml-1 text-gold hover:bg-gold/10" />
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
