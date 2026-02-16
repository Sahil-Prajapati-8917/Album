import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight, ChevronLeft, Sparkles, Wand2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

// Modular Components
import CreateSteps from '../components/CreateSteps'
import BasicInfoStep from '../components/BasicInfoStep'
import MusicSelectionStep from '../components/MusicSelectionStep'
import VisualsStep from '../components/VisualsStep'
import VisualBookViewer from '../components/VisualBookViewer'

const CreateNew = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    clientName: '',
    functionType: '',
    functionDate: '',
    musicTrack: 'romantic-wedding.mp3',
    volume: 60,
    frontCover: null,
    backCover: null,
    innerSheets: []
  })

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
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }))
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleMultipleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({ ...prev, innerSheets: [...prev.innerSheets, ...files] }))
    if (errors.innerSheets) setErrors(prev => ({ ...prev, innerSheets: '' }))
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
    const allPhotos = [
      formData.frontCover,
      ...formData.innerSheets,
      formData.backCover
    ].filter(Boolean)

    // Convert File objects to URLs for the viewer
    const photoUrls = allPhotos.map(file => {
      if (file instanceof File) {
        return URL.createObjectURL(file)
      }
      return file
    })

    // Create spreads (2 photos per spread)
    for (let i = 0; i < photoUrls.length; i += 2) {
      spreads.push({
        id: Math.floor(i / 2) + 1,
        leftPage: { image: photoUrls[i], caption: "" },
        rightPage: { image: photoUrls[i + 1] || photoUrls[i], caption: "" }
      })
    }
    return spreads
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      const albumId = Date.now()
      const newAlbum = {
        id: `ALBUM-${albumId.toString().slice(-4)}`,
        albumName: formData.clientName,
        clientName: formData.clientName,
        functionDate: formData.functionDate,
        functionType: formData.functionType,
        songName: defaultMusicTracks.find(t => t.file === formData.musicTrack)?.name || 'Standard',
        totalSheets: formData.innerSheets.length + 2,
        status: 'Done',
        priority: 'High',
        label: 'Feature',
        views: '0',
        spreads: generateSpreads()
      }

      const existingAlbums = JSON.parse(localStorage.getItem('albums') || '[]')
      localStorage.setItem('albums', JSON.stringify([...existingAlbums, newAlbum]))

      setIsSubmitting(false)
      setIsPreviewMode(true)
    }, 2000)
  }

  if (isPreviewMode) {
    return (
      <div className="fixed inset-0 z-[100] bg-background">
        <VisualBookViewer
          spreads={generateSpreads()}
          title={formData.clientName}
        />
        <div className="fixed bottom-8 right-8 z-[110] flex gap-4">
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(false)}
            className="border-gold/30 text-gold hover:bg-gold/5"
          >
            Back to Edit
          </Button>
          <Button
            onClick={() => navigate('/all-pixfolio')}
            className="bg-gold hover:bg-gold/90 text-white shadow-xl"
          >
            Go to All Pixfolios
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center p-2 bg-gold/5 rounded-full mb-4"
        >
          <Sparkles className="h-5 w-5 text-gold mr-2" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Premium Creation Suite</span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-serif text-foreground mb-4 italic">Create Your Pixfolio</h1>
        <p className="text-muted-foreground font-light max-w-2xl mx-auto">
          Transform your captured moments into a cinematic digital experience. Follow our refined process to build a masterpiece.
        </p>
      </div>

      <CreateSteps steps={steps} currentStep={currentStep} />

      <div className="mt-12 bg-background relative">
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
            />
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between border-t border-gold/10 pt-8">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className="text-muted-foreground hover:text-gold transition-colors"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous Phase
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={nextStep}
              className="bg-gold hover:bg-gold/90 text-white px-8 py-6 rounded-full shadow-lg shadow-gold/20 group"
            >
              Continue to {steps[currentStep].title}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-foreground hover:bg-foreground/90 text-background px-10 py-6 rounded-full shadow-xl group"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Wand2 className="mr-2 h-5 w-5 animate-pulse" /> Creating...
                </span>
              ) : (
                <span className="flex items-center">
                  Create Pixfolio <Sparkles className="ml-2 h-4 w-4 text-gold" />
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateNew
