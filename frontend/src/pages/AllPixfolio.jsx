import { useState, useEffect } from 'react'
import { getUser } from '@/services/api'
import ArchiveHeader from '@/components/features/dashboard/ArchiveHeader'
import AlbumFilters from '@/components/features/dashboard/AlbumFilters'
import AlbumTable from '@/components/features/dashboard/AlbumTable'
import DeleteAlbumModal from '@/components/features/dashboard/DeleteAlbumModal'
import { LoadingState } from '@/components/custom/LoadingState'

const AllPixfolio = () => {
  const [user, setUser] = useState(null)
  const [albums, setAlbums] = useState([])
  const [filteredAlbums, setFilteredAlbums] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [albumToDelete, setAlbumToDelete] = useState(null)

  useEffect(() => {
    const userData = getUser()
    if (userData) setUser(userData)
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
          link: `${window.location.origin}/viewer/1`,
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
          link: `${window.location.origin}/viewer/2`,
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
          link: `${window.location.origin}/viewer/3`,
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

  if (isLoading) {
    return <LoadingState message="Loading your archive..." className="h-[60vh]" />
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-10">
      <ArchiveHeader userName={user?.personalName?.split(' ')[0]} />
      <AlbumFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <AlbumTable
        data={filteredAlbums}
        onDelete={handleDeleteAlbum}
      />
      <DeleteAlbumModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        albumName={albumToDelete?.albumName}
      />
    </div>
  )
}

export default AllPixfolio
