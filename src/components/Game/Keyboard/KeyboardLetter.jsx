import { Button, useColorModeValue } from '@chakra-ui/react'
import Backspace from 'src/components/Game/Keyboard/Backspace'
import useStore from 'lib/store'

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

  const isSubmitted = lettersGuessed.includes(key) || lettersPresent.includes(key) || lettersTried.includes(key)

  let bg
  if (!isSubmitted) bg = COLORS.default
  else {
    if (lettersGuessed.includes(key)) bg = COLORS.guessed
    else if (lettersPresent.includes(key)) bg = COLORS.exists
    else if (lettersTried.includes(key)) bg = COLORS.failed
  }

  const fontColor = isSubmitted
    ? 'white'
    : 'gray.800'

  const letterWidth = special
    ? ['50px', '69px', '69px', '69px', '81px']
    : ['33px', '46px', '46px', '46px', '54px']

  const letterHeight = ['50px', '44px', '52px', '56px', '56px']

  return (
    <Button
      p={1}
      fontWeight={700}
      fontSize={16}
      lineHeight={1.25}
      w={letterWidth}
      h={letterHeight}
      borderRadius={8}
      bg={bg}
      color={fontColor}
      boxShadow='0px 3px 3px rgba(0, 0, 0, .7)'
      textShadow='0px 0px 40px white, 0px 0px 80px white'
      cursor='pointer'
      _active={!isSubmitted && {
        cursor: 'pointer',
        h: '90%',
        mt: '1%',
        transform: 'scale(0.95)'
      }}
      _hover={!isSubmitted && {
        bg: COLORS.defaultKeyHover
      }}
      onClick={() => keyHandler(key)}
      textTransform={!special ? 'uppercase' : 'capitalize'}
      userSelect='none'
      transition='all .2s ease-in-out'
      {...rest}
    >
      {key === 'backspace'
        ? <Backspace />
        : key}
    </Button>
  )
}

export default KeyboardLetter
