import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'

const DashboardStats = ({ stats }) => {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
                const isPositive = stat.change.includes('+') || stat.change.includes('up')
                return (
                    <Card key={index} className="shadow-sm border-zinc-100 dark:border-zinc-800/50 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/5 hover:-translate-y-1 group">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <CardTitle className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                                {stat.label}
                            </CardTitle>
                            <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                                {stat.icon && <stat.icon className="h-4 w-4" />}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                {stat.value}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                    {stat.change.split(' ')[0]}
                                </div>
                                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest hidden xl:inline">
                                    {stat.change.split(' ').slice(1).join(' ')}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export default DashboardStats
