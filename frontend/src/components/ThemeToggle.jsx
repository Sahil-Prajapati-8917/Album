import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export const ThemeToggle = ({ 
  variant = 'button',
  size = 'md',
  showLabel = false,
  className = '' 
}) => {
  const { theme, toggleTheme, isMounted, isDark } = useTheme()

  if (!isMounted) {
    // Return a placeholder to prevent layout shift
    return (
      <div className={`
        ${variant === 'button' ? 'h-10 w-10' : ''}
        ${variant === 'switch' ? 'h-7 w-13' : ''}
        rounded-lg
        ${className}
      `} />
    )
  }

  const sizeClasses = {
    sm: { button: 'h-8 w-8', icon: 14, switch: 'h-6 w-11' },
    md: { button: 'h-10 w-10', icon: 16, switch: 'h-7 w-13' },
    lg: { button: 'h-12 w-12', icon: 20, switch: 'h-8 w-15' }
  }

  const currentSize = sizeClasses[size]

  if (variant === 'switch') {
    return (
      <motion.button
        onClick={toggleTheme}
        className={`
          relative inline-flex items-center rounded-full border-2 transition-all duration-300
          border-gold/20 bg-pearl dark:bg-ebony
          ${currentSize.switch}
          ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`
            inline-flex items-center justify-center rounded-full shadow-lg
            ${isDark ? 'bg-gold' : 'bg-gold'}
            ${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'}
          `}
          animate={{
            x: isDark 
              ? size === 'sm' ? 20 : size === 'md' ? 24 : 28 
              : 2
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {isDark ? (
              <Moon
                size={size === 'sm' ? 10 : size === 'md' ? 12 : 14}
                className="text-white"
              />
            ) : (
              <Sun
                size={size === 'sm' ? 10 : size === 'md' ? 12 : 14}
                className="text-white"
              />
            )}
          </motion.div>
        </motion.div>
      </motion.button>
    )
  }

  // Default button variant
  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        inline-flex items-center justify-center rounded-lg border transition-all duration-300
        border-gold/20 bg-pearl dark:bg-ebony text-charcoal dark:text-pearl
        hover:border-gold/40 hover:bg-gold/5 hover:scale-105
        active:scale-95 shadow-sm hover:shadow-md
        ${currentSize.button}
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex items-center gap-2"
      >
        {isDark ? (
          <Moon size={currentSize.icon} className="text-gold" />
        ) : (
          <Sun size={currentSize.icon} className="text-gold" />
        )}
        {showLabel && (
          <span className="text-xs font-medium uppercase tracking-wider">
            {isDark ? 'Dark' : 'Light'}
          </span>
        )}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle