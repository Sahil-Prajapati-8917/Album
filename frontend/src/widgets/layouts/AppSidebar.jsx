import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Plus,
  FolderOpen,
  CreditCard,
  User,
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronsUpDown,

  LogOut,
  Bell,
  Code2,
  AlertTriangle,
  Lock,
  Users,
  Shield,
  FileText,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/ui/sidebar'
import { getUser, logoutUser } from '@/shared/api/api'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible"

export function AppSidebar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const userData = getUser()
    if (!userData) {
      setUser({ name: 'Demo User', email: 'demo@pixfolio.com', avatar: '' })
      return
    }
    setUser(userData)
  }, [navigate])

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  if (!user) return null

  const isActive = (href) => location.pathname === href

  const navigation = {
    general: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'All Pixfolio', href: '/all-pixfolio', icon: FolderOpen },
      { name: 'Create New', href: '/create', icon: Plus },
    ],
    pages: [
      { name: 'Profile', href: '/profile', icon: User },
      { name: 'Billing', href: '/recharge', icon: CreditCard },
      { name: 'Photographers', href: '/photographers', icon: Users },
    ],
    other: [
      { name: 'Settings', href: '/settings', icon: Settings },
      { name: 'Help Center', href: '/help', icon: HelpCircle },
    ],
  }

  const renderNavItem = (item) => {
    if (item.children) {
      const isChildActive = item.children.some(c => isActive(c.href))
      return (
        <Collapsible key={item.name} defaultOpen={isChildActive} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.name}
                className={`hover:bg-sidebar-accent transition-colors ${isChildActive ? 'font-semibold' : ''}`}
              >
                <item.icon className="size-4" />
                <span>{item.name}</span>
                <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.children.map((child) => (
                  <SidebarMenuSubItem key={child.name}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isActive(child.href)}
                    >
                      <Link to={child.href}>
                        <span>{child.name}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      )
    }

    return (
      <SidebarMenuItem key={item.name}>
        <SidebarMenuButton
          tooltip={item.name}
          isActive={isActive(item.href)}
          asChild
        >
          <Link to={item.href}>
            <item.icon className="size-4" />
            <span>{item.name}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden bg-muted/50">
                <img src="/Pixfolio_Logo.svg" alt="Pixfolio" className="size-8 object-contain" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Pixfolio</span>
                <span className="truncate text-xs">Visual Admin</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.general.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.pages.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.other.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent transition-colors duration-200">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="rounded-lg">
                      {user.name ? user.name.split(' ').map(n => n[0]).join('').to().slice(0, 2) : 'DU'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name || 'Demo User'}</span>
                    <span className="truncate text-xs">{user.email || 'demo@pixfolio.com'}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="rounded-lg">DU</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate('/recharge')}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/privacy-policy')}>
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy Policy
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/refund-policy')}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Refund Policy
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/terms-and-conditions')}>
                    <FileText className="mr-2 h-4 w-4" />
                    Term & Condition
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}