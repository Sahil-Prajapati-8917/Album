import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, ChevronRight, ChevronLeft, Upload, Music, Sparkles, Image as ImageIcon, CheckCircle2, Info, Layout, ListChecks } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
    setTimeout(() => {
      const albumId = Date.now()
      const newAlbum = {
        id: `px-${albumId.toString().slice(-4)}`,
        albumName: `${formData.clientName} - ${formData.functionType}`,
        totalSheets: formData.innerSheets.length + 2,
        clientName: formData.clientName,
        date: formData.functionDate,
        type: formData.functionType.charAt(0).toUpperCase() + formData.functionType.slice(1),
        status: 'published',
        views: '0',
      }
      const existingAlbums = JSON.parse(localStorage.getItem('albums') || '[]')
      localStorage.setItem('albums', JSON.stringify([...existingAlbums, newAlbum]))
      setIsSubmitting(false)
      navigate('/all-pixfolio')
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Create Visual Book
            <Sparkles className="h-5 w-5 text-zinc-400" />
          </h1>
          <p className="text-muted-foreground font-medium">
            Bring your client's memories to life with a premium digital archive.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground font-medium" onClick={() => navigate('/dashboard')}>Cancel</Button>
          <Badge variant="outline" className="border-border bg-background px-3 py-1 font-bold text-[10px] uppercase tracking-wider text-muted-foreground">Draft Saved 2m ago</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="bg-muted p-1 h-14 rounded-2xl grid grid-cols-3 w-full max-w-2xl border border-border flex items-center">
            <TabsTrigger value="basic" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all gap-2 text-sm font-bold text-muted-foreground h-12">
              <Info className="h-4 w-4" /> Basic Details
            </TabsTrigger>
            <TabsTrigger value="media" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all gap-2 text-sm font-bold text-muted-foreground h-12">
              <Layout className="h-4 w-4" /> Visuals & Audio
            </TabsTrigger>
            <TabsTrigger value="review" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all gap-2 text-sm font-bold text-muted-foreground h-12">
              <ListChecks className="h-4 w-4" /> Final Review
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="basic" className="animate-in slide-in-from-right-4 duration-500">
          <Card className="max-w-3xl mx-auto shadow-sm border-muted rounded-xl bg-card">
            <CardHeader className="border-b border-muted pb-8 bg-muted/20">
              <CardTitle className="text-xl font-semibold text-foreground">Event & Client Info</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Tell us who this archive is for and the nature of the celebration.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-sm font-bold text-zinc-700">Client Name / Event Title</Label>
                <Input
                  id="clientName"
                  placeholder="e.g. Sarah & John's Wedding"
                  value={formData.clientName}
                  onChange={(e) => handleChange('clientName', e.target.value)}
                  className="h-11 border-input bg-background focus:ring-2 focus:ring-ring focus:border-ring transition-all rounded-lg text-base font-medium"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="functionType" className="text-sm font-bold text-zinc-700">Celebration Category</Label>
                  <Select
                    value={formData.functionType}
                    onValueChange={(val) => handleChange('functionType', val)}
                  >
                    <SelectTrigger className="h-11 border-input bg-background rounded-lg font-medium">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-border shadow-xl rounded-xl">
                      {functionTypes.map(type => (
                        <SelectItem key={type} value={type} className="focus:bg-accent focus:text-accent-foreground font-medium">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="functionDate" className="text-sm font-bold text-zinc-700">Celebration Date</Label>
                  <Input
                    id="functionDate"
                    type="date"
                    value={formData.functionDate}
                    onChange={(e) => handleChange('functionDate', e.target.value)}
                    className="h-11 border-input bg-background focus:ring-2 focus:ring-ring focus:border-ring transition-all rounded-lg font-medium"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-zinc-50/50 px-8 py-6 border-t border-border flex justify-end">
              <Button onClick={() => setActiveTab("media")} className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 h-11 rounded-lg font-bold shadow-sm transition-all">
                Next: Design Visuals <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="animate-in slide-in-from-right-4 duration-500">
          <Card className="max-w-4xl mx-auto shadow-sm border-muted rounded-xl bg-card">
            <CardHeader className="border-b border-muted pb-8 bg-muted/20">
              <CardTitle className="text-xl font-semibold text-foreground">Curate Visuals & Sound</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Upload high-resolution spread covers and choose an ambient background score.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3 group">
                  <Label className="text-sm font-bold text-zinc-700">Front Cover Artwork</Label>
                  <label htmlFor="front-cover-upload" className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-zinc-300 hover:bg-zinc-50 transition-all group/box overflow-hidden relative aspect-video">
                    {formData.frontCover ? (
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-zinc-100 rounded-xl mb-3">
                          <ImageIcon className="h-6 w-6 text-zinc-600" />
                        </div>
                        <span className="text-sm font-bold text-zinc-900">{formData.frontCover.name}</span>
                        <span className="text-xs text-muted-foreground font-medium mt-1">Ready to upload</span>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-zinc-50 rounded-2xl mb-4 group-hover/box:scale-105 transition-all">
                          <Upload className="h-8 w-8 text-zinc-400 group-hover/box:text-zinc-600" />
                        </div>
                        <p className="text-sm font-bold text-zinc-900 uppercase tracking-tight">Drop Front Cover here</p>
                        <p className="text-xs text-muted-foreground font-medium mt-1">PNG, JPG up to 10MB</p>
                      </>
                    )}
                    <Input
                      type="file"
                      className="hidden"
                      id="front-cover-upload"
                      onChange={(e) => handleFileUpload(e, 'frontCover')}
                      accept="image/*"
                    />
                  </label>
                </div>
                <div className="space-y-3 group">
                  <Label className="text-sm font-bold text-zinc-700">Back Cover Artwork</Label>
                  <label htmlFor="back-cover-upload" className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-zinc-300 hover:bg-zinc-50 transition-all group/box overflow-hidden relative aspect-video">
                    {formData.backCover ? (
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-zinc-100 rounded-xl mb-3">
                          <ImageIcon className="h-6 w-6 text-zinc-600" />
                        </div>
                        <span className="text-sm font-bold text-zinc-900">{formData.backCover.name}</span>
                        <span className="text-xs text-muted-foreground font-medium mt-1">Ready to upload</span>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-zinc-50 rounded-2xl mb-4 group-hover/box:scale-105 transition-all">
                          <Upload className="h-8 w-8 text-zinc-400 group-hover/box:text-zinc-600" />
                        </div>
                        <p className="text-sm font-bold text-zinc-900 uppercase tracking-tight">Drop Back Cover here</p>
                        <p className="text-xs text-muted-foreground font-medium mt-1">PNG, JPG up to 10MB</p>
                      </>
                    )}
                    <Input
                      type="file"
                      className="hidden"
                      id="back-cover-upload"
                      onChange={(e) => handleFileUpload(e, 'backCover')}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-bold text-zinc-700">Inner Sheet Collections (Spreads)</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-zinc-300 hover:bg-zinc-50 transition-all group/spreads">
                  <div className={`p-4 rounded-2xl mb-4 transition-all ${formData.innerSheets.length > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-50 group-hover/spreads:bg-zinc-100 group-hover/spreads:scale-105'}`}>
                    {formData.innerSheets.length > 0 ? <CheckCircle2 className="h-8 w-8" /> : <Upload className="h-8 w-8 text-zinc-400 group-hover/spreads:text-zinc-600" />}
                  </div>
                  <p className="text-lg font-bold text-zinc-900">
                    {formData.innerSheets.length > 0 ? `${formData.innerSheets.length} Spread Sheets Selected` : 'Upload Inner Spread Sheets'}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium mt-1 max-w-sm">Select multiple high-resolution JPEG/PNG files that make up the inner experience.</p>
                  <Input
                    type="file"
                    multiple
                    className="hidden"
                    id="inner-sheets-upload"
                    onChange={handleMultipleFileUpload}
                    accept="image/*"
                  />
                  <Label htmlFor="inner-sheets-upload" className="mt-6 px-8 py-2.5 bg-zinc-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-zinc-800 transition-colors shadow-sm">
                    Browse Files
                  </Label>
                </div>
              </div>

              <Separator className="bg-border/50" />

              <div className="space-y-3">
                <Label className="text-sm font-bold text-zinc-700">Ambient Background Score</Label>
                <div className="relative">
                  <Music className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Select
                    value={formData.musicTrack}
                    onValueChange={(val) => handleChange('musicTrack', val)}
                  >
                    <SelectTrigger className="h-11 pl-10 border-input bg-background rounded-lg font-medium">
                      <SelectValue placeholder="Select soundscape" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-border shadow-xl rounded-xl">
                      {defaultMusicTracks.map(track => (
                        <SelectItem key={track.file} value={track.file} className="focus:bg-accent focus:text-accent-foreground font-medium">
                          <div className="flex items-center">
                            <Music className="mr-2 h-4 w-4 text-zinc-500" />
                            <span>{track.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-zinc-50/50 px-8 py-6 border-t border-border flex justify-between">
              <Button variant="ghost" onClick={() => setActiveTab("basic")} className="text-muted-foreground font-bold hover:text-foreground h-11 px-6 rounded-lg">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Details
              </Button>
              <Button onClick={() => setActiveTab("review")} className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 h-11 rounded-lg font-bold shadow-sm transition-all">
                Final Step: Review <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="animate-in slide-in-from-right-4 duration-500">
          <Card className="max-w-2xl mx-auto shadow-sm border-muted rounded-xl overflow-hidden bg-card">
            <CardHeader className="border-b border-muted pb-8 text-center bg-muted/20">
              <div className="mx-auto w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 border border-emerald-100">
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl font-semibold text-foreground">Ready to Publish?</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Review the final configuration of your Pixfolio Visual Book.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Client / Event</p>
                  <p className="text-lg font-bold text-foreground">{formData.clientName || "Not specified"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Type</p>
                  <Badge variant="outline" className="text-[11px] border-border bg-muted/50 text-foreground capitalize font-bold rounded-md px-2 py-0">{formData.functionType || "N/A"}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Celebration Date</p>
                  <p className="font-bold text-foreground">{formData.functionDate || "Not set"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Media</p>
                  <p className="font-bold text-foreground">{formData.innerSheets.length + (formData.frontCover ? 1 : 0) + (formData.backCover ? 1 : 0)} Assets</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Ambient Soundscape</p>
                  <div className="flex items-center gap-2 font-bold text-zinc-900 bg-zinc-100 px-3 py-2 rounded-lg w-fit text-sm">
                    <Music className="h-4 w-4" />
                    {defaultMusicTracks.find(t => t.file === formData.musicTrack)?.name || "Default"}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-zinc-50/50 px-8 py-6 border-t border-border flex justify-between">
              <Button variant="ghost" onClick={() => setActiveTab("media")} className="text-muted-foreground font-bold hover:text-foreground h-11 px-6 rounded-lg">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Media
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-zinc-900 hover:bg-zinc-800 text-white px-10 h-12 rounded-lg font-bold text-base shadow-sm transition-all group">
                {isSubmitting ? (
                  <>
                    Creating...
                  </>
                ) : (
                  <>
                    Publish Pixfolio <Save className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </>
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
