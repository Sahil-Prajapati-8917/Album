import { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2, MapPin, Phone, User, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

import {
    getMyPhotographers,
    createPhotographer,
    updatePhotographer,
    deletePhotographer
} from '@/services/api'

export default function Photographers() {
    const [photographers, setPhotographers] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        city: '',
        state: '',
        address: '',
        status: 'Active'
    })

    // Load from backend on mount
    useEffect(() => {
        fetchPhotographers()
    }, [])

    const fetchPhotographers = async () => {
        setIsLoading(true)
        try {
            const response = await getMyPhotographers()
            if (response.success) {
                // Map _id to id for frontend compatibility
                const mapped = response.data.map(p => ({ ...p, id: p._id }))
                setPhotographers(mapped)
            }
        } catch (error) {
            console.error('Failed to fetch photographers:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleOpenDialog = (photographer = null) => {
        if (photographer) {
            setEditingId(photographer.id)
            setFormData(photographer)
        } else {
            setEditingId(null)
            setFormData({ name: '', mobile: '', city: '', state: '', address: '', status: 'Active' })
        }
        setIsDialogOpen(true)
    }

    const handleSave = async () => {
        if (!formData.name || !formData.mobile) return // Basic validation

        try {
            if (editingId) {
                const response = await updatePhotographer(editingId, formData)
                if (response.success) {
                    setPhotographers(prev => prev.map(p => p.id === editingId ? { ...response.data, id: response.data._id } : p))
                }
            } else {
                const response = await createPhotographer(formData)
                if (response.success) {
                    setPhotographers(prev => [...prev, { ...response.data, id: response.data._id }])
                }
            }
            setIsDialogOpen(false)
        } catch (error) {
            console.error('Failed to save photographer:', error)
            alert('Failed to save photographer. Please try again.')
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this photographer?")) {
            try {
                const response = await deletePhotographer(id)
                if (response.success) {
                    setPhotographers(prev => prev.filter(p => p.id !== id))
                }
            } catch (error) {
                console.error('Failed to delete photographer:', error)
                alert('Failed to delete photographer.')
            }
        }
    }

    const filteredPhotographers = photographers.filter(p =>
        (p.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (p.city?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    )

    return (
        <div className="flex-1 space-y-6 pb-10 max-w-6xl mx-auto w-full pt-4 md:pt-8 px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Your Photographers</h1>
                    <p className="text-muted-foreground mt-1">Manage your photography partners and contacts.</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="bg-primary text-primary-foreground">
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>

            <Card className="border shadow-sm">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Partners Directory</CardTitle>
                        <div className="relative w-full max-w-sm ml-auto">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search by name or city..."
                                className="pl-8 bg-background"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead>Photographer</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPhotographers.length > 0 ? (
                                    filteredPhotographers.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {p.name.charAt(0)}
                                                    </div>
                                                    {p.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Phone className="mr-2 h-3.5 w-3.5" />
                                                    {p.mobile}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-sm">{p.city}</span>
                                                    <span className="text-xs text-muted-foreground flex items-center mt-0.5">
                                                        <MapPin className="mr-1 h-3 w-3" /> {p.state}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={p.status === 'Active' ? 'default' : 'secondary'}
                                                    className={p.status === 'Active' ? 'bg-emerald-500/15 text-emerald-600 border-emerald-200' : ''}>
                                                    {p.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleOpenDialog(p)}>
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(p.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                            No photographers found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingId ? 'Edit Photographer' : 'Add New Photographer'}</DialogTitle>
                        <DialogDescription>
                            Enter the details of your photography partner here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name <span className="text-destructive">*</span></Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3" placeholder="John Doe" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="mobile" className="text-right">Mobile <span className="text-destructive">*</span></Label>
                            <Input id="mobile" name="mobile" value={formData.mobile} onChange={handleInputChange} className="col-span-3" placeholder="Phone Number" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="city" className="text-right">City</Label>
                            <Input id="city" name="city" value={formData.city} onChange={handleInputChange} className="col-span-3" placeholder="City" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="state" className="text-right">State</Label>
                            <Input id="state" name="state" value={formData.state} onChange={handleInputChange} className="col-span-3" placeholder="State" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">Address</Label>
                            <Input id="address" name="address" value={formData.address} onChange={handleInputChange} className="col-span-3" placeholder="Full Address" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Status</Label>
                            <div className="col-span-3 flex gap-4">
                                <Button
                                    type="button"
                                    variant={formData.status === 'Active' ? 'default' : 'outline'}
                                    size="sm"
                                    className={formData.status === 'Active' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : ''}
                                    onClick={() => setFormData(prev => ({ ...prev, status: 'Active' }))}
                                >
                                    <CheckCircle2 className="mr-2 h-4 w-4" /> Active
                                </Button>
                                <Button
                                    type="button"
                                    variant={formData.status === 'Inactive' ? 'default' : 'outline'}
                                    size="sm"
                                    className={formData.status === 'Inactive' ? 'bg-slate-500 hover:bg-slate-600 text-white' : ''}
                                    onClick={() => setFormData(prev => ({ ...prev, status: 'Inactive' }))}
                                >
                                    <XCircle className="mr-2 h-4 w-4" /> Inactive
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button type="submit" onClick={handleSave}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
