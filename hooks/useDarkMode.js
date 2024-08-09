import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export const useDarkMode = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  return [mounted, theme, setTheme]
}
