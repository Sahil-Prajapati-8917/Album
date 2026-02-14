import React from 'react'
import { motion } from 'framer-motion'
import { DashboardCard } from '@/components/custom/DashboardCard'

const DashboardStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <DashboardCard
                        title={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        description={stat.change}
                        className="h-full"
                    />
                </motion.div>
            ))}
        </div>
    )
}

export default DashboardStats
