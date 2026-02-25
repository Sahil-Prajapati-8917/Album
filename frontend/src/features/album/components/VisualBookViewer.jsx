// VisualBookViewer.jsx — Minimal scrollable album viewer
import { getAlbumById } from '@/services/api'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User, MapPin, ImageOff } from 'lucide-react'

const VisualBookViewer = ({ spreads = [], title = '', frontCover = null, backCover = null }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [album, setAlbum] = useState(null)
  const [isLoading, setIsLoading] = useState(!!id)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) {
      // Preview mode — use props directly
      setAlbum({
        title: title || 'Untitled Album',
        spreads,
        frontCover,
        backCover,
      })
      return
    }

    const fetchAlbum = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await getAlbumById(id)
        if (response.success && response.data) {
          const d = response.data
          setAlbum({
            title: d.albumName || d.clientName || 'Untitled Album',
            spreads: d.spreads || [],
            frontCover: d.frontCover || null,
            backCover: d.backCover || null,
            photographerName: d.photographerName || '',
            photographerCity: d.photographerCity || '',
            functionDate: d.functionDate || '',
          })
        } else {
          setError('Album not found')
        }
      } catch (e) {
        console.error('Error loading album:', e)
        setError('Failed to load album')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAlbum()
  }, [id, title, spreads, frontCover, backCover])

  // Collect every image URL from the album data
  const getAllImages = () => {
    if (!album) return []
    const images = []

    if (album.frontCover) {
      images.push({ src: album.frontCover, label: 'Front Cover' })
    }

    album.spreads.forEach((spread, idx) => {
      if (spread.leftPage?.image) {
        images.push({
          src: spread.leftPage.image,
          label: spread.leftPage.caption || `Page ${idx * 2 + 1}`,
        })
      }
      if (spread.rightPage?.image) {
        images.push({
          src: spread.rightPage.image,
          label: spread.rightPage.caption || `Page ${idx * 2 + 2}`,
        })
      }
    })

    if (album.backCover) {
      images.push({ src: album.backCover, label: 'Back Cover' })
    }

    return images
  }

  // --- Loading state ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-neutral-700 border-t-white rounded-full animate-spin" />
          <p className="text-neutral-500 text-sm">Loading album...</p>
        </div>
      </div>
    )
  }

  // --- Error state ---
  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <ImageOff className="w-12 h-12 text-neutral-600 mx-auto" />
          <p className="text-neutral-400">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-neutral-500 hover:text-white transition-colors cursor-pointer"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  const images = getAllImages()

  // --- Empty state ---
  if (!album || images.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <ImageOff className="w-12 h-12 text-neutral-600 mx-auto" />
          <p className="text-neutral-400">No images in this album</p>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-neutral-500 hover:text-white transition-colors cursor-pointer"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Back + title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate(-1)}
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-white text-sm font-medium truncate">
              {album.title}
            </h1>
          </div>

          {/* Meta info */}
          <div className="hidden sm:flex items-center gap-4 text-neutral-500 text-xs">
            {album.photographerName && (
              <span className="flex items-center gap-1.5">
                <User size={12} />
                {album.photographerName}
              </span>
            )}
            {album.photographerCity && (
              <span className="flex items-center gap-1.5">
                <MapPin size={12} />
                {album.photographerCity}
              </span>
            )}
            {album.functionDate && (
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {album.functionDate}
              </span>
            )}
            <span className="text-neutral-600">
              {images.length} {images.length === 1 ? 'photo' : 'photos'}
            </span>
          </div>
        </div>
      </header>

      {/* Image grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col gap-2">
          {images.map((img, i) => (
            <div key={i} className="relative bg-neutral-900 rounded-lg overflow-hidden">
              <img
                src={img.src}
                alt={img.label}
                loading="lazy"
                className="w-full h-auto block"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'flex'
                }}
              />
              {/* Fallback for broken images */}
              <div className="hidden items-center justify-center h-48 text-neutral-600">
                <ImageOff size={24} />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-white/5 py-6">
        <p className="text-center text-neutral-600 text-xs tracking-wide">
          {album.title}
        </p>
      </footer>
    </div>
  )
}

export default VisualBookViewer
