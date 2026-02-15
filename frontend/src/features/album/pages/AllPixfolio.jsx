import { useState, useEffect } from 'react'
import {
  MoreHorizontal,
  Search,
  Trash2,
  ArrowUpDown,
  ChevronDown,
  CirclePlus,
  Circle,
  CheckCircle2,
  XCircle,
  Timer,
  CircleHelp,
  ArrowUp,
  ArrowDown,
  ArrowRight,
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

const statusOptions = ['Backlog', 'Todo', 'In Progress', 'Done', 'Cancelled']
const priorityOptions = ['Low', 'Medium', 'High']
const labelOptions = ['Documentation', 'Bug', 'Feature']

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
  const [albums, setAlbums] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRows, setSelectedRows] = useState(new Set())

  const loadAlbums = () => {
    const storedAlbums = JSON.parse(localStorage.getItem('albums') || '[]')
    if (storedAlbums.length === 0) {
      const mockAlbums = [
        { id: 'TASK-8782', albumName: "Sarah & John's Wedding", clientName: "Sarah Johnson", functionDate: "2025-01-15", functionType: "wedding", status: "Done", priority: "Medium", label: "Documentation" },
        { id: 'TASK-7878', albumName: "Birthday Bash 2025", clientName: "Mike Chen", functionDate: "2025-02-20", functionType: "birthday", status: "In Progress", priority: "High", label: "Feature" },
        { id: 'TASK-7839', albumName: "Corporate Gala Night", clientName: "TechCorp Inc", functionDate: "2025-03-10", functionType: "corporate", status: "Todo", priority: "Low", label: "Bug" },
        { id: 'TASK-5562', albumName: "Engagement Shoot", clientName: "Alex Rivera", functionDate: "2025-04-05", functionType: "engagement", status: "In Progress", priority: "Medium", label: "Feature" },
        { id: 'TASK-8686', albumName: "Family Reunion", clientName: "The Garcias", functionDate: "2025-05-12", functionType: "family", status: "Backlog", priority: "Low", label: "Documentation" },
        { id: 'TASK-1280', albumName: "Product Launch", clientName: "StartupXYZ", functionDate: "2025-06-01", functionType: "corporate", status: "Cancelled", priority: "High", label: "Bug" },
        { id: 'TASK-7262', albumName: "Graduation Ceremony", clientName: "University Hall", functionDate: "2025-07-20", functionType: "graduation", status: "Done", priority: "Medium", label: "Feature" },
        { id: 'TASK-1138', albumName: "Anniversary Dinner", clientName: "The Patels", functionDate: "2025-08-14", functionType: "anniversary", status: "Todo", priority: "High", label: "Documentation" },
      ]
      setTimeout(() => setAlbums(mockAlbums), 0)
    } else {
      const enhanced = storedAlbums.map((a, i) => ({
        ...a,
        id: a.id || `TASK-${1000 + i}`,
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

  const handleDelete = (id) => {
    const updated = albums.filter(a => a.id !== id)
    setAlbums(updated)
    localStorage.setItem('albums', JSON.stringify(updated))
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

  const filteredAlbums = albums.filter(album =>
    album.albumName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Pixfolios</h1>
        <p className="text-muted-foreground">
          Here's a list of your pixfolios and their current status.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter albums..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-9 w-[250px] lg:w-[300px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {statusOptions.map(s => (
                <DropdownMenuItem key={s}>{getStatusIcon(s)} <span className="ml-2">{s}</span></DropdownMenuItem>
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
              {priorityOptions.map(p => (
                <DropdownMenuItem key={p}>{getPriorityIcon(p)} <span className="ml-2">{p}</span></DropdownMenuItem>
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
              <TableHead className="w-[100px]">Task</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[120px]">
                <Button variant="ghost" size="sm" className="-ml-3 h-8">
                  Status <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px]">
                <Button variant="ghost" size="sm" className="-ml-3 h-8">
                  Priority <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlbums.length > 0 ? (
              filteredAlbums.map((album) => (
                <TableRow key={album.id} data-state={selectedRows.has(album.id) ? "selected" : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(album.id)}
                      onCheckedChange={() => toggleRow(album.id)}
                      aria-label={`Select ${album.albumName}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{album.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {album.label}
                      </Badge>
                      <span className="max-w-[300px] truncate font-medium">
                        {album.albumName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(album.status)}
                      <span className="text-sm">{album.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(album.priority)}
                      <span className="text-sm">{album.priority}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => navigator.clipboard.writeText(album.id)}
                        >
                          Copy task ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(album.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
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
    </div>
  )
}

export default AllPixfolio
