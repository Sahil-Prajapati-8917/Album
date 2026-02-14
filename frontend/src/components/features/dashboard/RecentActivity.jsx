import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Clock, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const RecentActivity = ({ activities = [] }) => {
    return (
        <Card className="border-gold/10 shadow-sm overflow-hidden">
            <CardHeader className="pb-4 bg-muted/20 border-b border-gold/10 flex flex-row items-center justify-between space-y-0">
                <div>
                    <CardTitle className="text-xl font-serif italic">Recent Activity</CardTitle>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">Timeline of your artistry</p>
                </div>
                <TrendingUp className="h-5 w-5 text-gold" />
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-border">
                    {activities.length > 0 ? (
                        activities.map((activity, index) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="px-8 py-5 hover:bg-gold/5 transition-all group"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                                            {activity.icon}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground leading-relaxed">{activity.message}</p>
                                        <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {activity.timestamp}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="px-8 py-16 text-center">
                            <Calendar className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                            <p className="text-sm text-muted-foreground font-light uppercase tracking-widest">Quiet in the studio today</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentActivity
