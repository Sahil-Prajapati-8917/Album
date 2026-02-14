import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { PrimaryButton } from "./PrimaryButton"
import { SecondaryButton } from "./SecondaryButton"
import { Crown } from "lucide-react"

export const PremiumModal = ({ isOpen, onClose, title, description, onConfirm, confirmText = "Upgrade Now" }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] border-gold/30 shadow-premium-lg">
                <DialogHeader>
                    <div className="mx-auto bg-gold/10 p-3 rounded-full w-fit mb-4">
                        <Crown className="w-8 h-8 text-gold" />
                    </div>
                    <DialogTitle className="text-center text-xl font-serif">{title}</DialogTitle>
                    <DialogDescription className="text-center">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                    <SecondaryButton onClick={onClose} className="w-full sm:w-1/2">
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton onClick={onConfirm} className="w-full sm:w-1/2">
                        {confirmText}
                    </PrimaryButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
