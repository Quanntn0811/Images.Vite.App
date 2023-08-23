import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

export const useGlobalContext = () => useContext(AppContext)

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const storedDarkMode = localStorage.getItem('darkTheme') === 'true'
  console.log('stored: ' + storedDarkMode)

  return storedDarkMode
}

const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode)
  const [searchValue, setSearchValue] = useState('dog')

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    const body = document.querySelector('body')
    body.classList.toggle('dark-theme', newDarkTheme)
    console.log(newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  useEffect(() => {
    const body = document.querySelector('body')
    body.classList.toggle('dark-theme', isDarkTheme)
  }, [])

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        toggleDarkTheme,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export default AppProvider
