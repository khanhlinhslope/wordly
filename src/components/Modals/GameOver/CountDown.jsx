import Countdown, { zeroPad } from 'react-countdown'
import { chakra, Flex, Heading } from '@chakra-ui/react'
import { nextWordTs } from '@lib/wotd'

const renderer = ({ hours, minutes, seconds }) => {
  return (
    <chakra.span fontSize={32} fontWeight={600}>
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </chakra.span>
  )
}

const CountDown = ({ ...props }) => {
  const timestamp = nextWordTs()

  return (
    <Flex flexDir='column' align='center' {...props}>
      <Heading as='h3' fontSize={24} fontWeight={400}>
        Next Wordle
      </Heading>
      <Countdown date={timestamp} renderer={renderer} />
    </Flex>
  )
}

export default CountDown
