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
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" }
  ],
  thumbnails = [
    { id: 1, src: "/api/placeholder/300/300", alt: "Wedding Photography", title: "Elegant Wedding" },
    { id: 2, src: "/api/placeholder/300/300", alt: "Portrait Session", title: "Studio Portrait" },
    { id: 3, src: "/api/placeholder/300/300", alt: "Nature Landscape", title: "Golden Hour" },
    { id: 4, src: "/api/placeholder/300/300", alt: "Event Photography", title: "Corporate Event" },
    { id: 5, src: "/api/placeholder/300/300", alt: "Family Session", title: "Family Portrait" },
    { id: 6, src: "/api/placeholder/300/300", alt: "Fashion Shoot", title: "Fashion Editorial" }
  ]
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])

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
    <div className="bg-pearl dark:bg-ebony font-display transition-colors duration-300">
      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[70vh] flex items-center">
          <motion.div
            style={{ y }}
            className="relative w-full flex items-center justify-center py-20"
          >
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[10rem] md:text-[15rem] font-serif font-bold text-gold/10 leading-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none select-none"
              >
                404
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-12 relative z-10"
              >
                <h2 className="text-4xl md:text-5xl font-serif text-[#181611] dark:text-white mb-6">
                  Page Not <span className="italic">Found</span>
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                  The page you're searching for has vanished into the shadows.
                  Let's guide you back to the light of our gallery.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center relative z-10"
              >
                <Link
                  to="/"
                  className="bg-gold text-white px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold/90 transition-all shadow-lg"
                >
                  Return Home
                </Link>
                <Link
                  to="/demo"
                  className="border border-gold/30 text-gold px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all"
                >
                  Explore Demo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Featured Image */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Photography showcase"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-serif font-light text-gray-900 mb-4">
                Explore Our Work
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                While you're here, take a moment to browse our curated collection of memorable captures.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-md mx-auto mb-12"
            >
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search gallery..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3"
                />
              </div>
            </motion.div>

            {/* Gallery Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredThumbnails.map((thumbnail, index) => (
                <motion.div
                  key={thumbnail.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={thumbnail.src}
                      alt={thumbnail.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h4 className="text-white font-medium text-sm">{thumbnail.title}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Suggested Links */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl font-serif font-light text-gray-900 mb-8"
            >
              You Might Also Like
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              {suggestedLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/*
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Camera className="h-6 w-6" />
              <span className="font-serif text-lg">Photography Studio</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>

              <a
                href="mailto:hello@photostudio.com"
                className="text-gray-400 hover:text-white transition-colors flex items-center"
              >
                <Mail className="h-4 w-4 mr-2" />
                hello@photostudio.com
              </a>
            </div>
          </div>
        </div>
      </footer>
      */}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <img
              src={filteredThumbnails[currentImage]?.src}
              alt={filteredThumbnails[currentImage]?.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <h4 id="lightbox-title" className="text-lg font-medium bg-black/50 rounded px-3 py-1 inline-block">
                {filteredThumbnails[currentImage]?.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotFound
