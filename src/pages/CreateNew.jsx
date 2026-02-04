import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DateSelector from '@/components/DateSelector'
import {
  Upload,
  Music,
  Volume2,
  Play,
  Pause,
  Save,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const CreateNew = () => {
  const navigate = useNavigate()

  const toTitleCase = (str) => {
    return str.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const steps = [
    { id: 1, title: 'Basic Information', description: 'Client details and function info' },
    { id: 2, title: 'Music Selection', description: 'Choose background music' },
    { id: 3, title: 'Upload Files', description: 'Upload photos and covers' }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

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
    // In a real app, you'd control audio playback here
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

      // Create spreads from uploaded images
      const spreads = []
      const allImages = []

      // Add front cover
      if (formData.frontCover) {
        allImages.push({
          url: URL.createObjectURL(formData.frontCover),
          caption: 'Front Cover'
        })
      }

      // Add inner sheets
      formData.innerSheets.forEach((file, index) => {
        allImages.push({
          url: URL.createObjectURL(file),
          caption: `Page ${index + 1}`
        })
      })

      // Add back cover
      if (formData.backCover) {
        allImages.push({
          url: URL.createObjectURL(formData.backCover),
          caption: 'Back Cover'
        })
      }

      // Create spreads (2 pages per spread)
      for (let i = 0; i < allImages.length; i += 2) {
        const spread = {
          id: spreads.length + 1,
          leftPage: allImages[i] ? {
            image: allImages[i].url,
            overlay: null,
            caption: allImages[i].caption
          } : null,
          rightPage: allImages[i + 1] ? {
            image: allImages[i + 1].url,
            overlay: null,
            caption: allImages[i + 1].caption
          } : null
        }
        spreads.push(spread)
      }

      // Create album data
      const newAlbum = {
        id: albumId,
        albumName: `${formData.clientName} - ${formData.functionType}`,
        totalSheets: formData.innerSheets.length + 2, // front + back + inner
        clientName: formData.clientName,
        functionDate: formData.functionDate,
        functionType: formData.functionType,
        spreads: spreads,
        rating: 0,
        viewersCount: 0,
        qrCode: 'mock-qr-code',
        link: `mock-link-${albumId}`,
        status: 'draft',
        createdDate: new Date().toISOString().split('T')[0]
      }

      // Save to localStorage (mock persistence)
      const existingAlbums = JSON.parse(localStorage.getItem('albums') || '[]')
      localStorage.setItem('albums', JSON.stringify([...existingAlbums, newAlbum]))

      setIsSubmitting(false)
      // Navigate to Visual Book viewer instead of dashboard
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
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Visual Book Preview</h1>
          <Button
            onClick={() => setPreviewMode(false)}
            variant="outline"
          >
            Back to Edit
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {formData.clientName} - {toTitleCase(formData.functionType)}
            </h2>
            <p className="text-gray-600">Function Date: {new Date(formData.functionDate).toLocaleDateString()}</p>
          </div>

          {/* Mock Visual Book Preview */}
          <div className="flex justify-center">
            <div className="w-96 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive Visual Book Preview</p>
                <p className="text-sm text-gray-500 mt-2">
                  {formData.innerSheets.length + 2} pages • {formData.musicTrack}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Album'}
            </Button>
            <Button
              onClick={() => setPreviewMode(false)}
              variant="outline"
            >
              Edit Details
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            <p className="text-gray-600 mb-6">Enter the client details and function information</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name *
                </label>
                <Input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className={errors.clientName ? 'border-red-300' : ''}
                  placeholder="Enter client name"
                />
                {errors.clientName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.clientName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Function Type *
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-between ${
                        errors.functionType ? 'border-red-300' : ''
                      }`}
                    >
                      {formData.functionType ? toTitleCase(formData.functionType) : 'Select function type'}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>Function Types</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {functionTypes.map(type => (
                      <DropdownMenuItem
                        key={type}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, functionType: type }))
                          if (errors.functionType) {
                            setErrors(prev => ({ ...prev, functionType: '' }))
                          }
                        }}
                      >
                        {toTitleCase(type)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {errors.functionType && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.functionType}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <DateSelector 
                  value={formData.functionDate}
                  onChange={(value) => {
                    setFormData(prev => ({ ...prev, functionDate: value }))
                    if (errors.functionDate) {
                      setErrors(prev => ({ ...prev, functionDate: '' }))
                    }
                  }}
                  error={errors.functionDate}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Music Selection</h2>
            <p className="text-gray-600 mb-6">Choose background music for your Visual Book</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Music
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {defaultMusicTracks.find(track => track.file === formData.musicTrack)?.name || 'Select music track'}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>Music Tracks</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {defaultMusicTracks.map(track => (
                      <DropdownMenuItem
                        key={track.file}
                        onClick={() => setFormData(prev => ({ ...prev, musicTrack: track.file }))}
                      >
                        {track.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  onClick={toggleMusic}
                >
                  {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'} Preview
                </Button>

                <div className="flex items-center space-x-2 flex-1 max-w-xs">
                  <Volume2 className="h-4 w-4 text-gray-500" />
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.volume}
                    onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 w-8">{formData.volume}%</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Files</h2>
            <p className="text-gray-600 mb-6">Upload photos for your Visual Book</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Front Cover */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Front Cover *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'frontCover')}
                    className="hidden"
                    id="front-cover"
                  />
                  <label htmlFor="front-cover" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {formData.frontCover ? formData.frontCover.name : 'Click to upload front cover'}
                    </p>
                  </label>
                </div>
                {errors.frontCover && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.frontCover}
                  </p>
                )}
              </div>

              {/* Back Cover */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Back Cover *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'backCover')}
                    className="hidden"
                    id="back-cover"
                  />
                  <label htmlFor="back-cover" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {formData.backCover ? formData.backCover.name : 'Click to upload back cover'}
                    </p>
                  </label>
                </div>
                {errors.backCover && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.backCover}
                  </p>
                )}
              </div>
            </div>

            {/* Inner Sheets */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Inner Sheets *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultipleFileUpload}
                  className="hidden"
                  id="inner-sheets"
                />
                <label htmlFor="inner-sheets" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload multiple inner sheets
                  </p>
                </label>
              </div>

              {/* Uploaded Files List */}
              {formData.innerSheets.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Uploaded Files ({formData.innerSheets.length}):
                  </p>
                  {formData.innerSheets.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <Button
                        type="button"
                        onClick={() => removeFile(index)}
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {errors.innerSheets && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.innerSheets}
                </p>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Visual Book</h1>
        <p className="text-gray-600">Fill in the details to create your new Visual Book album</p>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep > step.id
                  ? 'bg-green-500 border-green-500 text-white'
                  : currentStep === step.id
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'border-gray-300 text-gray-300'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-px mx-4 ${
                  currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button
              type="button"
              onClick={nextStep}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <div className="flex space-x-4">
              <Button
                type="button"
                onClick={handlePreview}
                variant="secondary"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isSubmitting ? 'Creating...' : 'Create Visual Book'}
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default CreateNew
