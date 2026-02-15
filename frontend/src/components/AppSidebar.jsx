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
  Search,
  ChevronRight,
  ChevronsUpDown,
  Zap,
  LogOut,
  Bell,
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
} from '@/components/ui/sidebar'
import { getUser } from '@/services/api'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AppSidebar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const userData = getUser()
    if (!userData) {
      // navigate('/login') // Keep for now but don't force redirect during dev if not needed
      setUser({ name: 'Demo User', email: 'demo@pixfolio.com', avatar: '' })
      return
    }
    setUser(userData)
  }, [navigate])

  if (!user) return null

  const navigation = {
    general: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'All Pixfolio', href: '/all-pixfolio', icon: FolderOpen },
      { name: 'Create New', href: '/create', icon: Plus },
    ],
    account: [
      { name: 'Profile', href: '/profile', icon: User },
      { name: 'Recharge', href: '/recharge', icon: CreditCard },
      { name: 'Notifications', href: '#', icon: Bell },
    ],
    support: [
      { name: 'Settings', href: '#', icon: Settings },
      { name: 'Help Center', href: '#', icon: HelpCircle },
    ]
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-muted/40">
      <SidebarHeader className="h-[60px] flex items-center px-4 border-b border-border/50 bg-transparent">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="hover:bg-accent focus:bg-accent group">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-900 text-white group-hover:scale-105 transition-transform">
                <Zap className="size-5 fill-white" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-bold text-zinc-900">Pixfolio</span>
                <span className="truncate text-xs text-zinc-500 font-medium">Visual Admin</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-6 gap-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-500 font-bold px-2 mb-2 text-[11px] uppercase tracking-wider">General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.general.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    tooltip={item.name}
                    isActive={location.pathname === item.href}
                    asChild
                    className={`
                        hover:bg-muted/50 transition-all duration-200 px-3 h-9 rounded-md
                        ${location.pathname === item.href ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground'}
                    `}
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className={`size-4 ${location.pathname === item.href ? 'text-zinc-900' : 'text-zinc-500'}`} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-500 font-bold px-2 mb-2 text-[11px] uppercase tracking-wider">Account & Billing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.account.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    tooltip={item.name}
                    isActive={location.pathname === item.href}
                    asChild
                    className={`
                        hover:bg-muted/50 transition-all duration-200 px-3 h-9 rounded-md
                        ${location.pathname === item.href ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground'}
                    `}
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className={`size-4 ${location.pathname === item.href ? 'text-zinc-900' : 'text-zinc-500'}`} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-500 font-bold px-2 mb-2 text-[11px] uppercase tracking-wider">Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.support.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    tooltip={item.name}
                    asChild
                    className="hover:bg-accent hover:text-accent-foreground text-zinc-600 transition-all duration-200 px-3 h-10 rounded-lg"
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="size-4 text-zinc-500" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="hover:bg-accent text-zinc-950 rounded-xl transition-colors">
              <Avatar className="h-8 w-8 rounded-lg border border-zinc-200">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-zinc-100 text-zinc-600 rounded-lg">
                  {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'JD'}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-semibold text-zinc-900">{user.name || 'John Doe'}</span>
                <span className="truncate text-xs text-zinc-500">{user.email || 'john@example.com'}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-zinc-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl bg-white border-zinc-200 shadow-xl" side="top" align="end" sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-zinc-100 text-zinc-600 rounded-lg">JD</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-zinc-900">{user.name}</span>
                  <span className="truncate text-xs text-zinc-500">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-100" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer rounded-lg mx-1">
                <Zap className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-zinc-100" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer rounded-lg mx-1">
                <User className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer rounded-lg mx-1">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer rounded-lg mx-1">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-zinc-100" />
            <DropdownMenuItem className="focus:bg-rose-50 focus:text-rose-600 cursor-pointer text-rose-600 rounded-lg mx-1">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}