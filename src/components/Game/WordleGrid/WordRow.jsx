import { Flex } from '@chakra-ui/react'
import LetterBox from '@components/Game/WordleGrid/LetterBox'

const Word = ({ word, isSubmitted, rowIndex }) => (
  <Flex flexDir='row' gap={1}>
    {word.map((letterData, i) => (
      <LetterBox
        key={i}
        rowIndex={rowIndex}
        colIndex={i}
        letterData={letterData}
        isSubmitted={isSubmitted}
      />
    ))}
  </Flex>
)

export default Word
