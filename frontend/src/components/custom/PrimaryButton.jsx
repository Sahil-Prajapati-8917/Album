import React from 'react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const PrimaryButton = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <Button
            ref={ref}
            className={cn(
                "bg-gold hover:bg-gold/90 text-white font-semibold tracking-wide shadow-premium transition-all duration-300 hover:scale-105 active:scale-95",
                className
            )}
            {...props}
        >
            {children}
        </Button>
    )
})
PrimaryButton.displayName = "PrimaryButton"
