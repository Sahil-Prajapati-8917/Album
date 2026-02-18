import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import {
    LayoutDashboard,
    Plus,
    FolderOpen,
    User,
    Settings,
    HelpCircle,
    Moon,
    Sun,
    Laptop,
    LogOut,
    Search
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/components/ui/button'

const CommandMenu = () => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const { setTheme, theme } = useTheme()

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const runCommand = (command) => {
        setOpen(false)
        command()
    }

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        >
            <div className="w-full max-w-[640px] bg-popover rounded-xl border shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center border-b px-4 py-3">
                    <Search className="mr-3 h-5 w-5 text-muted-foreground shrink-0" />
                    <Command.Input
                        placeholder="Type a command or search..."
                        className="w-full bg-transparent border-none outline-none text-base placeholder:text-muted-foreground h-8"
                    />
                </div>

                <Command.List className="max-h-[400px] overflow-y-auto p-2">
                    <Command.Empty className="py-6 text-center text-sm text-muted-foreground font-medium">
                        No results found.
                    </Command.Empty>

                    <Command.Group heading="Navigation" className="px-2 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <Item onSelect={() => runCommand(() => navigate('/dashboard'))}>
                            <LayoutDashboard className="mr-3 h-4 w-4" />
                            <span>Dashboard</span>
                            <Command.Shortcut className="ml-auto text-xs opacity-50">G D</Command.Shortcut>
                        </Item>
                        <Item onSelect={() => runCommand(() => navigate('/all-pixfolio'))}>
                            <FolderOpen className="mr-3 h-4 w-4" />
                            <span>All Pixfolios</span>
                            <Command.Shortcut className="ml-auto text-xs opacity-50">G A</Command.Shortcut>
                        </Item>
                        <Item onSelect={() => runCommand(() => navigate('/create'))}>
                            <Plus className="mr-3 h-4 w-4" />
                            <span>Create New Pixfolio</span>
                            <Command.Shortcut className="ml-auto text-xs opacity-50">C N</Command.Shortcut>
                        </Item>
                    </Command.Group>

                    <Command.Separator className="h-px bg-border my-2" />

                    <Command.Group heading="Account" className="px-2 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <Item onSelect={() => runCommand(() => navigate('/profile'))}>
                            <User className="mr-3 h-4 w-4" />
                            <span>Profile Settings</span>
                        </Item>
                        <Item onSelect={() => runCommand(() => navigate('/settings'))}>
                            <Settings className="mr-3 h-4 w-4" />
                            <span>Global Settings</span>
                        </Item>
                        <Item onSelect={() => runCommand(() => navigate('/help'))}>
                            <HelpCircle className="mr-3 h-4 w-4" />
                            <span>Help Center</span>
                        </Item>
                    </Command.Group>

                    <Command.Separator className="h-px bg-border my-2" />

                    <Command.Group heading="Theme" className="px-2 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <Item onSelect={() => runCommand(() => setTheme('light'))} active={theme === 'light'}>
                            <Sun className="mr-3 h-4 w-4" />
                            <span>Light Theme</span>
                        </Item>
                        <Item onSelect={() => runCommand(() => setTheme('dark'))} active={theme === 'dark'}>
                            <Moon className="mr-3 h-4 w-4" />
                            <span>Dark Theme</span>
                        </Item>
                        <Item onSelect={() => runCommand(() => setTheme('system'))} active={theme === 'system'}>
                            <Laptop className="mr-3 h-4 w-4" />
                            <span>System Default</span>
                        </Item>
                    </Command.Group>

                    <Command.Separator className="h-px bg-border my-2" />

                    <Command.Group heading="Action" className="px-2 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <Item onSelect={() => runCommand(() => console.log('logging out'))} className="text-red-500 hover:text-red-500">
                            <LogOut className="mr-3 h-4 w-4" />
                            <span>Log out</span>
                        </Item>
                    </Command.Group>
                </Command.List>

                <div className="border-t px-4 py-2 bg-muted/20 flex items-center justify-between text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><span className="p-0.5 rounded border bg-background px-1">↑↓</span> to navigate</span>
                        <span className="flex items-center gap-1"><span className="p-0.5 rounded border bg-background px-1">enter</span> to select</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="p-0.5 rounded border bg-background px-1">esc</span> to close
                    </div>
                </div>
            </div>
        </Command.Dialog>
    )
}

function Item({ children, onSelect, active, className = "" }) {
    return (
        <Command.Item
            onSelect={onSelect}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer select-none outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground ${active ? 'bg-muted/50 font-medium' : ''} ${className}`}
        >
            {children}
        </Command.Item>
    )
}

export default CommandMenu
