import { Flex } from '@chakra-ui/react'
import KeyboardLetter from '@components/Game/Keyboard/KeyboardLetter'

const keys = [
  [
    { key: 'q' },
    { key: 'w' },
    { key: 'e' },
    { key: 'r' },
    { key: 't' },
    { key: 'y' },
    { key: 'u' },
    { key: 'i' },
    { key: 'o' },
    { key: 'p' }
  ],
  [
    { key: 'a' },
    { key: 's' },
    { key: 'd' },
    { key: 'f' },
    { key: 'g' },
    { key: 'h' },
    { key: 'j' },
    { key: 'k' },
    { key: 'l' },
    { key: 'ñ' }
  ],
  [
    { key: 'enter', special: true },
    { key: 'z' },
    { key: 'x' },
    { key: 'c' },
    { key: 'v' },
    { key: 'b' },
    { key: 'n' },
    { key: 'm' },
    { key: 'backspace', special: true }
  ]
]

const Keyboard = props => {
  const { keyHandler, ...rest } = props

  return (
    <Flex
      as='footer'
      align='center'
      justify='center'
      w='100%'
      pos='fixed'
      bottom={0}
      // border='2px solid purple'
      {...rest}
    >
      <Flex
        flexDir='column'
        gap='0.25rem'
        w='95%'
        maxW='600px'
        // border='2px solid #A0AEC0'
      >
        {keys.map((row, i) => (
          <Flex
            key={i}
            flexDir='row'
            justify='stretch'
            // gap={['0.15rem', '0.50rem']}
          >
            {row.map((key, j) => (
              <KeyboardLetter
                key={j}
                letter={key}
                keyHandler={() => keyHandler(key.key)}
              />
            ))}
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default Keyboard
