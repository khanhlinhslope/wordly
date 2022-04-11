import { mode } from '@chakra-ui/theme-tools'

const wordleButtonVariant = props => ({
  color: mode('white', 'gray.800')(props), // useColorModeValue('white', 'gray.800')
  bg: mode('green.400', 'green.300')(props),
  _hover: {
    bg: mode('green.500', 'green.400')(props)
  },
  _active: {
    bg: mode('green.600', 'green.500')(props)
  }
})

const Button = {
  baseStyle: { _focus: { boxShadow: 'none' } },
  variants: {
    wordle: wordleButtonVariant
  }
}

export default Button
