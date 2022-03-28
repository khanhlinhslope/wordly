import { Flex, Spacer, Box, IconButton, FormControl, FormLabel, Switch, Text, useColorModeValue } from '@chakra-ui/react'
import { MdOutlineClose as CloseIcon } from 'react-icons/md'

const items = [
  {
    id: 'dark-mode',
    title: 'Dark mode',
    subtitle: 'Toggle between dark and light mode.'
  },
  {
    id: 'blind-mode',
    title: 'Blind mode',
    subtitle: ''
  },
  {
    id: 'swap-keys',
    title: 'Swap special keys',
    subtitle: 'Swap "Enter" and "Backspace" buttons.'
  }
]

const Header = ({ closeSettings }) => {
  return (
    <Flex
      w='100%'
      flexDir='row'
      justify='space-between'
      textAlign='center'
      align='center'
      // borderBottom='1px solid #A0AEC0'
    >
      <Spacer />

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

const Content = () => {
  return (
    <Box pt={4}>
      <form>
        {items.map((item, i) => {
          const { id, title, subtitle } = item
          return (
            <FormControl
              key={id}
              borderBottom='1px solid #A0AEC0'
              px={4}
              h='75px'
            >
              <Flex
                flexDir='row'
                justify='space-between'
                align='center'
                h='full'
              >
                <FormLabel
                  htmlFor={id}
                  display='inline-block'
                >
                  <Text fontWeight='bold'>
                    {title}
                  </Text>

                  {subtitle && <Text
                      fontSize='14px'
                      color={useColorModeValue('#818692', '#c3c7e0')}
                    >
                      {subtitle}
                    </Text>}
                </FormLabel>
                <Flex align='center'>
                  <Switch id={id} />
                </Flex>
              </Flex>
            </FormControl>
          )
        })}
      </form>
    </Box>
  )
}

const Settings = ({ settingsIsOpen, closeSettings }) => {
  if (!settingsIsOpen) return null

  return (
    <Flex
      flexDir='column'
      height='100vh'
      w={['100%', '90%', '80%', '50%', '40%']}
    >
      <Header closeSettings={closeSettings} />

      <Content />
    </Flex>
  )
}

export default Settings
