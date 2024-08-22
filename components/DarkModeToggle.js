import useTheme from '@/lib/theme'

const DarkModeToggle = () => {
  const { dark, toggleDark } = useTheme()
  return (
    <button
      className="dark-mode-toggle bg-gray-200 dark:bg-gray-800 rounded-full p-2"
      onClick={(e) => {
        e.stopPropagation();
        console.log("Toggle clicked!");
        toggleDark();
      }}
    >
      {dark ? '🌞' : '🌙'}
    </button>
  )
}

export default DarkModeToggle
