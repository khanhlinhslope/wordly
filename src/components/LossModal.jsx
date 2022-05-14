import { Box } from '@chakra-ui/react'
import Modal from '@components/Modal'

const LossModal = ({ isOpen, onClose, ...rest }) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      motionPreset='slideInBottom'
      size='lg'
      title='Wordly #1'
      showCloseIcon={true}
      scrollBehavior='inside'
      {...rest}
    >
      <Box w='100%' minH='400px' pb={4}>
        You lost!
      </Box>
    </Modal>
  )
}

export default LossModal
