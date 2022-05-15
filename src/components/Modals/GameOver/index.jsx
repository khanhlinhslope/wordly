import { chakra, Box, Flex } from '@chakra-ui/react'
import Modal from '@components/Modal'
import useStore from '@lib/store'
import { getTodayWordIndex } from '@lib/wotd'
import { decrypt } from '@utils/crypto'
import useStats from '@hooks/useStats'
import Stats from './Stats'
import Distribution from './Distribution'

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
      size='lg'
      title={title}
      showCloseIcon={true}
      scrollBehavior='inside'
      {...rest}
    >
      <Flex
        flexDir='column'
        w='100%'
        mb={4}
        minH='400px'
        border='1px solid'
      >
        {/* <>Wordle draw preview here</> */}

        <WordReveal encryptedWord={encryptedWord} />

        <Stats stats={playerStats} />

        <Distribution stats={playerStats} mt={8} />

        {/* <>Next Wordle countdown here</> */}
      </Flex>
    </Modal>
  )
}

export default LossModal
