import React from 'react'
import { cn } from "@/lib/utils"
import { PrimaryButton } from "./PrimaryButton"
import { ImageOff } from "lucide-react"

export const EmptyState = ({
    icon: Icon = ImageOff,
    title,
    description,
    action,
    actionLabel,
    className
}) => {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-muted rounded-lg animate-in fade-in zoom-in-95 duration-500",
            className
        )}>
            <div className="bg-muted/50 p-4 rounded-full mb-4">
                <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
            {action && actionLabel && (
                <PrimaryButton onClick={action}>
                    {actionLabel}
                </PrimaryButton>
            )}
        </div>
    )
}
