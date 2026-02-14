import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PricingComponent from '../components/PricingComponent'
import { ShieldCheck } from 'lucide-react'
import CurrentPlanCard from '@/components/features/recharge/CurrentPlanCard'
import BillingHistory from '@/components/features/recharge/BillingHistory'
import { LoadingState } from '@/components/custom/LoadingState'

const Recharge = () => {
  const [currentPlan, setCurrentPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load current plan data
    const mockCurrentPlan = {
      name: 'Pro Visionary',
      status: 'Active',
      expiryDate: '2026-01-15',
      price: '₹2,999/year',
      features: [
        'Unlimited Albums',
        'Advanced Analytics',
        'Priority Support',
        'Custom Branding',
        '4K Ultra HD Quality',
        'Storage: 500GB'
      ]
    }

    setTimeout(() => {
      setCurrentPlan(mockCurrentPlan)
      setIsLoading(false)
    }, 1000)
  }, [])

  const billingHistory = [
    { date: '2025-01-15', amount: '₹2,999', status: 'Paid', plan: 'Pro Visionary', method: 'UPI' },
    { date: '2024-12-15', amount: '₹2,999', status: 'Paid', plan: 'Pro Visionary', method: 'UPI' },
    { date: '2024-11-15', amount: '₹1,499', status: 'Paid', plan: 'Basics Archiver', method: 'Card' }
  ]

  if (isLoading) {
    return <LoadingState message="Loading plan details..." className="h-[60vh]" />
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground italic">Elite Masterplan</h1>
          <p className="mt-2 text-sm text-muted-foreground font-light tracking-wide uppercase">Empowering your creative legacy</p>
        </div>
        <div className="flex items-center text-gold bg-gold/5 px-4 py-2 rounded-full border border-gold/10">
          <ShieldCheck className="h-4 w-4 mr-2" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Secured Transactions</span>
        </div>
      </div>

      <CurrentPlanCard currentPlan={currentPlan} />

      {/* Available Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-muted/20 border border-gold/5 rounded-3xl p-4"
      >
        <PricingComponent />
      </motion.div>

      <BillingHistory history={billingHistory} />
    </div>
  )
}

export default Recharge
