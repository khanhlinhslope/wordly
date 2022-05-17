import Countdown from 'react-countdown'
import { Box, Flex, Text } from '@chakra-ui/react'
import { nextWordTs } from '@lib/wotd'

const CountDown = ({ ...props }) => {
  const timestamp = nextWordTs()

  return (
    <Flex
      flexDir='column'
      textAlign='center'
      {...props}
    >
      <Text fontSize={20} fontWeight={600}>
        New puzzle in
      </Text>
      <Box fontSize={20} fontWeight={600}>
        <Countdown date={timestamp} daysInHours={true} />
      </Box>
    </Flex>
  )
}

export default CountDown
