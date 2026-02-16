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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Enter the event details and client information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="clientName">Client Name</Label>
                            <Input
                                id="clientName"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleInputChange}
                                placeholder="e.g. Sarah & Michael"
                                className={errors.clientName ? 'border-destructive' : ''}
                            />
                            {errors.clientName && (
                                <p className="text-xs font-medium text-destructive flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.clientName}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Function Type</Label>
                            <Select
                                onValueChange={(value) => {
                                    setFormData(prev => ({ ...prev, functionType: value }))
                                    if (errors.functionType) setErrors(prev => ({ ...prev, functionType: '' }))
                                }}
                                value={formData.functionType}
                            >
                                <SelectTrigger className={errors.functionType ? 'border-destructive' : ''}>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {functionTypes.map(type => (
                                        <SelectItem key={type} value={type}>{toTitleCase(type)}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.functionType && (
                                <p className="text-xs font-medium text-destructive flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.functionType}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2 space-y-2">
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
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default BasicInfoStep
