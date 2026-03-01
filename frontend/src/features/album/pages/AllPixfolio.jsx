import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { getMyAlbums, deleteAlbum as apiDeleteAlbum } from '@/shared/api/api'
import { functionTypesOptions, parseViews, isDateInRange } from '../utils/albumUtils'
import AllPixfolioToolbar from '../components/AllPixfolioToolbar'
import AllPixfolioTable from '../components/AllPixfolioTable'
import ConfirmDialog from '@/shared/ui/ConfirmDialog'
import QRCodeModal from '../components/QRCodeModal'

const AllPixfolio = () => {
  const navigate = useNavigate()
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [functionType, setFunctionType] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [dateFilter, setDateFilter] = useState('all')
  const [deleteId, setDeleteId] = useState(null)
  const [qrCodeAlbum, setQrCodeAlbum] = useState(null)

  const loadAlbums = async () => {
    setIsLoading(true)
    try {
      const response = await getMyAlbums()
      if (response.success) {
        const enhanced = response.data.map((a, i) => ({
          ...a,
          id: a.albumId || a._id, // Use albumId if available, fallback to _id
          clientName: a.clientName || 'Unknown Client',
          songName: a.songName || 'Standard Track',
          views: a.views?.toString() || '0',
          priority: a.priority || 'Medium',
          label: a.label || 'Feature',
        }))
        setAlbums(enhanced)
      }
    } catch (error) {
      console.error('Failed to load albums:', error)
      toast.error("Failed to load albums")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAlbums()
  }, [])

  const handleDelete = (id) => {
    // Need to find the mongo _id for the api call
    const album = albums.find(a => a.id === id)
    setDeleteId(album?._id || id)
  }

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        const response = await apiDeleteAlbum(deleteId)
        if (response.success) {
          setAlbums(prev => prev.filter(a => (a._id !== deleteId && a.id !== deleteId)))
          setDeleteId(null)
          toast.success("Pixfolio deleted")
        }
      } catch (error) {
        console.error('Delete failed:', error)
        toast.error("Failed to delete Pixfolio")
      }
    }
  }

  const handleCopyLink = (id) => {
    const url = `${window.location.origin}/viewer/${id}`
    navigator.clipboard.writeText(url)
    toast.success("Link copied to clipboard")
  }

  const handleView = (id) => navigate(`/viewer/${id}`)
  const handleEdit = (id) => navigate(`/create?edit=${id}`)

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

          <AllPixfolioToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            functionType={functionType}
            setFunctionType={setFunctionType}
            functionTypesOptions={functionTypesOptions}
            sortBy={sortBy}
            setSortBy={setSortBy}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />

          <AllPixfolioTable
            albums={filteredAlbums}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCopyLink={handleCopyLink}
            onOpenQRCode={setQrCodeAlbum}
          />

          <div className="flex items-center justify-end text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete a Pixfolio"
        description="This action cannot be undone. This will permanently delete the Pixfolio and remove its data from our servers."
        confirmText="Delete"
        confirmVariant="destructive"
      />

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
