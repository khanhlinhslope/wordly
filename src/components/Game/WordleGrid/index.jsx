import { Flex } from '@chakra-ui/react'
import WordRow from '@components/Game/WordleGrid/WordRow'
import useStore from '@lib/store'

const WordleGrid = ({ ...props }) => {
  const { wordList, wordInput, inputIndex } = useStore()

  return (
    <Flex
      align='center'
      as='main'
      flexDir='column'
      justify='center'
      w='100%'
      // border='2px solid purple'
      {...props}
    >
      <Flex
        // border='2px solid #A0AEC0'
        align='center'
        flexDir='column'
        gap={1}
        justify='center'
        p={4}
        {...props}
      >
        {wordList.map((word, i) => (
          <WordRow
            key={i}
            isSubmitted={inputIndex > i}
            rowIndex={i}
            word={i === inputIndex ? wordInput : word}
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default WordleGrid
