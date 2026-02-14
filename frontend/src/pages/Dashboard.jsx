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
  TrendingUp,
  Plus,
  FolderOpen,
  CreditCard,
  User,
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
      },
      {
        label: "Total Views",
        value: 15420,
        icon: <Eye className="h-6 w-6" />,
        change: "+15% from last month",
      },
      {
        label: "Active Albums",
        value: 8,
        icon: <Share2 className="h-6 w-6" />,
        change: "3 pending approval",
      },
      {
        label: "Storage Used",
        value: "2.4 GB",
        icon: <Camera className="h-6 w-6" />,
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
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#181611] dark:text-white italic">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="mt-2 text-sm text-gray-500 font-light tracking-wide uppercase">
            Curating your digital legacy
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gold border-b-2 border-gold pb-1">
          <Calendar className="h-4 w-4" />
          <span>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-[#2a261d] p-7 rounded-2xl shadow-sm border border-gold/10 hover:border-gold/30 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gold/5 rounded-xl text-gold group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">{stat.change}</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-serif text-[#181611] dark:text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Shortcuts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-[#2a261d] rounded-2xl shadow-sm border border-gold/10 p-8"
      >
        <div className="mb-8">
          <h2 className="text-xl font-serif italic text-gray-900 dark:text-white">Quick Actions</h2>
          <div className="w-12 h-px bg-gold mt-2"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link
            to="/dashboard/create"
            className="flex flex-col items-center p-6 bg-pearl dark:bg-ebony/50 rounded-xl hover:bg-gold/5 transition-all group border border-transparent hover:border-gold/20"
          >
            <div className="w-14 h-14 bg-white dark:bg-[#2a261d] rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:text-gold transition-all border border-gold/5">
              <Plus className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gold transition-colors text-center">Create New</span>
          </Link>

          <Link
            to="/dashboard/pixfolio"
            className="flex flex-col items-center p-6 bg-pearl dark:bg-ebony/50 rounded-xl hover:bg-gold/5 transition-all group border border-transparent hover:border-gold/20"
          >
            <div className="w-14 h-14 bg-white dark:bg-[#2a261d] rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:text-gold transition-all border border-gold/5">
              <FolderOpen className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gold transition-colors text-center">All Pixfolios</span>
          </Link>

          <Link
            to="/dashboard/recharge"
            className="flex flex-col items-center p-6 bg-pearl dark:bg-ebony/50 rounded-xl hover:bg-gold/5 transition-all group border border-transparent hover:border-gold/20"
          >
            <div className="w-14 h-14 bg-white dark:bg-[#2a261d] rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:text-gold transition-all border border-gold/5">
              <CreditCard className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gold transition-colors text-center">Recharge</span>
          </Link>

          <Link
            to="/dashboard/profile"
            className="flex flex-col items-center p-6 bg-pearl dark:bg-ebony/50 rounded-xl hover:bg-gold/5 transition-all group border border-transparent hover:border-gold/20"
          >
            <div className="w-14 h-14 bg-white dark:bg-[#2a261d] rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:text-gold transition-all border border-gold/5">
              <User className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gold transition-colors text-center">Profile</span>
          </Link>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-[#2a261d] rounded-2xl shadow-sm border border-gold/10 overflow-hidden">
        <div className="px-8 py-6 border-b border-gold/10 flex justify-between items-center bg-pearl dark:bg-ebony/20">
          <div>
            <h2 className="text-xl font-serif italic text-gray-900 dark:text-white">Recent Activity</h2>
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">Timeline of your artistry</p>
          </div>
          <TrendingUp className="h-5 w-5 text-gold" />
        </div>
        <div className="divide-y divide-gold/5">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="px-8 py-5 hover:bg-gold/5 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gold/5 rounded-full flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                    {activity.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#181611] dark:text-white leading-relaxed">{activity.message}</p>
                  <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {recentActivity.length === 0 && (
          <div className="px-8 py-16 text-center">
            <Calendar className="h-12 w-12 text-gray-200 mx-auto mb-4" />
            <p className="text-sm text-gray-400 font-light uppercase tracking-widest">Quiet in the studio today</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
