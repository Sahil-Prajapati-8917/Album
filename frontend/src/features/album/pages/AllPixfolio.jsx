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
      setTimeout(() => setAlbums(mockAlbums), 0)
    } else {
      setTimeout(() => setAlbums(storedAlbums), 0)
    }
  }

  useEffect(() => {
    loadAlbums()
  }, [])

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
    <div className="flex-1 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">All Pixfolios</h1>
        <p className="text-muted-foreground font-medium">
          Manage your digital albums, view analytics, and organize your archives.
        </p>
      </div>

      <Card className="shadow-sm border-muted rounded-xl overflow-hidden bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-foreground">Albums Repository</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            A comprehensive list of all your created visual books and their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center pb-6">
            <div className="relative w-full max-w-sm group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
              <Input
                placeholder="Filter by name or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 border-input bg-muted/30 focus:bg-background focus:ring-1 focus:ring-ring rounded-lg transition-all"
              />
            </div>
          </div>
          <div className="rounded-xl border border-muted overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="font-semibold text-muted-foreground h-11 text-xs uppercase tracking-wider">Album Name</TableHead>
                  <TableHead className="font-semibold text-muted-foreground h-11 text-xs uppercase tracking-wider">Client</TableHead>
                  <TableHead className="font-semibold text-muted-foreground h-11 text-xs uppercase tracking-wider">Date</TableHead>
                  <TableHead className="font-semibold text-muted-foreground h-11 text-xs uppercase tracking-wider">Type</TableHead>
                  <TableHead className="font-semibold text-muted-foreground h-11 text-xs uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-right font-semibold text-muted-foreground h-11 text-xs uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlbums.length > 0 ? (
                  filteredAlbums.map((album) => (
                    <TableRow key={album.id} className="hover:bg-white transition-colors border-border">
                      <TableCell className="font-bold text-zinc-900">{album.albumName}</TableCell>
                      <TableCell className="font-medium text-zinc-600">{album.clientName}</TableCell>
                      <TableCell className="text-zinc-500 font-medium">{album.functionDate}</TableCell>
                      <TableCell className="capitalize font-medium text-zinc-600">
                        <Badge variant="outline" className="bg-white border-zinc-200 text-zinc-600 rounded-md px-2 py-0">
                          {album.functionType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={album.status === 'published' ? 'default' : 'secondary'}
                          className={`rounded-full px-3 py-0.5 font-bold uppercase text-[10px] tracking-widest ${album.status === 'published'
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-100'
                            }`}
                        >
                          {album.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-zinc-100 rounded-md">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl border-border bg-white shadow-xl">
                            <DropdownMenuLabel className="text-zinc-900 font-bold px-3 py-2">Quick Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              className="focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer rounded-lg mx-1"
                              onClick={() => navigator.clipboard.writeText(album.id.toString())}
                            >
                              Copy Album ID
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-rose-50 focus:text-rose-600 cursor-pointer text-rose-600 rounded-lg mx-1" onClick={() => handleDelete(album.id)}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete Permanently
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground font-medium bg-white">
                      No albums found matching your search.
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
