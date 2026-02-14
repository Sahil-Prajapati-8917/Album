import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ArchiveHeader = ({ userName }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-4xl md:text-5xl font-serif text-foreground italic">
                    {userName ? `${userName}'s Archive` : 'Archive'}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground font-light tracking-wide uppercase">
                    Curating your digital legacy
                </p>
            </div>
            <div className="flex items-center gap-4">
                <Link to="/create">
                    <Button className="h-12 px-6 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-all">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New
                    </Button>
                </Link>
                <Sparkles className="h-8 w-8 text-gold/20 hidden md:block" />
            </div>
        </div>
    )
}

export default ArchiveHeader
