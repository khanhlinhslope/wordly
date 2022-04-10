import { Flex } from '@chakra-ui/react'
import Backspace from 'components/Keyboard/Backspace'
import useStore from 'lib/store'

const KeyboardLetter = ({ letter, keyHandler, ...rest }) => {
  const { lettersGuessed, lettersPresent, lettersTried } = useStore()
  const { key, special } = letter

  const isSubmitted = lettersGuessed.includes(key) || lettersPresent.includes(key) || lettersTried.includes(key)

  let bg
  if (!isSubmitted) bg = 'gray.100'
  else {
    if (lettersGuessed.includes(key)) bg = 'green.300'
    else if (lettersPresent.includes(key)) bg = 'orange.300'
    else if (lettersTried.includes(key)) bg = 'gray.400'
  }

  const fontColor = isSubmitted
    ? 'white'
    : 'gray.800'

  const letterWidth = special
    ? ['50px', '69px', '69px', '69px', '81px']
    : ['33px', '46px', '46px', '46px', '54px']

  const letterHeight = ['50px', '44px', '52px', '56px', '56px']

  // const fontSize = ['18px', '20px', '22px', '24px', '24px']

  return (
    <Flex
      as='button'
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
      justify='center'
      align='center'
      cursor='pointer'
      _active={!isSubmitted && {
        cursor: 'pointer',
        h: '90%',
        mt: '1%',
        transform: 'scale(0.95)'
      }}
      _hover={!isSubmitted && {
        bg: 'gray.200'
      }}
      onClick={() => keyHandler(key)}
      textTransform={!special ? 'uppercase' : 'capitalize'}
      // fontSize={fontSize}
      userSelect='none'
      transition='all .2s ease-in-out'
      {...rest}
    >
      {key === 'backspace'
        ? <Backspace />
        : key}
    </Flex>
  )
}

export default KeyboardLetter
