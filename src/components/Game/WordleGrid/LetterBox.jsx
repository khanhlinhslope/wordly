import { Flex, chakra, useColorModeValue } from '@chakra-ui/react'
import useStore from '@lib/store'

const checkCursor = ({ wordInput, inputIndex, rowIndex, colIndex, isSubmitted }) => {
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

  return isCurrentInput
}

const resolveBorderColor = ({ isSubmitted, status }) => {
  const isEmpty = status === 'empty'
  let borderColor = 'none'
  if (!isSubmitted && isEmpty) borderColor = useColorModeValue('blackAlpha.300', 'blackAlpha.400')
  if (!isSubmitted && !isEmpty) borderColor = useColorModeValue('blackAlpha.500', 'blackAlpha.600')

  return borderColor
}

const resolveBackgroundColor = ({ isSubmitted, status }) => {
  const COLORS = {
    default: useColorModeValue('gray.100', 'gray.200'),
    guessed: useColorModeValue('green.300', 'green.400'),
    exists: useColorModeValue('orange.300', 'orange.400'),
    failed: useColorModeValue('gray.400', 'gray.500')
  }

  let bg
  if (!isSubmitted) bg = COLORS.default
  else if (status === 'guessed') bg = COLORS.guessed
  else if (status === 'exists') bg = COLORS.exists
  else if (status === 'not_exists') bg = COLORS.failed

  return bg
}

const resolveClassName = ({ isSubmitted, status, isCurrentCursor }) => {
  let className = ''
  if (isCurrentCursor) className = 'cell-type-animation'
  else if (isSubmitted) {
    className = `cell-reveal-animation ${status}`
  }

  return className
}

// isSubmitted is a boolean that indicates whether the entire row-word has been submitted or not
const LetterBox = ({ letterData, isSubmitted, rowIndex, colIndex }) => {
  const { wordInput, inputIndex } = useStore()
  const { letter, status } = letterData

  const boxSize = [14, 14, 16, 16, 16]
  const border = isSubmitted ? 'none' : '2px solid'
  const fontColor = isSubmitted ? 'white' : 'black'
  const animationDelay = isSubmitted ? `${colIndex * 350}ms` : 0

  const isCurrentCursor = checkCursor({ wordInput, inputIndex, rowIndex, colIndex, isSubmitted })
  const borderColor = resolveBorderColor({ isSubmitted, status })
  const bg = resolveBackgroundColor({ isSubmitted, status })
  const className = resolveClassName({ isSubmitted, status, isCurrentCursor })

  return (
    <Flex
      h={boxSize}
      w={boxSize}
      bg={bg}
      color={fontColor}
      className={className}
      border={border}
      borderColor={borderColor}
      fontWeight='bold'
      fontSize={36}
      borderRadius={4}
      textTransform='uppercase'
      justify='center'
      align='center'
      style={{ animationDelay }}
    >
      <chakra.span
        className={isSubmitted && 'letter-container'}
        style={{ animationDelay }}
      >
        {letter}
      </chakra.span>
    </Flex>
  )
}

export default LetterBox
