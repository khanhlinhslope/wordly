import { Flex, Box, IconButton } from '@chakra-ui/react'
import { HiCog, HiInformationCircle } from 'react-icons/hi'

const Logo = () => {
  const brand = 'wordle'
  const brandLetters = brand.split('')
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

const Header = ({ openSettings }) => {
  return (
    <Flex
      // border='2px solid pink'
      w='100%'
      flexDir='row'
      justify='space-between'
      textAlign='center'
      align='center'
      borderBottom='1px solid #A0AEC0'
    >
      <Box>
        <IconButton
          icon={<HiInformationCircle />}
          variant='ghost'
          size='lg'
        />
      </Box>

      <Box>
        <Logo />
      </Box>

      <Box>
        <IconButton
          icon={<HiCog />}
          variant='ghost'
          size='lg'
          onClick={openSettings}
        />
      </Box>
    </Flex>
  )
}

export default Header
