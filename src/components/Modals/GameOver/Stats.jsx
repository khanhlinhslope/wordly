import {
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup
} from '@chakra-ui/react'

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumSignificantDigits: 3
})

const Stats = ({ stats, ...props }) => {
  const { gamesPlayed, winRate, currentStreak, maxStreak } = stats

  return (
    <Flex
      mt={4}
      flexDir='column'
      align='center'
      textAlign='center'
      // border='1px solid blue'
      {...props}
    >
      <Heading as='h2' fontSize='1.5em'>
        Statistics
      </Heading>

      <StatGroup
      // border='1px solid red'
      >
        <Stat>
          <StatNumber>{gamesPlayed}</StatNumber>
          <StatLabel fontSize='.8em' fontWeight={400}>
            Played
          </StatLabel>
        </Stat>

        <Stat>
          <StatNumber>{percentFormatter.format(winRate)}</StatNumber>
          <StatLabel fontSize='.8em' fontWeight={400}>
            Win-rate
          </StatLabel>
        </Stat>

        <Stat>
          <StatNumber>{currentStreak}</StatNumber>
          <StatLabel fontSize='.8em' fontWeight={400}>
            Current Streak
          </StatLabel>
        </Stat>

        <Stat>
          <StatNumber>{maxStreak}</StatNumber>
          <StatLabel fontSize='.8em' fontWeight={400}>
            Max. Streak
          </StatLabel>
        </Stat>
      </StatGroup>
    </Flex>
  )
}

export default Stats
