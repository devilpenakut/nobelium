import useTheme from '@/lib/theme'

const DarkModeToggle = () => {
  const { dark, toggleDark } = useTheme()

  return (
   <button
      className="dark-mode-toggle bg-gray-200 dark:bg-gray-800 rounded-full p-2"
      onClick={(e) => {
        e.stopPropagation(); // Pastikan event propagation dihentikan jika perlu
        console.log("Toggle clicked!"); // Tambahkan log ini
        toggleDark();
      }}
    >
      {dark ? '🌞' : '🌙'}
    </button>
  )
}

export default DarkModeToggle
