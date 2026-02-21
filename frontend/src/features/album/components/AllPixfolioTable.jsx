import { Eye, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const AllPixfolioTable = ({
    albums,
    onView,
    onEdit,
    onDelete,
    onCopyLink,
    onOpenQRCode
}) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[60px]">S.No</TableHead>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Function</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Song Name</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>QR Code</TableHead>
                        <TableHead>Copy</TableHead>
                        <TableHead className="w-[100px] text-right">View</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {albums.length > 0 ? (
                        albums.map((album, index) => (
                            <TableRow key={album.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{album.clientName}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="capitalize">
                                        {album.functionType}
                                    </Badge>
                                </TableCell>
                                <TableCell>{album.functionDate}</TableCell>
                                <TableCell className="max-w-[150px] truncate">{album.songName}</TableCell>
                                <TableCell>{album.views}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => onOpenQRCode(album)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-qr-code"
                                        >
                                            <rect width="5" height="5" x="3" y="3" rx="1" />
                                            <rect width="5" height="5" x="16" y="3" rx="1" />
                                            <rect width="5" height="5" x="3" y="16" rx="1" />
                                            <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                                            <path d="M21 21v.01" />
                                            <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                                            <path d="M3 12h.01" />
                                            <path d="M12 3h.01" />
                                            <path d="M12 16h.01" />
                                            <path d="M16 12h1" />
                                            <path d="M21 12h.01" />
                                            <path d="M12 21v-1" />
                                        </svg>
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => onCopyLink(album.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-copy"
                                        >
                                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                        </svg>
                                    </Button>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                            onClick={() => onView(album.id)}
                                            title="Open in Viewer"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-yellow-600 hover:text-yellow-700"
                                            onClick={() => onEdit(album.id)}
                                            title="Edit"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-500 hover:text-red-600"
                                            onClick={() => onDelete(album.id)}
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AllPixfolioTable
