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
      description: "Essential tools for hobbyists.",
      features: ["10 Albums", "Standard Analytics", "Email Support", "100GB Storage"],
      icon: ShieldCheck,
    },
    {
      name: "Pro Visionary",
      price: "₹2,999",
      period: "/year",
      description: "Advanced tools for pros.",
      features: ["Unlimited Albums", "Advanced Analytics", "Priority Support", "500GB Storage", "Custom Branding"],
      popular: true,
      icon: Zap,
    },
    {
      name: "Elite Legacy",
      price: "₹4,999",
      period: "/year",
      description: "For agencies and studios.",
      features: ["Everything in Pro", "1TB Storage", "Dedicated Manager", "API Access", "White Label"],
      icon: Crown,
    }
  ]

  const billingHistory = [
    { id: 'INV-001', date: '2025-01-15', amount: '₹2,999', status: 'Paid', plan: 'Pro Visionary' },
    { id: 'INV-002', date: '2024-12-15', amount: '₹2,999', status: 'Paid', plan: 'Pro Visionary' },
    { id: 'INV-003', date: '2024-11-15', amount: '₹1,499', status: 'Paid', plan: 'Basics Archiver' },
  ]

  return (
    <div className="flex-1 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Plan & Subscription</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing history.
        </p>
      </div>

      {/* Current Plan */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Active Subscription
                </CardTitle>
                <CardDescription>Your current plan details.</CardDescription>
              </div>
              <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="text-lg font-semibold">{currentPlan.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Billing</p>
                <p className="text-lg font-semibold">{currentPlan.expiryDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-lg font-semibold">{currentPlan.price}<span className="text-sm text-muted-foreground">{currentPlan.period}</span></p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-between">
            <Button variant="ghost" className="text-muted-foreground">Cancel Subscription</Button>
            <Button>Manage Billing</Button>
          </CardFooter>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <History className="h-4 w-4" />
              Billing History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Invoice</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="pl-6">
                      <p className="text-sm font-medium">{item.id}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </TableCell>
                    <TableCell className="font-medium">{item.amount}</TableCell>
                    <TableCell className="text-right pr-6">
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Pricing Plans */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Available Plans</h2>
          <p className="text-muted-foreground">Choose the plan that fits your needs.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-md' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>Recommended</Badge>
                </div>
              )}
              <CardHeader className="pt-8">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-2">
                  <plan.icon className="h-5 w-5" />
                </div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <Separator />
                <ul className="space-y-3">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center text-sm gap-2">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.popular ? "Current Plan" : "Select Plan"}
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
