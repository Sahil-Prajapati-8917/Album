import React from 'react'
import { TrendingUp, Clock, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const RecentActivity = ({ activities = [] }) => {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                    Timeline of your artistry
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activities.length > 0 ? (
                        activities.map((activity, index) => (
                            <div key={activity.id} className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{activity.type?.charAt(0) || 'A'}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{activity.message}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {activity.timestamp}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    {/* Optional: Add value or status here if needed */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <Calendar className="h-8 w-8 text-muted-foreground/50 mb-2" />
                            <p className="text-sm text-muted-foreground">Quiet in the studio today</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentActivity
