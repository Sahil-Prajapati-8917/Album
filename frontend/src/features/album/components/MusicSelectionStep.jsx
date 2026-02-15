import React from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Music2, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const MusicSelectionStep = ({ formData, setFormData, isPlaying, toggleMusic, defaultMusicTracks }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl shadow-sm border border-gold/10 p-8"
        >
            <div className="mb-8">
                <h2 className="text-2xl font-serif italic text-foreground">Music Selection</h2>
                <div className="w-12 h-px bg-gold mt-2"></div>
            </div>

            <div className="space-y-8">
                <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Background Soundtrack
                    </Label>
                    <Select
                        onValueChange={(value) => setFormData(prev => ({ ...prev, musicTrack: value }))}
                        value={formData.musicTrack}
                    >
                        <SelectTrigger className="h-12 border-gold/10 focus:ring-gold/20 bg-muted/30">
                            <SelectValue placeholder="Choose a track" />
                        </SelectTrigger>
                        <SelectContent>
                            {defaultMusicTracks.map(track => (
                                <SelectItem key={track.file} value={track.file}>{track.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 bg-muted/20 p-6 rounded-xl border border-gold/5">
                    <Button
                        type="button"
                        onClick={toggleMusic}
                        className={`${isPlaying ? 'bg-gold/20 text-gold border-gold/50' : 'bg-gold text-white'} rounded-full w-14 h-14 p-0 shadow-lg group transition-all`}
                    >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                    </Button>

                    <div className="flex-1 w-full space-y-4">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            <span className="flex items-center"><Music2 className="h-3 w-3 mr-2 text-gold" /> {formData.musicTrack}</span>
                            <span>Volume: {formData.volume}%</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Volume2 className="h-4 w-4 text-gold" />
                            <div className="relative w-full h-1 bg-muted rounded-full">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.volume}
                                    onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div
                                    className="absolute h-full bg-gold rounded-full"
                                    style={{ width: `${formData.volume}%` }}
                                />
                                <div
                                    className="absolute h-3 w-3 bg-gold rounded-full top-1/2 -translate-y-1/2 -ml-1.5 pointer-events-none"
                                    style={{ left: `${formData.volume}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default MusicSelectionStep
