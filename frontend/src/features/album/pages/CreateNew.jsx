import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ChevronRight, ChevronLeft, Wand2, Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { getAlbumById, createAlbum, updateAlbum } from '@/services/api'
import { toast } from 'sonner'

// Modular Components
import CreateSteps from '../components/CreateSteps'
import BasicInfoStep from '../components/BasicInfoStep'
import MusicSelectionStep from '../components/MusicSelectionStep'
import VisualsStep from '../components/VisualsStep'
import VisualBookViewer from '../components/VisualBookViewer'

const CreateNew = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isProcessingFiles, setIsProcessingFiles] = useState(false)
  const [errors, setErrors] = useState({})
  const blobUrlsRef = useRef([]) // Track blob URLs for cleanup (FE-01)

  const [formData, setFormData] = useState({
    clientName: '',
    functionType: '',
    functionDate: '',
    photographerId: '',
    musicTrack: 'romantic-wedding.mp3',
    volume: 60,
    frontCover: null,
    backCover: null,
    innerSheets: []
  })

  useEffect(() => {
    const fetchAlbum = async () => {
      if (editId) {
        try {
          const response = await getAlbumById(editId)
          if (response.success) {
            const album = response.data
            setFormData({
              clientName: album.clientName || '',
              functionType: album.functionType || '',
              functionDate: album.functionDate || '',
              photographerId: album.photographerId || '',
              musicTrack: album.musicTrack || 'romantic-wedding.mp3',
              volume: album.volume || 60,
              frontCover: album.frontCover || null,
              backCover: album.backCover || null,
              innerSheets: album.spreads ? album.spreads.flatMap(s => [s.leftPage?.image, s.rightPage?.image]).filter(Boolean) : []
            })
          }
        } catch (error) {
          console.error('Failed to fetch album:', error)
          alert('Failed to load album data.')
        }
      }
    }
    fetchAlbum()
  }, [editId])

  const functionTypes = [
    'wedding', 'pre-wedding', 'engagement', 'reception',
    'birthday', 'maternity', 'newborn', 'family',
    'corporate', 'other'
  ]

  const defaultMusicTracks = [
    { name: 'Romantic Wedding', file: 'romantic-wedding.mp3' },
    { name: 'Celebration Joy', file: 'celebration-joy.mp3' },
    { name: 'Classic Elegance', file: 'classic-elegance.mp3' },
    { name: 'Modern Love', file: 'modern-love.mp3' },
    { name: 'Ambient Soft', file: 'ambient-soft.mp3' }
  ]

  const steps = [
    { id: 1, title: 'Details', description: 'Event Information' },
    { id: 2, title: 'Music', description: 'Background Score' },
    { id: 3, title: 'Visuals', description: 'Photos & Covers' },
  ]

  const toTitleCase = (str) => {
    if (!str) return ''
    return str.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  // Cleanup blob URLs on unmount to prevent memory leaks (FE-01)
  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach(url => URL.revokeObjectURL(url))
      blobUrlsRef.current = []
    }
  }, [])

  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB (ALB-05)
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp']

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(`Invalid file type: ${file.name}. Only images allowed.`)
      return false
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File too large: ${file.name}. Maximum 10MB.`)
      return false
    }
    return true
  }

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0]
    if (!file) return;
    setIsProcessingFiles(true)
    await new Promise(r => setTimeout(r, 10)) // Allow UI to update
    if (validateFile(file)) {
      setFormData(prev => ({ ...prev, [field]: file }))
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
    }
    setIsProcessingFiles(false)
  }

  const handleMultipleFileUpload = async (e) => {
    const rawFiles = Array.from(e.target.files)
    if (rawFiles.length === 0) return;

    setIsProcessingFiles(true)
    await new Promise(r => setTimeout(r, 10)) // Allow UI to update

    const files = rawFiles.filter(validateFile)
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, innerSheets: [...prev.innerSheets, ...files] }))
      if (errors.innerSheets) setErrors(prev => ({ ...prev, innerSheets: '' }))
    }
    setIsProcessingFiles(false)
  }

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      innerSheets: prev.innerSheets.filter((_, i) => i !== index)
    }))
  }

  const toggleMusic = () => setIsPlaying(!isPlaying)

  const validateStep = () => {
    const newErrors = {}
    if (currentStep === 1) {
      if (!formData.clientName) newErrors.clientName = 'Client name is required'
      if (!formData.functionType) newErrors.functionType = 'Event type is required'
      if (!formData.functionDate) newErrors.functionDate = 'Event date is required'
    } else if (currentStep === 3) {
      if (!formData.frontCover) newErrors.frontCover = 'First page (front cover) is required'
      if (!formData.backCover) newErrors.backCover = 'Last page (back cover) is required'
      if (formData.innerSheets.length === 0) newErrors.innerSheets = 'At least one inner sheet is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const generateSpreads = () => {
    const spreads = []
    const innerPhotos = formData.innerSheets || []

    const photoUrls = innerPhotos.map(file => {
      if (file instanceof File) {
        const url = URL.createObjectURL(file)
        blobUrlsRef.current.push(url) // Track for cleanup
        return url
      }
      return file
    })

    // Create spreads (2 photos per spread)
    for (let i = 0; i < photoUrls.length; i += 2) {
      spreads.push({
        id: Math.floor(i / 2) + 1,
        leftPage: { image: photoUrls[i] || null, caption: "" },
        rightPage: { image: photoUrls[i + 1] || null, caption: "" }
      })
    }
    return spreads
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    setIsSubmitting(true)

    try {
      // Build FormData instead of JSON for file uploads
      const formDataToSend = new FormData()
      formDataToSend.append('clientName', formData.clientName || '')
      formDataToSend.append('functionDate', formData.functionDate || '')
      formDataToSend.append('functionType', formData.functionType || '')
      if (formData.photographerId) {
        formDataToSend.append('photographerId', formData.photographerId)
      }
      formDataToSend.append('songName', defaultMusicTracks.find(t => t.file === formData.musicTrack)?.name || 'Standard Track')
      formDataToSend.append('totalSheets', formData.innerSheets.length + 2)
      formDataToSend.append('status', 'Done')
      formDataToSend.append('priority', 'High')
      formDataToSend.append('label', 'Feature')

      // Append files directly
      if (formData.frontCover instanceof File) {
        formDataToSend.append('frontCover', formData.frontCover)
      }
      if (formData.backCover instanceof File) {
        formDataToSend.append('backCover', formData.backCover)
      }

      // Append inner sheets as multiple files
      formData.innerSheets.forEach(sheet => {
        if (sheet instanceof File) {
          formDataToSend.append('innerSheets', sheet)
        }
      })

      let response
      if (editId) {
        response = await updateAlbum(editId, formDataToSend)
      } else {
        response = await createAlbum(formDataToSend)
      }

      if (response.success) {
        setIsPreviewMode(true)
      } else {
        toast.error(response.message || 'Failed to save album')
      }
    } catch (error) {
      console.error('Save failed:', error)
      toast.error(error.message || 'An error occurred while saving.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isPreviewMode) {
    const frontUrl = formData.frontCover ? (formData.frontCover instanceof File ? URL.createObjectURL(formData.frontCover) : formData.frontCover) : null
    const backUrl = formData.backCover ? (formData.backCover instanceof File ? URL.createObjectURL(formData.backCover) : formData.backCover) : null

    return (
      <div className="fixed inset-0 z-[100] bg-background">
        <VisualBookViewer
          spreads={generateSpreads()}
          title={formData.clientName}
          frontCover={frontUrl}
          backCover={backUrl}
        />
        <div className="fixed bottom-8 right-8 z-[110] flex gap-4">
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(false)}
          >
            Back to Edit
          </Button>
          <Button
            onClick={() => navigate('/all-pixfolio')}
          >
            Go to All Pixfolios
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-8 max-w-4xl mx-auto py-8 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">{editId ? 'Edit Pixfolio' : 'Create New Pixfolio'}</h1>
        <p className="text-muted-foreground">
          {editId ? 'Update your digital album details.' : 'Build a digital album for your client.'}
        </p>
      </div>

      <div className="w-full">
        <CreateSteps steps={steps} currentStep={currentStep} />

        <div className="mt-8 relative">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <BasicInfoStep
                key="step1"
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                functionTypes={functionTypes}
                toTitleCase={toTitleCase}
              />
            )}

            {currentStep === 2 && (
              <MusicSelectionStep
                key="step2"
                formData={formData}
                setFormData={setFormData}
                isPlaying={isPlaying}
                toggleMusic={toggleMusic}
                defaultMusicTracks={defaultMusicTracks}
              />
            )}

            {currentStep === 3 && (
              <VisualsStep
                key="step3"
                formData={formData}
                handleFileUpload={handleFileUpload}
                handleMultipleFileUpload={handleMultipleFileUpload}
                removeFile={removeFile}
                errors={errors}
                isProcessingFiles={isProcessingFiles}
              />
            )}
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isSubmitting}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Wand2 className="mr-2 h-4 w-4 animate-spin" /> {editId ? 'Updating...' : 'Creating...'}
                  </span>
                ) : (
                  <span className="flex items-center">
                    {editId ? 'Update Pixfolio' : 'Create Pixfolio'}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Uploading Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <div className="bg-card border shadow-xl rounded-2xl p-8 flex flex-col items-center max-w-sm text-center">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
              <h3 className="text-xl font-semibold mb-2">Uploading Photos...</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Please wait while we upload your high-resolution images to the secure server. This may take a few moments depending on your network speed.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CreateNew
