import { useState, useEffect } from 'react'
import {
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Plus,
  Upload,
  Share2,
  Heart,
  Eye,
  Image as ImageIcon,
  Users,
  CreditCard,
  Maximize2,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Instagram
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { getMyAlbums, getCurrentUser } from '@/services/api'
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
    const fetchDashboardData = async () => {
      try {
        // Fetch User Data for Credits
        const userResponse = await getCurrentUser()
        if (userResponse.success) {
          setUser(userResponse.data)
        }

        // Fetch Albums for Stats
        const albumsResponse = await getMyAlbums()
        if (albumsResponse.success) {
          const storedAlbums = albumsResponse.data

          // Calculate Stats
          const totalAlbums = storedAlbums.length
          const publicAlbums = storedAlbums.filter(a => a.status === 'Done' || a.status === 'Published').length
          const totalViews = storedAlbums.reduce((acc, album) => acc + (parseInt(album.views) || 0), 0)

          setStats({
            totalAlbums,
            publicAlbums,
            totalViews: totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews
          })

          // Top Albums
          const sortedByViews = [...storedAlbums].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5)
          setTopAlbums(sortedByViews)

          // Generate Sparkline Data (Mock for visual effect but based on counts)
          setSparklines({
            albums: Array.from({ length: 10 }, () => ({ value: Math.floor(Math.random() * 5) + (totalAlbums > 0 ? 2 : 0) })),
            public: Array.from({ length: 10 }, () => ({ value: Math.floor(Math.random() * 4) + (publicAlbums > 0 ? 1 : 0) })),
            views: Array.from({ length: 10 }, () => ({ value: Math.floor(Math.random() * 50) + (totalViews > 0 ? 20 : 0) }))
          })

          // Calculate Trends from real data
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          const currentMonthIdx = new Date().getMonth()
          const last6Months = []
          for (let i = 5; i >= 0; i--) {
            const idx = (currentMonthIdx - i + 12) % 12
            last6Months.push(months[idx])
          }

          const viewsByMonth = last6Months.map(month => ({ month, views: 0 }))
          const creationByMonth = last6Months.map(month => ({ month, albums: 0 }))

          storedAlbums.forEach(album => {
            const date = new Date(album.createdAt)
            const month = months[date.getMonth()]
            const vIdx = viewsByMonth.findIndex(m => m.month === month)
            const cIdx = creationByMonth.findIndex(m => m.month === month)

            if (vIdx !== -1) viewsByMonth[vIdx].views += (parseInt(album.views) || 0)
            if (cIdx !== -1) creationByMonth[cIdx].albums += 1
          })

          setViewHistory(viewsByMonth)
          setCreationTrend(creationByMonth)
        }

      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
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
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Overview of your albums and performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate('/create')} size="sm">
            <Plus className="mr-1.5 h-4 w-4" /> New Album
          </Button>
        </div>
      </div>

      {/* 1. Top Cards (Product Metrics) */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Albums - Orange Theme */}
        <Card className="overflow-hidden border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Total Albums
            </CardTitle>
            <div className="h-7 w-7 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <ImageIcon className="h-3.5 w-3.5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold tracking-tight">{stats.totalAlbums}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +{Math.floor(Math.random() * 5)} from last month
                </p>
              </div>
              <Sparkline data={sparklines.albums} color="#f97316" />
            </div>
          </CardContent>
        </Card>

        {/* Public Albums - Teal Theme */}
        <Card className="overflow-hidden border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Public Albums
            </CardTitle>
            <div className="h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Eye className="h-3.5 w-3.5 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
              <div className="text-2xl font-bold tracking-tight">{stats.publicAlbums}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((stats.publicAlbums / (stats.totalAlbums || 1)) * 100).toFixed(0)}% visible
                </p>
              </div>
              <Sparkline data={sparklines.public} color="#10b981" />
            </div>
          </CardContent>
        </Card>

        {/* Total Views - Purple Theme */}
        <Card className="overflow-hidden border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Total Views
            </CardTitle>
            <div className="h-7 w-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Users className="h-3.5 w-3.5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold tracking-tight">{stats.totalViews}</div>
                <p className="text-xs text-emerald-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12.5%
                </p>
              </div>
              <Sparkline data={sparklines.views} color="#8b5cf6" />
            </div>
          </CardContent>
        </Card>

        {/* Active Plan - Blue Theme */}
        <Card className="overflow-hidden border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Active Plan
            </CardTitle>
            <div className="h-7 w-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <CreditCard className="h-3.5 w-3.5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold tracking-tight">{user?.credits !== undefined ? `${user.credits} Credits` : 'Free Credit'}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {user?.creditValidity ? `Expires ${new Date(user.creditValidity).toLocaleDateString()}` : 'No expiry set'}
                </p>
              </div>
              <div className="h-8 flex items-center">
                <Button variant="outline" size="sm" className="h-7 text-xs bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800" onClick={() => navigate('/recharge')}>Upgrade</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. Middle Section - Charts & Quick Actions */}
      <div className="grid gap-3 md:grid-cols-7">

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
      <div className="grid gap-3 md:grid-cols-10">

        {/* Top Performing Albums Table */}
        <Card className="col-span-10 lg:col-span-7">
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

        {/* Digital Album Preview */}
        <Card className="col-span-10 lg:col-span-3">
          <CardHeader>
            <CardTitle>Album Preview</CardTitle>
            <CardDescription>Interactive 3D digital sample</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted group cursor-pointer border shadow-sm" onClick={() => navigate('/demo')}>
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80" alt="Sample Album Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="h-8 w-8 text-white mb-2" />
                <span className="text-white font-medium text-sm">Open 3D Viewer</span>
              </div>
              {/* Simulated Book Overlay Elements */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/30 drop-shadow-md"></div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div>
                <h4 className="font-semibold text-sm">Raja Weds Rani</h4>
                <p className="text-xs text-muted-foreground">Sample Cinematic Album</p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => navigate('/demo')}>View</Button>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

export default Dashboard
