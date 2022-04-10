import { Flex } from '@chakra-ui/react'

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
          h={8}
          w={8}
          borderRadius={4}
          textTransform='uppercase'
          justify='center'
          align='center'
          bg='green.300'
          fontWeight={600}
          fontSize={24}
          color='white'
        >
          {letter}
        </Flex>
      ))}
    </Flex>
  )
}

export default Logo
