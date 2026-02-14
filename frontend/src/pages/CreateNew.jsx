import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, ChevronRight, ChevronLeft, Upload, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

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

  // Mock data preserved
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      const albumId = Date.now()
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
      const existingAlbums = JSON.parse(localStorage.getItem('albums') || '[]')
      localStorage.setItem('albums', JSON.stringify([...existingAlbums, newAlbum]))
      setIsSubmitting(false)
      navigate('/dashboard') // Redirect to dashboard instead of viewer for admin flow
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create Visual Book</h2>
          <p className="text-muted-foreground">
            Create a new digital album for your client.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="media">Visuals & Audio</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Details</CardTitle>
              <CardDescription>Enter the event details and client information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  placeholder="e.g. Sarah & John"
                  value={formData.clientName}
                  onChange={(e) => handleChange('clientName', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="functionType">Event Type</Label>
                  <Select
                    value={formData.functionType}
                    onValueChange={(val) => handleChange('functionType', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
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
                <div className="grid gap-2">
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
            <CardFooter>
              <Button onClick={() => setActiveTab("media")}>
                Next Step <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Media</CardTitle>
              <CardDescription>Upload covers and background music.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label>Front Cover</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      {formData.frontCover ? formData.frontCover.name : "Click to upload front cover"}
                    </span>
                    <Input
                      type="file"
                      className="hidden"
                      id="front-cover-upload"
                      onChange={(e) => handleFileUpload(e, 'frontCover')}
                      accept="image/*"
                    />
                    <Label htmlFor="front-cover-upload" className="absolute inset-0 cursor-pointer" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Back Cover</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      {formData.backCover ? formData.backCover.name : "Click to upload back cover"}
                    </span>
                    <Input
                      type="file"
                      className="hidden"
                      id="back-cover-upload"
                      onChange={(e) => handleFileUpload(e, 'backCover')}
                      accept="image/*"
                    />
                    <Label htmlFor="back-cover-upload" className="absolute inset-0 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Inner Sheets (Spreads)</Label>
                <Input
                  type="file"
                  multiple
                  onChange={handleMultipleFileUpload}
                  accept="image/*"
                />
                <p className="text-xs text-muted-foreground">{formData.innerSheets.length} files selected</p>
              </div>

              <Separator />

              <div className="grid gap-2">
                <Label>Background Music</Label>
                <Select
                  value={formData.musicTrack}
                  onValueChange={(val) => handleChange('musicTrack', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select music" />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultMusicTracks.map(track => (
                      <SelectItem key={track.file} value={track.file}>
                        <div className="flex items-center">
                          <Music className="mr-2 h-4 w-4" />
                          {track.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={() => setActiveTab("basic")}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setActiveTab("review")}>
                Review & Publish <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Review details before publishing.</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-medium text-muted-foreground">Client Name</dt>
                  <dd>{formData.clientName || "-"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Type</dt>
                  <dd className="capitalize">{formData.functionType || "-"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Date</dt>
                  <dd>{formData.functionDate || "-"}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Photos Selected</dt>
                  <dd>{formData.innerSheets.length}</dd>
                </div>
              </dl>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={() => setActiveTab("media")}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Album"}
                {!isSubmitting && <Save className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CreateNew
