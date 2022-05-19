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
    borderBottom={showBorder && '1px solid #A0AEC0'}
    justify='center'
    w='100%'
    // border='2px solid purple'
    // pos='fixed'
    // top={0}
    {...rest}
  >
    <Flex
      align='center'
      flexDir='row'
      justify='space-between'
      maxW='600px'
      textAlign='center'
      w='95%'
    >
      {leftIcon ? (
        <IconButton
          icon={leftIcon}
          size='lg'
          variant='ghost'
          onClick={leftIconHandler}
        />
      ) : <Box minW='3em' />}

      <Logo word={headerCaption} />

      {rigthIcon ? (
        <IconButton
          icon={rigthIcon}
          size='lg'
          variant='ghost'
          onClick={rightIconHandler}
        />
      ) : <Box minW='3em' />}
    </Flex>
  </Flex>
)

export default Header
