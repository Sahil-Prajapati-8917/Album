import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from './ThemeToggle'
import { Menu, X } from 'lucide-react'

const LandingHeader = () => {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isHome = location.pathname === '/'

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-border/10 bg-background shadow-sm`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/Pixfolio_Logo.svg" alt="Pixfolio" className="h-8 w-auto" />
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
                    <Link className="hover:text-primary transition-colors text-foreground" to="/">Home</Link>
                    <Link className="hover:text-primary transition-colors text-foreground" to="/demo">Demo</Link>
                    <Link className="hover:text-primary transition-colors text-foreground" to="/pricing">Pricing</Link>
                    <Link className="hover:text-primary transition-colors text-foreground" to="/login">Login</Link>
                    <ThemeToggle />
                    <Button asChild className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all shadow-lg shadow-primary/10 h-auto">
                        <Link to="/signup">Join Now</Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-foreground">
                                <Menu className="size-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="p-6 pt-12">
                            <SheetHeader className="mb-8">
                                <SheetTitle className="text-left flex items-center gap-2">
                                    <img src="/Pixfolio_Logo.svg" alt="Pixfolio" className="h-6 w-auto" />
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-6 text-sm font-medium tracking-widest uppercase items-center">
                                <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2 text-foreground" to="/">Home</Link>
                                <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2 text-foreground" to="/demo">Demo</Link>
                                <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2 text-foreground" to="/pricing">Pricing</Link>
                                <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2 text-foreground" to="/login">Login</Link>
                                <Button asChild onClick={() => setMobileMenuOpen(false)} className="w-full text-center bg-primary text-primary-foreground px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all h-auto mt-4">
                                    <Link to="/signup">Join Now</Link>
                                </Button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

export default LandingHeader
