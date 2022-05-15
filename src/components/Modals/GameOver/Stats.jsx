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

const StatItem = ({ label, value }) => {
  return (
    <Stat mx={4}>
      <StatNumber fontSize='2em'>{value}</StatNumber>
      <StatLabel fontSize='.8em' fontWeight={400}>
        {label}
      </StatLabel>
    </Stat>
  )
}

const Stats = ({ stats, ...props }) => {
  const { gamesPlayed, winRate, currentStreak, maxStreak } = stats

  return (
    <Flex
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
        <StatItem label='Played' value={gamesPlayed} />
        <StatItem label='Win-Rate' value={percentFormatter.format(winRate)} />
        <StatItem label='Current Streak' value={currentStreak} />
        <StatItem label='Max. Streak' value={maxStreak} />
      </StatGroup>
    </Flex>
  )
}

export default Stats
