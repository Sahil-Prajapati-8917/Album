import React from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card } from '@/components/ui/card'

const AlbumFilters = ({ searchTerm, onSearchChange, statusFilter, onStatusChange }) => {
    return (
        <Card className="p-6 border-gold/10 shadow-sm bg-card/50 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                    <div className="relative group">
                        <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-gold transition-colors" />
                        <Input
                            type="text"
                            placeholder="Search the archive..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-12 h-12 border-gold/10 focus-visible:ring-gold/20 bg-background/50"
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <Select onValueChange={onStatusChange} value={statusFilter}>
                        <SelectTrigger className="w-full lg:w-48 h-12 border-gold/10 focus:ring-gold/20 bg-background/50 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">
                            <div className="flex items-center">
                                <Filter className="h-3 w-3 mr-2 text-gold/60" />
                                <SelectValue placeholder="Status" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Curation</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Drafts</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </Card>
    )
}

export default AlbumFilters
