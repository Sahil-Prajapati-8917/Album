import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Trash2,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Eye,
  Pencil,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// Using react-qr-code to generate the SVG string directly in memory
import QRCode from 'react-qr-code'
import ReactDOMServer from 'react-dom/server'

const functionTypesOptions = [
  "Wedding", "Pre Wedding", "Engagement", "Reception", "Birthday",
  "Maternity", "Newborn", "Family", "Corporate", "Other"
]

const parseViews = (viewsStr) => {
  if (!viewsStr) return 0
  if (typeof viewsStr === 'number') return viewsStr
  const str = viewsStr.toString().toLowerCase()
  if (str.endsWith('k')) {
    return parseFloat(str) * 1000
  }
  if (str.endsWith('m')) {
    return parseFloat(str) * 1000000
  }
  return parseFloat(str) || 0
}

const isDateInRange = (dateStr, rangeStr) => {
  if (rangeStr === 'all') return true

  // Assuming dateStr is in YYYY-MM-DD format
  const itemDate = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  switch (rangeStr) {
    case 'today':
      return itemDate.getTime() === today.getTime()
    case '7days': {
      const sevenDaysAgo = new Date(today)
      sevenDaysAgo.setDate(today.getDate() - 7)
      return itemDate >= sevenDaysAgo
    }
    case '30days': {
      const thirtyDaysAgo = new Date(today)
      thirtyDaysAgo.setDate(today.getDate() - 30)
      return itemDate >= thirtyDaysAgo
    }
    case 'thisMonth': {
      return itemDate.getMonth() === today.getMonth() && itemDate.getFullYear() === today.getFullYear()
    }
    default:
      return true
  }
}

const AllPixfolio = () => {
  const navigate = useNavigate()
  const [albums, setAlbums] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [functionType, setFunctionType] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [dateFilter, setDateFilter] = useState('all')
  const [deleteId, setDeleteId] = useState(null)

  const loadAlbums = () => {
    const storedAlbums = JSON.parse(localStorage.getItem('albums') || '[]')
    if (storedAlbums.length === 0) {
      const mockAlbums = [
        { id: 'TASK-8782', clientName: "Sarah Johnson", functionDate: "2025-01-15", functionType: "wedding", songName: "Perfect - Ed Sheeran", views: "1.2k", priority: "Medium", label: "Documentation" },
        { id: 'TASK-7878', clientName: "Mike Chen", functionDate: "2025-02-20", functionType: "birthday", songName: "Happy Birthday", views: "850", priority: "High", label: "Feature" },
        { id: 'TASK-7839', clientName: "TechCorp Inc", functionDate: "2025-03-10", functionType: "corporate", songName: "Corporate Vibes", views: "420", priority: "Low", label: "Bug" },
        { id: 'TASK-5562', clientName: "Alex Rivera", functionDate: "2025-04-05", functionType: "engagement", songName: "A Thousand Years", views: "2.1k", priority: "Medium", label: "Feature" },
        { id: 'TASK-8686', clientName: "The Garcias", functionDate: "2025-05-12", functionType: "family", songName: "Family Portait", views: "310", priority: "Low", label: "Documentation" },
        { id: 'TASK-1280', clientName: "StartupXYZ", functionDate: "2025-06-01", functionType: "corporate", songName: "Success Anthem", views: "1.5k", priority: "High", label: "Bug" },
        { id: 'TASK-7262', clientName: "University Hall", functionDate: "2025-07-20", functionType: "graduation", songName: "Pomp and Circumstance", views: "980", priority: "Medium", label: "Feature" },
        { id: 'TASK-1138', clientName: "The Patels", functionDate: "2025-08-14", functionType: "anniversary", songName: "All of Me", views: "1.1k", priority: "High", label: "Documentation" },
      ]
      setTimeout(() => setAlbums(mockAlbums), 0)
    } else {
      const enhanced = storedAlbums.map((a, i) => ({
        ...a,
        id: a.id || `TASK-${1000 + i}`,
        clientName: a.clientName || a.albumName || 'Unknown Client',
        songName: a.songName || 'Standard Track',
        views: a.views || '0',
        priority: a.priority || 'Medium',
        label: a.label || 'Feature',
      }))
      setTimeout(() => setAlbums(enhanced), 0)
    }
  }

  useEffect(() => {
    loadAlbums()
  }, [])

  const handleDelete = (id) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      const storedAlbums = JSON.parse(localStorage.getItem('albums') || '[]')
      const updated = storedAlbums.filter(a => a.id !== deleteId)
      localStorage.setItem('albums', JSON.stringify(updated))
      setAlbums(prev => prev.filter(a => a.id !== deleteId))
      setDeleteId(null)
    }
  }

  const handleCopyLink = (id) => {
    const url = `${window.location.origin}/viewer/${id}`
    navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard")
  }

  const handleDownloadQR = (album) => {
    const url = `${window.location.origin}/viewer/${album.id}`

    // Generate SVG string off-screen
    const svgComponent = <QRCode value={url} size={512} level="H" />
    const svgString = ReactDOMServer.renderToString(svgComponent)

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)

      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      const title = album.clientName || 'Pixfolio'
      downloadLink.download = `${title.replace(/\s+/g, "-")}-qrcode.png`
      downloadLink.href = pngFile
      downloadLink.click()

      toast.success("QR Code downloaded")
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgString)
  }

  const filteredAlbums = [...albums]
    .filter(album => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        (album.clientName && album.clientName.toLowerCase().includes(searchLower)) ||
        (album.songName && album.songName.toLowerCase().includes(searchLower)) ||
        (album.id && album.id.toLowerCase().includes(searchLower)) ||
        (album.functionType && album.functionType.toLowerCase().includes(searchLower))

      const matchesFunction = functionType === 'all' ||
        (album.functionType && album.functionType.toLowerCase() === functionType.toLowerCase())

      const matchesDate = isDateInRange(album.functionDate, dateFilter)

      return matchesSearch && matchesFunction && matchesDate
    })
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.functionDate) - new Date(a.functionDate)
      }
      if (sortBy === 'oldest') {
        return new Date(a.functionDate) - new Date(b.functionDate)
      }
      if (sortBy === 'most_viewed') {
        return parseViews(b.views) - parseViews(a.views)
      }
      if (sortBy === 'least_viewed') {
        return parseViews(a.views) - parseViews(b.views)
      }
      return 0
    })

  return (
    <div className="flex-1 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Pixfolios</CardTitle>
          <CardDescription>
            Manage your digital albums and track their performance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-2 flex-wrap md:flex-nowrap">
              <div className="relative w-full md:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Universal search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-9 w-full"
                />
              </div>

              <Select value={functionType} onValueChange={setFunctionType}>
                <SelectTrigger className="w-full md:w-[140px] h-9">
                  <SelectValue placeholder="Function Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {functionTypesOptions.map(type => (
                    <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[140px] h-9">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="most_viewed">Most Viewed</SelectItem>
                  <SelectItem value="least_viewed">Least Viewed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-[140px] h-9">
                  <SelectValue placeholder="Date Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Data Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">S.No</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Function</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Song Name</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>QR Code</TableHead>
                  <TableHead>Copy</TableHead>
                  <TableHead className="w-[100px] text-right">View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlbums.length > 0 ? (
                  filteredAlbums.map((album, index) => (
                    <TableRow key={album.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{album.clientName}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {album.functionType}
                        </Badge>
                      </TableCell>
                      <TableCell>{album.functionDate}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{album.songName}</TableCell>
                      <TableCell>{album.views}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                          onClick={() => handleDownloadQR(album)}
                          title="Download QR Code"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-download"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopyLink(album.id)}
                          title="Copy Link"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-copy"
                          >
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                            onClick={() => navigate(`/viewer/${album.id}`)}
                            title="Open in Viewer"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-yellow-600 hover:text-yellow-700"
                            onClick={() => navigate(`/create?edit=${album.id}`)}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            onClick={() => handleDelete(album.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete a Pixfolio</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              Pixfolio and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default AllPixfolio
