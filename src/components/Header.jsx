import { Flex, IconButton, Box } from '@chakra-ui/react'
import Logo from '@components/Logo'

const Header = ({
  headerCaption,
  leftIcon,
  leftIconHandler,
  rigthIcon,
  rightIconHandler,
  showBorder = true,
  ...rest
}) => (
  <Flex
    as='header'
    w='100%'
    justify='center'
    borderBottom={showBorder && '1px solid #A0AEC0'}
    // border='2px solid purple'
    // pos='fixed'
    // top={0}
    {...rest}
  >
    <Flex
      flexDir='row'
      justify='space-between'
      textAlign='center'
      align='center'
      w='95%'
      maxW='600px'
    >
      {leftIcon ? (
        <IconButton
          icon={leftIcon}
          onClick={leftIconHandler}
          variant='ghost'
          size='lg'
        />
      ) : <Box minW='3em' />}

      <Logo word={headerCaption} />

      {rigthIcon ? (
        <IconButton
          icon={rigthIcon}
          onClick={rightIconHandler}
          variant='ghost'
          size='lg'
        />
      ) : <Box minW='3em' />}
    </Flex>
  </Flex>
)

export default Header
