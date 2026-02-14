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
import Logo from './Logo'
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
    <Sidebar collapsible="icon" className="border-r border-gold/10">
      <SidebarHeader className="border-b border-gold/10 py-4">
        <Link to="/" className="flex items-center space-x-3 px-2 group">
          <Logo className="h-10 w-auto group-hover:scale-110 transition-transform" />
          <span className="text-xl font-serif font-bold tracking-widest uppercase text-black dark:text-white group-data-[collapsible=icon]:hidden">Pixfolio</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-ebony">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-2 py-2">
              <div className="flex items-center justify-center group-data-[collapsible=icon]:hidden">
                <ThemeToggle variant="button" size="sm" className="w-full" />
              </div>
              <div className="flex items-center justify-center hidden group-data-[collapsible=icon]:flex">
                <ThemeToggle variant="switch" size="sm" />
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
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
                      className={isActive ? "bg-gold/10 text-gold hover:bg-gold/20" : "text-gray-500 hover:text-gold hover:bg-gold/5"}
                    >
                      <Link to={item.href}>
                        <item.icon className={isActive ? "text-gold" : ""} />
                        <span className="group-data-[collapsible=icon]:hidden font-medium">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-gold/10 bg-white dark:bg-ebony">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
