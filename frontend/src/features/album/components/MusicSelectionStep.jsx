import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Music, Volume2, Search, Download, Loader2, Clock } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { searchYouTubeSongs, downloadYouTubeSong } from '@/shared/api/api'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/dialog"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card"

const MusicSelectionStep = ({ formData, setFormData, isPlaying, toggleMusic, defaultMusicTracks }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [downloadingSongId, setDownloadingSongId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const audioRef = useRef(null)

    // Handle play/pause logic dynamically for custom music vs default
    useEffect(() => {
        // If a custom track is selected via YouTube
        if (formData.musicUrl) {
            if (!audioRef.current) {
                const url = formData.musicUrl.startsWith('http') ? formData.musicUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001'}${formData.musicUrl}`
                audioRef.current = new Audio(url)
            }
            
            audioRef.current.volume = formData.volume / 100

            if (isPlaying) {
                // If starting fresh, start from their selected start time
                if (audioRef.current.currentTime === 0) {
                    audioRef.current.currentTime = formData.musicStartTime || 0
                }
                audioRef.current.play().catch(e => console.log('Audio play blocked:', e))
            } else {
                audioRef.current.pause()
            }
        } else {
            // Default track logic is currently handled outside this component
            // We just let the parent handle the `isPlaying` state for default tracks
        }
    }, [isPlaying, formData.musicUrl, formData.volume, formData.musicStartTime])

    // Clean up audio on unmount or URL change
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [formData.musicUrl])

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim()) {
                executeSearch()
            } else {
                setSearchResults([]) // clear results if query is empty
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [searchQuery])

    const executeSearch = async () => {
        setIsSearching(true)
        try {
            const res = await searchYouTubeSongs(searchQuery)
            if (res.success) {
                setSearchResults(res.data)
            }
        } catch (error) {
            console.error("Search failed:", error)
        } finally {
            setIsSearching(false)
        }
    }

    const handleSelectSong = async (song) => {
        setDownloadingSongId(song.videoId)
        try {
            const res = await downloadYouTubeSong({
                videoId: song.videoId,
                title: song.title,
                author: song.author,
                thumbnail: song.thumbnail,
                durationSeconds: song.duration
            })
            if (res.success) {
                const downloadedSong = res.data
                // Pause current audio if playing
                if (isPlaying) toggleMusic()
                if (audioRef.current) {
                    audioRef.current.pause()
                    audioRef.current = null
                }

                setFormData(prev => ({
                    ...prev,
                    musicTrack: downloadedSong.title,
                    musicUrl: downloadedSong.filePath,
                    musicStartTime: 0 // Reset start time for new song
                }))
                setIsModalOpen(false)
            }
        } catch (error) {
            console.error("Download failed:", error)
            alert("Failed to process song. Please try another.")
        } finally {
            setDownloadingSongId(null)
        }
    }

    const handleFormatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
        const s = Math.floor(seconds % 60)
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Music Selection</CardTitle>
                    <CardDescription>Search YouTube or choose a background track for the digital album.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    
                    {/* YouTube Search Modal */}
                    <div className="space-y-2">
                        <Label>Select Soundtrack</Label>
                        <div className="flex gap-4 items-center">
                            <div className="flex-1 bg-muted/40 p-3 rounded-md border text-sm flex items-center gap-2 overflow-hidden">
                                <Music className="w-4 h-4 text-primary shrink-0" />
                                <span className="font-medium truncate">
                                    {formData.musicTrack}
                                </span>
                            </div>
                            
                            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="shrink-0 gap-2">
                                        <Search className="w-4 h-4" />
                                        Search YouTube
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
                                    <DialogHeader>
                                        <DialogTitle>Search YouTube Music</DialogTitle>
                                        <DialogDescription>
                                            Find the perfect track for this digital album.
                                        </DialogDescription>
                                    </DialogHeader>
                                    
                                    <div className="flex gap-2 my-2 relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input 
                                            placeholder="Search songs, artists..." 
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-9 pr-10"
                                        />
                                        {isSearching && (
                                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                                        )}
                                    </div>

                                    <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                                        {searchResults.map((song) => (
                                            <div key={song.videoId} className="flex gap-3 p-2 border rounded-lg hover:bg-muted/50 transition-colors items-center">
                                                <img src={song.thumbnail} alt={song.title} className="w-20 h-14 object-cover rounded-md" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{song.title}</p>
                                                    <p className="text-xs text-muted-foreground">{song.author} • {song.durationTimestamp}</p>
                                                </div>
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => handleSelectSong(song)}
                                                    disabled={!!downloadingSongId}
                                                >
                                                    {downloadingSongId === song.videoId ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Select'}
                                                </Button>
                                            </div>
                                        ))}
                                        {searchResults.length === 0 && !isSearching && (
                                            <div className="text-center py-8 text-muted-foreground text-sm">
                                                Search for a track to see results here.
                                            </div>
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* Time Frame Selection */}
                    {formData.musicUrl && (
                        <div className="space-y-4 pt-4 border-t">
                            <div className="flex justify-between items-center">
                                <Label className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    Start Time (seconds)
                                </Label>
                                <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                                    {handleFormatTime(formData.musicStartTime || 0)}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Choose exactly when the music should start playing when the client opens the first page.</p>
                            <Input 
                                type="number" 
                                min="0" 
                                value={formData.musicStartTime || 0}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value) || 0
                                    setFormData(prev => ({ ...prev, musicStartTime: val }))
                                    if (audioRef.current) {
                                        audioRef.current.currentTime = val
                                    }
                                }}
                                className="w-full max-w-[200px]"
                            />
                        </div>
                    )}

                    {/* Player Controls */}
                    <div className="flex flex-col md:flex-row items-center gap-6 bg-muted/40 p-4 rounded-lg border mt-4">
                        <Button
                            type="button"
                            variant={isPlaying ? "default" : "secondary"}
                            size="icon"
                            onClick={toggleMusic}
                            className="rounded-full w-12 h-12 shadow-sm transition-all duration-300"
                        >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
                        </Button>

                        <div className="flex-1 w-full space-y-3">
                            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                                <span className="flex items-center gap-1.5"><Music className="h-3.5 w-3.5" /> Previewing Track</span>
                                <span>Volume: {formData.volume}%</span>
                            </div>
                            <div className="relative w-full h-1.5 bg-secondary rounded-full">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.volume}
                                    onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div
                                    className="absolute h-full bg-primary rounded-full transition-all duration-150"
                                    style={{ width: `${formData.volume}%` }}
                                />
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </motion.div>
    )
}

export default MusicSelectionStep