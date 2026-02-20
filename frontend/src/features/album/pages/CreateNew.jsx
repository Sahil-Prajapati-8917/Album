import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ChevronRight, ChevronLeft, Wand2, Plus
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
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [errors, setErrors] = useState({})

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
    if (editId) {
      const albums = JSON.parse(localStorage.getItem('albums') || '[]')
      const album = albums.find(a => a.id === editId)
      if (album) {
        setFormData({
          clientName: album.clientName || '',
          functionType: album.functionType || '',
          functionDate: album.functionDate || '',
          photographerId: album.photographerId || '',
          musicTrack: album.musicTrack || 'romantic-wedding.mp3',
          volume: album.volume || 60,
          frontCover: album.frontCover || null,
          backCover: album.backCover || null,
          innerSheets: album.innerSheets || []
        })
      }
    }
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
    const innerPhotos = formData.innerSheets || []

    const photoUrls = innerPhotos.map(file => {
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

    // Prepare cover URLs for persistent storage/viewer
    const frontUrl = formData.frontCover ? (formData.frontCover instanceof File ? URL.createObjectURL(formData.frontCover) : formData.frontCover) : null
    const backUrl = formData.backCover ? (formData.backCover instanceof File ? URL.createObjectURL(formData.backCover) : formData.backCover) : null

    setTimeout(() => {
      const albums = JSON.parse(localStorage.getItem('albums') || '[]')

      if (editId) {
        // Update existing album
        const updatedAlbums = albums.map(a => {
          if (a.id === editId) {
            return {
              ...a,
              albumName: formData.clientName,
              clientName: formData.clientName,
              functionDate: formData.functionDate,
              functionType: formData.functionType,
              photographerId: formData.photographerId,
              songName: defaultMusicTracks.find(t => t.file === formData.musicTrack)?.name || 'Standard',
              totalSheets: formData.innerSheets.length + 2,
              frontCover: frontUrl,
              backCover: backUrl,
              spreads: generateSpreads()
            }
          }
          return a
        })
        localStorage.setItem('albums', JSON.stringify(updatedAlbums))
      } else {
        // Create new album
        const albumId = Date.now()
        const newAlbum = {
          id: `ALBUM-${albumId.toString().slice(-4)}`,
          albumName: formData.clientName,
          clientName: formData.clientName,
          functionDate: formData.functionDate,
          functionType: formData.functionType,
          photographerId: formData.photographerId,
          songName: defaultMusicTracks.find(t => t.file === formData.musicTrack)?.name || 'Standard',
          totalSheets: formData.innerSheets.length + 2,
          status: 'Done',
          priority: 'High',
          label: 'Feature',
          views: '0',
          frontCover: frontUrl,
          backCover: backUrl,
          spreads: generateSpreads()
        }
        localStorage.setItem('albums', JSON.stringify([...albums, newAlbum]))
      }

      setIsSubmitting(false)
      setIsPreviewMode(true)
    }, 1500)
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
    </div>
  )
}

export default CreateNew
