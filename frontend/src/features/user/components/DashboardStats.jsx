import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'

const DashboardStats = ({ stats }) => {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
                const isPositive = stat.change.includes('+') || stat.change.includes('up')
                return (
                    <Card key={index} className="shadow-sm border-muted rounded-xl bg-card">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-tight">
                                {stat.label}
                            </CardTitle>
                            {stat.icon && <stat.icon className="h-4 w-4 text-muted-foreground" />}
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-semibold tracking-tight text-foreground">
                                {stat.value}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                <Badge
                                    variant="secondary"
                                    className={`text-[10px] font-bold px-1.5 py-0 rounded-md ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}
                                >
                                    {stat.change.split(' ')[0]}
                                </Badge>
                                <span className="text-xs text-muted-foreground font-medium">
                                    {stat.change.split(' ').slice(1).join(' ')}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export default DashboardStats
