import { Flex } from '@chakra-ui/react'
import WordRow from '@components/Game/WordleGrid/WordRow'
import useStore from '@lib/store'

const WordleGrid = ({ ...props }) => {
  const { wordList, wordInput, inputIndex } = useStore()

  return (
    <Flex
      as='main'
      flexDir='column'
      align='center'
      justify='center'
      w='100%'
      // border='2px solid purple'
      {...props}
    >
      <Flex
        // border='2px solid #A0AEC0'
        flexDir='column'
        align='center'
        justify='center'
        gap={1}
        p={4}
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
    </Flex>
  )
}

export default WordleGrid
