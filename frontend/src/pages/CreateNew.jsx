import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Eye, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CreateSteps from '@/components/features/create/CreateSteps'
import BasicInfoStep from '@/components/features/create/BasicInfoStep'
import MusicSelectionStep from '@/components/features/create/MusicSelectionStep'
import VisualsStep from '@/components/features/create/VisualsStep'
import PreviewStep from '@/components/features/create/PreviewStep'

const CreateNew = () => {
  const navigate = useNavigate()

  const toTitleCase = (str) => {
    return str.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Client & Function' },
    { id: 2, title: 'Soundtrack', description: 'Background Music' },
    { id: 3, title: 'Visuals', description: 'Photos & Covers' }
  ]

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    clientName: '',
    functionType: '',
    functionDate: '',
    musicTrack: 'wedding-bells.mp3', // default
    volume: 50,
    frontCover: null,
    backCover: null,
    innerSheets: []
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [errors, setErrors] = useState({})

  const functionTypes = [
    'wedding', 'pre-wedding', 'engagement', 'reception', 'birthday (kids)', 'maternity shoot', 'newborn shoot', 'family portrait', 'corporate event', 'other'
  ]

  const defaultMusicTracks = [
    { name: 'Wedding Bells', file: 'wedding-bells.mp3' },
    { name: 'Celebration Theme', file: 'celebration.mp3' },
    { name: 'Romantic Melody', file: 'romantic.mp3' },
    { name: 'Party Beats', file: 'party-beats.mp3' },
    { name: 'Corporate Tune', file: 'corporate.mp3' }
  ]

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        [field]: file
      }))
    }
  }

  const handleMultipleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      innerSheets: [...prev.innerSheets, ...files]
    }))
  }

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      innerSheets: prev.innerSheets.filter((_, i) => i !== index)
    }))
  }

  const toggleMusic = () => {
    setIsPlaying(!isPlaying)
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required'
      if (!formData.functionType) newErrors.functionType = 'Function type is required'
      if (!formData.functionDate) newErrors.functionDate = 'Function date is required'
    } else if (step === 2) {
      // Music selection is optional, no validation needed
    } else if (step === 3) {
      if (!formData.frontCover) newErrors.frontCover = 'Front cover is required'
      if (!formData.backCover) newErrors.backCover = 'Back cover is required'
      if (formData.innerSheets.length === 0) newErrors.innerSheets = 'At least one inner sheet is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required'
    if (!formData.functionType) newErrors.functionType = 'Function type is required'
    if (!formData.functionDate) newErrors.functionDate = 'Function date is required'
    if (!formData.frontCover) newErrors.frontCover = 'Front cover is required'
    if (!formData.backCover) newErrors.backCover = 'Back cover is required'
    if (formData.innerSheets.length === 0) newErrors.innerSheets = 'At least one inner sheet is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const albumId = Date.now()

      // Create album data
      const newAlbum = {
        id: albumId,
        albumName: `${formData.clientName} - ${formData.functionType}`,
        totalSheets: formData.innerSheets.length + 2,
        clientName: formData.clientName,
        functionDate: formData.functionDate,
        functionType: formData.functionType,
        spreads: [],
        rating: 0,
        viewersCount: 0,
        qrCode: 'mock-qr-code',
        link: `mock-link-${albumId}`,
        status: 'draft',
        createdDate: new Date().toISOString().split('T')[0]
      }

      // Save to localStorage
      const existingAlbums = JSON.parse(localStorage.getItem('albums') || '[]')
      localStorage.setItem('albums', JSON.stringify([...existingAlbums, newAlbum]))

      setIsSubmitting(false)
      navigate(`/viewer/${albumId}`)
    }, 2000)
  }

  const handlePreview = () => {
    if (validateForm()) {
      setPreviewMode(true)
    }
  }

  if (previewMode) {
    return (
      <PreviewStep
        formData={formData}
        toTitleCase={toTitleCase}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        setPreviewMode={setPreviewMode}
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-foreground italic">Create Visual Book</h1>
        <p className="mt-2 text-sm text-muted-foreground font-light tracking-wide uppercase">Transformation of moments into legacy</p>
      </div>

      <CreateSteps steps={steps} currentStep={currentStep} />

      <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
        {currentStep === 1 && (
          <BasicInfoStep
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
            formData={formData}
            setFormData={setFormData}
            isPlaying={isPlaying}
            toggleMusic={toggleMusic}
            defaultMusicTracks={defaultMusicTracks}
          />
        )}
        {currentStep === 3 && (
          <VisualsStep
            formData={formData}
            handleFileUpload={handleFileUpload}
            handleMultipleFileUpload={handleMultipleFileUpload}
            removeFile={removeFile}
            errors={errors}
          />
        )}

        <div className="flex justify-between items-center py-6 border-t border-gold/10">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="ghost"
            className="text-gold font-serif italic hover:bg-gold/5 disabled:opacity-30 h-12 px-8"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous Act
          </Button>

          {currentStep < steps.length ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 font-serif italic text-lg"
            >
              Proceed
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          ) : (
            <div className="flex space-x-6">
              <Button
                type="button"
                onClick={handlePreview}
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/5 h-14 px-10 font-serif italic text-lg"
              >
                <Eye className="h-5 w-5 mr-3" />
                Preview Art
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gold hover:bg-gold/90 text-white h-14 px-10 font-serif italic text-lg shadow-xl shadow-gold/10"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                ) : (
                  <Save className="h-5 w-5 mr-3" />
                )}
                {isSubmitting ? 'Creating...' : 'Publish Legacy'}
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default CreateNew
