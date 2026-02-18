import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Trash2,
  ChevronDown,
  Circle,
  CheckCircle2,
  XCircle,
  Timer,
  CircleHelp,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Eye,
  Pencil,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
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
import VisualBookViewer from '../components/VisualBookViewer'
import QRCodeModal from '../components/QRCodeModal'
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const statusOptions = ['Backlog', 'Todo', 'In Progress', 'Done', 'Cancelled']
const priorityOptions = ['Low', 'Medium', 'High']

const getStatusIcon = (status) => {
  switch (status) {
    case 'Backlog': return <CircleHelp className="h-4 w-4 text-muted-foreground" />
    case 'Todo': return <Circle className="h-4 w-4 text-muted-foreground" />
    case 'In Progress': return <Timer className="h-4 w-4 text-blue-500" />
    case 'Done': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    case 'Cancelled': return <XCircle className="h-4 w-4 text-red-500" />
    default: return <Circle className="h-4 w-4 text-muted-foreground" />
  }
}

const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'High': return <ArrowUp className="h-4 w-4 text-red-500" />
    case 'Medium': return <ArrowRight className="h-4 w-4 text-yellow-500" />
    case 'Low': return <ArrowDown className="h-4 w-4 text-blue-500" />
    default: return <ArrowRight className="h-4 w-4" />
  }
}

const AllPixfolio = () => {
  const navigate = useNavigate()
  const [albums, setAlbums] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [deleteId, setDeleteId] = useState(null)
  const [viewId, setViewId] = useState(null)
  const [viewData, setViewData] = useState(null)
  const [qrCodeAlbum, setQrCodeAlbum] = useState(null)

  const loadAlbums = () => {
    const storedAlbums = JSON.parse(localStorage.getItem('albums') || '[]')
    if (storedAlbums.length === 0) {
      const mockAlbums = [
        { id: 'TASK-8782', clientName: "Sarah Johnson", functionDate: "2025-01-15", functionType: "wedding", songName: "Perfect - Ed Sheeran", views: "1.2k", status: "Done", priority: "Medium", label: "Documentation" },
        { id: 'TASK-7878', clientName: "Mike Chen", functionDate: "2025-02-20", functionType: "birthday", songName: "Happy Birthday", views: "850", status: "In Progress", priority: "High", label: "Feature" },
        { id: 'TASK-7839', clientName: "TechCorp Inc", functionDate: "2025-03-10", functionType: "corporate", songName: "Corporate Vibes", views: "420", status: "Todo", priority: "Low", label: "Bug" },
        { id: 'TASK-5562', clientName: "Alex Rivera", functionDate: "2025-04-05", functionType: "engagement", songName: "A Thousand Years", views: "2.1k", status: "In Progress", priority: "Medium", label: "Feature" },
        { id: 'TASK-8686', clientName: "The Garcias", functionDate: "2025-05-12", functionType: "family", songName: "Family Portait", views: "310", status: "Backlog", priority: "Low", label: "Documentation" },
        { id: 'TASK-1280', clientName: "StartupXYZ", functionDate: "2025-06-01", functionType: "corporate", songName: "Success Anthem", views: "1.5k", status: "Cancelled", priority: "High", label: "Bug" },
        { id: 'TASK-7262', clientName: "University Hall", functionDate: "2025-07-20", functionType: "graduation", songName: "Pomp and Circumstance", views: "980", status: "Done", priority: "Medium", label: "Feature" },
        { id: 'TASK-1138', clientName: "The Patels", functionDate: "2025-08-14", functionType: "anniversary", songName: "All of Me", views: "1.1k", status: "Todo", priority: "High", label: "Documentation" },
      ]
      setTimeout(() => setAlbums(mockAlbums), 0)
    } else {
      const enhanced = storedAlbums.map((a, i) => ({
        ...a,
        id: a.id || `TASK-${1000 + i}`,
        clientName: a.clientName || a.albumName || 'Unknown Client',
        songName: a.songName || 'Standard Track',
        views: a.views || '0',
        status: a.status || 'Todo',
        priority: a.priority || 'Medium',
        label: a.label || 'Feature',
      }))
      setTimeout(() => setAlbums(enhanced), 0)
    }
  }

  useEffect(() => {
    loadAlbums()
  }, [])

  const handleShow = (album) => {
    setViewId(album.id)
    setViewData(album)
  }

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

  const toggleRow = (id) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }

  const toggleAll = () => {
    if (selectedRows.size === filteredAlbums.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(filteredAlbums.map(a => a.id)))
    }
  }

  const handleCopyLink = (id) => {
    const url = `${window.location.origin}/viewer/${id}`
    navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard")
  }

  const filteredAlbums = albums.filter(album => {
    const matchesSearch =
      album.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.songName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'All' || album.status === statusFilter
    const matchesPriority = priorityFilter === 'All' || album.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
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
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter albums..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-9 w-full sm:w-[250px] lg:w-[300px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    Status <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setStatusFilter('All')}>All Statuses</DropdownMenuItem>
                  {statusOptions.map(s => (
                    <DropdownMenuItem key={s} onClick={() => setStatusFilter(s)}>
                      {getStatusIcon(s)} <span className="ml-2">{s}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    Priority <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setPriorityFilter('All')}>All Priorities</DropdownMenuItem>
                  {priorityOptions.map(p => (
                    <DropdownMenuItem key={p} onClick={() => setPriorityFilter(p)}>
                      {getPriorityIcon(p)} <span className="ml-2">{p}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 ml-auto">
                  View <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Task ID</DropdownMenuItem>
                <DropdownMenuItem>Title</DropdownMenuItem>
                <DropdownMenuItem>Status</DropdownMenuItem>
                <DropdownMenuItem>Priority</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Data Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedRows.size === filteredAlbums.length && filteredAlbums.length > 0}
                      onCheckedChange={toggleAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="w-[60px]">S.No</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Function</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Song Name</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>QR Code</TableHead>
                  <TableHead>Copy</TableHead>
                  <TableHead className="w-[100px] text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlbums.length > 0 ? (
                  filteredAlbums.map((album, index) => (
                    <TableRow key={album.id} data-state={selectedRows.has(album.id) ? "selected" : undefined}>
                      <TableCell>
                        <Checkbox
                          checked={selectedRows.has(album.id)}
                          onCheckedChange={() => toggleRow(album.id)}
                          aria-label={`Select ${album.clientName}`}
                        />
                      </TableCell>
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
                        <div className="flex items-center gap-2">
                          {getStatusIcon(album.status)}
                          <span className="text-sm">{album.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setQrCodeAlbum(album)}
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
                            className="lucide lucide-qr-code"
                          >
                            <rect width="5" height="5" x="3" y="3" rx="1" />
                            <rect width="5" height="5" x="16" y="3" rx="1" />
                            <rect width="5" height="5" x="3" y="16" rx="1" />
                            <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                            <path d="M21 21v.01" />
                            <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                            <path d="M3 12h.01" />
                            <path d="M12 3h.01" />
                            <path d="M12 16h.01" />
                            <path d="M16 12h1" />
                            <path d="M21 12h.01" />
                            <path d="M12 21v-1" />
                          </svg>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleCopyLink(album.id)}
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
                            className="h-8 w-8 text-indigo-500 hover:text-indigo-600"
                            onClick={() => handleShow(album)}
                            title="Show Visual Book"
                          >
                            <BookOpen className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-500 hover:text-blue-600"
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
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600"
                            onClick={() => handleDelete(album.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              {selectedRows.size} of {filteredAlbums.length} row(s) selected.
            </div>
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

      {/* Visual Book Viewer Modal */}
      {viewId && (
        <div className="fixed inset-0 z-[100] bg-background">
          <VisualBookViewer
            spreads={viewData?.spreads || []}
            title={viewData?.clientName || "Pixfolio"}
            frontCover={viewData?.frontCover}
            backCover={viewData?.backCover}
          />
          <div className="fixed bottom-8 right-8 z-[110]">
            <Button
              variant="outline"
              onClick={() => {
                setViewId(null)
                setViewData(null)
              }}
              className="bg-white/40 backdrop-blur-md border-slate-200/50 hover:bg-white transition-all duration-300 shadow-sm"
            >
              Close Preview
            </Button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrCodeAlbum && (
        <QRCodeModal
          isOpen={!!qrCodeAlbum}
          onClose={() => setQrCodeAlbum(null)}
          title={qrCodeAlbum.clientName || 'Pixfolio'}
          url={`${window.location.origin}/viewer/${qrCodeAlbum.id}`}
        />
      )}
    </div>
  )
}

export default AllPixfolio
