import { Flex, Icon } from '@chakra-ui/react'
import { HiBackspace } from 'react-icons/hi'

const Backspace = () => {
  return (
    <Flex>
      <Icon as={HiBackspace} w={8} h={8} />
    </Flex>
  )
}

export default Backspace
