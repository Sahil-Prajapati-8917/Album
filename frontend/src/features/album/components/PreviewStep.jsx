import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PreviewStep = ({ formData, toTitleCase, handleSubmit, isSubmitting, setPreviewMode }) => {
    return (
        <div className="max-w-4xl mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif italic text-foreground">Visual Book Preview</h1>
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
                className="bg-card rounded-2xl shadow-2xl border border-gold/10 p-12 overflow-hidden relative"
            >
                <div className="absolute top-0 right-0 p-4">
                    <Sparkles className="h-6 w-6 text-gold/20" />
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif text-foreground mb-3">
                        {formData.clientName}
                    </h2>
                    <div className="flex items-center justify-center space-x-4">
                        <span className="w-10 h-px bg-gold/30"></span>
                        <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">{toTitleCase(formData.functionType)}</p>
                        <span className="w-10 h-px bg-gold/30"></span>
                    </div>
                    <p className="text-muted-foreground mt-6 font-light">Function Date: {new Date(formData.functionDate).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-lg aspect-video bg-muted/40 rounded-xl flex items-center justify-center border border-gold/10 shadow-inner group">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-gold/10 group-hover:scale-110 transition-transform">
                                <Eye className="h-8 w-8 text-gold" />
                            </div>
                            <p className="text-sm font-serif italic text-muted-foreground">Interactive Visual Book Preview</p>
                            <div className="flex items-center justify-center mt-4 space-x-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
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

export default PreviewStep
