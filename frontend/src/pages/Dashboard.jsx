import { useState, useEffect } from 'react'
import {
  Eye,
  FileImage,
  Share2,
  Camera,
  TrendingUp,
} from 'lucide-react'
import { getUser } from '@/services/api'
import WelcomeHeader from '@/components/features/dashboard/WelcomeHeader'
import DashboardStats from '@/components/features/dashboard/DashboardStats'
import DashboardShortcuts from '@/components/features/dashboard/DashboardShortcuts'
import RecentActivity from '@/components/features/dashboard/RecentActivity'
import { LoadingState } from '@/components/custom/LoadingState'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = getUser()
    if (userData) {
      setUser(userData)
    }

    // Mock data for stats and recent activity
    const mockStats = [
      {
        label: "Total Albums",
        value: 12,
        icon: FileImage,
        change: "+2 this week",
      },
      {
        label: "Total Views",
        value: 15420,
        icon: Eye,
        change: "+15% from last month",
      },
      {
        label: "Active Albums",
        value: 8,
        icon: Share2,
        change: "3 pending approval",
      },
      {
        label: "Storage Used",
        value: "2.4 GB",
        icon: Camera,
        change: "80% of limit",
      }
    ]

    const mockActivity = [
      {
        id: 1,
        type: "album_created",
        message: "Created new album 'Wedding Celebration'",
        timestamp: "2 hours ago",
        icon: <FileImage className="h-4 w-4" />
      },
      {
        id: 2,
        type: "view_increase",
        message: "Album 'Birthday Party' gained 25 new views",
        timestamp: "4 hours ago",
        icon: <Eye className="h-4 w-4" />
      },
      {
        id: 3,
        type: "album_shared",
        message: "Shared album 'Engagement Shoot' with client",
        timestamp: "1 day ago",
        icon: <Share2 className="h-4 w-4" />
      },
      {
        id: 4,
        type: "storage_update",
        message: "Storage usage increased by 120MB",
        timestamp: "2 days ago",
        icon: <Camera className="h-4 w-4" />
      },
      {
        id: 5,
        type: "album_approved",
        message: "Album 'Corporate Event' was approved",
        timestamp: "3 days ago",
        icon: <TrendingUp className="h-4 w-4" />
      }
    ]

    setTimeout(() => {
      setStats(mockStats)
      setRecentActivity(mockActivity)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return <LoadingState message="Loading dashboard..." className="h-[60vh]" />
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <DashboardStats stats={stats} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <DashboardShortcuts />
        </div>
        <div className="col-span-3">
          <RecentActivity activities={recentActivity} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
