import React from 'react';
import {
    Users,
    Album,
    Image as ImageIcon,
    Activity,
    AlertTriangle,
    TrendingUp,
    Plus,
    CheckCircle2,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    Calendar,
    Filter,
    MoreHorizontal,
    CreditCard,
    DollarSign
} from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminOverview = () => {
    // Mock Data
    const stats = [
        { label: 'Total Revenue', value: '$45,231.89', trend: '+20.1%', trendUp: true, icon: DollarSign, color: 'text-zinc-500' },
        { label: 'Subscriptions', value: '+2350', trend: '+180.1%', trendUp: true, icon: Users, color: 'text-zinc-500' },
        { label: 'Sales', value: '+12,234', trend: '+19%', trendUp: true, icon: CreditCard, color: 'text-zinc-500' },
        { label: 'Active Now', value: '+573', trend: '+201', trendUp: true, icon: Activity, color: 'text-zinc-500' },
    ];

    const chartData = [
        { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
        { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
    ]

    const recentSales = [
        { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
        { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
        { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
        { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
        { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
    ]

    const recentUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'Pro', albums: 24, storage: '1.2 GB', status: 'Active', date: '2024-02-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'Enterprise', albums: 156, storage: '45 GB', status: 'Active', date: '2024-02-14' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', plan: 'Free', albums: 2, storage: '45 MB', status: 'Suspended', date: '2024-02-12' },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', plan: 'Pro', albums: 45, storage: '2.8 GB', status: 'Active', date: '2024-02-10' },
    ];

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, idx) => (
                    <Card key={idx}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.label}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.trend} from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350} minWidth={1} minHeight={1}>
                            <BarChart data={chartData}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Bar
                                    dataKey="total"
                                    fill="currentColor"
                                    radius={[4, 4, 0, 0]}
                                    className="fill-primary"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentSales.map((sale, idx) => (
                                <div key={idx} className="flex items-center">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>{sale.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{sale.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {sale.email}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">{sale.amount}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* User Table */}
            <div className="rounded-md border bg-card text-card-foreground shadow-sm">
                <div className="p-6 flex items-center justify-between border-b">
                    <h3 className="font-semibold leading-none tracking-tight">Active Users</h3>
                    <Button size="sm" variant="outline">View All</Button>
                </div>
                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">User</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Storage</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="text-[10px]">{user.name[0]}</AvatarFallback>
                                            </Avatar>
                                            {user.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} className="text-[10px]">
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.plan}</TableCell>
                                    <TableCell>{user.storage}</TableCell>
                                    <TableCell className="text-right">$250.00</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};
export default AdminOverview;
