import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Save, ChevronRight, ChevronLeft, Upload, Music,
  Image as ImageIcon, CheckCircle2, X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from '@/components/ui/badge'

const CreateNew = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    clientName: '',
    functionType: '',
    functionDate: '',
    musicTrack: 'wedding-bells.mp3',
    volume: 50,
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
    { name: 'Wedding Bells', file: 'wedding-bells.mp3' },
    { name: 'Celebration Theme', file: 'celebration.mp3' },
    { name: 'Romantic Melody', file: 'romantic.mp3' },
    { name: 'Party Beats', file: 'party-beats.mp3' },
    { name: 'Corporate Tune', file: 'corporate.mp3' }
  ]

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0]
    if (file) handleChange(field, file)
  }

  const handleMultipleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({ ...prev, innerSheets: [...prev.innerSheets, ...files] }))
  }

  const removeSheet = (index) => {
    setFormData(prev => ({
      ...prev,
      innerSheets: prev.innerSheets.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      const albumId = Date.now()
      const newAlbum = {
        id: `TASK-${albumId.toString().slice(-4)}`,
        albumName: `${formData.clientName} - ${formData.functionType}`,
        totalSheets: formData.innerSheets.length + 2,
        clientName: formData.clientName,
        date: formData.functionDate,
        type: formData.functionType.charAt(0).toUpperCase() + formData.functionType.slice(1),
        status: 'Todo',
        priority: 'Medium',
        label: 'Feature',
        views: '0',
      }
      const existingAlbums = JSON.parse(localStorage.getItem('albums') || '[]')
      localStorage.setItem('albums', JSON.stringify([...existingAlbums, newAlbum]))
      setIsSubmitting(false)
      navigate('/all-pixfolio')
    }, 1500)
  }

  const steps = [
    { id: 'basic', label: 'Details', step: 1 },
    { id: 'media', label: 'Media', step: 2 },
    { id: 'review', label: 'Review', step: 3 },
  ]

  const currentStep = steps.findIndex(s => s.id === activeTab) + 1

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Visual Book</h1>
          <p className="text-muted-foreground">
            Build a premium digital album for your client.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>Cancel</Button>
          <Badge variant="outline">{currentStep} of {steps.length}</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          {steps.map(s => (
            <TabsTrigger key={s.id} value={s.id}>
              {s.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Step 1: Basic Details */}
        <TabsContent value="basic">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Basic information about the event.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name / Event Title</Label>
                <Input
                  id="clientName"
                  placeholder="e.g. Sarah & John's Wedding"
                  value={formData.clientName}
                  onChange={(e) => handleChange('clientName', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Event Category</Label>
                  <Select
                    value={formData.functionType}
                    onValueChange={(val) => handleChange('functionType', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {functionTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="functionDate">Event Date</Label>
                  <Input
                    id="functionDate"
                    type="date"
                    value={formData.functionDate}
                    onChange={(e) => handleChange('functionDate', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end">
              <Button onClick={() => setActiveTab("media")}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Step 2: Media Upload */}
        <TabsContent value="media">
          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle>Visuals & Audio</CardTitle>
              <CardDescription>Upload covers, inner sheets, and select a soundtrack.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Covers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Front Cover</Label>
                  <label htmlFor="front-cover-upload" className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors aspect-video">
                    {formData.frontCover ? (
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="h-8 w-8 text-emerald-500" />
                        <span className="text-sm font-medium truncate max-w-[150px]">{formData.frontCover.name}</span>
                        <Badge variant="outline" className="text-emerald-600">Uploaded</Badge>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Upload front cover</p>
                        <p className="text-xs text-muted-foreground">JPG, PNG up to 20MB</p>
                      </>
                    )}
                    <Input type="file" className="hidden" id="front-cover-upload" onChange={(e) => handleFileUpload(e, 'frontCover')} accept="image/*" />
                  </label>
                </div>
                <div className="space-y-2">
                  <Label>Back Cover</Label>
                  <label htmlFor="back-cover-upload" className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors aspect-video">
                    {formData.backCover ? (
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="h-8 w-8 text-emerald-500" />
                        <span className="text-sm font-medium truncate max-w-[150px]">{formData.backCover.name}</span>
                        <Badge variant="outline" className="text-emerald-600">Uploaded</Badge>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Upload back cover</p>
                        <p className="text-xs text-muted-foreground">JPG, PNG up to 20MB</p>
                      </>
                    )}
                    <Input type="file" className="hidden" id="back-cover-upload" onChange={(e) => handleFileUpload(e, 'backCover')} accept="image/*" />
                  </label>
                </div>
              </div>

              <Separator />

              {/* Inner Sheets */}
              <div className="space-y-2">
                <Label>Inner Sheets</Label>
                <label htmlFor="inner-sheets-upload" className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors">
                  <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                  <p className="text-sm font-medium">
                    {formData.innerSheets.length > 0
                      ? `${formData.innerSheets.length} sheets uploaded`
                      : 'Upload inner sheets'}
                  </p>
                  <p className="text-xs text-muted-foreground">Select multiple files</p>
                  <Input type="file" multiple className="hidden" id="inner-sheets-upload" onChange={handleMultipleFileUpload} accept="image/*" />
                </label>
                {formData.innerSheets.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.innerSheets.map((file, i) => (
                      <Badge key={i} variant="secondary" className="pl-3 pr-1 py-1 gap-1">
                        {file.name}
                        <Button variant="ghost" size="icon" className="h-5 w-5 hover:bg-destructive/20" onClick={() => removeSheet(i)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Music */}
              <div className="space-y-2">
                <Label>Background Music</Label>
                <Select
                  value={formData.musicTrack}
                  onValueChange={(val) => handleChange('musicTrack', val)}
                >
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select soundtrack" />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultMusicTracks.map(track => (
                      <SelectItem key={track.file} value={track.file}>
                        <div className="flex items-center gap-2">
                          <Music className="h-4 w-4" />
                          {track.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-between">
              <Button variant="ghost" onClick={() => setActiveTab("basic")}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setActiveTab("review")}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Step 3: Review */}
        <TabsContent value="review">
          <Card className="max-w-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <CardTitle>Review & Publish</CardTitle>
                  <CardDescription>Confirm your details before publishing.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border divide-y">
                <div className="flex justify-between items-center p-4">
                  <span className="text-sm text-muted-foreground">Client / Event</span>
                  <span className="text-sm font-medium">{formData.clientName || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center p-4">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Badge variant="outline" className="capitalize">{formData.functionType || 'Not set'}</Badge>
                </div>
                <div className="flex justify-between items-center p-4">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <span className="text-sm font-medium">{formData.functionDate || 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center p-4">
                  <span className="text-sm text-muted-foreground">Total Sheets</span>
                  <span className="text-sm font-medium">{formData.innerSheets.length + (formData.frontCover ? 1 : 0) + (formData.backCover ? 1 : 0)}</span>
                </div>
                <div className="flex justify-between items-center p-4">
                  <span className="text-sm text-muted-foreground">Music</span>
                  <span className="text-sm font-medium flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    {defaultMusicTracks.find(t => t.file === formData.musicTrack)?.name || 'None'}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-between">
              <Button variant="ghost" onClick={() => setActiveTab("media")}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    Publishing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Publish Pixfolio
                  </span>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CreateNew
