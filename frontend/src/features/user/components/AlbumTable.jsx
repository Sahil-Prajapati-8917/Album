import React, { useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    MoreHorizontal,
    Edit,
    Trash2,
    Copy,
    Eye,
    CheckCircle,
    Clock,
    AlertCircle,
    Link as LinkIcon,
    QrCode,
    FolderOpen
} from 'lucide-react'
import { Star } from 'lucide-react'

const AlbumTable = ({ data, onDelete }) => {
    const [sorting, setSorting] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [copySuccess, setCopySuccess] = useState(null)

    const copyToClipboard = async (text, albumId) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopySuccess(albumId)
            setTimeout(() => setCopySuccess(null), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'published': return <CheckCircle className="h-3 w-3" />
            case 'draft': return <Clock className="h-3 w-3" />
            case 'pending': return <AlertCircle className="h-3 w-3" />
            default: return <Clock className="h-3 w-3" />
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'bg-gold/10 text-gold border-gold/20'
            case 'draft': return 'bg-muted text-muted-foreground border-border'
            case 'pending': return 'bg-orange-500/10 text-orange-600 border-orange-200 dark:text-orange-400 dark:border-orange-900/50'
            default: return 'bg-muted text-muted-foreground'
        }
    }

    const columns = [
        {
            accessorKey: "albumName",
            header: "Artistic Vision",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="text-sm font-serif italic text-foreground">{row.getValue("albumName")}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">{row.original.functionType}</span>
                </div>
            ),
        },
        {
            accessorKey: "clientName",
            header: "Patron",
            cell: ({ row }) => (
                <div className="text-sm text-muted-foreground font-light">{row.getValue("clientName")}</div>
            ),
        },
        {
            accessorKey: "totalSheets",
            header: "Pages",
            cell: ({ row }) => (
                <div className="text-xs font-bold text-muted-foreground">{row.getValue("totalSheets")}</div>
            ),
        },
        {
            accessorKey: "status",
            header: "Curation",
            cell: ({ row }) => (
                <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(row.getValue("status"))}`}>
                    {getStatusIcon(row.getValue("status"))}
                    <span className="ml-1.5">{row.getValue("status")}</span>
                </div>
            ),
        },
        {
            accessorKey: "functionDate",
            header: "Exhibition Date",
            cell: ({ row }) => (
                <div className="text-xs text-muted-foreground">
                    {new Date(row.getValue("functionDate")).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
            ),
        },
        {
            accessorKey: "viewersCount",
            header: "Audience",
            cell: ({ row }) => (
                <div className="flex items-center text-xs text-muted-foreground">
                    <Eye className="h-3.5 w-3.5 mr-1.5 text-gold/60" />
                    {row.getValue("viewersCount")}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Legacy Tools",
            cell: ({ row }) => {
                const album = row.original
                return (
                    <div className="flex items-center space-x-1">
                        <Button
                            onClick={() => copyToClipboard(album.link, album.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gold hover:bg-gold/10 hover:text-gold"
                            title="Copy Legacy Link"
                        >
                            {copySuccess === album.id ? <CheckCircle className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gold hover:bg-gold/10 hover:text-gold"
                            title="Generate QR Access"
                            onClick={() => alert('Developing QR Secure Access...')}
                        >
                            <QrCode className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gold hover:bg-gold/10 hover:text-gold"
                            title="Enhance"
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={() => onDelete(album)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            title="Retire"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="bg-card rounded-2xl shadow-sm border border-gold/10 overflow-hidden">
            <div className="w-full overflow-x-auto">
                <Table>
                    <TableHeader className="bg-muted/30">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-b border-gold/10 hover:bg-transparent">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground py-6 px-6 h-auto whitespace-nowrap">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="border-b border-gold/5 hover:bg-gold/5 transition-colors group"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-6 px-6">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center opacity-30">
                                        <FolderOpen className="h-12 w-12 mb-4" />
                                        <p className="text-xs font-bold uppercase tracking-widest">No entries found in the archive</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="px-8 py-6 border-t border-gold/5 flex items-center justify-between bg-muted/10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 border-gold/10 text-gold hover:bg-gold/5 px-4 font-serif italic text-xs"
                    >
                        Previous Act
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="h-8 border-gold/10 text-gold hover:bg-gold/5 px-4 font-serif italic text-xs"
                    >
                        Next Act
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AlbumTable
