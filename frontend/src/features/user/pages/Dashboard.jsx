import { useState, useEffect } from 'react'
import {
  ArrowUpRight,
  ArrowDownRight,
  Download,
  CalendarDays,
  Info,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { getUser } from '@/services/api'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock chart data
const areaChartData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 173, mobile: 190 },
  { month: 'May', desktop: 409, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const barChartData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
]

const statsData = [
  {
    title: 'New Subscriptions',
    value: '4,682',
    change: '+15.54%',
    trend: 'up',
    sparkline: [30, 40, 25, 50, 45, 60, 35, 55, 70, 50, 65],
    sparkColor: '#ef4444',
  },
  {
    title: 'New Orders',
    value: '1,226',
    change: '-40.2%',
    trend: 'down',
    sparkline: [50, 45, 60, 35, 55, 40, 30, 45, 60, 50, 55],
    sparkColor: '#10b981',
  },
  {
    title: 'Avg Order Revenue',
    value: '1,080',
    change: '+10.8%',
    trend: 'up',
    sparkline: [20, 35, 45, 30, 50, 40, 55, 45, 60, 50, 45],
    sparkColor: '#8b5cf6',
  },
  {
    title: 'Total Revenue',
    value: '$15,231.89',
    change: '+20.1% from last month',
    trend: 'up',
    isRevenue: true,
  },
]

// Tiny sparkline SVG component
function Sparkline({ data, color, width = 80, height = 30 }) {
  if (!data?.length) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

// Mini line chart for revenue card
function RevenueSparkline() {
  const data = [30, 45, 35, 55, 40, 60, 50, 70, 55, 75, 65, 80, 70, 90]
  const width = 200
  const height = 60
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} className="overflow-visible mt-2">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className="text-foreground"
      />
      {/* Dot on last point */}
      {(() => {
        const lastX = width
        const lastY = height - ((data[data.length - 1] - min) / range) * height
        return <circle cx={lastX} cy={lastY} r="3" fill="currentColor" className="text-foreground" />
      })()}
    </svg>
  )
}

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = getUser()
    if (userData) setUser(userData)
    setTimeout(() => setIsLoading(false), 400)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <CalendarDays className="mr-2 h-4 w-4" />
            Pick a date
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  {stat.isRevenue ? (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                      <RevenueSparkline />
                    </div>
                  ) : (
                    <>
                      <div className="mt-3 mb-3">
                        <Sparkline data={stat.sparkline} color={stat.sparkColor} />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Since Last week</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground font-medium">Details</span>
                        <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                          {stat.change}
                          {stat.trend === 'up' ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-7">
            {/* Area Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sale Activity - Monthly</CardTitle>
                <CardDescription>
                  Showing total sales for the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={areaChartData}>
                    <defs>
                      <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1, 220 70% 50%))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1, 220 70% 50%))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2, 160 60% 45%))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-2, 160 60% 45%))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fontSize: 12 }} />
                    <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="desktop"
                      stroke="hsl(var(--chart-1, 220 70% 50%))"
                      fillOpacity={1}
                      fill="url(#colorDesktop)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="mobile"
                      stroke="hsl(var(--chart-2, 160 60% 45%))"
                      fillOpacity={1}
                      fill="url(#colorMobile)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Subscriptions</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-foreground block">+2,350</span>
                  <span className="text-xs">+180.1% from last month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" tick={{ fontSize: 12 }} />
                    <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="desktop" fill="hsl(var(--chart-1, 220 70% 50%))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="mobile" fill="hsl(var(--chart-2, 160 60% 45%))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}

export default Dashboard
