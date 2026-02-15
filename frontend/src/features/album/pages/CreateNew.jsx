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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
        <div className="flex justify-center">
          <TabsList className="bg-zinc-100/50 dark:bg-zinc-800/50 p-1 h-[60px] rounded-2xl grid grid-cols-3 w-full max-w-2xl border border-zinc-100 dark:border-zinc-800/50 backdrop-blur-sm">
            <TabsTrigger value="basic" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-50 data-[state=active]:shadow-lg transition-all gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 h-full">
              <Info className="h-4 w-4" /> Basic Details
            </TabsTrigger>
            <TabsTrigger value="media" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-50 data-[state=active]:shadow-lg transition-all gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 h-full">
              <Layout className="h-4 w-4" /> Visuals & Audio
            </TabsTrigger>
            <TabsTrigger value="review" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-50 data-[state=active]:shadow-lg transition-all gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 h-full">
              <ListChecks className="h-4 w-4" /> Final Review
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="basic" className="animate-in slide-in-from-right-8 duration-700">
          <Card className="max-w-3xl mx-auto shadow-sm border-zinc-100 dark:border-zinc-800/50 rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden">
            <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50 pb-8 bg-zinc-50/30 dark:bg-zinc-800/10 px-8 pt-8">
              <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Event & Core Identity</CardTitle>
              <CardDescription className="text-sm text-zinc-500 font-medium mt-1">Establish the foundation for this global celebration archive.</CardDescription>
            </CardHeader>
            <CardContent className="pt-10 space-y-10 px-8 pb-10">
              <div className="space-y-3">
                <Label htmlFor="clientName" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Client Name / Event Title</Label>
                <Input
                  id="clientName"
                  placeholder="e.g. Sarah & John's Wedding"
                  value={formData.clientName}
                  onChange={(e) => handleChange('clientName', e.target.value)}
                  className="h-14 border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 focus:bg-white dark:focus:bg-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-50 rounded-2xl text-base font-medium transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <Label htmlFor="functionType" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Celebration Category</Label>
                  <Select
                    value={formData.functionType}
                    onValueChange={(val) => handleChange('functionType', val)}
                  >
                    <SelectTrigger className="h-14 border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 rounded-2xl font-medium focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-50 transition-all">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-2xl rounded-2xl">
                      {functionTypes.map(type => (
                        <SelectItem key={type} value={type} className="focus:bg-zinc-900 dark:focus:bg-zinc-50 focus:text-white dark:focus:text-black font-medium py-3 rounded-xl transition-colors">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="functionDate" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Celebration Date</Label>
                  <Input
                    id="functionDate"
                    type="date"
                    value={formData.functionDate}
                    onChange={(e) => handleChange('functionDate', e.target.value)}
                    className="h-14 border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 focus:bg-white dark:focus:bg-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-50 rounded-2xl font-medium transition-all"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-zinc-50/30 dark:bg-zinc-800/10 px-8 py-6 border-t border-zinc-100 dark:border-zinc-800/50 flex justify-end">
              <Button onClick={() => setActiveTab("media")} className="bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black px-10 h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all">
                Curation Phase <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="animate-in slide-in-from-right-8 duration-700">
          <Card className="max-w-4xl mx-auto shadow-sm border-zinc-100 dark:border-zinc-800/50 rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden">
            <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50 pb-8 bg-zinc-50/30 dark:bg-zinc-800/10 px-8 pt-8">
              <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Curation & Soundscape</CardTitle>
              <CardDescription className="text-sm text-zinc-500 font-medium mt-1">Upload high-resolution spread covers and choose an ambient background score.</CardDescription>
            </CardHeader>
            <CardContent className="pt-10 space-y-12 px-10 pb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4 group">
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Front Cover Artwork</Label>
                  <label htmlFor="front-cover-upload" className="border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-all group/box overflow-hidden relative aspect-video shadow-inner">
                    {formData.frontCover ? (
                      <div className="flex flex-col items-center">
                        <div className="p-4 bg-zinc-900 dark:bg-zinc-50 rounded-2xl mb-4 shadow-xl">
                          <ImageIcon className="h-7 w-7 text-white dark:text-black" />
                        </div>
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{formData.frontCover.name}</span>
                        <Badge className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mt-2">Ready</Badge>
                      </div>
                    ) : (
                      <>
                        <div className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-[2rem] mb-5 group-hover/box:scale-110 group-hover/box:rotate-3 transition-all duration-500 border border-zinc-100 dark:border-zinc-700/50">
                          <Upload className="h-9 w-9 text-zinc-400 group-hover/box:text-zinc-900 dark:group-hover/box:text-zinc-50" />
                        </div>
                        <p className="text-xs font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-[0.2em]">Drop Front Cover</p>
                        <p className="text-[10px] text-zinc-400 font-bold mt-2 uppercase tracking-tighter">High Res JPG / PNG (Max 20MB)</p>
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
                <div className="space-y-4 group">
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Back Cover Artwork</Label>
                  <label htmlFor="back-cover-upload" className="border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-all group/box overflow-hidden relative aspect-video shadow-inner">
                    {formData.backCover ? (
                      <div className="flex flex-col items-center">
                        <div className="p-4 bg-zinc-900 dark:bg-zinc-50 rounded-2xl mb-4 shadow-xl">
                          <ImageIcon className="h-7 w-7 text-white dark:text-black" />
                        </div>
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{formData.backCover.name}</span>
                        <Badge className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mt-2">Ready</Badge>
                      </div>
                    ) : (
                      <>
                        <div className="p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-[2rem] mb-5 group-hover/box:scale-110 group-hover/box:-rotate-3 transition-all duration-500 border border-zinc-100 dark:border-zinc-700/50">
                          <Upload className="h-9 w-9 text-zinc-400 group-hover/box:text-zinc-900 dark:group-hover/box:text-zinc-50" />
                        </div>
                        <p className="text-xs font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-[0.2em]">Drop Back Cover</p>
                        <p className="text-[10px] text-zinc-400 font-bold mt-2 uppercase tracking-tighter">High Res JPG / PNG (Max 20MB)</p>
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

              <div className="space-y-5">
                <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Inner Spread Archive</Label>
                <div className="border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-all group/spreads shadow-inner">
                  <div className={`p-6 rounded-[2rem] mb-6 transition-all duration-700 ${formData.innerSheets.length > 0 ? 'bg-zinc-900 text-white dark:bg-white dark:text-black scale-110 shadow-2xl rotate-12' : 'bg-zinc-50 dark:bg-zinc-800 group-hover/spreads:bg-zinc-100 dark:group-hover/spreads:bg-zinc-700 group-hover/spreads:scale-110'}`}>
                    {formData.innerSheets.length > 0 ? <CheckCircle2 className="h-10 w-10 animate-pulse" /> : <Sparkles className="h-10 w-10 text-zinc-300 dark:text-zinc-500 group-hover/spreads:text-zinc-900 dark:group-hover/spreads:text-zinc-50" />}
                  </div>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {formData.innerSheets.length > 0 ? `${formData.innerSheets.length} Spread Sheets Curated` : 'Upload Inner Experience'}
                  </p>
                  <p className="text-sm text-zinc-500 font-medium mt-3 max-w-sm">Select multiple high-resolution JPEG/PNG files that compose the heart of this visual narrative.</p>
                  <Input
                    type="file"
                    multiple
                    className="hidden"
                    id="inner-sheets-upload"
                    onChange={handleMultipleFileUpload}
                    accept="image/*"
                  />
                  <Label htmlFor="inner-sheets-upload" className="mt-8 px-10 py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-xl active:scale-95">
                    Browse Portfolio
                  </Label>
                </div>
              </div>

              <Separator className="bg-zinc-100 dark:bg-zinc-800/50" />

              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Background Score (Optional)</Label>
                <div className="relative group/score">
                  <Music className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within/score:text-zinc-900 dark:group-focus-within/score:text-zinc-50 transition-colors" />
                  <Select
                    value={formData.musicTrack}
                    onValueChange={(val) => handleChange('musicTrack', val)}
                  >
                    <SelectTrigger className="h-14 pl-12 border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 rounded-2xl font-medium focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-50 transition-all">
                      <SelectValue placeholder="Select soundscape" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-2xl rounded-2xl p-2">
                      {defaultMusicTracks.map(track => (
                        <SelectItem key={track.file} value={track.file} className="focus:bg-zinc-900 dark:focus:bg-zinc-50 focus:text-white dark:focus:text-black font-medium py-3 rounded-xl transition-colors mb-1 last:mb-0">
                          <div className="flex items-center">
                            <Music className="mr-3 h-4 w-4" />
                            <span>{track.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-zinc-50/30 dark:bg-zinc-800/10 px-10 py-8 border-t border-zinc-100 dark:border-zinc-800/50 flex justify-between">
              <Button variant="ghost" onClick={() => setActiveTab("basic")} className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-transparent h-12 px-8 rounded-xl transition-all">
                <ChevronLeft className="mr-2 h-4 w-4" /> Identity Details
              </Button>
              <Button onClick={() => setActiveTab("review")} className="bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black px-10 h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all">
                Final Review <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="animate-in slide-in-from-right-8 duration-700">
          <Card className="max-w-2xl mx-auto shadow-sm border-zinc-100 dark:border-zinc-800/50 rounded-[2.5rem] overflow-hidden bg-white dark:bg-zinc-900">
            <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50 pb-10 text-center bg-zinc-50/30 dark:bg-zinc-800/10 p-10">
              <div className="mx-auto w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center mb-6 border border-emerald-100 dark:border-emerald-500/20 shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">A New Legacy Awaits</CardTitle>
              <CardDescription className="text-sm text-zinc-500 font-medium mt-2">Publish your Pixfolio Visual Book and share the memories.</CardDescription>
            </CardHeader>
            <CardContent className="p-12 space-y-10">
              <div className="grid grid-cols-2 gap-y-10 gap-x-12">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Client / Event</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">{formData.clientName || "Untethered Title"}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Category</p>
                  <Badge variant="outline" className="text-[10px] border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 capitalize font-black rounded-full px-4 py-1 uppercase tracking-widest">{formData.functionType || "General"}</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Date of Commemoration</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-tight">{formData.functionDate || "Infinite Time"}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Asset Volume</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-tight">{formData.innerSheets.length + (formData.frontCover ? 1 : 0) + (formData.backCover ? 1 : 0)} Crafted Sheets</p>
                </div>
                <div className="col-span-2 space-y-4">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Selected Ambient Sound</p>
                  <div className="flex items-center gap-3 font-bold text-zinc-900 dark:text-zinc-50 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 px-5 py-3 rounded-2xl w-fit text-sm shadow-sm">
                    <Music className="h-4 w-4 text-zinc-400" />
                    {defaultMusicTracks.find(t => t.file === formData.musicTrack)?.name || "Silken Silence"}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-zinc-50/30 dark:bg-zinc-800/10 px-10 py-8 border-t border-zinc-100 dark:border-zinc-800/50 flex justify-between gap-6">
              <Button variant="ghost" onClick={() => setActiveTab("media")} className="text-zinc-400 font-bold text-[10px] uppercase tracking-widest hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-transparent h-12 rounded-xl transition-all">
                <ChevronLeft className="mr-2 h-4 w-4" /> Visual Identity
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black h-16 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl transition-all group active:scale-95">
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 animate-spin" />
                    Engraving History...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    Confirm & Publish
                    <Save className="h-6 w-6 group-hover:scale-125 transition-transform" />
                  </div>
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
