import { Flex } from '@chakra-ui/react'
import LetterBox from '@components/Game/WordleGrid/LetterBox'
import useStore from '@lib/store'

const Word = ({ word, isSubmitted, rowIndex }) => {
  const { lastKey, submitAt } = useStore()

  const checkInvalid = ({ isSubmitted, rowIndex }) => {
    if (rowIndex === submitAt && !isSubmitted && lastKey === 'enter') {
      return true
    }

    return false
  }

  return (
    <Flex flexDir='row' gap={1}>
      {word.map((letterData, i) => {
        const colIndex = i
        const isInvalid = checkInvalid({ isSubmitted, rowIndex })

        return (
          <LetterBox
            key={i}
            colIndex={colIndex}
            isInvalid={isInvalid}
            isSubmitted={isSubmitted}
            letterData={letterData}
            rowIndex={rowIndex}
          />
        )
      })}
    </Flex>
  )
}

export default Word
