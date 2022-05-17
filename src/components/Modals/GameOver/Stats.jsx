import {
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup
} from '@chakra-ui/react'
import useStats from '@hooks/useStats'

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

const Stats = ({ ...props }) => {
  const { gamesPlayed, winRate, currentStreak, maxStreak } = useStats()

  return (
    <Flex
      flexDir='column'
      align='center'
      textAlign='center'
      {...props}
    >
      <Heading as='h2' fontSize='1.5em'>
        Statistics
      </Heading>

      <StatGroup>
        <StatItem label='Played' value={gamesPlayed} />
        <StatItem label='Win-Rate' value={percentFormatter.format(winRate)} />
        <StatItem label='Current Streak' value={currentStreak} />
        <StatItem label='Max. Streak' value={maxStreak} />
      </StatGroup>
    </Flex>
  )
}

export default Stats
