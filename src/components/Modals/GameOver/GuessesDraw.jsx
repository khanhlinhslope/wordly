import { Box, HStack, useColorModeValue, VStack } from '@chakra-ui/react'
import useStore from '@lib/store'
import { parseGuesses } from '@lib/share'

const GuessesDraw = ({ ...props }) => {
  const { wordList } = useStore()
  const { evals } = parseGuesses(wordList)

  const COLORS = {
    default: useColorModeValue('gray.100', 'gray.200'),
    guessed: useColorModeValue('green.300', 'green.400'),
    exists: useColorModeValue('orange.300', 'orange.400'),
    notExists: useColorModeValue('gray.300', 'gray.400')
  }

  return (
    <VStack
      flexDir='column'
      justify='center'
      align='center'
      spacing='.1rem'
      {...props}
    >
      {evals.map((rowEval, i) => {
        return (
          <HStack key={i} flexDir='row' spacing='.1rem'>
            {rowEval.map((colEval, j) => {
              let bg
              if (colEval === 'empty') bg = COLORS.default
              else if (colEval === 'guessed') bg = COLORS.guessed
              else if (colEval === 'exists') bg = COLORS.exists
              else if (colEval === 'not_exists') bg = COLORS.notExists

              return (
                <Box
                  key={j}
                  flexDir='row'
                  w={6}
                  h={6}
                  bg={bg}
                  border='2px solid black'
                />
              )
            })}
          </HStack>
        )
      })}
    </VStack>
  )
}

export default GuessesDraw
