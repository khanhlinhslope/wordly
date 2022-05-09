import { mode } from '@chakra-ui/theme-tools'

// ref: https://github.com/chakra-ui/chakra-ui/blob/next/packages/theme/src/components/switch.ts
const wordleSwitchVariant = props => ({
  track: {
    bg: mode('gray.300', 'whiteAlpha.400')(props),
    _checked: {
      bg: mode('green.400', 'green.300')(props)
    }
  }
})

const Switch = {
  baseStyle: {
    track: {
      _focus: { boxShadow: 'none' }
    }
  },
  variants: {
    wordle: wordleSwitchVariant
  }
}

export default Switch
