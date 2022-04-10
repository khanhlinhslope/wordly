import { Flex, Box, IconButton } from '@chakra-ui/react'
import { MdOutlineClose as CloseIcon } from 'react-icons/md'
import Logo from 'components/Settings/Logo'

const Header = ({ closeSettings, ...rest }) => {
  return (
    <Flex
      w='100%'
      flexDir='row'
      justify='space-between'
      textAlign='center'
      align='center'
      // borderBottom='1px solid #A0AEC0'
      {...rest}
    >
      <Box>
        <IconButton
          icon={<CloseIcon />}
          variant='ghost'
          size='lg'
          onClick={closeSettings}
        />
      </Box>

      <Box>
        <Logo />
      </Box>

      <Box>
        <IconButton
          icon={<CloseIcon />}
          variant='ghost'
          size='lg'
          onClick={closeSettings}
        />
      </Box>
    </Flex>
  )
}

export default Header
