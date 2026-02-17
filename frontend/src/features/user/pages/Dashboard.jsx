import { useState, useEffect } from 'react'
import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Upload,
  Link as LinkIcon,
  CreditCard,
  Info,
  Layers,
  Eye,
  HardDrive,
  Users,
  ChevronRight,
  Clock,
  Download,
  Share2,
  Heart,
  CalendarDays,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
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
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Mock chart data for Album Views
const albumViewsData = [
  { month: 'Jan', total: 1200, public: 800, private: 400 },
  { month: 'Feb', total: 2100, public: 1400, private: 700 },
  { month: 'Mar', total: 1800, public: 1100, private: 700 },
  { month: 'Apr', total: 2400, public: 1600, private: 800 },
  { month: 'May', total: 3200, public: 2200, private: 1000 },
  { month: 'Jun', total: 4500, public: 3100, private: 1400 },
]

// Mock data for Content Growth
const growthData = [
  { month: 'Jan', albums: 4, images: 450 },
  { month: 'Feb', albums: 6, images: 820 },
  { month: 'Mar', albums: 5, images: 600 },
  { month: 'Apr', albums: 8, images: 1100 },
  { month: 'May', albums: 12, images: 1800 },
  { month: 'Jun', albums: 10, images: 1400 },
]

const topAlbums = [
  { name: 'Wedding Season 2026', views: '1.2k', likes: 85, date: '2026-02-10' },
  { name: 'Fashion Portfolio - Milan', views: '950', likes: 64, date: '2026-01-25' },
  { name: 'Nature Wilderness', views: '820', likes: 42, date: '2026-02-05' },
  { name: 'Corporate Event Tokyo', views: '450', likes: 12, date: '2026-02-15' },
]

const recentActivity = [
  { id: 1, type: 'share', message: 'Album "Wedding 2026" shared with client', time: '2h ago', icon: Share2, color: 'text-blue-500' },
  { id: 2, type: 'view', message: 'Client viewed "Fashion Milan" album', time: '4h ago', icon: Eye, color: 'text-emerald-500' },
  { id: 3, type: 'favorite', message: 'Client selected 15 favorites in "Nature"', time: '5h ago', icon: Heart, color: 'text-rose-500' },
  { id: 4, type: 'update', message: 'Profile settings updated', time: '1d ago', icon: Clock, color: 'text-amber-500' },
]

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
    <div className="flex-1 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your albums.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9">
            <CalendarDays className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="default" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export Stats
          </Button>
        </div>
      </div>

      {/* Top Row Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Albums</CardTitle>
            <Layers className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45</div>
            <p className="text-xs text-emerald-500 font-medium flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +3 this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Public Albums</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32</div>
            <p className="text-xs text-muted-foreground mt-1">71% of total library</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">14,842</div>
            <p className="text-xs text-emerald-500 font-medium flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12.5% vs last week
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3 GB / 10 GB</div>
            <div className="mt-3 space-y-2">
              <Progress value={43} className="h-1.5" />
              <div className="flex justify-between items-center">
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">Pro Plan Status</p>
                <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold">ACTIVE</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Main Charts Section */}
        <div className="md:col-span-5 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Album Views - Monthly</CardTitle>
                  <CardDescription>Consolidated view performance across all public albums</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" /> Public
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" /> Private
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={albumViewsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs font-medium" />
                  <YAxis axisLine={false} tickLine={false} className="text-xs font-medium" />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ r: 4, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: 'hsl(var(--background))' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Growth Trend</CardTitle>
              <CardDescription>Albums created and images uploaded over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs font-medium" />
                  <YAxis axisLine={false} tickLine={false} className="text-xs font-medium" />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="albums" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Albums Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Top Performing Albums</CardTitle>
                <CardDescription>Most viewed albums in your library</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary font-semibold">View All <ChevronRight className="ml-1 h-4 w-4" /></Button>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[40%]">Album Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Views</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Likes</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created On</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {topAlbums.map((album, i) => (
                      <tr key={i} className="border-b transition-colors hover:bg-muted/50 cursor-pointer">
                        <td className="p-4 align-middle font-semibold">{album.name}</td>
                        <td className="p-4 align-middle">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Eye className="h-3.5 w-3.5 text-muted-foreground" /> {album.views}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> {album.likes}
                          </span>
                        </td>
                        <td className="p-4 align-middle text-muted-foreground">{new Date(album.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-2 h-10 shadow-sm" variant="default">
                <Plus className="h-4 w-4" /> Create New Album
              </Button>
              <Button className="w-full justify-start gap-2 h-10" variant="outline">
                <Upload className="h-4 w-4" /> Upload Photos
              </Button>
              <Button className="w-full justify-start gap-2 h-10" variant="outline">
                <LinkIcon className="h-4 w-4" /> Generate Share Link
              </Button>
              <div className="pt-2">
                <Button className="w-full justify-center gap-2 h-10 text-primary font-bold bg-primary/10 hover:bg-primary/20 border-none" variant="ghost">
                  <CreditCard className="h-4 w-4" /> Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Client Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                Engagement
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">LIVE</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Clients Viewed</p>
                    <p className="text-[10px] text-muted-foreground">Last 24 hours</p>
                  </div>
                </div>
                <span className="text-lg font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <Download className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Downloads</p>
                    <p className="text-[10px] text-muted-foreground">Last 24 hours</p>
                  </div>
                </div>
                <span className="text-lg font-bold">45</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-50 rounded-lg">
                    <Heart className="h-4 w-4 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">New Favorites</p>
                    <p className="text-[10px] text-muted-foreground">Last 24 hours</p>
                  </div>
                </div>
                <span className="text-lg font-bold">28</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors border-b last:border-0 cursor-pointer">
                    <div className={`p-2 rounded-full bg-muted/60 ${activity.color}`}>
                      <activity.icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-xs font-medium leading-normal">{activity.message}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center">
                        <Clock className="h-2.5 w-2.5 mr-1" /> {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full text-[10px] h-8 text-muted-foreground hover:text-foreground">View Full Audit Log</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
