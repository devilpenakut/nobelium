import useTheme from '@/lib/theme'

export default function DarkModeToggle() {
  const { dark, toggleDarkMode } = useTheme()

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none"
      aria-label="Toggle dark mode"
    >
      <div
        className={`
          ${dark ? 'bg-gray-600' : 'bg-yellow-500'} 
          absolute h-6 w-11 rounded-full transition-colors duration-200
        `}
      />
      <div
        className={`
          ${dark ? 'translate-x-6' : 'translate-x-1'}
          absolute h-4 w-4 transform rounded-full bg-white transition duration-200
          flex items-center justify-center
        `}
      >
        <span className="text-xs">
          {dark ? '🌙' : '☀️'}
        </span>
      </div>
    </button>
  )
}
