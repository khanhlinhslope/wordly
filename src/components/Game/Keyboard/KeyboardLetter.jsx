import { Flex, useColorModeValue } from '@chakra-ui/react'
import Backspace from '@components/Game/Keyboard/Backspace'
import useStore from '@lib/store'

const KeyboardLetter = ({ letter, keyHandler, options, ...rest }) => {
  const { lettersGuessed, lettersPresent, lettersTried } = useStore()
  let { key, special } = letter
  const { swapKeys } = options

  if (swapKeys === true && key === 'enter') {
    key = 'backspace'
  } else if (swapKeys === true && key === 'backspace') {
    key = 'enter'
  }

  const COLORS = {
    default: useColorModeValue('gray.100', 'gray.200'),
    guessed: useColorModeValue('green.300', 'green.400'),
    exists: useColorModeValue('orange.300', 'orange.400'),
    failed: useColorModeValue('gray.300', 'gray.400'),
    defaultKeyHover: useColorModeValue('gray.200', 'gray.300')
  }

  const isSubmitted =
    lettersGuessed.includes(key) ||
    lettersPresent.includes(key) ||
    lettersTried.includes(key)

  let bg
  if (!isSubmitted) bg = COLORS.default
  else if (lettersGuessed.includes(key)) bg = COLORS.guessed
  else if (lettersPresent.includes(key)) bg = COLORS.exists
  else if (lettersTried.includes(key)) bg = COLORS.failed

  const fontColor = isSubmitted ? 'white' : 'gray.800'

  const onClick = event => {
    keyHandler(letter)
    event.currentTarget.blur()
  }

  return (
    <Flex
      as='button'
      align='center'
      justify='center'
      cursor='pointer'
      flex='1 1'
      margin='3px'
      padding='3px'
      minH='46px'
      textDecoration='inherit'
      fontWeight={700}
      fontSize={16}
      lineHeight={1.25}
      borderRadius={4}
      bg={bg}
      color={fontColor}
      boxShadow='0px 3px 3px rgba(0, 0, 0, .7)'
      textShadow='0px 0px 40px white, 0px 0px 80px white'
      // _active={
      //   !isSubmitted && {
      //     cursor: 'pointer',
      //     h: '90%',
      //     mt: '1%',
      //     transform: 'scale(0.95)'
      //   }
      // }
      _focus={false}
      _active={false}
      _hover={
        !isSubmitted && {
          bg: COLORS.defaultKeyHover
        }
      }
      onClick={onClick}
      textTransform={!special ? 'uppercase' : 'capitalize'}
      userSelect='none'
      transition='all .2s ease-in-out'
      {...rest}
    >
      {key === 'backspace' ? <Backspace /> : key}
    </Flex>
  )
}

export default KeyboardLetter
