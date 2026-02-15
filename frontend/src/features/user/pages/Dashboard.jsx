import { useState, useEffect } from 'react'
import {
  Eye,
  FileImage,
  Share2,
  Camera,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'
import { getUser } from '@/services/api'
import WelcomeHeader from '../components/WelcomeHeader'
import DashboardStats from '../components/DashboardStats'
import DashboardShortcuts from '../components/DashboardShortcuts'
import RecentActivity from '../components/RecentActivity'
import { LoadingState } from '@/components/custom/LoadingState'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = () => {
      const userData = getUser()
      if (userData) {
        setUser(userData)
      }
    }

    fetchDashboardData()

    // Mock data for stats and recent activity
    const mockStats = [
      {
        label: "Total Pixfolios",
        value: 12,
        icon: FileImage,
        change: "+2 this week",
        iconColor: "bg-zinc-100 text-zinc-600"
      },
      {
        label: "Total Views",
        value: "15.4k",
        icon: Eye,
        change: "+15% from last month",
        iconColor: "bg-zinc-100 text-zinc-500"
      },
      {
        label: "Active Credits",
        value: 450,
        icon: Share2,
        change: "-25 from yesterday",
        iconColor: "bg-zinc-100 text-amber-600"
      },
      {
        label: "Storage Used",
        value: "2.4 GB",
        icon: Camera,
        change: "80% of limit",
        iconColor: "bg-zinc-100 text-emerald-600"
      }
    ]

    const mockActivity = [
      {
        id: 1,
        type: "album_created",
        message: "New Pixfolio created",
        description: "Created album 'Wedding Celebration'",
        timestamp: "2h ago",
      },
      {
        id: 2,
        type: "view_increase",
        message: "Views Milestone reached",
        description: "Album 'Birthday Party' gained 25 views",
        timestamp: "4h ago",
      },
      {
        id: 3,
        type: "album_shared",
        message: "Pixfolio shared",
        description: "Shared 'Engagement Shoot' with client",
        timestamp: "1d ago",
      },
      {
        id: 4,
        type: "album_approved",
        message: "Album Approved",
        description: "Album 'Corporate Event' was approved",
        timestamp: "3d ago",
      }
    ]

    setTimeout(() => {
      setStats(mockStats)
      setRecentActivity(mockActivity)
      setIsLoading(false)
    }, 800)
  }, [])

  if (isLoading) {
    return <LoadingState message="Loading dashboard..." className="h-[60vh]" />
  }

  return (
    <div className="flex-1 space-y-8 animate-in fade-in duration-500">
      <WelcomeHeader userName={user?.name?.split(' ')[0]} />

      <DashboardStats stats={stats} />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-12 xl:col-span-8">
          <Card className="shadow-sm border-muted rounded-xl h-[400px] flex flex-col bg-card overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-foreground">Analytics Overview</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Detailed insights into your performance.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center p-6 pt-0">
              <div className="w-full h-full bg-muted/30 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-center relative z-10 p-6">
                  <div className="p-4 bg-background rounded-full shadow-sm border border-border inline-flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Processing Analysis</h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    Interactive visuals will appear here as your pixfolios generate more traffic.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-12 xl:col-span-4 h-full">
          <RecentActivity activities={recentActivity} />
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <DashboardShortcuts />
        <Card className="shadow-sm border-muted rounded-xl h-full flex flex-col bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground">System Status</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Monitoring active services.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-pulse"></div>
                <div className="relative h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100">
                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">All Systems Operational</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
