import React from 'react'
import { motion } from 'framer-motion'
import { CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'

const BillingHistory = ({ history }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-3xl shadow-sm border border-gold/10 overflow-hidden"
        >
            <div className="px-8 py-6 border-b border-gold/10 flex justify-between items-center bg-muted/30">
                <h2 className="text-xl font-serif italic text-foreground">Transaction Archive</h2>
                <CreditCard className="h-5 w-5 text-gold" />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-muted/10 border-b border-gold/5">
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Date</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Vision Tier</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Investment</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Method</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground text-right">Certificate</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/5">
                        {history.map((bill, index) => (
                            <tr key={index} className="hover:bg-gold/5 transition-colors group">
                                <td className="px-8 py-5 text-xs text-muted-foreground font-light">
                                    {new Date(bill.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                                <td className="px-8 py-5">
                                    <span className="text-sm font-serif italic text-foreground">{bill.plan}</span>
                                </td>
                                <td className="px-8 py-5 text-xs font-bold text-foreground">
                                    {bill.amount}
                                </td>
                                <td className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                    {bill.method}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <Button variant="ghost" size="sm" className="text-gold hover:bg-gold/10 h-8 px-4 text-[10px] font-bold uppercase tracking-widest">
                                        Download
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    )
}

export default BillingHistory
