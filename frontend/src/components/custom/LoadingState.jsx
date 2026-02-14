import React from 'react'
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const LoadingState = ({ message = "Loading...", className }) => {
    return (
        <div className={cn("flex flex-col items-center justify-center h-40 space-y-4", className)}>
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
            <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
        </div>
    )
}
