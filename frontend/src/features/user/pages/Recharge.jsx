import { Check, CreditCard, History, Zap, ShieldCheck, Crown } from 'lucide-react'
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
    <div className="flex-1 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Recharge & Plans</h1>
        <p className="text-muted-foreground font-medium">
          Manage your subscription, credits, and review your billing history.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 xl:grid-cols-12">
        <Card className="xl:col-span-8 shadow-sm border-muted rounded-xl overflow-hidden bg-card">
          <CardHeader className="border-b border-border/50 pb-6 bg-zinc-50/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-foreground">Current Subscription</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Details of your active plan and upcoming renewal.
                </CardDescription>
              </div>
              <div className="p-3 bg-zinc-100 rounded-2xl group-hover:scale-110 transition-transform">
                <CreditCard className="h-6 w-6 text-zinc-900" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Plan Name</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-foreground">{currentPlan.name}</p>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100/50">Active</Badge>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Renews On</p>
                <p className="text-lg font-bold text-foreground">{currentPlan.expiryDate}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Yearly Price</p>
                <p className="text-lg font-bold text-foreground">{currentPlan.price}<span className="text-sm font-medium text-muted-foreground">{currentPlan.period}</span></p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-zinc-50/50 px-8 py-5 border-t border-border flex justify-end gap-3">
            <Button variant="ghost" className="text-muted-foreground font-bold hover:text-foreground">Cancel Plan</Button>
            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold shadow-sm px-6">Manage Billing</Button>
          </CardFooter>
        </Card>

        <Card className="xl:col-span-4 shadow-sm border-muted rounded-xl overflow-hidden bg-card">
          <CardHeader className="border-b border-border/50 bg-zinc-50/30 py-4">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-bold text-foreground">Billing History</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-zinc-50/50">
                <TableRow className="hover:bg-transparent border-b border-border/50">
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest h-10">Invoice</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-widest h-10">Amount</TableHead>
                  <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest h-10">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingHistory.map((item, i) => (
                  <TableRow key={i} className="hover:bg-zinc-50/50 transition-colors border-b border-border/50 last:border-0">
                    <TableCell className="py-3">
                      <p className="text-xs font-bold text-foreground">{item.id}</p>
                      <p className="text-[10px] text-muted-foreground font-medium">{item.date}</p>
                    </TableCell>
                    <TableCell className="text-xs font-bold text-foreground">{item.amount}</TableCell>
                    <TableCell className="text-right py-3">
                      <Badge variant="outline" className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border-emerald-100/50">{item.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="py-3 border-t border-border flex justify-center bg-zinc-50/30">
            <Button variant="link" size="sm" className="text-xs text-zinc-600 font-bold hover:text-zinc-900">View All Transactions</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-8 pt-8">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-foreground tracking-tight">Upgrade your experience</h3>
          <p className="text-muted-foreground font-medium">Choose a plan that fits your creative workflow.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative shadow-sm border-muted rounded-xl overflow-hidden bg-card transition-all duration-300 ${plan.popular ? "ring-2 ring-primary shadow-md" : ""}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-sm z-10">
                  Most Popular
                </div>
              )}
              <CardHeader className="pt-10">
                <div className={`w-12 h-12 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 border border-zinc-200/50`}>
                  <plan.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                <CardDescription className="min-h-[40px] text-muted-foreground font-medium pt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground tracking-tighter">{plan.price}</span>
                  <span className="text-sm font-bold text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-4">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start text-sm group/item">
                      <div className={`p-0.5 rounded-full bg-emerald-50 text-emerald-600 mr-3 mt-0.5 group-hover/item:scale-125 transition-transform border border-emerald-100/50`}>
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-muted-foreground font-medium group-hover/item:text-foreground transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4 pb-8">
                <Button className={`w-full h-12 rounded-xl font-bold transition-all text-base ${plan.popular ? "bg-zinc-900 hover:bg-zinc-800 text-white shadow-md" : "bg-white border-border text-zinc-900 hover:bg-zinc-50 border shadow-sm"}`}>
                  {plan.popular ? "Get Started Now" : "Choose this plan"}
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
