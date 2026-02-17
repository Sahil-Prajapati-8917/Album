import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Plus } from "lucide-react";

const AdminRoles = () => {
    const roles = [
        { id: 1, name: 'Master Admin', users: 1, permissions: 'All Access', status: 'System' },
        { id: 2, name: 'Moderator', users: 5, permissions: 'Moderate Content, User Managment', status: 'Custom' },
        { id: 3, name: 'Support', users: 3, permissions: 'View User Data, Ticket Management', status: 'Custom' },
        { id: 4, name: 'Analyst', users: 2, permissions: 'View Analytics', status: 'Custom' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Roles & Permissions</h2>
                    <p className="text-muted-foreground">Manage system roles and access levels.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Role
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                    <Card key={role.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {role.name}
                            </CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{role.users} Users</div>
                            <p className="text-xs text-muted-foreground mt-1">{role.permissions}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <Badge variant="secondary">{role.status}</Badge>
                                <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AdminRoles;
