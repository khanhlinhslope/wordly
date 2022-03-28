import { Flex, chakra } from '@chakra-ui/react'
import Backspace from 'components/Keyboard/Backspace'
import useStore from 'modules/store'

const KeyboardLetter = ({ letter, keyHandler }) => {
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
    ? ['54px', '68px', '81px', '87px', '93px']
    : ['35px', '44px', '52px', '56px', '60px']

  const letterHeight = ['50px', '44px', '52px', '56px', '60px']

  const fontSize = ['18px', '20px', '22px', '24px', '26px']

  return (
    <Flex
      w={letterWidth}
      h={letterHeight}
      borderRadius='9px'
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
      fontSize={fontSize}
      userSelect='none'
      transition='all .2s ease-in-out'
    >
      <chakra.span>
        {key === 'backspace'
          ? <Backspace />
          : key}
      </chakra.span>
    </Flex>
  )
}

export default KeyboardLetter
