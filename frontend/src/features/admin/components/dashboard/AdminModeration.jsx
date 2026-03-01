import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { AlertTriangle, CheckCircle2, XCircle, Eye } from "lucide-react";

const AdminModeration = () => {
    const reports = [
        { id: 1, type: 'Inappropriate Content', target: 'Album #1234', reporter: 'user123', status: 'Pending', date: '2024-02-15' },
        { id: 2, type: 'Copyright Violation', target: 'Photo #5678', reporter: 'photographerX', status: 'Resolved', date: '2024-02-14' },
        { id: 3, type: 'Spam', target: 'User #9012', reporter: 'system', status: 'Pending', date: '2024-02-12' },
        { id: 4, type: 'Harassment', target: 'Comment #3456', reporter: 'victimY', status: 'Dismissed', date: '2024-02-10' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tight">Moderation</h2>
                    <p className="text-muted-foreground">Review and action reported content.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+2 since yesterday</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">Average resolution time: 2h</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Report Type</TableHead>
                            <TableHead>Target</TableHead>
                            <TableHead>Reporter</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell className="font-medium">{report.type}</TableCell>
                                <TableCell>{report.target}</TableCell>
                                <TableCell>{report.reporter}</TableCell>
                                <TableCell>
                                    <Badge variant={report.status === 'Pending' ? 'destructive' : report.status === 'Resolved' ? 'default' : 'secondary'} className="text-[10px]">
                                        {report.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{report.date}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm">Review</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};

export default AdminModeration;
