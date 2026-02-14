import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PricingComponent from '../components/PricingComponent'
import {
  Crown,
  CheckCircle,
  Calendar,
  CreditCard,
  ShieldCheck,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#181611] dark:text-white italic">Elite Masterplan</h1>
          <p className="mt-2 text-sm text-gray-500 font-light tracking-wide uppercase">Empowering your creative legacy</p>
        </div>
        <div className="flex items-center text-gold bg-gold/5 px-4 py-2 rounded-full border border-gold/10">
          <ShieldCheck className="h-4 w-4 mr-2" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Secured Transactions</span>
        </div>
      </div>

      {/* Current Plan Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#2a261d] rounded-3xl shadow-sm border border-gold/10 p-10 relative overflow-hidden"
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
              <h2 className="text-2xl font-serif italic text-[#181611] dark:text-white">Active Curation</h2>
            </div>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gold/10 text-gold border border-gold/20">
              <CheckCircle className="h-3 w-3 mr-1.5" />
              {currentPlan.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-3xl font-serif text-gray-900 dark:text-white mb-2">{currentPlan.name}</h3>
              <p className="text-4xl font-serif text-gold mb-6">{currentPlan.price}</p>
              <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <Calendar className="h-4 w-4 mr-2 text-gold/60" />
                Valid through {new Date(currentPlan.expiryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <Button className="mt-8 h-12 px-8 bg-[#181611] hover:bg-black text-white rounded-xl font-serif italic">
                Manage Billing
              </Button>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Premium Benefits</h4>
                <div className="ml-4 flex-1 h-px bg-gold/10"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm font-light text-gray-600 dark:text-gray-400">
                    <Sparkles className="h-3.5 w-3.5 text-gold mr-3 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Available Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-pearl/30 dark:bg-ebony/20 border border-gold/5 rounded-3xl p-4"
      >
        <PricingComponent />
      </motion.div>

      {/* Billing History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-[#2a261d] rounded-3xl shadow-sm border border-gold/10 overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-gold/10 flex justify-between items-center bg-pearl/50 dark:bg-ebony/30">
          <h2 className="text-xl font-serif italic text-gray-900 dark:text-white">Transaction Archive</h2>
          <CreditCard className="h-5 w-5 text-gold" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-pearl/30 dark:bg-ebony/10 border-b border-gold/5">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Date</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Vision Tier</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Investment</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Method</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {[
                { date: '2025-01-15', amount: '₹2,999', status: 'Paid', plan: 'Pro Visionary', method: 'UPI' },
                { date: '2024-12-15', amount: '₹2,999', status: 'Paid', plan: 'Pro Visionary', method: 'UPI' },
                { date: '2024-11-15', amount: '₹1,499', status: 'Paid', plan: 'Basics Archiver', method: 'Card' }
              ].map((bill, index) => (
                <tr key={index} className="hover:bg-gold/5 transition-colors group">
                  <td className="px-8 py-5 text-xs text-gray-500 font-light">
                    {new Date(bill.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-serif italic text-gray-900 dark:text-white">{bill.plan}</span>
                  </td>
                  <td className="px-8 py-5 text-xs font-bold text-gray-700 dark:text-gray-300">
                    {bill.amount}
                  </td>
                  <td className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
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
    </div>
  )
}

export default Recharge
