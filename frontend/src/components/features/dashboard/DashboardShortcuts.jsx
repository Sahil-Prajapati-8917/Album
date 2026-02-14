import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, FolderOpen, CreditCard, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const shortcuts = [
    {
        title: "Create New",
        icon: Plus,
        href: "/create",
        color: "text-gold"
    },
    {
        title: "All Pixfolio",
        icon: FolderOpen,
        href: "/all-pixfolio",
        color: "text-blue-500"
    },
    {
        title: "Recharge",
        icon: CreditCard,
        href: "/recharge",
        color: "text-green-500"
    },
    {
        title: "Profile",
        icon: User,
        href: "/profile",
        color: "text-purple-500"
    }
]

const DashboardShortcuts = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-10"
        >
            <Card className="border-gold/10 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-serif italic">Quick Actions</CardTitle>
                    <div className="w-12 h-px bg-gold mt-2"></div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {shortcuts.map((shortcut, index) => (
                            <Link
                                key={index}
                                to={shortcut.href}
                                className="flex flex-col items-center p-6 bg-muted/30 rounded-xl hover:bg-gold/5 transition-all group border border-transparent hover:border-gold/20"
                            >
                                <div className="w-14 h-14 bg-background rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-all border border-gold/5">
                                    <shortcut.icon className={`h-6 w-6 ${shortcut.color || 'text-muted-foreground'} group-hover:text-gold transition-colors`} />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-gold transition-colors text-center">
                                    {shortcut.title}
                                </span>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default DashboardShortcuts
