'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useMedia } from 'react-use'
import { useConfig } from '@/lib/config'

const ThemeContext = createContext({ dark: true, toggleDarkMode: () => {} })

export function ThemeProvider({ children }) {
  const { appearance } = useConfig()

  // user override: 'dark' | 'light' | null
  const [override, setOverride] = useState(null)

  // load override once on client
  useEffect(() => {
    try {
      const v = window.localStorage.getItem('theme')
      if (v === 'dark' || v === 'light') setOverride(v)
    } catch {}
  }, [])

  // system preference (only meaningful on client)
  const prefersDark = useMedia('(prefers-color-scheme: dark)', null)

  const computedDark = useMemo(() => {
    if (override === 'dark') return true
    if (override === 'light') return false

    // fallback to config behavior
    if (appearance === 'dark') return true
    if (appearance === 'light') return false
    // appearance === 'auto'
    return prefersDark
  }, [override, appearance, prefersDark])

  const dark = computedDark

  useEffect(() => {
    if (typeof dark === 'boolean') {
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.classList.remove('color-scheme-unset')
    }
  }, [dark])

  const toggleDarkMode = () => {
    setOverride(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem('theme', next)
      } catch {}
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ dark: !!dark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default function useTheme() {
  return useContext(ThemeContext)
}
