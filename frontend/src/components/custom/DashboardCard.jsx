import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export const DashboardCard = ({ title, icon: Icon, value, description, trend, className }) => {
    return (
        <Card className={cn("hover:shadow-premium transition-all duration-300 border-gold/10", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-serif">{value}</div>
                {(description || trend) && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {trend && <span className={cn("inline-flex items-center", trend > 0 ? "text-green-500" : "text-red-500")}>
                            {trend > 0 ? "+" : ""}{trend}%
                        </span>}
                        {trend && description ? " " : ""}
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
