import { chakra, Box, Flex } from '@chakra-ui/react'
import Modal from '@components/Modal'
import useStore from '@lib/store'
import { getTodayWordIndex } from '@lib/wotd'
import { decrypt } from '@utils/crypto'
import useStats from '@hooks/useStats'
import Stats from './Stats'
import Distribution from './Distribution'
import CountDown from './CountDown'

const WordReveal = ({ encryptedWord, ...props }) => {
  const secretWord = decrypt(encryptedWord)
  return (
    <Box textAlign='center' {...props}>
      {'You lost! The word was: '}
      <chakra.span ml={1} fontWeight={600}>
        {secretWord.toUpperCase()}
      </chakra.span>
    </Box>
  )
}

const LossModal = ({ isOpen, onClose, ...rest }) => {
  const { wordleWord: encryptedWord } = useStore()
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
        border='2px solid purple'
      >
        <Flex
          flexDir='column'
          w='100%'
          maxW='600px'
          border='2px solid pink'
        >
          {/* <>Wordle draw preview here</> */}

          <WordReveal encryptedWord={encryptedWord} />

          <Stats stats={playerStats} />

          <Distribution stats={playerStats} mt={8} />

          <CountDown mt={8} />
        </Flex>
      </Flex>
    </Modal>
  )
}

export default LossModal
