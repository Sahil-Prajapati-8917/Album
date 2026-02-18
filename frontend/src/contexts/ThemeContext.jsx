import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('pixfolio-theme')
    return saved || 'system'
  })

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    const applyTheme = (t) => {
      let resolvedTheme = t
      if (t === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }

      root.classList.remove('light', 'dark')
      root.classList.add(resolvedTheme)

      const themeColor = resolvedTheme === 'dark' ? '#1e1b14' : '#f8f7f6'
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.content = themeColor
      }
    }

    applyTheme(theme)
    localStorage.setItem('pixfolio-theme', theme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement
        const isDark = mediaQuery.matches
        root.classList.remove('light', 'dark')
        root.classList.add(isDark ? 'dark' : 'light')

        const themeColor = isDark ? '#1e1b14' : '#f8f7f6'
        const metaThemeColor = document.querySelector('meta[name="theme-color"]')
        if (metaThemeColor) metaThemeColor.content = themeColor
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'system'
      return 'light'
    })
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isMounted,
    isDark: theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
    isLight: theme === 'light' || (theme === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches)
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}