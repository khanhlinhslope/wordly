import { extendTheme } from '@chakra-ui/react'
import Button from '@lib/theme/components/button'
import Switch from '@lib/theme/components/switch'

// https://github.com/chakra-ui/chakra-ui/issues/708
// https://github.com/chakra-ui/chakra-ui/discussions/2459

const components = {
  Button,
  Switch
}

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: true,
  components
  // shadows: { outline: '0 0 0 0 #fff' } // disable outline borders in all components excluding Inputs
})

export default theme
