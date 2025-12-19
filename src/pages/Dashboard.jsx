import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Eye,
  FileImage,
  Share2,
  Camera,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Plus,
  FolderOpen,
  CreditCard,
  User,
  BarChart3,
  Settings
} from 'lucide-react'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Mock data for stats and recent activity
    const mockStats = [
      {
        label: "Total Albums",
        value: 12,
        icon: <FileImage className="h-6 w-6" />,
        change: "+2 this week",
        color: "text-blue-600"
      },
      {
        label: "Total Views",
        value: 15420,
        icon: <Eye className="h-6 w-6" />,
        change: "+15% from last month",
        color: "text-green-600"
      },
      {
        label: "Active Albums",
        value: 8,
        icon: <Share2 className="h-6 w-6" />,
        change: "3 pending approval",
        color: "text-purple-600"
      },
      {
        label: "Storage Used",
        value: "2.4 GB",
        icon: <Camera className="h-6 w-6" />,
        change: "80% of limit",
        color: "text-orange-600"
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
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your Visual Books today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
              </div>
              <div className={`p-3 bg-gray-50 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Shortcuts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/dashboard/create"
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">Create New Album</span>
          </Link>

          <Link
            to="/dashboard/pixora"
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
              <FolderOpen className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">View All Albums</span>
          </Link>

          <Link
            to="/dashboard/recharge"
            className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">Recharge</span>
          </Link>

          <Link
            to="/dashboard/profile"
            className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
              <User className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">Profile Settings</span>
          </Link>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-600">Latest updates from your Visual Books</p>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="text-blue-600">
                      {activity.icon}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {recentActivity.length === 0 && (
          <div className="px-6 py-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No recent activity to show</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
