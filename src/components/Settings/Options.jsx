import { Flex, Box, FormControl, FormLabel, Switch, Text, useColorModeValue } from '@chakra-ui/react'

const items = [
  {
    id: 'dark-mode',
    title: 'Dark mode',
    subtitle: 'Toggle between dark and light mode.'
  },
  {
    id: 'blind-mode',
    title: 'Blind mode',
    subtitle: 'Toggle between blind and normal mode.'
  },
  {
    id: 'swap-keys',
    title: 'Swap special keys',
    subtitle: 'Swap "Enter" and "Backspace" buttons.'
  },
  {
    id: 'fat-keys',
    title: 'Fat fingers',
    subtitle: 'Increase the size of the buttons.'
  }
]

const Options = ({ ...props }) => {
  return (
    <Box pt={4} {...props}>
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

export default Options
