import React from 'react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const SecondaryButton = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <Button
            ref={ref}
            variant="outline"
            className={cn(
                "border-gold/30 text-gold hover:bg-gold/10 hover:text-gold hover:border-gold/50 font-medium tracking-wide transition-all duration-300",
                className
            )}
            {...props}
        >
            {children}
        </Button>
    )
})
SecondaryButton.displayName = "SecondaryButton"
