import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/landing/accordion";
import { MessageCircle, FileText, Phone } from "lucide-react";

const AdminHelp = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tight">Help Center</h2>
                    <p className="text-muted-foreground">Resources and support for admin tasks.</p>
                </div>
                <Button>Contact Support</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Documentation</CardTitle>
                        <CardDescription>Read the admin guides.</CardDescription>
                    </CardHeader>
                    <CardContent onClick={() => window.open('https://docs.pixfolio.com', '_blank')} className="cursor-pointer hover:bg-accent/50 transition-colors rounded-b-lg flex flex-col items-center justify-center py-6">
                        <FileText className="h-10 w-10 text-primary mb-2" />
                        <span className="font-semibold text-primary">View Docs</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Community Forum</CardTitle>
                        <CardDescription>Connect with other admins.</CardDescription>
                    </CardHeader>
                    <CardContent className="cursor-pointer hover:bg-accent/50 transition-colors rounded-b-lg flex flex-col items-center justify-center py-6">
                        <MessageCircle className="h-10 w-10 text-primary mb-2" />
                        <span className="font-semibold text-primary">Visit Forum</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Priority Support</CardTitle>
                        <CardDescription>Get help from our team.</CardDescription>
                    </CardHeader>
                    <CardContent className="cursor-pointer hover:bg-accent/50 transition-colors rounded-b-lg flex flex-col items-center justify-center py-6">
                        <Phone className="h-10 w-10 text-primary mb-2" />
                        <span className="font-semibold text-primary">Open Ticket</span>
                    </CardContent>
                </Card>
            </div>

            <Card className="max-w-3xl">
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How do I reset a user's password?</AccordionTrigger>
                            <AccordionContent>
                                Go to the <strong>User Management</strong> section, search for the user, click the "More" menu (three dots) and select "Reset Password".
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How can I delete an album?</AccordionTrigger>
                            <AccordionContent>
                                Navigate to the <strong>Albums</strong> section. Find the album you wish to remove and click the trash icon. Does this action cannot be undone.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Where can I see platform revenue?</AccordionTrigger>
                            <AccordionContent>
                                The <strong>Analytics</strong> tab provides a detailed breakdown of revenue, subscriptions, and other financial metrics.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminHelp;
