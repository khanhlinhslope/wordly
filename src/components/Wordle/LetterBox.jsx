import { Flex, chakra } from '@chakra-ui/react'
// import useStore from 'modules/store'

const LetterBox = ({ letterData, isSubmitted }) => {
  const { letter, status } = letterData
  const isEmpty = status === 'empty'

  const boxSize = 16

  const border = isSubmitted
    ? 'none'
    : `2px solid ${isEmpty ? '#A0AEC0' : '#4A5568'}`

  let bg
  if (!isSubmitted) bg = 'gray.100'
  else {
    if (status === 'guessed') bg = 'green.300'
    else if (status === 'exists') bg = 'orange.300'
    else if (status === 'not_exists') bg = 'gray.400'
  }

  const fontColor = isSubmitted
    ? 'white'
    : 'black'

  return (
    <Flex
      h={boxSize}
      w={boxSize}
      borderRadius={4}
      textTransform='uppercase'
      justify='center'
      align='center'
      border={border}
      bg={bg}
      color={fontColor}
      transition='all .2s ease-in-out'
      fontWeight='bold'
      fontSize={36}
    >
      <chakra.span>
        {letter}
      </chakra.span>
    </Flex>
  )
}

export default LetterBox
