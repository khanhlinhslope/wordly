/* eslint-disable react/display-name */
import { memo } from 'react'
import { HStack, Text, useColorModeValue } from '@chakra-ui/react'
import useTime from '@hooks/useTime'

const TimeValue = memo(() => {
  const time = useTime()
  const linkColor = useColorModeValue('#818692', '#c3c7e0')

  return (
    <Text as='span' color={linkColor} fontSize={16}>
      {time}
    </Text>
  )
})

const Time = ({ ...props }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <HStack
      align='center'
      borderBottom='1px solid'
      borderColor={borderColor}
      justify='space-between'
      minH='75px'
      minW={['300px', '500px']}
      px={4}
      w='100%'
      {...props}
    >
      <Text fontWeight={600}>Current time</Text>
      <TimeValue />
    </HStack>
  )
}

export default Time
