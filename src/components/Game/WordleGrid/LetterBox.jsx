import { Flex, chakra, useColorModeValue, useToken } from '@chakra-ui/react'
import useStore from '@lib/store'

const checkCurrentInput = ({ wordInput, inputIndex, rowIndex, colIndex, isSubmitted }) => {
  if (isSubmitted) return false
  if (inputIndex !== rowIndex) return false

  let isCurrentInput = false
  const submittedWord = [...wordInput]
  const emptyLetterIndex = submittedWord.findIndex(l => l.letter === '')

  if (emptyLetterIndex !== -1) {
    isCurrentInput = colIndex === emptyLetterIndex - 1
    return isCurrentInput
  }

  // check if is the last letter of the word
  isCurrentInput = colIndex === submittedWord.length - 1

  // console.log({
  //   submittedWord,
  //   inputIndex,
  //   rowIndex,
  //   colIndex,
  //   isSubmitted,
  //   emptyLetterIndex,
  //   isCurrentInput
  // })

  return isCurrentInput
}

// isSubmitted is a boolean that indicates whether the entire row-word has been submitted or not
const LetterBox = ({ letterData, isSubmitted, rowIndex, colIndex }) => {
  const { wordInput, inputIndex } = useStore()
  const { letter, status } = letterData
  const isEmpty = status === 'empty'

  const isCurrentInput = checkCurrentInput({ wordInput, inputIndex, rowIndex, colIndex, isSubmitted })

  const COLORS = {
    default: useColorModeValue('gray.100', 'gray.200'),
    guessed: useColorModeValue('green.300', 'green.400'),
    exists: useColorModeValue('orange.300', 'orange.400'),
    failed: useColorModeValue('gray.400', 'gray.500')
  }

  const [alpha0, alpha1, alpha2, alpha3] = useToken(
    'colors',
    ['blackAlpha.300', 'blackAlpha.400', 'blackAlpha.500', 'blackAlpha.600']
  )

  const boxSize = [14, 14, 16, 16, 16]

  const border = isSubmitted
    ? 'none'
    : `2px solid ${isEmpty
      ? useColorModeValue(alpha0, alpha1)
      : useColorModeValue(alpha2, alpha3)
    }`

  let bg
  if (!isSubmitted) bg = COLORS.default
  else if (status === 'guessed') bg = COLORS.guessed
  else if (status === 'exists') bg = COLORS.exists
  else if (status === 'not_exists') bg = COLORS.failed

  let className = ''
  if (isCurrentInput) className = 'cell-type-animation'
  else if (isSubmitted) {
    className = `cell-reveal-animation ${status}`
  }

  let animationDelay = 0
  if (isSubmitted) animationDelay = `${colIndex * 350}ms`

  const fontColor = isSubmitted ? 'white' : 'black'

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
      className={className}
      style={{ animationDelay }}
    >
      <chakra.span className={isSubmitted && 'letter-container'} style={{ animationDelay }}>
        {letter}
      </chakra.span>
    </Flex>
  )
}

export default LetterBox
