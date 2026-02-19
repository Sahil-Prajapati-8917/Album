import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const ThemeToggle = ({
  variant = 'ghost',
  size = 'icon',
  showLabel = false,
  className = ''
}) => {
  const { theme, setTheme, toggleTheme, isMounted, isDark } = useTheme()

  if (!isMounted) {
    return <div className={cn("w-9 h-9 opacity-0", className)} />
  }

  const getThemeIcon = () => {
    if (theme === 'system') return <Search className="h-[1.2rem] w-[1.2rem] transition-all" /> // Just a placeholder for now, let's use Moon/Sun based on isDark
    return isDark ? (
      <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
    ) : (
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        className
      )}
      title={`Current: ${theme} (Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'})`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
          )}
        </motion.div>
      </AnimatePresence>
      {showLabel && (
        <span className="ml-2 text-xs font-bold uppercase tracking-wider">
          {theme}
        </span>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}


export default ThemeToggle