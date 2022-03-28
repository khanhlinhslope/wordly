import { Flex } from '@chakra-ui/react'
import KeyboardLetter from 'components/Keyboard/KeyboardLetter'

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
    { key: 'backspace', special: true },
    { key: 'z' },
    { key: 'x' },
    { key: 'c' },
    { key: 'v' },
    { key: 'b' },
    { key: 'n' },
    { key: 'm' },
    { key: 'enter', special: true }
  ]
]

const Keyboard = (props) => {
  const { keyHandler, ...rest } = props

  return (
    <Flex
      flexDir='column'
      justify='center'
      textAlign='center'
      align='center'
      gap='4px'
      pt={8}
      {...rest}
    >
      {keys.map((row, i) => (
        <Flex
          key={i}
          flexDir='row'
          justify='space-between'
          gap={['3px', '3px', '2px', '2px', '2px']}
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
  )
}

export default Keyboard
