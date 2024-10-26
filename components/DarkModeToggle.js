import useTheme from '@/lib/theme'

export default function DarkModeToggle() {
  const { dark, toggleDarkMode } = useTheme()

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {dark ? '🌙' : '🌞'}
    </button>
  )
}
