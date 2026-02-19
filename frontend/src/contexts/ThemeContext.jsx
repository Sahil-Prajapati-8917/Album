import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes'

const ThemeContext = createContext({
  theme: 'system',
  setTheme: () => null,
  toggleTheme: () => null,
  isMounted: false,
  isDark: false,
  isLight: true
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const { theme, setTheme, resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid Hydration Mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isMounted: mounted,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function ThemeWrapper({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="pixfolio-theme"
    >
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </NextThemesProvider>
  )
}