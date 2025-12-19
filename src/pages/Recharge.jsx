import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PricingComponent from '../components/PricingComponent'
import {
  Crown,
  CheckCircle,
  Calendar,
  CreditCard
} from 'lucide-react'

const Recharge = () => {
  const [currentPlan, setCurrentPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load current plan data
    const mockCurrentPlan = {
      name: 'Professional Plan',
      status: 'Active',
      expiryDate: '2026-01-15',
      price: '$29.99/month',
      features: [
        'Unlimited Albums',
        'Advanced Analytics',
        'Priority Support',
        'Custom Branding',
        'HD Quality',
        'Storage: 50GB'
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription & Billing</h1>
        <p className="text-gray-600">Manage your plan and billing information</p>
      </div>

      {/* Current Plan Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Crown className="h-5 w-5 mr-2 text-yellow-500" />
            Current Plan
          </h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-4 w-4 mr-1" />
            {currentPlan.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{currentPlan.name}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-4">{currentPlan.price}</p>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Calendar className="h-4 w-4 mr-2" />
              Expires on {new Date(currentPlan.expiryDate).toLocaleDateString()}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Plan Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Available Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <PricingComponent />
      </motion.div>

      {/* Billing History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Billing History
        </h2>

        <div className="space-y-4">
          {[
            { date: '2025-01-15', amount: '$29.99', status: 'Paid', plan: 'Professional Plan' },
            { date: '2024-12-15', amount: '$29.99', status: 'Paid', plan: 'Professional Plan' },
            { date: '2024-11-15', amount: '$29.99', status: 'Paid', plan: 'Professional Plan' }
          ].map((bill, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{bill.plan}</p>
                  <p className="text-sm text-gray-600">{new Date(bill.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{bill.amount}</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {bill.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Recharge
