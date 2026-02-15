import React from 'react'
import { Calendar, Plus, Eye, Share2, ShieldCheck, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const RecentActivity = ({ activities = [] }) => {
    return (
        <Card className="shadow-sm border-muted rounded-xl h-full flex flex-col bg-card">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-foreground">Recent Activity</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Keep track of your latest updates.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                                <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                    {getIcon(activity.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">
                                        {activity.message}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {activity.description || 'Action completed successfully'}
                                    </p>
                                </div>
                                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1 whitespace-nowrap">
                                    {activity.timestamp}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center opacity-50">
                            <div className="p-4 bg-muted rounded-full mb-4">
                                <Calendar className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-semibold text-muted-foreground">No recent activity</p>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="pt-2">
                <Button variant="ghost" className="w-full text-xs font-semibold text-muted-foreground hover:text-foreground">
                    View All Activity
                </Button>
            </CardFooter>
        </Card>
    )
}

const getIcon = (type) => {
    switch (type) {
        case 'album_created': return <Plus className="h-4 w-4" />
        case 'view_increase': return <Eye className="h-4 w-4" />
        case 'album_shared': return <Share2 className="h-4 w-4" />
        case 'album_approved': return <ShieldCheck className="h-4 w-4" />
        default: return <Zap className="h-4 w-4" />
    }
}

const getIconBg = (type) => {
    switch (type) {
        case 'album_created': return 'bg-emerald-100 text-emerald-700'
        case 'view_increase': return 'bg-sky-100 text-sky-700'
        case 'album_shared': return 'bg-zinc-100 text-zinc-900'
        case 'album_approved': return 'bg-amber-100 text-amber-700'
        default: return 'bg-zinc-100 text-zinc-600'
    }
}

export default RecentActivity
