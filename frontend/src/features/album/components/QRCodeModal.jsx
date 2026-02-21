import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QRCode } from "react-qr-code"
import { Download, Copy, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const QRCodeModal = ({ isOpen, onClose, url, title }) => {
    const [copied, setCopied] = useState(false)

    const handleDownload = () => {
        const svg = document.getElementById("qr-code-svg")
        if (!svg) return

        const svgData = new XMLSerializer().serializeToString(svg)
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        const img = new Image()

        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            // Fill background with white
            ctx.fillStyle = "#FFFFFF"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, 0, 0)
            const pngFile = canvas.toDataURL("image/png")

            const downloadLink = document.createElement("a")
            downloadLink.download = `${title.replace(/\s+/g, "-")}-qrcode.png`
            downloadLink.href = pngFile
            downloadLink.click()
        }

        img.src = "data:image/svg+xml;base64," + btoa(svgData)
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        toast.success("Link copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-black text-foreground dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center space-y-6 py-6 transition-colors">
                    <div className="p-4 bg-white rounded-lg border shadow-sm">
                        <QRCode
                            id="qr-code-svg"
                            value={url}
                            size={200}
                            level="H"
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                        />
                    </div>
                    <p className="text-sm text-center text-muted-foreground break-all px-4">
                        {url}
                    </p>
                    <div className="flex gap-4 w-full justify-center">
                        <Button onClick={handleDownload} className="flex-1 max-w-[140px]">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleCopyLink}
                            className="flex-1 max-w-[140px]"
                        >
                            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                            {copied ? "Copied" : "Copy Link"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default QRCodeModal
