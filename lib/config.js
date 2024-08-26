import { createContext, useContext, useState, useEffect } from 'react'

const ConfigContext = createContext(undefined)

export function ConfigProvider({ value: initialConfig, children }) {
  const [config, setConfig] = useState(initialConfig)

  useEffect(() => {
    // Load saved appearance from localStorage on initial render
    const savedAppearance = localStorage.getItem('appearance')
    if (savedAppearance) {
      setConfig(prevConfig => ({ ...prevConfig, appearance: savedAppearance }))
    }
  }, [])

  const updateConfig = (updates) => {
    setConfig(prevConfig => {
      const newConfig = { ...prevConfig, ...updates }
      // Save appearance to localStorage when it changes
      if ('appearance' in updates) {
        localStorage.setItem('appearance', newConfig.appearance)
      }
      return newConfig
    })
  }

  return (
    <ConfigContext.Provider value={{ ...config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  return useContext(ConfigContext)
}
