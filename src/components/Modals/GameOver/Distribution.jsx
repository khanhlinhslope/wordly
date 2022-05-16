import { chakra, Box, Flex, Heading, HStack, VStack } from '@chakra-ui/react'

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumSignificantDigits: 3
})

const Distribution = ({ stats, ...props }) => {
  const { guessDistribution, gamesPlayed } = stats
  const guessKeys = Object.keys(guessDistribution)

  return (
    <VStack
      flexDir='column'
      align='center'
      textAlign='center'
      spacing={1}
      // border='1px solid blue'
      {...props}
    >
      <Heading as='h2' fontSize='1.5em' mb={2}>
        Guess Distribution
      </Heading>

      {guessKeys.map(key => {
        const guess = key === 'fail' ? 'X' : key
        const guessCount = guessDistribution[key]
        const guessPercent = percentFormatter.format(guessCount / gamesPlayed)

        return (
          <HStack key={guess} w='100%' justify='flex-start' align='center'>
            <chakra.span fontSize='.8em' w='5%' textAlign='right'>
              {guess}:
            </chakra.span>

            <chakra.span
              w='80%'
              h='18px'
              ml={2}
              border='1px solid'
              borderColor='gray.400'
              borderRadius={12}
            >
              <Box h='full' w={guessPercent} bg='blue.400' borderRadius={12} />
            </chakra.span>

            <chakra.span ml={2} fontSize='.8em' w='15%' textAlign='left'>
              {`${guessCount} (${guessPercent})`}
            </chakra.span>
          </HStack>
        )
      })}
    </VStack>
  )
}

export default Distribution
