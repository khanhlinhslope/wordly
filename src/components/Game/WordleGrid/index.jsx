import { Flex } from '@chakra-ui/react'
import WordRow from '@components/Game/WordleGrid/WordRow'
import useStore from '@lib/store'

const WordleGrid = ({ ...props }) => {
  const { wordList, wordInput, inputIndex } = useStore()

  return (
    <Flex
      flexDir='column'
      gap={1}
      {...props}
    >
      {wordList.map((word, i) => (
        <WordRow
          key={i}
          word={i === inputIndex ? wordInput : word}
          isSubmitted={inputIndex > i}
        />
      ))}
    </Flex>
  )
}

export default WordleGrid
