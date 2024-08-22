import { createContext, useContext, useEffect } from 'react'
import { useMedia } from 'react-use'
import { useConfig } from '@/lib/config'

const ThemeContext = createContext({ dark: true, toggleDarkMode: () => {} })

export function ThemeProvider ({ children }) {
  const { appearance, setConfig } = useConfig()
  const [dark, setDark] = useState(null)

  const prefersDark = useMedia('(prefers-color-scheme: dark)', null)

  useEffect(() => {
    const isDark = appearance === 'dark' || (appearance === 'auto' && prefersDark)
    setDark(isDark)
  }, [appearance, prefersDark])

  useEffect(() => {
    if (typeof dark === 'boolean') {
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.classList.remove('color-scheme-unset')
    }
  }, [dark])

  const toggleDarkMode = () => {
    const newDarkMode = !dark
    setDark(newDarkMode)
    setConfig({ appearance: newDarkMode ? 'dark' : 'light' })
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default function useTheme () {
  return useContext(ThemeContext)
}
