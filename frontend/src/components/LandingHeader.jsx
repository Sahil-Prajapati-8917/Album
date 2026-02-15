import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { LayoutGrid, Menu, X } from 'lucide-react'

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
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-border/5 ${scrolled || !isHome ? 'bg-background/80 backdrop-blur-md border-border/10 shadow-sm' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="size-8 flex items-center justify-center bg-foreground text-background rounded-sm">
                        <LayoutGrid className="size-5" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tighter uppercase text-foreground">Pixfolio</h1>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
                    <Link className="hover:text-primary transition-colors text-foreground" to="/">Home</Link>
                    <Link className="hover:text-primary transition-colors text-foreground" to="/demo">Demo</Link>
                    <Link className="hover:text-primary transition-colors text-foreground" to="/pricing">Pricing</Link>
                    <Link className="hover:text-primary transition-colors text-foreground" to="/login">Login</Link>
                    <ThemeToggle />
                    <Link to="/signup" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all shadow-lg shadow-primary/10">
                        Join Now
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-foreground">
                        {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border/10 p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-5">
                    <nav className="flex flex-col gap-6 text-sm font-medium tracking-widest uppercase text-center">
                        <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2 text-foreground" to="/">Home</Link>
                        <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2 text-foreground" to="/demo">Demo</Link>
                        <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2 text-foreground" to="/pricing">Pricing</Link>
                        <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2 text-foreground" to="/login">Login</Link>
                    </nav>
                    <div className="flex flex-col gap-4 items-center border-t border-border/10 pt-6">
                        <Link onClick={() => setMobileMenuOpen(false)} to="/signup" className="w-full text-center bg-primary text-primary-foreground px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-all">
                            Join Now
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

export default LandingHeader
