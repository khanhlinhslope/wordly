import { Flex, useColorModeValue } from '@chakra-ui/react'
import Backspace from '@components/Game/Keyboard/Backspace'
import useStore from '@lib/store'

const KeyboardLetter = ({ letter, keyHandler, ...rest }) => {
  const { lettersGuessed, lettersPresent, lettersTried } = useStore()
  const { key, special } = letter

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
      _active={false}
      _focus={false}
      _hover={
        !isSubmitted && {
          bg: COLORS.defaultKeyHover
        }
      }
      align='center'
      as='button'
      bg={bg}
      borderRadius={4}
      boxShadow='0px 3px 3px rgba(0, 0, 0, .7)'
      color={fontColor}
      cursor='pointer'
      flex='1 1'
      fontSize={16}
      fontWeight={700}
      justify='center'
      lineHeight={1.25}
      margin='3px'
      minH='46px'
      // _active={
      //   !isSubmitted && {
      //     cursor: 'pointer',
      //     h: '90%',
      //     mt: '1%',
      //     transform: 'scale(0.95)'
      //   }
      // }
      padding='3px'
      textDecoration='inherit'
      textShadow='0px 0px 40px white, 0px 0px 80px white'
      textTransform={!special ? 'uppercase' : 'capitalize'}
      transition='all .2s ease-in-out'
      userSelect='none'
      onClick={onClick}
      {...rest}
    >
      {key === 'backspace' ? <Backspace /> : key}
    </Flex>
  )
}

export default KeyboardLetter
