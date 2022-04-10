import { Flex, IconButton, Box } from '@chakra-ui/react'
import Logo from 'components/Logo'

const Header = ({ headerCaption, leftIcon, leftIconHandler, rigthIcon, rightIconHandler, ...rest }) => {
  return (
    <Flex
      w='100%'
      flexDir='row'
      justify='space-between'
      textAlign='center'
      align='center'
      borderBottom='1px solid #A0AEC0'
      {...rest}
    >
      {leftIcon
        ? <IconButton
          icon={leftIcon}
          onClick={leftIconHandler}
          variant='ghost'
          size='lg'
        />
        : <Box />
      }

      <Logo word={headerCaption} />

      {rigthIcon
        ? <IconButton
          icon={rigthIcon}
          onClick={rightIconHandler}
          variant='ghost'
          size='lg'
        />
        : <Box />
      }
    </Flex>
  )
}

export default Header
