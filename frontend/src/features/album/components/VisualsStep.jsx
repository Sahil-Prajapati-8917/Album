import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Upload, Plus, X, AlertCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <Card>
                <CardHeader>
                    <CardTitle>Covers</CardTitle>
                    <CardDescription>Upload the first and last pages of the album.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>First Page (Front Cover)</Label>
                            <div className={`relative group border-2 border-dashed ${formData.frontCover ? 'border-primary/50' : 'border-border'} rounded-lg p-4 text-center transition-all cursor-pointer overflow-hidden aspect-[4/3] flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/40`}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'frontCover')}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                {frontPreview ? (
                                    <img src={frontPreview} alt="Front Preview" className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className="h-6 w-6 text-muted-foreground" />
                                        <p className="text-xs font-medium">Upload File</p>
                                    </div>
                                )}
                            </div>
                            {errors.frontCover && (
                                <p className="text-xs font-medium text-destructive flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.frontCover}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Last Page (Back Cover)</Label>
                            <div className={`relative group border-2 border-dashed ${formData.backCover ? 'border-primary/50' : 'border-border'} rounded-lg p-4 text-center transition-all cursor-pointer overflow-hidden aspect-[4/3] flex flex-col items-center justify-center bg-muted/20 hover:bg-muted/40`}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'backCover')}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                {backPreview ? (
                                    <img src={backPreview} alt="Back Preview" className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className="h-6 w-6 text-muted-foreground" />
                                        <p className="text-xs font-medium">Upload File</p>
                                    </div>
                                )}
                            </div>
                            {errors.backCover && (
                                <p className="text-xs font-medium text-destructive flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.backCover}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Inner Sheets / Pages</CardTitle>
                    <CardDescription>Upload multiple photos to serve as inner spreads.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="relative group border-2 border-dashed border-border rounded-lg p-8 text-center transition-all cursor-pointer bg-muted/20 hover:bg-muted/40">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleMultipleFileUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center border shadow-sm group-hover:scale-110 transition-transform">
                                <Plus className="h-5 w-5 text-primary" />
                            </div>
                            <p className="text-sm font-medium">Click to add photos or drag and drop</p>
                            <p className="text-xs text-muted-foreground">{formData.innerSheets.length} files selected</p>
                        </div>
                    </div>

                    {formData.innerSheets.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {formData.innerSheets.map((file, index) => {
                                let url = '#'
                                try {
                                    if (file instanceof File) {
                                        url = URL.createObjectURL(file)
                                    }
                                } catch (e) { }

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative aspect-square bg-muted rounded-md border overflow-hidden group"
                                    >
                                        <img src={url} alt={`Sheet ${index}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-sm"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}

                    {errors.innerSheets && (
                        <p className="text-xs font-medium text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.innerSheets}
                        </p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default VisualsStep
