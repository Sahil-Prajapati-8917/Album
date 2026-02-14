import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  ChevronRight,
  Music2,
  Sparkles,
  Plus
} from 'lucide-react'

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

      // Create spreads from uploaded images (Simplified for mock)
      const spreads = []

      // Create album data
      const newAlbum = {
        id: albumId,
        albumName: `${formData.clientName} - ${formData.functionType}`,
        totalSheets: formData.innerSheets.length + 2,
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
      <div className="max-w-4xl mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif italic text-gray-900">Visual Book Preview</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-gold mt-1">Final Review before creation</p>
          </div>
          <Button
            onClick={() => setPreviewMode(false)}
            variant="outline"
            className="border-gold/30 text-gold hover:bg-gold/5"
          >
            Back to Edit
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-ebony/50 rounded-2xl shadow-2xl border border-gold/10 p-12 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-4">
            <Sparkles className="h-6 w-6 text-gold/20" />
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-[#181611] dark:text-white mb-3">
              {formData.clientName}
            </h2>
            <div className="flex items-center justify-center space-x-4">
              <span className="w-10 h-px bg-gold/30"></span>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">{toTitleCase(formData.functionType)}</p>
              <span className="w-10 h-px bg-gold/30"></span>
            </div>
            <p className="text-gray-500 mt-6 font-light">Function Date: {new Date(formData.functionDate).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-lg aspect-video bg-pearl dark:bg-ebony rounded-xl flex items-center justify-center border border-gold/10 shadow-inner group">
              <div className="text-center">
                <div className="w-20 h-20 bg-white dark:bg-[#2a261d] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-gold/10 group-hover:scale-110 transition-transform">
                  <Eye className="h-8 w-8 text-gold" />
                </div>
                <p className="text-sm font-serif italic text-gray-500">Interactive Visual Book Preview</p>
                <div className="flex items-center justify-center mt-4 space-x-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span>{formData.innerSheets.length + 2} Pages</span>
                  <span className="w-1 h-1 bg-gold rounded-full"></span>
                  <span>{formData.musicTrack}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center space-x-6">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gold hover:bg-gold/90 text-white px-10 py-6 text-lg font-serif italic"
            >
              {isSubmitting ? 'Creating Masterpiece...' : 'Confirm & Create'}
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-[#2a261d] rounded-2xl shadow-sm border border-gold/10 p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-serif italic text-gray-900 dark:text-white">Basic Information</h2>
              <div className="w-12 h-px bg-gold mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                  Client Name
                </label>
                <Input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className={`h-12 border-gold/10 focus:border-gold focus:ring-gold/5 bg-pearl/30 ${errors.clientName ? 'border-red-300' : ''}`}
                  placeholder="e.g. Sarah & Michael"
                />
                {errors.clientName && (
                  <p className="mt-1 text-[10px] text-red-500 uppercase font-bold tracking-tighter flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.clientName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                  Function Type
                </label>
                <Select
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, functionType: value }))
                    if (errors.functionType) setErrors(prev => ({ ...prev, functionType: '' }))
                  }}
                  value={formData.functionType}
                >
                  <SelectTrigger className={`h-12 border-gold/10 focus:border-gold bg-pearl/30 ${errors.functionType ? 'border-red-300' : ''}`}>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {functionTypes.map(type => (
                      <SelectItem key={type} value={type}>{toTitleCase(type)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.functionType && (
                  <p className="mt-1 text-[10px] text-red-500 uppercase font-bold tracking-tighter flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.functionType}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1 mb-2 block">
                  Function Date
                </label>
                <DateSelector
                  value={formData.functionDate}
                  onChange={(value) => {
                    setFormData(prev => ({ ...prev, functionDate: value }))
                    if (errors.functionDate) setErrors(prev => ({ ...prev, functionDate: '' }))
                  }}
                  error={errors.functionDate}
                />
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-[#2a261d] rounded-2xl shadow-sm border border-gold/10 p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-serif italic text-gray-900 dark:text-white">Music Selection</h2>
              <div className="w-12 h-px bg-gold mt-2"></div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                  Background Soundtrack
                </label>
                <Select
                  onValueChange={(value) => setFormData(prev => ({ ...prev, musicTrack: value }))}
                  value={formData.musicTrack}
                >
                  <SelectTrigger className="h-12 border-gold/10 focus:border-gold bg-pearl/30">
                    <SelectValue placeholder="Choose a track" />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultMusicTracks.map(track => (
                      <SelectItem key={track.file} value={track.file}>{track.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 bg-pearl/50 dark:bg-ebony/20 p-6 rounded-xl border border-gold/5">
                <Button
                  type="button"
                  onClick={toggleMusic}
                  className={`${isPlaying ? 'bg-gold/20 text-gold border-gold/50' : 'bg-gold text-white'} rounded-full w-14 h-14 p-0 shadow-lg group transition-all`}
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </Button>

                <div className="flex-1 w-full space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    <span className="flex items-center"><Music2 className="h-3 w-3 mr-2 text-gold" /> {formData.musicTrack}</span>
                    <span>Volume: {formData.volume}%</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Volume2 className="h-4 w-4 text-gold" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.volume}
                      onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                      className="flex-1 accent-gold h-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-[#2a261d] rounded-2xl shadow-sm border border-gold/10 p-8"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-serif italic text-gray-900 dark:text-white">Visual Assets</h2>
              <div className="w-12 h-px bg-gold mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Front Cover */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                  Front Cover
                </label>
                <div className={`relative group border-2 border-dashed ${formData.frontCover ? 'border-gold bg-gold/5' : 'border-gold/10 hover:border-gold/30'} rounded-2xl p-8 text-center transition-all cursor-pointer overflow-hidden`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'frontCover')}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="relative z-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${formData.frontCover ? 'bg-gold text-white' : 'bg-pearl text-gold group-hover:scale-110 transition-transform'}`}>
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formData.frontCover ? formData.frontCover.name : 'Upload Front Cover'}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-tighter mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>
                {errors.frontCover && (
                  <p className="mt-1 text-[10px] text-red-500 uppercase font-bold tracking-tighter flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.frontCover}
                  </p>
                )}
              </div>

              {/* Back Cover */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                  Back Cover
                </label>
                <div className={`relative group border-2 border-dashed ${formData.backCover ? 'border-gold bg-gold/5' : 'border-gold/10 hover:border-gold/30'} rounded-2xl p-8 text-center transition-all cursor-pointer overflow-hidden`}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'backCover')}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="relative z-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${formData.backCover ? 'bg-gold text-white' : 'bg-pearl text-gold group-hover:scale-110 transition-transform'}`}>
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formData.backCover ? formData.backCover.name : 'Upload Back Cover'}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-tighter mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>
                {errors.backCover && (
                  <p className="mt-1 text-[10px] text-red-500 uppercase font-bold tracking-tighter flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.backCover}
                  </p>
                )}
              </div>
            </div>

            {/* Inner Sheets */}
            <div className="mt-10 space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
                Inner Spread Sheets
              </label>
              <div className={`relative group border-2 border-dashed ${formData.innerSheets.length > 0 ? 'border-gold/30 bg-gold/5' : 'border-gold/10 hover:border-gold/30'} rounded-2xl p-10 text-center transition-all cursor-pointer`}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultipleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="w-16 h-16 bg-white dark:bg-[#181611] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gold/10 group-hover:scale-110 transition-transform">
                  <Plus className="h-8 w-8 text-gold" />
                </div>
                <p className="text-base font-serif italic text-gray-900 dark:text-white">Add All Spread Photos</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">{formData.innerSheets.length} files selected</p>
              </div>

              {/* Uploaded Files Grid */}
              {formData.innerSheets.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {formData.innerSheets.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative aspect-square bg-pearl dark:bg-ebony/50 rounded-lg border border-gold/10 p-2 flex flex-col justify-center items-center group overflow-hidden"
                    >
                      <span className="text-[8px] font-bold text-gray-400 truncate w-full text-center px-1 mb-1">{file.name}</span>
                      <Sparkles className="h-3 w-3 text-gold/30" />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {errors.innerSheets && (
                <p className="mt-1 text-[10px] text-red-500 uppercase font-bold tracking-tighter flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.innerSheets}
                </p>
              )}
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-[#181611] dark:text-white italic">Create Visual Book</h1>
        <p className="mt-2 text-sm text-gray-500 font-light tracking-wide uppercase">Transformation of moments into legacy</p>
      </div>

      {/* Premium Step Indicator */}
      <div className="mb-16">
        <div className="flex items-center justify-between px-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex-1 flex flex-col items-center relative">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 z-10 ${currentStep > step.id
                ? 'bg-gold border-gold text-white'
                : currentStep === step.id
                  ? 'bg-white border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-pearl border-gold/10 text-gold/30'
                }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-bold font-serif">{index + 1}</span>
                )}
              </div>
              <div className="mt-4 text-center">
                <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${currentStep >= step.id ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                  }`}>
                  {step.title}
                </p>
                <p className="text-[8px] text-gray-400 font-light hidden sm:block italic">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`absolute top-6 left-[50%] w-full h-[1px] -z-0 transition-all duration-700 ${currentStep > step.id ? 'bg-gold' : 'bg-gold/10'
                  }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
        {renderStepContent()}

        {/* Navigation Buttons */}
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
              className="bg-[#181611] hover:bg-black text-white px-10 h-14 font-serif italic text-lg"
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
