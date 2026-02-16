import React from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Music, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const MusicSelectionStep = ({ formData, setFormData, isPlaying, toggleMusic, defaultMusicTracks }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Music Selection</CardTitle>
                    <CardDescription>Choose a background track for the digital album.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-2">
                        <Label>Background Soundtrack</Label>
                        <Select
                            onValueChange={(value) => setFormData(prev => ({ ...prev, musicTrack: value }))}
                            value={formData.musicTrack}
                        >
                            <SelectTrigger className="w-full max-w-sm">
                                <SelectValue placeholder="Choose a track" />
                            </SelectTrigger>
                            <SelectContent>
                                {defaultMusicTracks.map(track => (
                                    <SelectItem key={track.file} value={track.file}>{track.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6 bg-muted/40 p-4 rounded-lg border">
                        <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            onClick={toggleMusic}
                            className="rounded-full w-12 h-12 shadow-sm"
                        >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </Button>

                        <div className="flex-1 w-full space-y-3">
                            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                                <span className="flex items-center gap-1.5"><Music className="h-3.5 w-3.5" /> {formData.musicTrack}</span>
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
                                    className="absolute h-full bg-primary rounded-full"
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
