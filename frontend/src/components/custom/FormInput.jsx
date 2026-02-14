import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export const FormInput = React.forwardRef(({ label, error, className, id, ...props }, ref) => {
    const inputId = id || React.useId()

    return (
        <div className={cn("space-y-2", className)}>
            {label && (
                <Label htmlFor={inputId} className="text-sm font-medium text-foreground/80">
                    {label}
                </Label>
            )}
            <Input
                id={inputId}
                ref={ref}
                className={cn(
                    "bg-background border-input focus:ring-gold/30 focus:border-gold transition-all duration-200",
                    error && "border-destructive focus:border-destructive focus:ring-destructive/30"
                )}
                {...props}
            />
            {error && (
                <p className="text-xs text-destructive font-medium animate-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    )
})
FormInput.displayName = "FormInput"
