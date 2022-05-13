import { useState, useEffect } from 'react'
import { useColorMode } from '@chakra-ui/react'
import { saveOptions, loadOptions } from '@lib/localStorage'
import { GAME_CONFIG } from '@lib/constants'

const useOptions = () => {
  const { defaultOptions } = GAME_CONFIG
  const [showConfetti, setShowConfetti] = useState(defaultOptions?.confetti ?? true)
  const [swapKeys, setSwapKeys] = useState(defaultOptions?.swapSpecialKeys ?? false)
  const { colorMode, toggleColorMode } = useColorMode()

  let userOptions
  if (typeof window !== 'undefined') {
    userOptions = loadOptions()
  }

  useEffect(() => {
    if (userOptions) {
      const confetti = userOptions?.confetti
      if (typeof confetti === 'boolean') setShowConfetti(confetti)

      const swapSpecialKeys = userOptions?.swapSpecialKeys
      if (typeof swapSpecialKeys === 'boolean') setSwapKeys(swapSpecialKeys)
    }
  }, [])

  const toggleTheme = () => {
    toggleColorMode()
    const theme = colorMode === 'light' ? 'dark' : 'light'
    saveOptions({ ...userOptions, theme })
  }

  const toggleConfetti = () => {
    setShowConfetti(!showConfetti)
    saveOptions({ ...userOptions, confetti: !showConfetti })
  }

  const toggleKeys = () => {
    setSwapKeys(!swapKeys)
    saveOptions({ ...userOptions, swapSpecialKeys: !swapKeys })
  }

  return { showConfetti, toggleConfetti, swapKeys, toggleKeys, theme: colorMode, toggleTheme }
}

export default useOptions
