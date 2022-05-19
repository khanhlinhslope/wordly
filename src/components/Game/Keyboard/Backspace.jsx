import { Flex, Icon } from '@chakra-ui/react'
import { HiBackspace } from 'react-icons/hi'

const Backspace = () => (
  <Flex>
    <Icon as={HiBackspace} h={8} w={8} />
  </Flex>
)

export default Backspace
