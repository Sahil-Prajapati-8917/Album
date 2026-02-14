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
  AlertCircle
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
    // Load from localStorage, with some mock data if empty
    const storedAlbums = JSON.parse(localStorage.getItem('albums') || '[]')

    if (storedAlbums.length === 0) {
      // Add some mock albums
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
        },
        {
          id: 4,
          albumName: "Engagement Celebration",
          totalSheets: 16,
          clientName: "Emma Davis",
          functionDate: "2025-04-05",
          functionType: "engagement",
          rating: 4.8,
          viewersCount: 234,
          qrCode: "qr-4",
          link: "https://pixfolio.com/album/4",
          status: "published",
          createdDate: "2025-03-28"
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
      case 'published':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'draft':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'pending':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating > 0 ? rating.toFixed(1) : 'N/A'}</span>
      </div>
    )
  }

  const columns = [
    {
      accessorKey: "albumName",
      header: "Album Name",
      cell: ({ row }) => (
        <div className="text-sm font-medium text-gray-900">{row.getValue("albumName")}</div>
      ),
    },
    {
      accessorKey: "totalSheets",
      header: "Total Sheets",
      cell: ({ row }) => (
        <div className="text-sm text-gray-900">{row.getValue("totalSheets")}</div>
      ),
    },
    {
      accessorKey: "clientName",
      header: "Client Name",
      cell: ({ row }) => (
        <div className="text-sm text-gray-900">{row.getValue("clientName")}</div>
      ),
    },
    {
      accessorKey: "functionDate",
      header: "Function Date",
      cell: ({ row }) => (
        <div className="text-sm text-gray-900">
          {new Date(row.getValue("functionDate")).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "functionType",
      header: "Type",
      cell: ({ row }) => (
        <div className="text-sm text-gray-900 capitalize">{row.getValue("functionType")}</div>
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => renderStars(row.getValue("rating")),
    },
    {
      accessorKey: "viewersCount",
      header: "Viewers",
      cell: ({ row }) => (
        <div className="flex items-center text-sm text-gray-900">
          <Eye className="h-4 w-4 mr-1 text-gray-400" />
          {row.getValue("viewersCount")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const album = row.original

        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => copyToClipboard(album.link, album.id)}
              className="text-blue-600 hover:text-blue-900 p-1"
              title="Copy Link"
            >
              {copySuccess === album.id ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <button
              className="text-green-600 hover:text-green-900 p-1"
              title="Download QR Code"
            >
              <QrCode className="h-4 w-4" />
            </button>
            <button
              className="text-purple-600 hover:text-purple-900 p-1"
              title="Edit"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDeleteAlbum(album)}
              className="text-red-600 hover:text-red-900 p-1"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(row.getValue("status"))}`}>
          {getStatusIcon(row.getValue("status"))}
          <span className="ml-1 capitalize">{row.getValue("status")}</span>
        </span>
      ),
    },
    {
      accessorKey: "createdDate",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {new Date(row.getValue("createdDate")).toLocaleDateString()}
        </div>
      ),
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Pixfolio Albums</h1>
        <p className="text-gray-600">Manage and track all your Visual Book albums</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="Search albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {statusFilter === 'all' ? 'All Status' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('published')}>
                  Published
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('draft')}>
                  Draft
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                  Pending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Albums Table */}
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <Trash2 className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Album</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete "{albumToDelete?.albumName}"? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllPixfolio
