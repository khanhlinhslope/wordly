import { chakra, Box, Heading, HStack, VStack } from '@chakra-ui/react'
import useStats from '@hooks/useStats'

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumSignificantDigits: 3
})

const Distribution = ({ stats, ...props }) => {
  const { guessDistribution, gamesPlayed } = useStats()
  const guessKeys = Object.keys(guessDistribution)

  return (
    <VStack
      align='center'
      flexDir='column'
      spacing={1}
      textAlign='center'
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
          <HStack key={guess} align='center' justify='flex-start' w='100%'>
            <chakra.span fontSize='.8em' textAlign='right' w='5%'>
              {guess}:
            </chakra.span>

            <chakra.span
              border='1px solid'
              borderColor='gray.400'
              borderRadius={12}
              h='18px'
              ml={2}
              w='80%'
            >
              <Box bg='blue.400' borderRadius={12} h='full' w={guessPercent} />
            </chakra.span>

            <chakra.span fontSize='.8em' ml={2} textAlign='left' w='15%'>
              {`${guessCount} (${guessPercent})`}
            </chakra.span>
          </HStack>
        )
      })}
    </VStack>
  )
}

export default Distribution
