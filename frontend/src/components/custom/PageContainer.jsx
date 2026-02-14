import React from 'react'
import { cn } from "@/lib/utils"

export const PageContainer = ({ children, className, fullWidth = false }) => {
    return (
        <div className={cn(
            "w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500",
            !fullWidth && "max-w-7xl",
            className
        )}>
            {children}
        </div>
    )
}
