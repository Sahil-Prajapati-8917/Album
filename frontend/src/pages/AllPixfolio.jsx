import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Download,
  Copy,
  Star,
  Eye,
  Calendar,
  User,
  QrCode,
  ExternalLink,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react'

const AllPixfolio = () => {
  const [albums, setAlbums] = useState([])
  const [filteredAlbums, setFilteredAlbums] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [albumToDelete, setAlbumToDelete] = useState(null)
  const [copySuccess, setCopySuccess] = useState(null)
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    loadAlbums()
  }, [])

  useEffect(() => {
    filterAlbums()
  }, [albums, searchTerm, statusFilter])

  const loadAlbums = () => {
    setIsLoading(true)
    const storedAlbums = JSON.parse(localStorage.getItem('albums') || '[]')
    if (storedAlbums.length === 0) {
      const mockAlbums = [
        {
          id: 1,
          albumName: "Sarah & John's Wedding",
          totalSheets: 24,
          clientName: "Sarah Johnson",
          functionDate: "2025-01-15",
          functionType: "wedding",
          rating: 4.5,
          viewersCount: 156,
          qrCode: "qr-1",
          link: "https://pixfolio.com/album/1",
          status: "published",
          createdDate: "2025-01-10"
        },
        {
          id: 2,
          albumName: "Birthday Bash 2025",
          totalSheets: 18,
          clientName: "Mike Chen",
          functionDate: "2025-02-20",
          functionType: "birthday",
          rating: 4.2,
          viewersCount: 89,
          qrCode: "qr-2",
          link: "https://pixfolio.com/album/2",
          status: "published",
          createdDate: "2025-02-15"
        },
        {
          id: 3,
          albumName: "Corporate Event 2025",
          totalSheets: 32,
          clientName: "ABC Corp",
          functionDate: "2025-03-10",
          functionType: "corporate",
          rating: 0,
          viewersCount: 0,
          qrCode: "qr-3",
          link: "https://pixfolio.com/album/3",
          status: "draft",
          createdDate: "2025-03-05"
        }
      ]
      localStorage.setItem('albums', JSON.stringify(mockAlbums))
      setAlbums(mockAlbums)
    } else {
      setAlbums(storedAlbums)
    }
    setIsLoading(false)
  }

  const filterAlbums = () => {
    let filtered = albums
    if (searchTerm) {
      filtered = filtered.filter(album =>
        album.albumName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.functionType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(album => album.status === statusFilter)
    }
    setFilteredAlbums(filtered)
  }

  const handleDeleteAlbum = (album) => {
    setAlbumToDelete(album)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (albumToDelete) {
      const updatedAlbums = albums.filter(album => album.id !== albumToDelete.id)
      localStorage.setItem('albums', JSON.stringify(updatedAlbums))
      setAlbums(updatedAlbums)
      setShowDeleteModal(false)
      setAlbumToDelete(null)
    }
  }

  const copyToClipboard = async (text, albumId) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(albumId)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4" />
      case 'draft': return <Clock className="h-4 w-4" />
      case 'pending': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-gold/10 text-gold'
      case 'draft': return 'bg-pearl-dark/20 text-gray-500'
      case 'pending': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${star <= rating ? 'text-gold fill-current' : 'text-gray-200 dark:text-gray-700'}`}
          />
        ))}
        <span className="ml-1.5 text-[10px] font-bold text-gray-400">{rating > 0 ? rating.toFixed(1) : '—'}</span>
      </div>
    )
  }

  const columns = [
    {
      accessorKey: "albumName",
      header: "Artistic Vision",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm font-serif italic text-[#181611] dark:text-white">{row.getValue("albumName")}</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">{row.original.functionType}</span>
        </div>
      ),
    },
    {
      accessorKey: "clientName",
      header: "Patron",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600 dark:text-gray-400 font-light">{row.getValue("clientName")}</div>
      ),
    },
    {
      accessorKey: "totalSheets",
      header: "Pages",
      cell: ({ row }) => (
        <div className="text-xs font-bold text-gray-500">{row.getValue("totalSheets")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Curation",
      cell: ({ row }) => (
        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusColor(row.getValue("status"))}`}>
          {getStatusIcon(row.getValue("status"))}
          <span className="ml-1.5">{row.getValue("status")}</span>
        </div>
      ),
    },
    {
      accessorKey: "functionDate",
      header: "Exhibition Date",
      cell: ({ row }) => (
        <div className="text-xs text-gray-500">
          {new Date(row.getValue("functionDate")).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      ),
    },
    {
      accessorKey: "viewersCount",
      header: "Audience",
      cell: ({ row }) => (
        <div className="flex items-center text-xs text-gray-500">
          <Eye className="h-3.5 w-3.5 mr-1.5 text-gold/60" />
          {row.getValue("viewersCount")}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Legacy Tools",
      cell: ({ row }) => {
        const album = row.original
        return (
          <div className="flex items-center space-x-1">
            <Button
              onClick={() => copyToClipboard(album.link, album.id)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gold hover:bg-gold/10"
              title="Copy Legacy Link"
            >
              {copySuccess === album.id ? <CheckCircle className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gold hover:bg-gold/10"
              title="QR Code"
            >
              <QrCode className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gold hover:bg-gold/10"
              title="Enhance"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => handleDeleteAlbum(album)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-400 hover:bg-red-50"
              title="Retire"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: filteredAlbums,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#181611] dark:text-white italic">The Pixfolio Archive</h1>
          <p className="mt-2 text-sm text-gray-500 font-light tracking-wide uppercase">Managing your digital gallery</p>
        </div>
        <Sparkles className="h-8 w-8 text-gold/20 hidden md:block" />
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-[#2a261d] rounded-2xl shadow-sm border border-gold/10 p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="relative group">
              <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors" />
              <Input
                type="text"
                placeholder="Search the archive..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-gold/10 focus:border-gold focus:ring-gold/5 bg-pearl/30 rounded-xl"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select onValueChange={setStatusFilter} value={statusFilter}>
              <SelectTrigger className="w-full lg:w-48 h-12 border-gold/10 focus:border-gold bg-pearl/30 rounded-xl font-bold text-[10px] uppercase tracking-widest text-gray-500">
                <div className="flex items-center">
                  <Filter className="h-3 w-3 mr-2 text-gold/60" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Curation</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Albums Table */}
      <div className="bg-white dark:bg-[#2a261d] rounded-2xl shadow-sm border border-gold/10 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-pearl/50 dark:bg-ebony/20">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b border-gold/10 hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 py-6 px-6 h-auto">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-gold/5 hover:bg-gold/5 transition-colors group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-6 px-6">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center opacity-30">
                      <FolderOpen className="h-12 w-12 mb-4" />
                      <p className="text-xs font-bold uppercase tracking-widest">No entries found in the archive</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="px-8 py-6 border-t border-gold/5 flex items-center justify-between bg-pearl/30 dark:bg-ebony/10">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 border-gold/10 text-gold hover:bg-gold/5 px-4 font-serif italic text-xs"
            >
              Previous Act
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 border-gold/10 text-gold hover:bg-gold/5 px-4 font-serif italic text-xs"
            >
              Next Act
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-ebony/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-[#2a261d] p-10 border border-gold/20 w-full max-w-md shadow-2xl rounded-3xl text-center"
          >
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-serif italic text-gray-900 dark:text-white mb-2">Retire Legacy?</h3>
            <p className="text-sm text-gray-500 mb-8 font-light italic">
              Are you sure you want to retire "{albumToDelete?.albumName}"? This vision will be lost to time.
            </p>
            <div className="flex space-x-4">
              <Button
                onClick={() => setShowDeleteModal(false)}
                variant="ghost"
                className="flex-1 h-12 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Keep Vision
              </Button>
              <Button
                onClick={confirmDelete}
                className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-red-600/20"
              >
                Retire Act
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AllPixfolio
