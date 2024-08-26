import useTheme from '@/lib/theme'

const DarkModeToggle = () => {
  const { dark, toggleDarkMode } = useTheme()

  return (
    <button
      className="dark-mode-toggle bg-gray-200 dark:bg-gray-800 rounded-full p-2"
      onClick={(e) => {
        e.stopPropagation(); // Ensure event propagation is stopped if needed
        console.log("Toggle clicked!"); // Keep this log for debugging
        toggleDarkMode();
      }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? '🌞' : '🌙'}
    </button>
  )
}

export default DarkModeToggle
