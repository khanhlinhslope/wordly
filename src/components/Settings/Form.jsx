import {
  Flex,
  FormControl,
  FormLabel,
  useColorModeValue,
  useColorMode,
  Switch,
  Text
} from '@chakra-ui/react'

const DEV = import.meta.env.MODE === 'development'

const Form = ({ ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  const items = [
    {
      id: 'dark-mode',
      title: 'Dark mode',
      subtitle: 'Toggle between dark and light mode.',
      handler: toggleColorMode,
      value: colorMode === 'dark',
      enabled: true
    },
    {
      id: 'confetti',
      title: 'Confetti animation',
      subtitle: 'If enabled, you will see a confetti animation if you win.',
      handler: () => { },
      value: true,
      enabled: false
    },
    {
      id: 'accessibility-mode',
      title: 'Accessibility mode',
      subtitle: 'If enabled, letters size will increase.',
      handler: () => { },
      value: false,
      enabled: false
    },
    {
      id: 'swap-keys',
      title: 'Swap special keys',
      subtitle: 'Swap "Enter" and "Backspace" buttons.',
      handler: () => { },
      value: false,
      enabled: false
    },
    {
      id: 'fat-keys',
      title: 'Fat fingers',
      subtitle: 'Increase the size of the buttons.',
      handler: () => { },
      value: false,
      enabled: false
    }
  ]

  return (
    <form { ...props }>
      {items.map((item, i) => {
        const { id, title, subtitle, handler, enabled, value } = item

        if (!enabled && !DEV) return null

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
                <Switch
                  id={id}
                  variant='wordle'
                  isChecked={value}
                  onChange={handler}
                  disabled={!enabled}
                />
              </Flex>
            </Flex>
          </FormControl>
        )
      })}
    </form>
  )
}

export default Form
