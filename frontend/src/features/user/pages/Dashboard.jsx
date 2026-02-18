import { useState, useEffect } from 'react'
import {
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Plus,
  Upload,
  Share2,
  CreditCard,
  Heart,
  Eye,
  Image as ImageIcon,
  Users
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { getUser } from '@/services/api'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Sparkline Component
const Sparkline = ({ data, color }) => (
  <div className="h-[40px] w-[100px]">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#gradient-${color})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
)

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalAlbums: 0,
    publicAlbums: 0,
    totalViews: 0
  })
  const [topAlbums, setTopAlbums] = useState([])
  const [viewHistory, setViewHistory] = useState([])
  const [creationTrend, setCreationTrend] = useState([])

  // Sparkline data state
  const [sparklines, setSparklines] = useState({
    albums: [],
    public: [],
    views: []
  })

  useEffect(() => {
    const userData = getUser()
    if (userData) setUser(userData)

    // Load data from localStorage
    const loadDashboardData = () => {
      const storedAlbums = JSON.parse(localStorage.getItem('albums') || '[]')

      // Calculate Stats
      const totalAlbums = storedAlbums.length
      const publicAlbums = storedAlbums.filter(a => a.status === 'Done').length
      const totalViews = storedAlbums.reduce((acc, album) => {
        let views = 0
        if (typeof album.views === 'string') {
          if (album.views.includes('k')) views = parseFloat(album.views) * 1000
          else views = parseInt(album.views) || 0
        } else {
          views = album.views || 0
        }
        return acc + views
      }, 0)

      setStats({
        totalAlbums,
        publicAlbums,
        totalViews: totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews
      })

      // Generate Sparkline Data (Mock for visual effect)
      setSparklines({
        albums: Array.from({ length: 10 }, () => ({ value: Math.floor(Math.random() * 10) + 5 })),
        public: Array.from({ length: 10 }, () => ({ value: Math.floor(Math.random() * 8) + 2 })),
        views: Array.from({ length: 10 }, () => ({ value: Math.floor(Math.random() * 1000) + 500 }))
      })

      // Top Albums
      const sortedByViews = [...storedAlbums].sort((a, b) => {
        const viewA = typeof a.views === 'string' && a.views.includes('k') ? parseFloat(a.views) * 1000 : parseInt(a.views) || 0
        const viewB = typeof b.views === 'string' && b.views.includes('k') ? parseFloat(b.views) * 1000 : parseInt(b.views) || 0
        return viewB - viewA
      }).slice(0, 5)
      setTopAlbums(sortedByViews)

      // Mock Charts Data
      setViewHistory([
        { month: 'Jan', views: 2400 },
        { month: 'Feb', views: 1398 },
        { month: 'Mar', views: 9800 },
        { month: 'Apr', views: 3908 },
        { month: 'May', views: 4800 },
        { month: 'Jun', views: 3800 },
      ])

      setCreationTrend([
        { month: 'Jan', albums: 4, images: 120 },
        { month: 'Feb', albums: 3, images: 80 },
        { month: 'Mar', albums: 6, images: 200 },
        { month: 'Apr', albums: 2, images: 50 },
        { month: 'May', albums: 5, images: 150 },
        { month: 'Jun', albums: 7, images: 210 },
      ])

      setIsLoading(false)
    }

    setTimeout(loadDashboardData, 500)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 pb-10">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your albums and performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CalendarDays className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button onClick={() => navigate('/create')} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> New Album
          </Button>
        </div>
      </div>

      {/* 1. Top Cards (Product Metrics) */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Albums - Orange Theme */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Albums
            </CardTitle>
            <ImageIcon className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.totalAlbums}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +{Math.floor(Math.random() * 5)} from last month
                </p>
              </div>
              <Sparkline data={sparklines.albums} color="#f97316" />
            </div>
          </CardContent>
        </Card>

        {/* Public Albums - Teal Theme */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Public Albums
            </CardTitle>
            <Eye className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.publicAlbums}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((stats.publicAlbums / (stats.totalAlbums || 1)) * 100).toFixed(0)}% visible
                </p>
              </div>
              <Sparkline data={sparklines.public} color="#10b981" />
            </div>
          </CardContent>
        </Card>

        {/* Total Views - Purple Theme */}
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Views
            </CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.totalViews}</div>
                <p className="text-xs text-emerald-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12.5%
                </p>
              </div>
              <Sparkline data={sparklines.views} color="#8b5cf6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. Middle Section - Charts & Quick Actions */}
      <div className="grid gap-4 md:grid-cols-7">

        {/* Album Performance Graph - Vibrant Gradient */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>
              Total views across all your public albums.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={viewHistory}>
                <defs>
                  <linearGradient id="colorViewsMain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/40" vertical={false} />
                <XAxis dataKey="month" className="text-xs" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis className="text-xs" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#f97316"
                  fillOpacity={1}
                  fill="url(#colorViewsMain)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Album Creation Trend - Teal Bars */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Content Growth</CardTitle>
            <CardDescription>Albums created per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={creationTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/40" vertical={false} />
                <XAxis dataKey="month" className="text-xs" tickLine={false} axisLine={false} />
                <YAxis className="text-xs" tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="albums" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 3. Bottom Section - Album Trends & Top Albums */}
      <div className="grid gap-4 md:grid-cols-7">

        {/* Top Performing Albums Table */}
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Top Performing Albums</CardTitle>
            <CardDescription>Most viewed albums this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topAlbums.length > 0 ? (
                topAlbums.map((album, i) => (
                  <div key={album.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center overflow-hidden">
                        {album.frontCover ? (
                          <img src={album.frontCover} alt="Cover" className="h-full w-full object-cover" />
                        ) : (
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{album.albumName || album.clientName}</p>
                        <p className="text-xs text-muted-foreground">{album.functionDate || 'No date'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1.5 min-w-[60px]">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{album.views || 0}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-[60px]">
                        <Heart className="h-4 w-4 text-rose-500" />
                        <span className="font-medium">{Math.floor(Math.random() * 100)}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No albums found. Create an album to see data here.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

export default Dashboard
