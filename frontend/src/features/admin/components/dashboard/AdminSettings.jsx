import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Switch } from "@/shared/ui/switch";
import { Globe, Shield, CreditCard, Bell, Key } from "lucide-react";

const AdminSettings = () => {
    const [maintenance, setMaintenance] = useState(false);
    const [registration, setRegistration] = useState(true);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tight">Settings</h2>
                    <p className="text-muted-foreground">Manage global application settings.</p>
                </div>
                <Button>Save Changes</Button>
            </div>

            <Tabs defaultValue="general" className="w-[800px]">
                <TabsList className="mb-4">
                    <TabsTrigger value="general">
                        <Globe className="mr-2 h-4 w-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="security">
                        <Shield className="mr-2 h-4 w-4" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger value="billing">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Billing
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Platform Information</CardTitle>
                            <CardDescription>General settings for the platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Platform Name</Label>
                                <Input id="name" defaultValue="Pixfolio" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="support-email">Support Email</Label>
                                <Input id="support-email" defaultValue="support@pixfolio.com" />
                            </div>
                            <div className="flex items-center space-x-2 mt-4">
                                <Switch id="maintenance" checked={maintenance} onCheckedChange={setMaintenance} />
                                <Label htmlFor="maintenance">Maintenance Mode</Label>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>User Registration</CardTitle>
                            <CardDescription>Control user sign-up access.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch id="registration" checked={registration} onCheckedChange={setRegistration} />
                                <Label htmlFor="registration">Allow new user registrations</Label>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="security" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Admin Security</CardTitle>
                            <CardDescription>Password and 2FA settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline">
                                <Key className="mr-2 h-4 w-4" />
                                Change Master Password
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminSettings;
