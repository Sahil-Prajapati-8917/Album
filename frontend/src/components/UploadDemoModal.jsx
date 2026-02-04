import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { X, Upload, Camera, Image, Play, Eye } from 'lucide-react'

const UploadDemoModal = ({ isOpen, onClose }) => {
  const [uploadedImages, setUploadedImages] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [previewFlipbook, setPreviewFlipbook] = useState(null)
  const [currentPreviewPage, setCurrentPreviewPage] = useState(0)
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)

    // Convert files to preview URLs
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }))

    setUploadedImages(prev => [...prev, ...newImages])
  }

  const removeImage = (id) => {
    setUploadedImages(prev => {
      const updated = prev.filter(img => img.id !== id)
      // Clean up object URLs
      const removed = prev.find(img => img.id === id)
      if (removed) URL.revokeObjectURL(removed.url)
      return updated
    })
  }

  const createDemoFlipbook = () => {
    if (uploadedImages.length === 0) return

    setIsCreating(true)

    // Simulate processing time
    setTimeout(() => {
      setPreviewFlipbook({
        title: "My Demo Visual Book",
        pages: uploadedImages.map((img, index) => ({
          id: index + 1,
          image: img.url,
          caption: `Page ${index + 1}`
        }))
      })
      setIsCreating(false)
    }, 2000)
  }

  const resetModal = () => {
    // Clean up object URLs
    uploadedImages.forEach(img => URL.revokeObjectURL(img.url))
    setUploadedImages([])
    setPreviewFlipbook(null)
    setCurrentPreviewPage(0)
    setIsCreating(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Create Demo Visual Book
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Upload your photos to see how they look in a Visual Book
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {!previewFlipbook ? (
                <>
                  {/* Upload Section */}
                  <div className="mb-6">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                      <Camera className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Upload Your Photos
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Choose images from your device to create a demo Visual Book
                      </p>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Choose Files
                      </label>
                    </div>
                  </div>

                  {/* Uploaded Images Preview */}
                  {uploadedImages.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Selected Images ({uploadedImages.length})
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="relative group">
                            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              onClick={() => removeImage(image.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                              {image.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Create Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={createDemoFlipbook}
                      disabled={uploadedImages.length === 0 || isCreating}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      {isCreating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Creating Visual Book...
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5" />
                          Create Demo Visual Book
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Visual Book Preview */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {previewFlipbook.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Preview your Visual Book - use the controls below to navigate
                    </p>
                  </div>

                  {/* Visual Book Viewer */}
                  <div className="mb-6">
                    <div className="max-w-2xl mx-auto">
                      <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg relative">
                        <img
                          src={previewFlipbook.pages[currentPreviewPage]?.image}
                          alt={previewFlipbook.pages[currentPreviewPage]?.caption}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/75 text-white px-3 py-1 rounded">
                          {previewFlipbook.pages[currentPreviewPage]?.caption}
                        </div>

                        {/* Navigation Controls */}
                        <button
                          onClick={() => setCurrentPreviewPage(prev => Math.max(0, prev - 1))}
                          disabled={currentPreviewPage === 0}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors disabled:opacity-50"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setCurrentPreviewPage(prev => Math.min(previewFlipbook.pages.length - 1, prev + 1))}
                          disabled={currentPreviewPage >= previewFlipbook.pages.length - 1}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors disabled:opacity-50"
                        >
                          ›
                        </button>
                      </div>

                      {/* Page Indicators */}
                      <div className="flex justify-center mt-4 space-x-2">
                        {previewFlipbook.pages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPreviewPage(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentPreviewPage ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
                        Page {currentPreviewPage + 1} of {previewFlipbook.pages.length}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setPreviewFlipbook(null)}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Upload Different Photos
                    </button>
                    <button
                      onClick={() => {
                        // In a real app, this would save the Visual Book
                        alert('Demo created successfully! Sign up to save your flipbooks.')
                        handleClose()
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save This Visual Book
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default UploadDemoModal
