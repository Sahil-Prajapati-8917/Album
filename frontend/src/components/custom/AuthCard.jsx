import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Logo from "@/components/Logo"
import { cn } from "@/lib/utils"

export const AuthCard = ({ title, description, children, footer, className }) => {
    return (
        <Card className={cn("w-full max-w-md mx-auto border-gold/20 shadow-premium", className)}>
            <CardHeader className="space-y-2 text-center">
                <div className="flex justify-center mb-4">
                    <Logo className="h-12 w-auto" />
                </div>
                <CardTitle className="text-2xl font-serif font-bold">{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {footer && (
                <CardFooter className="flex flex-col space-y-2 text-sm text-center text-muted-foreground">
                    {footer}
                </CardFooter>
            )}
        </Card>
    )
}
