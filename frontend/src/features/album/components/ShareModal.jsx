import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Check, Facebook, Twitter, Instagram, Linkedin, Link as LinkIcon } from "lucide-react"
import { toast } from "sonner"

const ShareModal = ({ isOpen, onClose, url, title }) => {
    const [copied, setCopied] = useState(false)

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        toast.success("Link copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
    }

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Check out this photo album: ' + title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this photo album: ' + title + ' ' + url)}`
    }

    const handleShare = (platform) => {
        window.open(shareLinks[platform], '_blank', 'noopener,noreferrer')
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-white border border-gray-100 text-slate-900 shadow-xl dark:bg-slate-900 dark:border-slate-800 dark:text-white rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold mb-2">
                        Share this content
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col space-y-6">
                    {/* Share Link Section */}
                    <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                readOnly
                                value={url}
                                className="pl-9 pr-4 bg-muted/50 border-muted"
                            />
                        </div>
                        <Button
                            onClick={handleCopyLink}
                            className={`min-w-[100px] transition-all bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-sm ${copied ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                        >
                            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                            {copied ? "Copied" : "Copy"}
                        </Button>
                    </div>

                    <div className="flex items-center justify-center pt-2">
                        <span className="text-sm text-muted-foreground">Or share via</span>
                    </div>

                    {/* Social Icons row */}
                    <div className="flex justify-center gap-4 pb-2">
                        <button
                            onClick={() => handleShare('facebook')}
                            className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                            title="Share on Facebook"
                        >
                            <Facebook size={22} fill="currentColor" strokeWidth={0} />
                        </button>
                        <button
                            onClick={() => handleShare('twitter')}
                            className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md dark:border dark:border-white/20"
                            title="Share on X"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[22px] h-[22px] fill-current text-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                        </button>
                        <button
                            onClick={() => handleShare('linkedin')}
                            className="w-12 h-12 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                            title="Share on LinkedIn"
                        >
                            <Linkedin size={22} fill="currentColor" strokeWidth={0} />
                        </button>
                        <button
                            onClick={() => handleShare('whatsapp')}
                            className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                            title="Share on WhatsApp"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ShareModal
