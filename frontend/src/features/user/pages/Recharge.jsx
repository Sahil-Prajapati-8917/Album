import { Check, CreditCard, History, Zap, ShieldCheck, Crown, ChevronRight } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const Recharge = () => {
  const currentPlan = {
    name: 'Pro Visionary',
    status: 'Active',
    expiryDate: '2026-01-15',
    price: '₹2,999',
    period: '/year',
  }

  const plans = [
    {
      name: "Basics Archiver",
      price: "₹1,499",
      period: "/year",
      description: "Essential tools for hobbyists and emerging artists.",
      features: ["10 Albums", "Standard Analytics", "Email Support", "100GB Storage"],
      icon: ShieldCheck,
      color: "text-zinc-500",
      bg: "bg-zinc-500/10"
    },
    {
      name: "Pro Visionary",
      price: "₹2,999",
      period: "/year",
      description: "Advanced tools for professional photographers.",
      features: ["Unlimited Albums", "Advanced Analytics", "Priority Support", "500GB Storage", "Custom Branding"],
      popular: true,
      icon: Zap,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10"
    },
    {
      name: "Elite Legacy",
      price: "₹4,999",
      period: "/year",
      description: "For agencies and high-volume studios.",
      features: ["Everything in Pro", "1TB Storage", "Dedicated Manager", "API Access", "White Label"],
      icon: Crown,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    }
  ]

  const billingHistory = [
    { id: 'INV-001', date: '2025-01-15', amount: '₹2,999', status: 'Paid', plan: 'Pro Visionary', method: 'UPI' },
    { id: 'INV-002', date: '2024-12-15', amount: '₹2,999', status: 'Paid', plan: 'Pro Visionary', method: 'UPI' },
    { id: 'INV-003', date: '2024-11-15', amount: '₹1,499', status: 'Paid', plan: 'Basics Archiver', method: 'Card' }
  ]

  return (
    <div className="flex-1 space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Plan & Subscription</h1>
        <p className="text-zinc-500 font-medium">
          Manage your artistic journey and view your historical transactions.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 xl:grid-cols-12">
        <Card className="xl:col-span-8 shadow-sm border-zinc-100 dark:border-zinc-800/50 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900">
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50 pb-6 bg-zinc-50/30 dark:bg-zinc-800/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black">
                    <CreditCard className="h-5 w-5" />
                  </span>
                  Active Subscription
                </CardTitle>
                <CardDescription className="text-sm text-zinc-500 font-medium mt-1">
                  You are currently on the most popular professional tier.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-10 px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Tier Status</p>
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{currentPlan.name}</p>
                  <Badge className="w-fit bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20 px-2 py-0 text-[9px] font-black uppercase tracking-widest rounded-full">Renewal Active</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Next Invoicing</p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{currentPlan.expiryDate}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Subscription Fee</p>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{currentPlan.price}<span className="text-xs font-bold text-zinc-400 ml-1">{currentPlan.period}</span></p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-zinc-50/30 dark:bg-zinc-800/10 px-10 py-6 border-t border-zinc-100 dark:border-zinc-800/50 flex justify-between items-center">
            <Button variant="ghost" className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest hover:text-zinc-900 dark:hover:text-zinc-50">Cancel Subscription</Button>
            <Button className="bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-black text-xs uppercase tracking-widest px-8 h-12 rounded-xl shadow-xl transition-all">Manage Billing</Button>
          </CardFooter>
        </Card>

        <Card className="xl:col-span-4 shadow-sm border-zinc-100 dark:border-zinc-800/50 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900">
          <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-800/10 py-5">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-zinc-400" />
              <CardTitle className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Billing Statements</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-zinc-50/50 dark:bg-zinc-800/20">
                <TableRow className="hover:bg-transparent border-b border-zinc-100 dark:border-zinc-800/50">
                  <TableHead className="text-[9px] font-black uppercase tracking-widest h-10 text-zinc-400 pl-6">Reference</TableHead>
                  <TableHead className="text-[9px] font-black uppercase tracking-widest h-10 text-zinc-400">Total</TableHead>
                  <TableHead className="text-right text-[9px] font-black uppercase tracking-widest h-10 text-zinc-400 pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingHistory.map((item, i) => (
                  <TableRow key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 transition-colors border-b border-zinc-100 dark:border-zinc-800/50 last:border-0">
                    <TableCell className="py-4 pl-6">
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 leading-tight">{item.id}</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1 tracking-tighter">{item.date}</p>
                    </TableCell>
                    <TableCell className="text-xs font-bold text-zinc-800 dark:text-zinc-50">{item.amount}</TableCell>
                    <TableCell className="text-right py-4 pr-6">
                      <Badge className="text-[9px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none px-2 py-0.5 rounded-full">{item.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="py-4 border-t border-zinc-100 dark:border-zinc-800/50 flex justify-center bg-zinc-50/30 dark:bg-zinc-800/10">
            <Button variant="ghost" size="sm" className="text-[10px] text-zinc-400 font-black uppercase tracking-widest hover:bg-transparent hover:text-zinc-900 dark:hover:text-zinc-50">Download All Statements</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-10 pt-10">
        <div className="text-center space-y-3">
          <Badge className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black hover:bg-zinc-900 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Available Plans</Badge>
          <h3 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Evolve your presence</h3>
          <p className="text-zinc-500 font-medium max-w-xl mx-auto">Select the sanctuary that best fits your artistic workflow and storage requirements.</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`group relative shadow-sm border-zinc-100 dark:border-zinc-800/50 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-900/10 hover:-translate-y-2 ${plan.popular ? "ring-2 ring-zinc-900 dark:ring-zinc-50" : ""}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-bl-2xl shadow-lg z-10 animate-in slide-in-from-top-4 duration-700">
                  Recommended Tier
                </div>
              )}
              <CardHeader className="pt-12 px-8">
                <div className={`w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-50 flex items-center justify-center mb-8 border border-zinc-100 dark:border-zinc-700/50 transition-all duration-500 group-hover:scale-110 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-zinc-50 dark:group-hover:text-black`}>
                  <plan.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{plan.name}</CardTitle>
                <CardDescription className="min-h-[48px] text-zinc-500 font-medium pt-2 text-sm leading-relaxed">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-10 px-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tighter">{plan.price}</span>
                  <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest ml-1">{plan.period}</span>
                </div>

                <Separator className="bg-zinc-100 dark:bg-zinc-800/50" />

                <ul className="space-y-4">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start text-sm group/item">
                      <div className="p-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mr-4 mt-0.5 group-hover/item:scale-125 transition-transform">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-zinc-500 dark:text-zinc-400 font-medium group-hover/item:text-zinc-900 dark:group-hover/item:text-zinc-50 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-8 pb-10 px-8">
                <Button className={`w-full h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 ${plan.popular ? "bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black shadow-xl" : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-700 border shadow-sm"}`}>
                  {plan.popular ? "Elevate Journey" : "Begin Selection"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Recharge
