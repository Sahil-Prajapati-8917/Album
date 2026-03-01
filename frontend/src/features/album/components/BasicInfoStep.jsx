import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card"
import DateSelector from '@/shared/ui/DateSelector'
import { getMyPhotographers } from '@/shared/api/api'

const BasicInfoStep = ({ formData, setFormData, errors, setErrors, functionTypes, toTitleCase }) => {
    const [photographers, setPhotographers] = useState([])

    useEffect(() => {
        const fetchPhotographers = async () => {
            try {
                const response = await getMyPhotographers()
                if (response.success) {
                    setPhotographers(response.data)
                }
            } catch (error) {
                console.error("Error fetching photographers:", error)
            }
        }
        fetchPhotographers()
    }, [])

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

                        <div className="space-y-2">
                            <Label>Photographer (Optional)</Label>
                            <Select
                                onValueChange={(value) => {
                                    setFormData(prev => ({ ...prev, photographerId: value }))
                                    if (errors.photographerId) setErrors(prev => ({ ...prev, photographerId: '' }))
                                }}
                                value={formData.photographerId}
                            >
                                <SelectTrigger className={errors.photographerId ? 'border-destructive' : ''}>
                                    <SelectValue placeholder="Select photographer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {photographers.map(p => (
                                        <SelectItem key={p._id || p.id} value={p._id || p.id}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
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
