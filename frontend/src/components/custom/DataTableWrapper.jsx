import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export const DataTableWrapper = ({ columns, data, onRowClick, className }) => {
    return (
        <div className={cn("rounded-md border border-gold/10 overflow-hidden", className)}>
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        {columns.map((col, index) => (
                            <TableHead key={index} className="font-semibold text-foreground/80">
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={cn("hover:bg-gold/5 transition-colors", onRowClick && "cursor-pointer")}
                            >
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex}>
                                        {col.cell ? col.cell(row) : row[col.accessorKey]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
