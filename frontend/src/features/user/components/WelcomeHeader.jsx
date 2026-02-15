import React from 'react'
import { Calendar } from 'lucide-react'
import { PageContainer } from '@/components/custom/PageContainer'

const WelcomeHeader = ({ userName }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-4xl md:text-5xl font-serif text-foreground italic">
                    Welcome back, {userName || 'Artist'}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground font-light tracking-wide uppercase">
                    Curating your digital legacy
                </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold border-b-2 border-gold pb-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
        </div>
    )
}

export default WelcomeHeader
