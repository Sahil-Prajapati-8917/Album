import React, { useState, useEffect } from 'react'
import {
  Zap, Crown, Building2, UserCircle, Check,
  ShieldCheck, Download, CreditCard
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Separator } from "@/shared/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { getCurrentUser, getBillingHistory, purchaseCredits } from '@/shared/api/api'
import { toast } from "sonner"

const Recharge = () => {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState('Photographer')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchRechargeData = async () => {
    setIsLoading(true)
    try {
      const [userRes, historyRes] = await Promise.all([
        getCurrentUser(),
        getBillingHistory()
      ])

      if (userRes.success) {
        setUser(userRes.data)
        setUserType(userRes.data.accountType || 'Photographer')
      }

      if (historyRes.success) {
        setHistory(historyRes.data)
      }
    } catch (error) {
      console.error('Failed to fetch recharge data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRechargeData()
  }, [])

  const handlePurchase = async () => {
    if (!selectedPlan) return

    setIsSubmitting(true)
    try {
      const response = await purchaseCredits({
        planName: selectedPlan.name,
        amount: selectedPlan.price,
        credits: selectedPlan.credits || 100 // Fallback or logic for credits
      })

      if (response.success) {
        toast.success("Credits purchased successfully!")
        fetchRechargeData() // Refresh credits and history
        setSelectedPlan(null)
      }
    } catch (error) {
      console.error('Purchase failed:', error)
      toast.error(error.message || "Failed to process payment")
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentPlan = {
    name: user?.currentPlan || 'Free Plan',
    status: 'Active',
    expiryDate: user?.creditValidity ? new Date(user.creditValidity).toLocaleDateString() : 'N/A',
    price: '₹0',
    period: '/year',
    type: user?.accountType || 'Photographer',
    albumsUsed: user?.albumsUsed || 0,
    albumsRemaining: user?.credits || 0
  }

  const photographerPlans = [
    {
      name: "Pay Per Album",
      price: 19,
      displayPrice: "₹19",
      period: "/album",
      credits: 1,
      description: "For occasional users who need flexibility.",
      features: ["1 Album = ₹19", "All essential features", "QR code included", "Secure sharing link"],
      icon: ShieldCheck,
      type: 'Photographer'
    },
    {
      name: "Monthly Plan",
      price: 149,
      displayPrice: "₹149",
      period: "/month",
      credits: 20,
      description: "Perfect for regular photographers.",
      features: ["15–20 albums per month", "Basic analytics", "Standard support", "Watermark protection"],
      icon: Zap,
      type: 'Photographer'
    },
    {
      name: "Yearly Plan",
      price: 1299,
      displayPrice: "₹1299",
      period: "/year",
      credits: 250,
      description: "Best value for active professionals.",
      features: ["200+ albums per year", "Advanced analytics", "Priority support", "Best savings option"],
      popular: true,
      icon: Crown,
      type: 'Photographer'
    }
  ]

  const labPlans = [
    {
      name: "Lab Starter",
      price: 999,
      displayPrice: "₹999",
      period: "/month",
      credits: 1000,
      description: "Scalable solutions for small teams.",
      features: ["200 albums per month", "2 team members", "Multi-photographer support", "Basic credit management"],
      icon: Building2,
      type: 'Lab'
    },
    {
      name: "Lab Pro",
      price: 2499,
      displayPrice: "₹2499",
      period: "/month",
      credits: 5000,
      description: "Complete studio management system.",
      features: ["800 albums per month", "5 team members", "Credit distribution system", "Advanced analytics", "Priority support"],
      popular: true,
      icon: Crown,
      type: 'Lab'
    }
  ]

  const activePlans = userType === 'Photographer' ? photographerPlans : labPlans;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tight">Billing & Plans</h1>
          <p className="text-muted-foreground text-sm">
            Manage your subscription and billing history.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Account Type:</span>
          <Tabs value={userType} onValueChange={setUserType} className="w-[240px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Photographer"><UserCircle className="w-4 h-4 mr-2" /> Creator</TabsTrigger>
              <TabsTrigger value="Lab"><Building2 className="w-4 h-4 mr-2" /> Lab</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        {/* Active subscription */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">Active Subscription</CardTitle>
                <CardDescription>Your current plan details and billing cycle.</CardDescription>
              </div>
              <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Plan Name</p>
                <p className="text-lg font-bold">{currentPlan.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Plan Type</p>
                <p className="text-lg font-bold">{currentPlan.type}</p>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-muted-foreground">Next Renewal</p>
                <p className="text-lg font-bold">{currentPlan.expiryDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Usage</p>
                <p className="text-lg font-bold">{currentPlan.albumsUsed} <span className="text-sm font-normal text-muted-foreground">used</span></p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                <p className="text-lg font-bold">{currentPlan.albumsRemaining}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 border-t px-6 py-4 flex justify-between">
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">Cancel Subscription</Button>
            <Button size="sm">Manage Billing</Button>
          </CardFooter>
        </Card>

        {/* Available Plans */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Upgrades</h2>
          <div className={`grid gap-6 ${userType === 'Photographer' ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-3xl'}`}>
            {activePlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col cursor-pointer transition-all duration-200 ${selectedPlan?.name === plan.name ? 'ring-2 ring-primary border-transparent shadow-md' : 'hover:border-primary/50 hover:shadow-md'} ${plan.popular && selectedPlan?.name !== plan.name ? 'border-primary/50 shadow-md' : 'shadow-sm'}`}
                onClick={() => setSelectedPlan(plan)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
                  </div>
                )}
                <CardHeader className="pt-8">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-2">
                    <plan.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <CardDescription className="text-xs">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex-1">
                  <div>
                    <span className="text-3xl font-bold">{plan.displayPrice}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <Separator />
                  <ul className="space-y-3">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex items-start text-xs gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4 pb-6">
                  <Button
                    className="w-full"
                    variant={plan.name === currentPlan.name ? "secondary" : (selectedPlan?.name === plan.name ? "default" : "outline")}
                    size="sm"
                  >
                    {plan.name === currentPlan.name ? "Current Plan" : (selectedPlan?.name === plan.name ? "Selected" : "Select Plan")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Summary Section */}
        {selectedPlan && selectedPlan.name !== currentPlan.name && (
          <Card className="border-2 border-primary/20 bg-primary/5 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Checkout Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-muted-foreground">{selectedPlan.name} Subscription {selectedPlan.period}</span>
                  <span>₹{selectedPlan.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>GST (18%)</span>
                  <span>₹{(selectedPlan.price * 0.18).toFixed(2)}</span>
                </div>
                <Separator className="my-2 bg-primary/20" />
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total Payable</span>
                  <span className="text-primary">₹{(selectedPlan.price * 1.18).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full text-md h-12"
                onClick={handlePurchase}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Zap className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Proceed to Secure Payment'
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Billing history */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Billing History</CardTitle>
            <CardDescription>View and download your past invoices.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-6 py-3">Invoice Details</TableHead>
                  <TableHead className="py-3 text-center">Amount</TableHead>
                  <TableHead className="py-3 text-center">Status</TableHead>
                  <TableHead className="text-right pr-6 py-3">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.length > 0 ? (
                  history.map((item) => (
                    <TableRow key={item._id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="pl-6 py-4">
                        <p className="text-sm font-semibold">{item.planName || 'Credits'}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">{item.invoiceId}</span>
                          <span className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-center py-4">₹{item.amount}</TableCell>
                      <TableCell className="text-center py-4">
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-[10px] font-bold">
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6 py-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      No billing history found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Recharge
