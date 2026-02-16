// VisualBookViewer.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import HTMLFlipBook from 'react-pageflip'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowLeft, Maximize2, Minimize2 } from 'lucide-react'

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

// Premium Full-Screen Cinematic Background
const CinematicBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8f9fa]">
    {/* Cinematic Gradient Waves - Breathing Depth */}
    <div className="absolute inset-0">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 45, 0],
          x: ['-5%', '5%', '-5%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.07)_0%,transparent_50%)] blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [0, -45, 0],
          x: ['5%', '-5%', '5%'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_70%_70%,rgba(245,158,11,0.05)_0%,transparent_50%)] blur-[120px]"
      />
    </div>

    {/* Elegant Floating Light Particles - Full Screen Depth */}
    <svg className="absolute inset-0 w-full h-full opacity-40">
      {[...Array(24)].map((_, i) => (
        <motion.circle
          key={i}
          cx={`${(i * 137.5) % 100}%`}
          cy={`${(i * 123.4) % 100}%`}
          r={Math.random() * 1.5 + 0.5}
          fill="#64748b"
          initial={{ opacity: 0.05 }}
          animate={{
            y: [0, -60, 0],
            x: [0, 20, 0],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{
            duration: 20 + (i % 8) * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>

    {/* Artistic Vignette and Polish */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.015)_100%)] pointer-events-none"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/60 pointer-events-none"></div>
  </div>
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
          <img src={image} className="absolute inset-0 w-full h-full object-cover" alt="Cover" />
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

const VisualBookViewer = ({ spreads = [], title = "Memories Eternal", frontCover = null, backCover = null }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const flipBookRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  // Mock data for initial view if none provided
  const [bookData, setBookData] = useState({
    title: title,
    frontCover: frontCover,
    backCover: backCover,
    spreads: spreads.length > 0 ? spreads : []
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
            backCover: album.backCover || null
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
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center relative overflow-hidden font-sans">
      <CinematicBackground />

      {/* Soft Studio Lighting - Light Theme */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-100/20 blur-[200px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-amber-100/10 blur-[200px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white pointer-events-none opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)] pointer-events-none"></div>

      {/* Floating Premium Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 sm:top-12 sm:left-12 group flex items-center gap-3 px-6 py-2.5 rounded-full border border-slate-200/50 bg-white/40 backdrop-blur-md hover:bg-white hover:border-slate-300 transition-all duration-700 shadow-sm z-[100]"
      >
        <ArrowLeft size={16} className="text-slate-500 transition-transform group-hover:-translate-x-1" />
        <span className="text-[11px] tracking-[0.25em] uppercase text-slate-500 font-medium font-serif">Back</span>
      </button>

      {/* Floating Fullscreen Control */}
      <button
        onClick={toggleFullscreen}
        className="fixed top-8 right-8 sm:top-12 sm:right-12 p-3 rounded-full border border-slate-200/50 bg-white/40 backdrop-blur-md hover:bg-white hover:border-slate-300 text-slate-400 hover:text-slate-900 transition-all duration-500 shadow-sm z-[100]"
      >
        {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
      </button>

      {/* Album Title - Floating minimal */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 sm:static sm:absolute sm:top-12 sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center gap-1 z-50 pointer-events-none">
        <h2 className="text-slate-400/60 font-serif font-light text-[9px] tracking-[0.5em] uppercase">{bookData.title}</h2>
      </div>

      <div className="relative book-perspective scale-[0.2] min-[400px]:scale-[0.25] sm:scale-[0.4] md:scale-[0.5] lg:scale-[0.65]">
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

      {/* Elegant Infinite Navigation */}
      <div className="absolute bottom-8 sm:bottom-12 flex items-center gap-8 sm:gap-16 z-50">
        <button
          onClick={() => flipBookRef.current.getPageFlip().flipPrev()}
          className="text-slate-300 hover:text-slate-900 transition-all duration-500"
        >
          <ChevronLeft className="size-6 sm:size-8" strokeWidth={1} />
        </button>

        <div className="text-slate-300 font-serif text-[9px] tracking-[0.8em] uppercase select-none">
          Spread {Math.floor(currentPage / 2) + 1}
        </div>

        <button
          onClick={() => flipBookRef.current.getPageFlip().flipNext()}
          className="text-slate-300 hover:text-slate-900 transition-all duration-500"
        >
          <ChevronRight className="size-6 sm:size-8" strokeWidth={1} />
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
