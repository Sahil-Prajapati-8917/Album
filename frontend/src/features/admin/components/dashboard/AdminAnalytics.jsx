import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Calendar, Download } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";

const AdminAnalytics = () => {
    // Mock Data
    const revenueData = [
        { name: "Jan", total: 2500 },
        { name: "Feb", total: 3800 },
        { name: "Mar", total: 3200 },
        { name: "Apr", total: 4500 },
        { name: "May", total: 4100 },
        { name: "Jun", total: 6000 },
        { name: "Jul", total: 5800 },
        { name: "Aug", total: 7200 },
        { name: "Sep", total: 6800 },
        { name: "Oct", total: 8500 },
        { name: "Nov", total: 9100 },
        { name: "Dec", total: 10200 },
    ];

    const subscriptionData = [
        { name: "Jan", active: 200, cancelled: 10 },
        { name: "Feb", active: 350, cancelled: 20 },
        { name: "Mar", active: 450, cancelled: 15 },
        { name: "Apr", active: 550, cancelled: 25 },
        { name: "May", active: 700, cancelled: 30 },
        { name: "Jun", active: 850, cancelled: 20 },
    ];

    const activeUsageData = [
        { name: "Mon", users: 1200 },
        { name: "Tue", users: 1500 },
        { name: "Wed", users: 1800 },
        { name: "Thu", users: 1600 },
        { name: "Fri", users: 2100 },
        { name: "Sat", users: 2400 },
        { name: "Sun", users: 2200 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tight">Analytics</h2>
                    <p className="text-muted-foreground">Detailed insights into platform performance.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Last 30 Days
                    </Button>
                    <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                        <CardDescription>Monthly revenue stream.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-4">$45,231.89</div>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        labelStyle={{ color: 'var(--foreground)' }}
                                    />
                                    <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Subscriptions</CardTitle>
                        <CardDescription>Active pro users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-4">+2350</div>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                                <BarChart data={subscriptionData}>
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        labelStyle={{ color: 'var(--foreground)' }}
                                    />
                                    <Bar dataKey="active" fill="#4ade80" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="cancelled" fill="#f87171" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Active Usage</CardTitle>
                        <CardDescription>Daily active users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-4">+12,234</div>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                                <LineChart data={activeUsageData}>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        labelStyle={{ color: 'var(--foreground)' }}
                                    />
                                    <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Traffic Overview</CardTitle>
                    <CardDescription>Daily visitor traffic over the last year.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                    labelStyle={{ color: 'var(--foreground)' }}
                                />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                <Area type="monotone" dataKey="total" stroke="#10b981" fillOpacity={1} fill="url(#colorTraffic)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminAnalytics;
