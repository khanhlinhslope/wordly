import { Flex, chakra } from '@chakra-ui/react'
import Backspace from 'components/Keyboard/Backspace'
import useStore from 'modules/store'

const KeyboardLetter = ({ letter, keyHandler }) => {
  // const { wordList, wordleWord } = useStore()
  const { lettersGuessed, lettersPresent, lettersTried } = useStore()
  const { key, special } = letter

  // const isSubmitted = wordList.some(wordObj => wordObj.map(letter => letter.letter).includes(key))
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

  return (
    <Flex
      w={special ? '93px' : '60px'}
      h='60px'
      borderRadius='9px'
      bg={bg}
      color={fontColor}
      boxShadow='0px 3px 3px rgba(0, 0, 0, .7)'
      textShadow='0px 0px 40px white, 0px 0px 80px white'
      justify='center'
      align='center'
      cursor='pointer'
      _active={!isSubmitted && {
        h: '55px',
        mt: '5px',
        transform: 'scale(0.95)'
      }}
      _hover={!isSubmitted && {
        bg: 'gray.200'
      }}
      onClick={() => keyHandler(key)}
      textTransform={!special ? 'uppercase' : 'capitalize'}
      fontSize='26px'
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
