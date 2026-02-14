import React from 'react'
import { cn } from "@/lib/utils"

export const FormSection = ({ title, description, children, className }) => {
    return (
        <div className={cn("space-y-6 py-6 border-b border-border last:border-0", className)}>
            {(title || description) && (
                <div className="space-y-1 mb-4">
                    {title && <h3 className="text-lg font-serif font-semibold text-foreground">{title}</h3>}
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>
            )}
            <div className="space-y-4">
                {children}
            </div>
        </div>
    )
}
