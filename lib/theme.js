import { createContext, useContext, useEffect, useState } from 'react'
import { useMedia } from 'react-use'
import { useConfig } from '@/lib/config'

const ThemeContext = createContext({ dark: true, toggleDarkMode: () => {} })

export function ThemeProvider({ children }) {
  const { appearance, updateConfig } = useConfig()

  const prefersDark = useMedia('(prefers-color-scheme: dark)', null)
  const [dark, setDark] = useState(() => 
    appearance === 'dark' || (appearance === 'auto' && prefersDark)
  )

  useEffect(() => {
    if (typeof dark === 'boolean') {
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.classList.remove('color-scheme-unset')
    }
  }, [dark])

  useEffect(() => {
    setDark(appearance === 'dark' || (appearance === 'auto' && prefersDark))
  }, [appearance, prefersDark])

  const toggleDarkMode = () => {
    const newAppearance = appearance === 'dark' ? 'light' : 'dark'
    updateConfig({ appearance: newAppearance })
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default function useTheme() {
  return useContext(ThemeContext)
}
