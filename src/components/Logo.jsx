import { Flex, useColorModeValue } from '@chakra-ui/react'

const Logo = ({ word }) => {
  if (!word) return null

  const brandLetters = word.split('')
  return (
    <Flex
      flexDir='row'
      gap={1}
    >
      {brandLetters.map((letter, i) => (
        <Flex
          key={i}
          align='center'
          bg={useColorModeValue('green.300', 'green.400')}
          borderRadius={4}
          color='white'
          fontSize={24}
          fontWeight={600}
          h={8}
          justify='center'
          textTransform='uppercase'
          w={8}
        >
          {letter}
        </Flex>
      ))}
    </Flex>
  )
}

export default Logo
