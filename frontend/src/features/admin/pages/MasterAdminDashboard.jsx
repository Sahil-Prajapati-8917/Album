import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '@/services/api';
import {
    Users,
    User,
    Album,
    Shield,
    AlertTriangle,
    TrendingUp,
    CreditCard,
    Lock,
    HelpCircle,
    LayoutDashboard,
    LogOut,
    Search,
    Bell,
    Settings,
    ChevronsUpDown
} from 'lucide-react';

import {
    SidebarProvider,
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Internal Admin Sidebar Component
const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to check if a route is active
    const isActive = (path) => {
        return location.pathname.includes(`/admin/dashboard/${path}`);
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Shield className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">Pixfolio Admin</span>
                                <span className="truncate text-xs">Master Panel</span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Overview"
                                isActive={isActive('overview')}
                                onClick={() => navigate('overview')}
                            >
                                <LayoutDashboard />
                                <span>Overview</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Analytics"
                                isActive={isActive('analytics')}
                                onClick={() => navigate('analytics')}
                            >
                                <TrendingUp />
                                <span>Analytics</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Albums"
                                isActive={isActive('albums')}
                                onClick={() => navigate('albums')}
                            >
                                <Album />
                                <span>Albums</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Users"
                                isActive={isActive('users')}
                                onClick={() => navigate('users')}
                            >
                                <Users />
                                <span>User Management</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Moderation"
                                isActive={isActive('moderation')}
                                onClick={() => navigate('moderation')}
                            >
                                <AlertTriangle />
                                <span>Moderation</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Roles & Access"
                                isActive={isActive('roles')}
                                onClick={() => navigate('roles')}
                            >
                                <Lock />
                                <span>Roles & Access</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Settings"
                                isActive={isActive('settings')}
                                onClick={() => navigate('settings')}
                            >
                                <Settings />
                                <span>Settings</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup className="mt-auto">
                    <SidebarGroupLabel>Support</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Help Center"
                                isActive={isActive('help')}
                                onClick={() => navigate('help')}
                            >
                                <HelpCircle />
                                <span>Help Center</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarFallback className="rounded-lg">MA</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Master Admin</span>
                                        <span className="truncate text-xs">admin@pixfolio.com</span>
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
                                            <AvatarFallback className="rounded-lg">MA</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">Master Admin</span>
                                            <span className="truncate text-xs">admin@pixfolio.com</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => navigate('settings')}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-500 cursor-pointer"
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
    );
}

const MasterAdminDashboard = () => {
    const location = useLocation();

    const getViewName = () => {
        const pathSegments = location.pathname.split('/');
        const currentSegment = pathSegments[pathSegments.length - 1];
        return currentSegment.charAt(0).toUpperCase() + currentSegment.slice(1);
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-[#f4f4f5] dark:bg-[#09090b]">
                {/* 💡 Glow Effects */}
                <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none z-0 translate-x-1/2 -translate-y-1/2"></div>
                <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none z-0 -translate-x-1/2 translate-y-1/2"></div>

                <AdminSidebar />

                <SidebarInset className="bg-transparent">
                    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-white/50 dark:bg-black/50 backdrop-blur-md px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{getViewName()}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="ml-auto px-4 flex items-center gap-4">
                            <div className="relative hidden md:block w-64">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search..." className="pl-8 h-9" />
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Bell className="h-4 w-4" />
                            </Button>
                        </div>
                    </header>

                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto w-full">
                            <Outlet />
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};

export default MasterAdminDashboard;
