import useTheme from '@/lib/theme'

const DarkModeToggle = () => {
  const { dark, toggleDark } = useTheme()

  return (
    <button
      className="bg-gray-200 dark:bg-gray-800 rounded-full p-2"
      onClick={toggleDark}
    >
      {dark ? '🌞' : '🌙'}
    </button>
  )
}

export default DarkModeToggle
