import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Input } from '@/components/ui/input'
import {
  Home,
  ArrowLeft,
  Camera,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Mail,
  X,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react'

const NotFound = ({
  logo = "/api/placeholder/120/40",
  heroImage = "/api/placeholder/800/600",
  suggestedLinks = [
    { name: "Global Hub", path: "/" },
    { name: "Visual Showcase", path: "/demo" },
    { name: "Artistic Tiers", path: "/pricing" },
    { name: "Join Sanctuary", path: "/signup" }
  ],
  thumbnails = [
    { id: 1, src: "/api/placeholder/400/400", alt: "Wedding Photography", title: "Eternal Union" },
    { id: 2, src: "/api/placeholder/400/400", alt: "Portrait Session", title: "Soul Mirror" },
    { id: 3, src: "/api/placeholder/400/400", alt: "Nature Landscape", title: "Celestial Hour" },
    { id: 4, src: "/api/placeholder/400/400", alt: "Event Photography", title: "Legacy Gala" },
    { id: 5, src: "/api/placeholder/400/400", alt: "Family Session", title: "Kinship Portrait" },
    { id: 6, src: "/api/placeholder/400/400", alt: "Fashion Shoot", title: "Editorial Muse" }
  ]
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -100])

  const filteredThumbnails = thumbnails.filter(thumb =>
    thumb.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thumb.alt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openLightbox = (index) => {
    setCurrentImage(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredThumbnails.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + filteredThumbnails.length) % filteredThumbnails.length)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return

      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, filteredThumbnails.length])

  return (
    <div className="bg-white dark:bg-zinc-950 font-sans transition-colors duration-700 overflow-x-hidden">
      <main className="relative pt-32">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ y }}
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
          >
            <h1 className="text-[20vw] font-black uppercase tracking-tighter select-none">
              Lost
            </h1>
          </motion.div>

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <Badge className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black hover:bg-zinc-900 px-6 py-1 text-[11px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl mb-12">
                Discovery Mode
              </Badge>
              <h2 className="text-6xl md:text-8xl font-bold text-zinc-900 dark:text-zinc-50 leading-[0.9] tracking-tighter mb-8">
                The path has <br /><span className="text-zinc-300 dark:text-zinc-700 italic">vanished.</span>
              </h2>
              <p className="text-xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed">
                The coordinates you seek are currently outside our charted visual territory. Let us return you to the sanctuary.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-8 justify-center mt-16"
            >
              <Link
                to="/"
                className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black px-12 h-16 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-2xl flex items-center justify-center group"
              >
                <Home className="mr-3 h-4 w-4" /> Return to Base
              </Link>
              <Link
                to="/all-pixfolio"
                className="border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 px-12 h-16 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex items-center justify-center"
              >
                Browse Archives
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-32 px-6 lg:px-20 bg-zinc-50/50 dark:bg-zinc-900/50 border-y border-zinc-100 dark:border-zinc-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10"
            >
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  Visual Contingency
                </h3>
                <p className="text-zinc-500 font-medium max-w-xl">
                  While we bridge the gap to your destination, explore high-performance narratives from our global repository.
                </p>
              </div>

              <div className="relative w-full max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-50 transition-colors" />
                <Input
                  type="text"
                  placeholder="Recovery search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-2xl focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-50 transition-all font-medium"
                />
              </div>
            </motion.div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredThumbnails.map((thumbnail, index) => (
                <motion.div
                  key={thumbnail.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer relative"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative aspect-[4/5] bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 ease-[0.16, 1, 0.3, 1]">
                    <img
                      src={thumbnail.src}
                      alt={thumbnail.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Resource Classification</p>
                      <h4 className="text-xl font-bold text-white tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-[50ms]">{thumbnail.title}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Suggested Links */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400"
            >
              Tactical Navigation
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6"
            >
              {suggestedLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-10 py-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:border-zinc-900 dark:hover:border-zinc-50 transition-all shadow-sm active:scale-95"
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 dark:bg-zinc-950/98 backdrop-blur-2xl"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-20" onClick={(e) => e.stopPropagation()}>
            <Button
              onClick={closeLightbox}
              variant="ghost"
              className="absolute top-10 right-10 h-14 w-14 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
            >
              <X className="h-6 w-6" />
            </Button>

            <button
              onClick={prevImage}
              className="absolute left-6 md:left-20 top-1/2 -translate-y-1/2 h-16 w-16 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-all"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 md:right-20 top-1/2 -translate-y-1/2 h-16 w-16 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-all"
            >
              <ChevronRight className="h-10 w-10" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-full max-h-full aspect-[4/5] md:aspect-auto"
            >
              <img
                src={filteredThumbnails[currentImage]?.src}
                alt={filteredThumbnails[currentImage]?.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-3xl shadow-2xl"
              />
              <div className="mt-8 text-center space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Archived Work</p>
                <h4 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {filteredThumbnails[currentImage]?.title}
                </h4>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default NotFound
