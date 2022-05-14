import { chakra, Flex } from '@chakra-ui/react'
import Modal from '@components/Modal'
import useStore from '@lib/store'
import { getTodayWordIndex } from '@lib/wotd'
import { decrypt } from '@utils/crypto'

const LossModal = ({ isOpen, onClose, ...rest }) => {
  const { wordleWord } = useStore()
  const todayWordIndex = getTodayWordIndex()
  const title = `Wordly #${todayWordIndex + 1}`
  const secretWord = decrypt(wordleWord)

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
      <Flex justify='center' w='100%' mb={4} minH='400px'
        // border='1px solid'
      >
        {/* <>Wordle draw preview here</> */}

        {'You lost! The word was: '}
        <chakra.span ml={1} fontWeight={600}>
          {secretWord.toUpperCase()}
        </chakra.span>

        {/* <>Wordle stats here</> */}

        {/* <>Next Wordle countdown here</> */}
      </Flex>
    </Modal>
  )
}

export default LossModal
