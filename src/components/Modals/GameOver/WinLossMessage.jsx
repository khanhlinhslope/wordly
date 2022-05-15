import { chakra, Text } from '@chakra-ui/react'
import useStore from '@lib/store'
import { decrypt } from '@utils/crypto'

const YouLost = ({ encryptedWord, ...props }) => {
  const secretWord = decrypt(encryptedWord)
  return (
    <Text textAlign='center' {...props}>
      {'You lost! The word was: '}
      <chakra.span ml={1} fontWeight={600}>
        {secretWord.toUpperCase()}
      </chakra.span>
    </Text>
  )
}

const Congrats = ({ ...props }) => {
  return (
    <Text fontWeight={600} textAlign='center' {...props}>
      Congrats 🎉
    </Text>
  )
}

const Message = ({ ...props }) => {
  const { wordleWord: encryptedWord, gameState } = useStore()

  if (gameState === 'WIN') {
    return <Congrats {...props} />
  }

  return <YouLost encryptedWord={encryptedWord} {...props} />
}

export default Message
