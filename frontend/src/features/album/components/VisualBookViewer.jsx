// VisualBookViewer.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import HTMLFlipBook from 'react-pageflip'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Minimize2, Play, Pause, User, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, MessageCircle, Share2, Music } from 'lucide-react'
import ShareModal from './ShareModal'

// Static Shutter Image for Cover Replica
const SHUTTER_COVER_URL = 'https://picsum.photos/seed/shutter/800/600' // Use random placeholder styled as shutter as fallback since original might be blocked by CORS

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

  const [imgError, setImgError] = useState(false)

  if (isCover) {
    return (
      <div
        ref={ref}
        className={`book-cover ${isLeft ? 'cover-left' : 'cover-right'} flex items-center justify-center relative overflow-hidden`}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1c1917', // Dark stone base
        }}
      >
        {image && !imgError ? (
          <img
            src={image}
            className="absolute inset-0 w-full h-full object-cover shadow-[0_0_15px_rgba(0,0,0,0.8)]"
            alt="Cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="relative z-10 w-full h-full flex items-center justify-center">{children}</div>
        )}
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
            // Premium "printed" look: full-bleed horizontal photos fill the canvas,
            // vertical photos are centered with intentional white sides.
            backgroundColor: 'white'
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
  const audioRef = useRef(null)

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

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
    spreads: spreads.length > 0 ? spreads : [],
    musicTrack: '/audio/romantic-wedding.mp3' // Default mock audio path
  })

  useEffect(() => {
    // Attempt to load from localStorage if we have an ID
    if (id) {
      try {
        const albums = JSON.parse(localStorage.getItem('albums') || '[]')
        const album = albums.find(a => a.id === id)
        if (album) {
          setBookData({
            title: album.albumName || title,
            spreads: album.spreads || [],
            frontCover: album.frontCover || null,
            backCover: album.backCover || null,
            musicTrack: album.musicTrack ? `/audio/${album.musicTrack}` : '/audio/romantic-wedding.mp3'
          })
        }
      } catch (e) {
        console.error("Error loading album:", e)
      }
    } else {
      // Update state if props change when NO id is in URL (preview mode)
      setBookData({
        title: title,
        spreads: spreads,
        frontCover: frontCover,
        backCover: backCover,
        musicTrack: '/audio/romantic-wedding.mp3'
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

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e))
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
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

    // PERFECT REPLICA: Front Cover is the shutter
    // If user provided a frontCover, use it, otherwise fallback to the exact shutter image style Flipix uses.
    const actualCover = bookData.frontCover || SHUTTER_COVER_URL

    pages.push(
      <Page key="front-cover" isCover={true} isLeft={false} image={actualCover}>
        {/* Fallback if no image loads */}
        <div className="w-full h-full bg-stone-900 border border-stone-800 flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera opacity-20"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
        </div>
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
          <div className="w-full h-full bg-stone-900 flex items-center justify-center opacity-30 text-[10px] tracking-[0.5em] uppercase">Pixfolio</div>
        )}
      </Page>
    )

    return pages
  }

  // Pre-generate the URL for sharing based on the current environment
  const shareUrl = id ? `${window.location.origin}/viewer/${id}` : window.location.href

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans"
      style={{
        backgroundColor: '#0c0a09', // Perfect Stone-950 base
        boxShadow: 'inset 0 0 120px rgba(0, 50, 255, 0.15)' // Subtle blue ambient glow from the reference
      }}
    >

      {/* Background Music Audio Element */}
      <audio
        ref={audioRef}
        src={bookData.musicTrack}
        loop
        preload="auto"
      />

      {/* Background Polish */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none"></div>

      {/* Header Section Replica */}
      <div className="fixed top-0 left-0 w-full p-4 flex justify-between items-start z-[100] pointer-events-none">
        {/* Left: Logo (Exact visual placement) */}
        <div className="pointer-events-auto">
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate(-1)}>
            <div className="text-[40px] leading-tight font-black italic bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-green-500 pr-2" style={{ transform: 'skewX(-15deg)' }}>FA</div>
          </div>
        </div>

        {/* Center: Photographer Info Replica */}
        <div className="pointer-events-auto mt-2 hidden md:flex items-center rounded bg-[#0c0a09]/60 border border-[#292524] backdrop-blur-sm shadow-xl px-4 py-2">
          <div className="flex flex-col gap-1 pr-4">
            <div className="flex items-center gap-2">
              <User size={13} className="text-blue-500 stroke-[2.5]" />
              <span className="text-[13px] text-white">Storiograph Company</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-green-500 stroke-[2.5]" />
              <span className="text-[13px] text-white">+91 0000000000</span>
            </div>
          </div>

          <div className="w-px h-10 bg-[#292524] mx-2"></div>

          <div className="flex items-center gap-2 pl-2">
            <MapPin size={16} className="text-yellow-500 stroke-[2.5]" />
            <span className="text-[14px] text-white">Bengaluru</span>
          </div>
        </div>

        {/* Right: Album Info Replica */}
        <div className="pointer-events-auto mt-2 rounded bg-[#0c0a09]/60 border border-[#292524] backdrop-blur-sm shadow-xl px-6 py-2 text-center flex flex-col items-center justify-center min-w-[140px]">
          <span className="text-white text-[14px] tracking-wide mb-0.5">{bookData.title}</span>
          <span className="text-[#facc15] text-[11px] tracking-wide">Monday-02-Feb-2026</span>
        </div>
      </div>

      {/* Floating Social Sidebar Replica (Right) */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[100] pointer-events-auto">
        <button
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
          className="w-9 h-9 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer"
        >
          <Facebook size={16} fill="currentColor" strokeWidth={0} />
        </button>
        <button
          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Check out this photo album: ' + bookData.title)}`, '_blank')}
          className="w-9 h-9 rounded-full bg-black border border-white/10 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[14px] h-[14px] fill-current text-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
        </button>
        <button
          onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this photo album: ' + bookData.title + ' ' + shareUrl)}`, '_blank')}
          className="w-9 h-9 rounded-full bg-[#25d366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
        </button>
        <button
          className="w-9 h-9 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer"
        >
          <Linkedin size={14} fill="currentColor" strokeWidth={0} />
        </button>
        <button
          className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg cursor-pointer"
        >
          <Instagram size={16} />
        </button>
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="w-10 h-10 rounded-full bg-[#facc15] text-stone-900 flex items-center justify-center hover:scale-110 transition-all shadow-lg cursor-pointer mt-1 group"
        >
          <Share2 size={18} className="group-hover:hidden" />
          <span className="hidden group-hover:block font-bold text-[10px] tracking-wide">SHARE</span>
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
          maxShadowOpacity={0.6}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="canvas-shadow"
        >
          {renderPages()}
        </HTMLFlipBook>
      </div>

      {/* Bottom Controls Center Base */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto flex items-center justify-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-8 rounded bg-[#facc15] hover:bg-[#eab308] text-stone-900 flex items-center justify-center transition-colors shadow-lg"
          title={isPlaying ? "Pause Flip Animation" : "Play Flip Animation"}
        >
          {isPlaying ? <Pause size={16} fill="currentColor" strokeWidth={0} /> : <Play size={16} fill="currentColor" strokeWidth={0} className="ml-1" />}
        </button>

        {/* Music Button */}
        <button
          onClick={toggleMusic}
          className={`w-12 h-8 rounded flex items-center justify-center transition-colors shadow-lg ${isMusicPlaying ? 'bg-pink-600 text-white' : 'bg-transparent border border-[#292524] hover:bg-[#292524] text-zinc-400'}`}
          title={isMusicPlaying ? "Pause Music" : "Play Music"}
        >
          {isMusicPlaying ? (
            <div className="flex gap-[2px] items-center h-3">
              <span className="w-1 h-3 bg-white animate-pulse"></span>
              <span className="w-1 h-4 bg-white animate-pulse delay-75"></span>
              <span className="w-1 h-2 bg-white animate-pulse delay-150"></span>
            </div>
          ) : (
            <Music size={14} />
          )}
        </button>
      </div>

      {/* Bottom Right Fullscreen */}
      <div className="fixed bottom-5 right-5 z-[100] pointer-events-auto">
        <button
          onClick={toggleFullscreen}
          className="w-10 h-8 rounded bg-[#facc15] hover:bg-[#eab308] text-stone-900 flex items-center justify-center transition-colors shadow-lg"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Share Modal Integration */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={shareUrl}
        title={bookData.title}
      />

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
