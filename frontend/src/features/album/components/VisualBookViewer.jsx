// VisualBookViewer.jsx
import { getAlbumById } from '@/services/api'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import HTMLFlipBook from 'react-pageflip'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Minimize2, Play, Pause, User, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Share2 } from 'lucide-react'

// Realistic Paper Texture Component
const PaperTexture = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] mix-blend-multiply">
    <filter id="paper-grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.3 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#paper-grain)" />
  </svg>
)

// Page component with forwardRef for react-pageflip
const Page = React.forwardRef((props, ref) => {
  const { spread, pageNumber, isLeft, isCover, children, image } = props

  if (isCover) {
    return (
      <div
        ref={ref}
        className={`book-cover ${isLeft ? 'cover-left' : 'cover-right'}`}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#2c3e50', // Premium dark leather
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 100%)',
          boxShadow: isLeft
            ? 'inset -10px 0 20px rgba(0,0,0,0.5), -5px 0 15px rgba(0,0,0,0.3)'
            : 'inset 10px 0 20px rgba(0,0,0,0.5), 5px 0 15px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ecf0f1',
          fontFamily: "'Playfair Display', serif",
          border: '1px solid rgba(0,0,0,0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Leather grain texture for cover */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-leather.png")' }}></div>

        {image ? (
          <img
            src={image}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.style.background = 'linear-gradient(135deg, #2c3e50, #34495e)'
            }}
          />
        ) : (
          <div className="relative z-10">{children}</div>
        )}

        {/* Gold foil effect for border */}
        {!image && <div className="absolute inset-4 border border-[#d4af37]/30 pointer-events-none"></div>}
      </div>
    )
  }

  if (!spread) return null
  const pageData = isLeft ? spread.leftPage : spread.rightPage
  if (!pageData) return null

  return (
    <div
      ref={ref}
      className={`page-content ${isLeft ? 'page-left' : 'page-right'}`}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fefcf0', // Creamy paper color
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isLeft
          ? 'inset -30px 0 30px -20px rgba(0,0,0,0.2)'
          : 'inset 30px 0 30px -20px rgba(0,0,0,0.2)', // Spine shadow
      }}
    >
      <PaperTexture />

      {/* Main Image Container (The "Canvas") */}
      <div className="absolute inset-0 flex items-center justify-center bg-white overflow-hidden">
        <img
          src={pageData.image}
          alt={pageData.caption || ''}
          className="w-full h-full object-contain transition-transform duration-700"
          style={{
            backgroundColor: 'white'
          }}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.style.background = 'linear-gradient(135deg, #f5f5f5, #e0e0e0)'
          }}
        />
        {/* Extremely subtle sheen to simulate printed paper ink reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-30"></div>
      </div>

      {/* Page Number - Minimalist placement */}
      <div className={`absolute bottom-4 ${isLeft ? 'left-8' : 'right-8'} font-serif text-slate-400 text-[10px] tracking-widest uppercase pointer-events-none opacity-50`}>
        {pageNumber}
      </div>
    </div>
  )
})

Page.displayName = 'Page'


const VisualBookViewer = ({ spreads = [], title = "Memories Eternal", frontCover = null, backCover = null, scale = 'normal' }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const flipBookRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const autoPlayRef = useRef(null)

  const scaleClasses = {
    normal: "scale-[0.35] min-[400px]:scale-[0.45] sm:scale-[0.6] md:scale-[0.75] lg:scale-[0.85] xl:scale-[1.0]",
    small: "scale-[0.15] min-[400px]:scale-[0.25] sm:scale-[0.35] md:scale-[0.5] lg:scale-[0.6] xl:scale-[0.7]"
  }

  // Mock data for initial view if none provided
  const [bookData, setBookData] = useState({
    title: title,
    frontCover: frontCover,
    backCover: backCover,
    spreads: spreads.length > 0 ? spreads : []
  })

  useEffect(() => {
    // Attempt to load from API if we have an ID
    if (id) {
      const fetchAlbum = async () => {
        try {
          const response = await getAlbumById(id)
          if (response.success && response.data) {
            const album = response.data
            setBookData({
              title: album.albumName || album.clientName || title,
              spreads: album.spreads || [],
              frontCover: album.frontCover || null,
              backCover: album.backCover || null,
              photographerName: album.photographerName || '',
              photographerPhone: album.photographerPhone || '',
              photographerCity: album.photographerCity || '',
              functionDate: album.functionDate || ''
            })
          }
        } catch (e) {
          console.error("Error loading album from API:", e)
        }
      }
      fetchAlbum()
    } else {
      // Update state if props change when NO id is in URL (preview mode)
      setBookData({
        title: title,
        spreads: spreads,
        frontCover: frontCover,
        backCover: backCover
      })
    }
  }, [id, title, spreads, frontCover, backCover])

  const onFlip = useCallback((e) => {
    setCurrentPage(e.data)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        if (flipBookRef.current) {
          flipBookRef.current.getPageFlip().flipNext()
        }
      }, 3000)
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isPlaying])

  // Generate all pages
  const renderPages = () => {
    const pages = []

    // Front Cover
    pages.push(
      <Page key="front-cover" isCover={true} isLeft={false} image={bookData.frontCover}>
        {!bookData.frontCover && (
          <div className="text-center p-12">
            <h1 className="text-4xl font-serif text-[#d4af37] mb-4 tracking-tight">{bookData.title}</h1>
            <div className="w-24 h-px bg-[#d4af37]/30 mx-auto my-6"></div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37]/60">Fine Art Panoramic Volume</p>
          </div>
        )}
      </Page>
    )

    // Inner Pages
    bookData.spreads.forEach((spread, idx) => {
      const pageNumStart = idx * 2 + 1
      pages.push(
        <Page key={`left-${idx}`} spread={spread} isLeft={true} pageNumber={pageNumStart} />
      )
      pages.push(
        <Page key={`right-${idx}`} spread={spread} isLeft={false} pageNumber={pageNumStart + 1} />
      )
    })

    // Back Cover
    pages.push(
      <Page key="back-cover" isCover={true} isLeft={true} image={bookData.backCover}>
        {!bookData.backCover && (
          <div className="opacity-20 text-[8px] tracking-[0.5em] scale-75 uppercase">Pixfolio Legacy Edition</div>
        )}
      </Page>
    )

    return pages
  }

  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center relative overflow-hidden font-sans">

      {/* Background Polish */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none"></div>

      {/* Header Section */}
      <div className="fixed top-0 left-0 w-full p-4 flex justify-between items-start z-[100] pointer-events-none">
        {/* Left: Logo (Placeholder for FA logo) */}
        <div className="pointer-events-auto">
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate(-1)}>
            <div className="text-3xl font-black italic bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-green-500 pr-2 pb-1" style={{ transform: 'skewX(-15deg)' }}>FA</div>
          </div>
        </div>

        {/* Center: Photographer Info */}
        <div className="pointer-events-auto mt-2 hidden md:flex items-center gap-4 px-6 py-2 rounded-md bg-[#111111]/80 border border-white/5 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2 text-gray-300">
            <User size={14} className="text-blue-500" />
            <span className="text-xs uppercase tracking-wider font-medium">{bookData.photographerName || 'PHOTOGRAPHER'}</span>
          </div>
          <div className="w-px h-4 bg-white/10"></div>
          <div className="flex items-center gap-2 text-gray-300">
            <Phone size={14} className="text-green-500" />
            <span className="text-xs">{bookData.photographerPhone || ''}</span>
          </div>
          <div className="w-px h-4 bg-white/10"></div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin size={14} className="text-yellow-500" />
            <span className="text-xs uppercase tracking-wider">{bookData.photographerCity || ''}</span>
          </div>
        </div>

        {/* Right: Album Info */}
        <div className="pointer-events-auto mt-2 text-right bg-[#111111]/80 px-4 py-2 rounded-md border border-white/5 backdrop-blur-md">
          <h2 className="text-white text-xs font-semibold tracking-wider uppercase mb-1">{bookData.title}</h2>
          <div className="text-yellow-500 text-[10px] tracking-wide">{bookData.functionDate || ''}</div>
        </div>
      </div>

      {/* Floating Social Sidebar (Right) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[100] pointer-events-auto">
        <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer">
          <Facebook size={18} fill="currentColor" className="border-none" />
        </button>
        <button className="w-10 h-10 rounded-full bg-black border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer">
          <Twitter size={18} fill="currentColor" />
        </button>
        <button className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer">
          <Instagram size={18} />
        </button>
        <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer">
          <Linkedin size={18} fill="currentColor" />
        </button>
        <button className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer">
          <MessageCircle size={18} fill="currentColor" />
        </button>
        <button className="w-10 h-10 rounded-full bg-yellow-500 text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer mt-2">
          <Share2 size={18} />
        </button>
      </div>

      <div className={`relative book-perspective ${scaleClasses[scale] || scaleClasses.normal}`}>
        {/* The Fine Spine and Depth Effect */}
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-20 w-[1px] opacity-30"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.8))',
          }}
        ></div>

        {/* Panoramic Page Stacking (Right) */}
        <div className="absolute right-0 top-[2px] bottom-[2px] w-[15px] bg-white transform translate-x-[7px] translate-z-[-20px] skew-y-[0.5deg]"
          style={{ background: 'repeating-linear-gradient(to bottom, #ffffff, #ffffff 1px, #e5e5e5 1px, #e5e5e5 2px)', borderRight: '1px solid #d1d1d1' }}></div>

        {/* Panoramic Page Stacking (Left) */}
        <div className="absolute left-0 top-[2px] bottom-[2px] w-[15px] bg-white transform -translate-x-[7px] translate-z-[-20px] skew-y-[-0.5deg]"
          style={{ background: 'repeating-linear-gradient(to bottom, #ffffff, #ffffff 1px, #e5e5e5 1px, #e5e5e5 2px)', borderLeft: '1px solid #d1d1d1' }}></div>

        <HTMLFlipBook
          ref={flipBookRef}
          width={900}
          height={600}
          size="fixed"
          minWidth={450}
          maxWidth={1800}
          minHeight={300}
          maxHeight={1200}
          drawShadow={true}
          flippingTime={1200}
          usePortrait={false}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.4}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="canvas-shadow"
        >
          {renderPages()}
        </HTMLFlipBook>
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto">
        <button
          onClick={togglePlay}
          className="w-14 h-10 bg-yellow-500 hover:bg-yellow-600 text-black flex items-center justify-center transition-colors rounded shadow-lg"
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
        </button>
      </div>

      <div className="fixed bottom-6 right-6 z-[100] pointer-events-auto">
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-black flex items-center justify-center transition-colors rounded shadow-lg"
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      <style>{`
        .book-perspective {
          perspective: 3000px;
        }

        .canvas-shadow {
          box-shadow: 0 40px 100px rgba(0,0,0,0.9);
        }

        .book-cover {
          transition: transform 1s cubic-bezier(0.6, 0.05, 0.01, 0.9);
        }

        /* Subtle gutter shadow at the center fold */
        .page-left::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 80px;
          background: linear-gradient(to left, rgba(0,0,0,0.15), transparent);
          pointer-events: none;
          z-index: 10;
        }

        .page-right::after {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 80px;
          background: linear-gradient(to right, rgba(0,0,0,0.15), transparent);
          pointer-events: none;
          z-index: 10;
        }

        /* Fine Art paper feel */
        .page-content {
          cursor: crosshair;
        }
      `}</style>
    </div>
  )
}

export default VisualBookViewer
