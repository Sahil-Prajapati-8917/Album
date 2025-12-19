// VisualBookViewer.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import HTMLFlipBook from 'react-pageflip'

// Page component with forwardRef for react-pageflip
const Page = React.forwardRef((props, ref) => {
  const { spread, pageNumber, isLeft } = props
  
  if (!spread) return null
  
  const pageData = isLeft ? spread.leftPage : spread.rightPage
  if (!pageData) return null

  return (
    <div 
      ref={ref}
      className="demoPage"
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #fef7ed 0%, #fdf2f8 50%, #fef7ed 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Full bleed main image */}
      <img
        src={pageData.image}
        alt={pageData.caption || ''}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          imageRendering: 'crisp-edges',
          filter: 'sepia(0.05) contrast(1.05) brightness(1.02)'
        }}
      />

      {/* Paint splash/watercolor edge blending effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 20%, rgba(244, 114, 182, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 60% 10%, rgba(236, 72, 153, 0.08) 0%, transparent 40%)`,
          mixBlendMode: 'multiply'
        }}
      />

      {/* Inset photo on right pages */}
      {!isLeft && spread.leftPage && (
        <div
          className="absolute top-8 right-8"
          style={{
            width: '22%',
            maxWidth: '320px',
            transform: 'rotate(-3deg)',
            zIndex: 10
          }}
        >
          <div
            className="w-full h-full bg-white p-2 relative"
            style={{
              borderRadius: '8px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,0.8)',
              aspectRatio: '1/1'
            }}
          >
            <img
              src={spread.leftPage.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover rounded"
              style={{
                imageRendering: 'crisp-edges',
                filter: 'sepia(0.05) contrast(1.06) brightness(1.03)'
              }}
            />
          </div>
        </div>
      )}

      {/* Page number */}
      <div
        className="absolute bottom-4 text-amber-800/80 text-sm font-serif font-medium"
        style={{
          [isLeft ? 'left' : 'right']: '16px',
          background: 'rgba(255, 251, 235, 0.9)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '6px',
          padding: '4px 8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textShadow: '0 1px 2px rgba(255,255,255,0.5)'
        }}
      >
        {pageNumber}{isLeft ? 'a' : 'b'}
      </div>
    </div>
  )
})

Page.displayName = 'Page'

const VisualBookViewer = ({ spreads = [], title = "Visual Book" }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  // State management
  const [isLoading, setIsLoading] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Ref for HTMLFlipBook
  const flipBookRef = useRef(null)

  // Load album data from localStorage or provided spreads prop
  const loadAlbumData = () => {
    if (spreads && spreads.length > 0) {
      return {
        id: parseInt(id) || 1,
        title: title,
        spreads: spreads
      }
    }

    // Load from localStorage
    try {
      const albums = JSON.parse(localStorage.getItem('albums') || '[]')
      const album = albums.find(a => a.id === parseInt(id))
      if (album && album.spreads) {
        return {
          id: album.id,
          title: album.albumName,
          spreads: album.spreads
        }
      }
    } catch (e) {
      // ignore parse errors
    }

    // Fallback to mock data if album not found
    const defaultSpreads = [
      {
        id: 1,
        leftPage: {
          image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=1200&fit=crop",
          overlay: null,
          caption: "Ceremony Moments"
        },
        rightPage: {
          image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&h=1200&fit=crop",
          overlay: null,
          caption: "First Dance"
        }
      },
      {
        id: 2,
        leftPage: {
          image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1600&h=1200&fit=crop",
          overlay: null,
          caption: "Reception Entrance"
        },
        rightPage: {
          image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&h=1200&fit=crop",
          overlay: null,
          caption: "Cake Ceremony"
        }
      },
      {
        id: 3,
        leftPage: {
          image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&h=1200&fit=crop",
          overlay: null,
          caption: "Family Portraits"
        },
        rightPage: {
          image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1600&h=1200&fit=crop",
          overlay: null,
          caption: "Sunset Session"
        }
      },
      {
        id: 4,
        leftPage: {
          image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=1200&fit=crop",
          overlay: null,
          caption: "Bridal Party"
        },
        rightPage: {
          image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1600&h=1200&fit=crop",
          overlay: null,
          caption: "Thank You"
        }
      }
    ]

    return {
      id: parseInt(id) || 1,
      title: title || "Visual Book",
      spreads: defaultSpreads
    }
  }

  const visualBookData = loadAlbumData()

  // Check for reduced motion preference and simulate loading
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      clearTimeout(timer)
    }
  }, [])

  // Handle page flip events
  const onFlip = useCallback((e) => {
    // The flip event is handled by react-pageflip internally
    console.log('Current page:', e.data)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!flipBookRef.current) return
      
      const pageFlip = flipBookRef.current.getPageFlip()
      
      switch (e.key) {
        case 'ArrowLeft':
          pageFlip.flipPrev()
          break
        case 'ArrowRight':
          pageFlip.flipNext()
          break
        case 'Escape':
          navigate('/dashboard')
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-800">Loading visual book...</p>
        </div>
      </div>
    )
  }

  // Flatten spreads into individual pages for react-pageflip
  const pages = []
  visualBookData.spreads.forEach((spread, index) => {
    const pageNumber = String(index + 1).padStart(2, '0')
    
    // Add left page
    if (spread.leftPage) {
      pages.push(
        <Page 
          key={`left-${index}`} 
          spread={spread} 
          pageNumber={pageNumber}
          isLeft={true}
        />
      )
    }
    
    // Add right page
    if (spread.rightPage) {
      pages.push(
        <Page 
          key={`right-${index}`} 
          spread={spread} 
          pageNumber={pageNumber}
          isLeft={false}
        />
      )
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Soft vignette effect */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(0,0,0,0.2) 70%)' }} />

      {/* Exit button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 right-6 z-20 text-white/40 hover:text-white transition-all duration-300 text-sm hover:scale-110"
        aria-label="Exit visual book"
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '8px',
          padding: '8px 12px'
        }}
      >
        ✕
      </button>

      {/* HTMLFlipBook Container */}
      <div
        className="relative"
        style={{
          width: '95vw',
          maxWidth: '1200px',
          height: '85vh',
          transform: 'rotate(-6deg)', // Natural album tilt
          filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))'
        }}
      >
        <HTMLFlipBook
          ref={flipBookRef}
          width={600} // Width per page
          height={800} // Height per page
          size="fixed"
          minWidth={300}
          maxWidth={1200}
          minHeight={400}
          maxHeight={1000}
          drawShadow={true}
          flippingTime={reducedMotion ? 100 : 1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={1}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="premium-flipbook"
          style={{
            background: 'transparent',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          {pages}
        </HTMLFlipBook>
      </div>
    </div>
  )
}

export default VisualBookViewer
