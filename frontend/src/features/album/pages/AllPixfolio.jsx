import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"

// UI Components
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Custom Components
import QRCodeModal from '../components/QRCodeModal'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { AllPixfolioToolbar } from '../components/AllPixfolioToolbar'
import { AllPixfolioTable } from '../components/AllPixfolioTable'
import { functionTypesOptions, parseViews, isDateInRange } from '../utils/albumUtils'

const AllPixfolio = () => {
  const navigate = useNavigate()
  const [albums, setAlbums] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [functionType, setFunctionType] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [dateFilter, setDateFilter] = useState('all')
  const [deleteId, setDeleteId] = useState(null)
  const [qrCodeAlbum, setQrCodeAlbum] = useState(null)

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
      toast.success("Pixfolio deleted")
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
