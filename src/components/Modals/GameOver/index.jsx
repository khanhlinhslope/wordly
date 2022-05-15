import { chakra, Flex, Text } from '@chakra-ui/react'
import Modal from '@components/Modal'
import useStore from '@lib/store'
import { getTodayWordIndex } from '@lib/wotd'
import { decrypt } from '@utils/crypto'
import useStats from '@hooks/useStats'
import Stats from './Stats'
import Distribution from './Distribution'
import CountDown from './CountDown'
import GuessesDraw from './GuessesDraw'

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

const LossModal = ({ isOpen, onClose, ...rest }) => {
  const { wordleWord: encryptedWord, gameState } = useStore()
  const playerStats = useStats()

  const todayWordIndex = getTodayWordIndex()
  const title = `Wordly #${todayWordIndex + 1}`

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      motionPreset='slideInBottom'
      size='full'
      title={title}
      showCloseIcon={true}
      scrollBehavior='inside'
      {...rest}
    >
      <Flex
        flexDir='row'
        justify='center'
        w='100%'
        // border='2px solid purple'
      >
        <Flex
          flexDir='column'
          w='100%'
          maxW='600px'
          // border='2px solid pink'
        >
          {/* <>Wordle draw preview here</> */}
          <GuessesDraw />

          {gameState === 'LOSS' && (
            <YouLost encryptedWord={encryptedWord} mt={4} />
          )}

          {gameState === 'WIN' && <Congrats mt={4} />}

          <Stats stats={playerStats} />

          <Distribution stats={playerStats} mt={8} />

          <CountDown mt={8} />
        </Flex>
      </Flex>
    </Modal>
  )
}

export default LossModal
