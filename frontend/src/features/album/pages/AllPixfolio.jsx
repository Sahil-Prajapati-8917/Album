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
    <div className="flex-1 space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Global Repository</h1>
        <p className="text-zinc-500 font-medium">
          Manage your digital narratives and oversee the expansion of your visual archive.
        </p>
      </div>

      <Card className="shadow-sm border-zinc-100 dark:border-zinc-800/50 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900">
        <CardHeader className="pb-6 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-800/10 px-8 pt-8">
          <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Archives Manager</CardTitle>
          <CardDescription className="text-sm text-zinc-500 font-medium mt-1">
            A secure high-performance interface for all your created Pixfolio Visual Books.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center p-8">
            <div className="relative w-full max-w-sm group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-50 transition-colors" />
              <Input
                placeholder="Search archives or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 focus:bg-white dark:focus:bg-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-50 rounded-xl transition-all font-medium"
              />
            </div>
          </div>
          <div className="overflow-hidden border-t border-zinc-100 dark:border-zinc-800/50">
            <Table>
              <TableHeader className="bg-zinc-50/50 dark:bg-zinc-800/20">
                <TableRow className="hover:bg-transparent border-b border-zinc-100 dark:border-zinc-800/50">
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] h-12 text-zinc-400 pl-8">Archive Identity</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] h-12 text-zinc-400">Collaborator</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] h-12 text-zinc-400">Captured On</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] h-12 text-zinc-400">Classification</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] h-12 text-zinc-400">Presence</TableHead>
                  <TableHead className="text-right text-[10px] font-black uppercase tracking-[0.2em] h-12 text-zinc-400 pr-8">Operations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlbums.length > 0 ? (
                  filteredAlbums.map((album) => (
                    <TableRow key={album.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 transition-colors border-b border-zinc-100 dark:border-zinc-800/50 last:border-0">
                      <TableCell className="py-6 pl-8">
                        <p className="font-bold text-zinc-900 dark:text-zinc-50 leading-tight">{album.albumName}</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1.5 tracking-tighter">ID: PX-{album.id}</p>
                      </TableCell>
                      <TableCell className="font-bold text-zinc-600 dark:text-zinc-400">{album.clientName}</TableCell>
                      <TableCell className="text-zinc-500 font-bold text-xs">{album.functionDate}</TableCell>
                      <TableCell className="capitalize">
                        <Badge variant="outline" className="bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest">
                          {album.functionType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`rounded-full px-3 py-1 font-black uppercase text-[9px] tracking-[0.1em] border-none shadow-sm ${album.status === 'published'
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                            }`}
                        >
                          {album.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-10 w-10 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-5 w-5 text-zinc-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-2xl border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl p-2 min-w-[180px]">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 px-3 py-2 mb-1">Resource Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              className="focus:bg-zinc-900 dark:focus:bg-zinc-50 focus:text-white dark:focus:text-black cursor-pointer rounded-xl font-bold text-xs py-3 px-3 transition-colors mb-1"
                              onClick={() => navigator.clipboard.writeText(album.id.toString())}
                            >
                              Copy Access Link
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-rose-50 dark:focus:bg-rose-500/10 focus:text-rose-600 dark:focus:text-rose-400 cursor-pointer text-rose-600 dark:text-rose-400 rounded-xl font-bold text-xs py-3 px-3 transition-colors" onClick={() => handleDelete(album.id)}>
                              <Trash2 className="mr-2 h-4 w-4" /> Terminate Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-48 text-center text-zinc-400 font-bold bg-white dark:bg-zinc-900 italic">
                      No archives recovered from storage matching your criteria.
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
