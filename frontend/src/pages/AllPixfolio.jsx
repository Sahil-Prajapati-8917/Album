import { useState, useEffect } from 'react'
import { MoreHorizontal, Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const AllPixfolio = () => {
  const [albums, setAlbums] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadAlbums()
  }, [])

  const loadAlbums = () => {
    const storedAlbums = JSON.parse(localStorage.getItem('albums') || '[]')
    if (storedAlbums.length === 0) {
      // Mock data if empty
      const mockAlbums = [
        {
          id: 1,
          albumName: "Sarah & John's Wedding",
          clientName: "Sarah Johnson",
          functionDate: "2025-01-15",
          functionType: "wedding",
          status: "published",
        },
        {
          id: 2,
          albumName: "Birthday Bash 2025",
          clientName: "Mike Chen",
          functionDate: "2025-02-20",
          functionType: "birthday",
          status: "published",
        }
      ]
      setAlbums(mockAlbums)
    } else {
      setAlbums(storedAlbums)
    }
  }

  const handleDelete = (id) => {
    const updated = albums.filter(a => a.id !== id)
    setAlbums(updated)
    localStorage.setItem('albums', JSON.stringify(updated))
  }

  const filteredAlbums = albums.filter(album =>
    album.albumName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">All Pixfolio</h2>
          <p className="text-muted-foreground">
            Manage your digital albums and archives.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Albums</CardTitle>
          <CardDescription>
            A list of all your created albums and their current status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Album Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlbums.length > 0 ? (
                  filteredAlbums.map((album) => (
                    <TableRow key={album.id}>
                      <TableCell className="font-medium">{album.albumName}</TableCell>
                      <TableCell>{album.clientName}</TableCell>
                      <TableCell>{album.functionDate}</TableCell>
                      <TableCell className="capitalize">{album.functionType}</TableCell>
                      <TableCell>
                        <Badge variant={album.status === 'published' ? 'default' : 'secondary'}>
                          {album.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(album.id.toString())}>
                              Copy ID
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(album.id)}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AllPixfolio
