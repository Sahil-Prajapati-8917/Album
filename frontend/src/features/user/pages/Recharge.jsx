import { Check } from 'lucide-react'
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
    price: '₹2,999/year',
  }

  const plans = [
    {
      name: "Basics Archiver",
      price: "₹1,499",
      period: "/year",
      description: "Essential tools for hobbyists.",
      features: ["10 Albums", "Standard Analytics", "Email Support", "100GB Storage"]
    },
    {
      name: "Pro Visionary",
      price: "₹2,999",
      period: "/year",
      description: "Advanced tools for professionals.",
      features: ["Unlimited Albums", "Advanced Analytics", "Priority Support", "500GB Storage", "Custom Branding"],
      popular: true
    },
    {
      name: "Elite Legacy",
      price: "₹4,999",
      period: "/year",
      description: "For agencies and high-volume studios.",
      features: ["Everything in Pro", "1TB Storage", "Dedicated Manager", "API Access", "White Label"]
    }
  ]

  const billingHistory = [
    { date: '2025-01-15', amount: '₹2,999', status: 'Paid', plan: 'Pro Visionary', method: 'UPI' },
    { date: '2024-12-15', amount: '₹2,999', status: 'Paid', plan: 'Pro Visionary', method: 'UPI' },
    { date: '2024-11-15', amount: '₹1,499', status: 'Paid', plan: 'Basics Archiver', method: 'Card' }
  ]

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recharge & Plans</h2>
          <p className="text-muted-foreground">
            Manage your subscription and billing details.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>
              You are currently on the <span className="font-semibold text-foreground">{currentPlan.name}</span> plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge className="mt-1">{currentPlan.status}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Renews On</p>
                <p className="text-sm text-muted-foreground mt-1">{currentPlan.expiryDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Price</p>
                <p className="text-sm text-muted-foreground mt-1">{currentPlan.price}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Manage Subscription</Button>
          </CardFooter>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Recent transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingHistory.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs">{item.date}</TableCell>
                    <TableCell className="text-xs">{item.amount}</TableCell>
                    <TableCell className="text-right"><Badge variant="outline" className="text-[10px]">{item.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4">Available Plans</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? "border-primary shadow-md" : ""}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{plan.price}<span className="text-sm font-normal text-muted-foreground">{plan.period}</span></div>
              <ul className="mt-4 space-y-2">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center text-sm">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                {plan.popular ? "Upgrade Now" : "Choose Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Recharge
