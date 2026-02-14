import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Plus,
  FolderOpen,
  CreditCard,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NavUser } from './NavUser'
import { ThemeToggle } from './ThemeToggle'
import { getUser } from '@/services/api'

export function AppSidebar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const userData = getUser()
    if (!userData) {
      navigate('/login')
      return
    }
    const parsedUser = userData
    // Ensure user has avatar field
    if (!parsedUser.avatar) {
      parsedUser.avatar = '' // Default empty avatar
    }
    setUser(parsedUser)
  }, [navigate])

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Create New', href: '/create', icon: Plus },
    { name: 'All Pixfolio', href: '/all-pixfolio', icon: FolderOpen },
    { name: 'Recharge', href: '/recharge', icon: CreditCard },
  ]

  if (!user) return null

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="border-b border-border py-4 bg-sidebar">
        <Link to="/" className="flex items-center space-x-3 px-2 group">
          <div className="size-8 bg-primary text-primary-foreground flex items-center justify-center rounded-[4px]">
            <span className="font-serif font-bold text-lg">P</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-sidebar-foreground group-data-[collapsible=icon]:hidden">Pixfolio</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.name}
                      className={isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium hover:bg-sidebar-accent/90" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}
                    >
                      <Link to={item.href}>
                        <item.icon className="size-4" />
                        <span className="group-data-[collapsible=icon]:hidden">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border bg-sidebar p-2">
        {/* Theme Toggle within sidebar footer (desktop) */}
        <div className="flex items-center justify-between px-2 mb-2 group-data-[collapsible=icon]:justify-center">
          <span className="text-xs font-medium text-muted-foreground group-data-[collapsible=icon]:hidden">Theme</span>
          <ThemeToggle />
        </div>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
