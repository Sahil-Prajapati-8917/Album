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
import * as DialogPrimitive from "@radix-ui/react-dialog"

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

    if (!Command) return null

    return (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-transparent backdrop-blur-md animate-in fade-in duration-300" />
                <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[101] w-full max-w-[640px] translate-x-[-50%] translate-y-[-50%] p-4 animate-in fade-in zoom-in duration-200">
                    <Command className="w-full bg-white dark:bg-black rounded-xl border shadow-2xl overflow-hidden flex flex-col">
                        <div className="flex items-center border-b px-4 py-3">
                            <Search className="mr-3 h-5 w-5 text-muted-foreground shrink-0" />
                            <Command.Input
                                placeholder="Type a command or search..."
                                className="w-full bg-transparent border-none outline-none text-base placeholder:text-muted-foreground h-10"
                            />
                        </div>

                        <Command.List className="max-h-[400px] overflow-y-auto p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <Command.Empty className="py-12 text-center text-sm text-muted-foreground font-medium">
                                No results found.
                            </Command.Empty>

                            <Command.Group heading="Navigation" className="px-2 py-3 text-xs font-bold text-primary uppercase tracking-widest opacity-70">
                                <Item onSelect={() => runCommand(() => navigate('/dashboard'))}>
                                    <LayoutDashboard className="mr-3 h-4 w-4" />
                                    <span>Dashboard</span>
                                    <div className="ml-auto flex gap-1">
                                        <kbd className="p-1 rounded bg-muted border text-[10px]">G</kbd>
                                        <kbd className="p-1 rounded bg-muted border text-[10px]">D</kbd>
                                    </div>
                                </Item>
                                <Item onSelect={() => runCommand(() => navigate('/all-pixfolio'))}>
                                    <FolderOpen className="mr-3 h-4 w-4" />
                                    <span>All Pixfolios</span>
                                    <div className="ml-auto flex gap-1">
                                        <kbd className="p-1 rounded bg-muted border text-[10px]">G</kbd>
                                        <kbd className="p-1 rounded bg-muted border text-[10px]">A</kbd>
                                    </div>
                                </Item>
                                <Item onSelect={() => runCommand(() => navigate('/create'))}>
                                    <Plus className="mr-3 h-4 w-4" />
                                    <span>Create New Pixfolio</span>
                                    <div className="ml-auto flex gap-1">
                                        <kbd className="p-1 rounded bg-muted border text-[10px]">C</kbd>
                                        <kbd className="p-1 rounded bg-muted border text-[10px]">N</kbd>
                                    </div>
                                </Item>
                            </Command.Group>

                            <Command.Separator className="h-px bg-border my-2" />

                            <Command.Group heading="Account" className="px-2 py-3 text-xs font-bold text-primary uppercase tracking-widest opacity-70">
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

                            <Command.Group heading="Theme" className="px-2 py-3 text-xs font-bold text-primary uppercase tracking-widest opacity-70">
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

                            <Command.Group heading="Action" className="px-2 py-3 text-xs font-bold text-primary uppercase tracking-widest opacity-70">
                                <Item onSelect={() => runCommand(() => console.log('logging out'))} className="text-red-500 data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-500">
                                    <LogOut className="mr-3 h-4 w-4" />
                                    <span>Log out</span>
                                </Item>
                            </Command.Group>
                        </Command.List>

                        <div className="border-t px-4 py-3 bg-white dark:bg-black flex items-center justify-between text-[11px] text-muted-foreground font-medium">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded border bg-background font-sans shadow-sm">↑↓</kbd> navigate</span>
                                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded border bg-background font-sans shadow-sm">enter</kbd> select</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <kbd className="px-1.5 py-0.5 rounded border bg-background font-sans shadow-sm">esc</kbd> close
                            </div>
                        </div>
                    </Command>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    )
}

function Item({ children, onSelect, active, className = "" }) {
    return (
        <Command.Item
            onSelect={onSelect}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm cursor-pointer select-none outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground transition-all duration-200 ${active ? 'bg-primary/5 font-semibold text-primary' : ''} ${className}`}
        >
            {children}
        </Command.Item>
    )
}

export default CommandMenu
