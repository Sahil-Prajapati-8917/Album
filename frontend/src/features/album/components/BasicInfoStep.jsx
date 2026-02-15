import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import DateSelector from '@/components/DateSelector'

const BasicInfoStep = ({ formData, setFormData, errors, setErrors, functionTypes, toTitleCase }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl shadow-sm border border-gold/10 p-8"
        >
            <div className="mb-8">
                <h2 className="text-2xl font-serif italic text-foreground">Basic Information</h2>
                <div className="w-12 h-px bg-gold mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Client Name
                    </Label>
                    <Input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        className={`h-12 border-gold/10 focus-visible:ring-gold/20 bg-muted/30 ${errors.clientName ? 'border-destructive/50' : ''}`}
                        placeholder="e.g. Sarah & Michael"
                    />
                    {errors.clientName && (
                        <p className="mt-1 text-[10px] text-destructive uppercase font-bold tracking-tighter flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.clientName}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Function Type
                    </Label>
                    <Select
                        onValueChange={(value) => {
                            setFormData(prev => ({ ...prev, functionType: value }))
                            if (errors.functionType) setErrors(prev => ({ ...prev, functionType: '' }))
                        }}
                        value={formData.functionType}
                    >
                        <SelectTrigger className={`h-12 border-gold/10 focus:ring-gold/20 bg-muted/30 ${errors.functionType ? 'border-destructive/50' : ''}`}>
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            {functionTypes.map(type => (
                                <SelectItem key={type} value={type}>{toTitleCase(type)}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.functionType && (
                        <p className="mt-1 text-[10px] text-destructive uppercase font-bold tracking-tighter flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.functionType}
                        </p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">
                        Function Date
                    </Label>
                    <DateSelector
                        value={formData.functionDate}
                        onChange={(value) => {
                            setFormData(prev => ({ ...prev, functionDate: value }))
                            if (errors.functionDate) setErrors(prev => ({ ...prev, functionDate: '' }))
                        }}
                        error={errors.functionDate}
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default BasicInfoStep
