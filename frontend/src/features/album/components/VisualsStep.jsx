import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Upload, Plus, Sparkles, X, AlertCircle, ImageIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'

const VisualsStep = ({ formData, handleFileUpload, handleMultipleFileUpload, removeFile, errors }) => {

    const frontPreview = useMemo(() => {
        if (formData.frontCover && formData.frontCover instanceof File) {
            return URL.createObjectURL(formData.frontCover)
        }
        return null
    }, [formData.frontCover])

    const backPreview = useMemo(() => {
        if (formData.backCover && formData.backCover instanceof File) {
            return URL.createObjectURL(formData.backCover)
        }
        return null
    }, [formData.backCover])

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl shadow-sm border border-gold/10 p-8"
        >
            <div className="mb-8">
                <h2 className="text-2xl font-serif italic text-foreground">Visual Assets</h2>
                <div className="w-12 h-px bg-gold mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Front Cover / First Page */}
                <div className="space-y-4">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        First Page (Front Cover)
                    </Label>
                    <div className={`relative group border-2 border-dashed ${formData.frontCover ? 'border-gold bg-gold/5' : 'border-gold/10 hover:border-gold/30'} rounded-2xl p-4 text-center transition-all cursor-pointer overflow-hidden aspect-video flex flex-col items-center justify-center`}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'frontCover')}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        {frontPreview ? (
                            <img src={frontPreview} alt="Front Preview" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                        ) : (
                            <div className="relative z-0">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${formData.frontCover ? 'bg-gold text-white' : 'bg-muted text-gold group-hover:scale-110 transition-transform'}`}>
                                    <Upload className="h-6 w-6" />
                                </div>
                                <p className="text-sm font-medium text-foreground">Upload First Page</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter mt-1">PNG, JPG up to 10MB</p>
                            </div>
                        )}
                        {formData.frontCover && (
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                                <p className="text-white text-xs font-bold uppercase tracking-widest">Change First Page</p>
                            </div>
                        )}
                    </div>
                    {errors.frontCover && (
                        <p className="mt-1 text-[10px] text-destructive uppercase font-bold tracking-tighter flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.frontCover}
                        </p>
                    )}
                </div>

                {/* Back Cover / Last Page */}
                <div className="space-y-4">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Last Page (Back Cover)
                    </Label>
                    <div className={`relative group border-2 border-dashed ${formData.backCover ? 'border-gold bg-gold/5' : 'border-gold/10 hover:border-gold/30'} rounded-2xl p-4 text-center transition-all cursor-pointer overflow-hidden aspect-video flex flex-col items-center justify-center`}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'backCover')}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        {backPreview ? (
                            <img src={backPreview} alt="Back Preview" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                        ) : (
                            <div className="relative z-0">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${formData.backCover ? 'bg-gold text-white' : 'bg-muted text-gold group-hover:scale-110 transition-transform'}`}>
                                    <Upload className="h-6 w-6" />
                                </div>
                                <p className="text-sm font-medium text-foreground">Upload Last Page</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter mt-1">PNG, JPG up to 10MB</p>
                            </div>
                        )}
                        {formData.backCover && (
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                                <p className="text-white text-xs font-bold uppercase tracking-widest">Change Last Page</p>
                            </div>
                        )}
                    </div>
                    {errors.backCover && (
                        <p className="mt-1 text-[10px] text-destructive uppercase font-bold tracking-tighter flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.backCover}
                        </p>
                    )}
                </div>
            </div>

            {/* Inner Sheets */}
            <div className="mt-10 space-y-4">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Inner Sheets / Pages
                </Label>
                <div className={`relative group border-2 border-dashed ${formData.innerSheets.length > 0 ? 'border-gold/30 bg-gold/5' : 'border-gold/10 hover:border-gold/30'} rounded-2xl p-10 text-center transition-all cursor-pointer`}>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleMultipleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gold/10 group-hover:scale-110 transition-transform">
                        <Plus className="h-8 w-8 text-gold" />
                    </div>
                    <p className="text-base font-serif italic text-foreground">Add Inner Sheet Photos</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">{formData.innerSheets.length} files selected</p>
                </div>

                {/* Uploaded Files Grid */}
                {formData.innerSheets.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {formData.innerSheets.map((file, index) => {
                            let url = '#'
                            try {
                                if (file instanceof File) {
                                    url = URL.createObjectURL(file)
                                }
                            } catch (e) {
                                console.error("Error creating URL for file:", file)
                            }

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative aspect-square bg-muted/30 rounded-lg border border-gold/10 overflow-hidden group"
                                >
                                    <img src={url} alt={`Sheet ${index}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-20 shadow-lg"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                    <div className="absolute bottom-0 left-0 right-0 p-1 bg-black/50 text-[8px] text-white truncate font-medium">
                                        {file.name}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}

                {errors.innerSheets && (
                    <p className="mt-1 text-[10px] text-destructive uppercase font-bold tracking-tighter flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.innerSheets}
                    </p>
                )}
            </div>
        </motion.div>
    )
}

export default VisualsStep
