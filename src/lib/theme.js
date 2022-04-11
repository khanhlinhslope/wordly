import { extendTheme } from '@chakra-ui/react'

// https://github.com/chakra-ui/chakra-ui/issues/708
// https://github.com/chakra-ui/chakra-ui/discussions/2459
const components = {
  Switch: {
    baseStyle: { track: { _focus: { boxShadow: 'none' } } }
  }
  // Button: {
  //   baseStyle: { _focus: { boxShadow: 'none' } }
  // }
}

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: true,
  components
  // shadows: { outline: '0 0 0 0 #fff' } // disable outline borders in all components excluding Inputs
})

export default theme
