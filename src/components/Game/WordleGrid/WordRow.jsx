import { Flex } from '@chakra-ui/react'
import LetterBox from '@components/Game/WordleGrid/LetterBox'

const Word = ({ word, isSubmitted, rowIndex }) => (
  <Flex flexDir='row' gap={1}>
    {word.map((letterData, i) => (
      <LetterBox
        key={i}
        colIndex={i}
        isSubmitted={isSubmitted}
        letterData={letterData}
        rowIndex={rowIndex}
      />
    ))}
  </Flex>
)

export default Word
