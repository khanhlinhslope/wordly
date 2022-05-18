/* eslint-disable object-shorthand */
import {
  Flex,
  useColorModeValue,
  Switch,
  Text,
  VStack,
  Box
} from '@chakra-ui/react'

const DEV = process.env.NODE_ENV === 'development'

const Switches = ({ options, ...props }) => {
  const {
    showConfetti,
    toggleConfetti,
    swapKeys,
    toggleKeys,
    theme,
    toggleTheme
  } = options

  const subtitleColor = useColorModeValue('#818692', '#c3c7e0')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const items = [
    {
      id: 'dark-mode',
      title: 'Dark mode',
      subtitle: 'Toggle between dark and light mode.',
      handler: toggleTheme,
      value: theme === 'dark',
      enabled: true
    },
    {
      id: 'confetti',
      title: 'Confetti animation',
      subtitle: 'If enabled, you will see a confetti animation if you win.',
      handler: toggleConfetti,
      value: showConfetti,
      enabled: true
    },
    {
      id: 'swap-keys',
      title: 'Swap special keys',
      subtitle: 'Swap "Enter" and "Backspace" buttons.',
      handler: toggleKeys,
      value: swapKeys,
      enabled: true
    },
    {
      id: 'accessibility-mode',
      title: 'Accessibility mode',
      subtitle: 'If enabled, letters size will increase.',
      handler: () => {},
      value: false,
      enabled: false
    },
    {
      id: 'high-contrast',
      title: 'High contrast mode',
      subtitle: 'For improved color vision.',
      handler: () => {},
      value: false,
      enabled: false
    }
  ]

  return (
    <VStack {...props}>
      {items.map(item => {
        const { id, title, subtitle, handler, enabled, value } = item

        if (!enabled && !DEV) return null

        return (
          <Flex
            key={id}
            borderBottom='1px solid'
            borderColor={borderColor}
            px={4}
            minH='75px'
            minW={['300px', '500px']}
            justify='space-between'
            align='center'
          >
            <Box as='span'>
              <Text fontWeight={600}>{title}</Text>

              {subtitle && (
                <Text fontSize={14} color={subtitleColor}>
                  {subtitle}
                </Text>
              )}
            </Box>

            <Switch
              id={id}
              variant='wordle'
              isChecked={value}
              onChange={handler}
              disabled={!enabled}
            />
          </Flex>
        )
      })}
    </VStack>
  )
}

export default Switches
