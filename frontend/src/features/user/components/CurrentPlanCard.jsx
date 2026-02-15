import React from 'react'
import { motion } from 'framer-motion'
import { Crown, CheckCircle, Calendar, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CurrentPlanCard = ({ currentPlan }) => {
    if (!currentPlan) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl shadow-sm border border-gold/10 p-10 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Crown className="h-32 w-32 text-gold" transform="rotate(15)" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center mr-4">
                            <Crown className="h-6 w-6 text-gold" />
                        </div>
                        <h2 className="text-2xl font-serif italic text-foreground">Active Curation</h2>
                    </div>
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gold/10 text-gold border border-gold/20">
                        <CheckCircle className="h-3 w-3 mr-1.5" />
                        {currentPlan.status}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="text-3xl font-serif text-foreground mb-2">{currentPlan.name}</h3>
                        <p className="text-4xl font-serif text-gold mb-6">{currentPlan.price}</p>
                        <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2 text-gold/60" />
                            Valid through {new Date(currentPlan.expiryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <Button className="mt-8 h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-serif italic">
                            Manage Billing
                        </Button>
                    </div>

                    <div className="md:col-span-2">
                        <div className="flex items-center mb-6">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Premium Benefits</h4>
                            <div className="ml-4 flex-1 h-px bg-gold/10"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {currentPlan.features.map((feature, index) => (
                                <div key={index} className="flex items-center text-sm font-light text-muted-foreground">
                                    <Sparkles className="h-3.5 w-3.5 text-gold mr-3 flex-shrink-0" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default CurrentPlanCard
