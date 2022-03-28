import { Flex } from '@chakra-ui/react'
import WordRow from 'components/Wordle/WordRow'
import useStore from 'modules/store'

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
