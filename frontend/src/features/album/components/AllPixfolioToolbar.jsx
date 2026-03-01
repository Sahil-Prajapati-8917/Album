import { Search } from 'lucide-react'
import { Input } from '@/shared/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"

export const AllPixfolioToolbar = ({
    searchTerm,
    setSearchTerm,
    functionType,
    setFunctionType,
    functionTypesOptions,
    sortBy,
    setSortBy,
    dateFilter,
    setDateFilter
}) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Universal search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 h-9 w-full"
                />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap md:flex-nowrap w-full md:w-auto">
                <Select value={functionType} onValueChange={setFunctionType}>
                    <SelectTrigger className="w-full md:w-[140px] h-9">
                        <SelectValue placeholder="Function Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {functionTypesOptions.map(type => (
                            <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[140px] h-9">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="latest">Latest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="most_viewed">Most Viewed</SelectItem>
                        <SelectItem value="least_viewed">Least Viewed</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-full md:w-[140px] h-9">
                        <SelectValue placeholder="Date Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="7days">Last 7 Days</SelectItem>
                        <SelectItem value="30days">Last 30 Days</SelectItem>
                        <SelectItem value="thisMonth">This Month</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default AllPixfolioToolbar
