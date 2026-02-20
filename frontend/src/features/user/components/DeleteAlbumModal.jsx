import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const DeleteAlbumModal = ({ isOpen, onClose, onConfirm, albumName }) => {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-transparent backdrop-blur-md overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-card p-10 border border-gold/20 w-full max-w-md shadow-2xl rounded-3xl text-center"
                >
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trash2 className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-2xl font-serif italic text-foreground mb-2">Retire Legacy?</h3>
                    <p className="text-sm text-muted-foreground mb-8 font-light italic">
                        Are you sure you want to retire "{albumName}"? This vision will be lost to time.
                    </p>
                    <div className="flex space-x-4">
                        <Button
                            onClick={onClose}
                            variant="ghost"
                            className="flex-1 h-12 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl font-bold text-xs uppercase tracking-widest"
                        >
                            Keep Vision
                        </Button>
                        <Button
                            onClick={onConfirm}
                            variant="destructive"
                            className="flex-1 h-12 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg"
                        >
                            Retire Act
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default DeleteAlbumModal
