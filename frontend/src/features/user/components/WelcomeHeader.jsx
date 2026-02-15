import React from 'react'
import { Calendar } from 'lucide-react'
import { PageContainer } from '@/components/custom/PageContainer'

const WelcomeHeader = ({ userName }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    Good morning, {userName || 'Artisan'}!
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground font-medium flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>
                    Your workspace is active and up to date
                </p>
            </div>
            <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-4 py-1.5 rounded-full border border-border/50">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
        </div>
    )
}

export default WelcomeHeader
