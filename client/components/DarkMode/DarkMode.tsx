import { useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import useDarkMode from './useDarkMode'

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkMode()
  const [darkSide, setDarkSide] = useState(
    colorTheme === 'light' ? true : false
  )

  const toggleDarkMode = (checked: any) => {
    setTheme(colorTheme)
    setDarkSide(checked)
  }

  return (
    <>
      <DarkModeSwitch
        style={{ marginBottom: '2rem' }}
        checked={darkSide}
        onChange={toggleDarkMode}
        size={30}
      />
    </>
  )
}
