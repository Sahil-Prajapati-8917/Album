import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Eye, Edit, Trash2, Search, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

const AdminAlbums = () => {
    const albums = [
        { id: 1, title: 'Summer Wedding 2024', user: 'John Doe', type: 'Wedding', photos: 120, views: 1450, status: 'Published', date: '2024-02-15' },
        { id: 2, title: 'Corporate Event', user: 'Jane Smith', type: 'Event', photos: 450, views: 500, status: 'Draft', date: '2024-02-14' },
        { id: 3, title: 'Baby Shower', user: 'Mike Johnson', type: 'Personal', photos: 50, views: 120, status: 'Published', date: '2024-02-12' },
        { id: 4, title: 'Product Launch', user: 'Sarah Wilson', type: 'Commercial', photos: 85, views: 3200, status: 'Published', date: '2024-02-10' },
        { id: 5, title: 'Family Reunion', user: 'David Brown', type: 'Personal', photos: 200, views: 80, status: 'Private', date: '2024-02-08' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tight">Albums</h2>
                    <p className="text-muted-foreground">Manage all user-created albums.</p>
                </div>
                <Button>Create New Album</Button>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search albums..." className="pl-9" />
                </div>
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Cover</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Stats</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {albums.map((album) => (
                            <TableRow key={album.id}>
                                <TableCell>
                                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                                        IMG
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{album.title}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-[10px]">{album.user[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm">{album.user}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{album.type}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-xs text-muted-foreground">
                                        <span>{album.photos} photos</span>
                                        <span>{album.views} views</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={album.status === 'Published' ? 'default' : 'secondary'} className="text-[10px]">
                                        {album.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
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

export default AdminAlbums;
