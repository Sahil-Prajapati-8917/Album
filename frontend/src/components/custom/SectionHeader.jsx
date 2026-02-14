import React from 'react'
import { cn } from "@/lib/utils"

export const SectionHeader = ({ title, description, action, className }) => {
    return (
        <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", className)}>
            <div className="space-y-1">
                <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground">{title}</h2>
                {description && <p className="text-muted-foreground text-lg">{description}</p>}
            </div>
            {action && (
                <div className="flex-shrink-0">
                    {action}
                </div>
            )}
        </div>
    )
}
