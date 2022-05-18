/* eslint-disable object-shorthand */
import { Box, Flex, IconButton, Switch, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { removeStats, removeGameData, removeOptions } from '@lib/localStorage'
import { MdOutlineClose as StarIcon } from 'react-icons/md'

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
      type: 'switch',
      enabled: true
    },
    {
      id: 'confetti',
      title: 'Confetti animation',
      subtitle: 'If enabled, you will see a confetti animation if you win.',
      handler: toggleConfetti,
      value: showConfetti,
      type: 'switch',
      enabled: true
    },
    {
      id: 'swap-keys',
      title: 'Swap special keys',
      subtitle: 'Swap "Enter" and "Backspace" buttons.',
      handler: toggleKeys,
      value: swapKeys,
      type: 'switch',
      enabled: true
    },
    {
      id: 'accessibility-mode',
      title: 'Accessibility mode',
      subtitle: 'If enabled, letters size will increase.',
      handler: () => {},
      value: false,
      type: 'switch',
      enabled: false
    },
    {
      id: 'high-contrast',
      title: 'High contrast mode',
      subtitle: 'For improved color vision.',
      handler: () => {},
      value: false,
      type: 'switch',
      enabled: false
    },
    {
      id: 'reset-stats',
      title: 'Reset player stats',
      subtitle: 'Reset player stats from local storage.',
      handler: removeStats,
      type: 'button',
      enabled: true,
      devOnly: true
    },
    {
      id: 'reset-data',
      title: 'Reset game data',
      subtitle: 'Reset game data from local storage.',
      handler: removeGameData,
      type: 'button',
      enabled: true,
      devOnly: true
    },
    {
      id: 'reset-options',
      title: 'Reset player options',
      subtitle: 'Reset player options from local storage.',
      handler: removeOptions,
      type: 'button',
      enabled: true,
      devOnly: true
    }
  ]

  return (
    <VStack {...props}>
      {items.map(item => {
        const { id, title, subtitle, handler, enabled, value, type, devOnly } =
          item

        if (!enabled && !DEV) return null
        if (devOnly && !DEV) return null

        const isSwitch = type === 'switch'
        const isButton = type === 'button'

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

            {isSwitch && (
              <Switch
                id={id}
                variant='wordle'
                isChecked={value}
                onChange={handler}
                disabled={!enabled}
              />
            )}

            {isButton && (
              <IconButton
                id={id}
                icon={<StarIcon />}
                onClick={handler}
                disabled={!enabled}
              />
            )}
          </Flex>
        )
      })}
    </VStack>
  )
}

export default Switches
