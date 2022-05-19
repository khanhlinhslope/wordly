import { Flex } from '@chakra-ui/react'
import Modal from '@components/Modal'
import Switches from '@components/Modals/Settings/Switches'
import Links from '@components/Modals/Settings/Links'

const SettingsModal = ({ isOpen, onClose, options, ...rest }) => {
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      motionPreset='slideInBottom'
      scrollBehavior='inside'
      showCloseIcon={true}
      size='lg'
      title='Settings'
      onClose={onClose}
      {...rest}
    >
      <Flex
        flexDir='column'
        justify='center'
        maxW='600px'
        mb={8}
        minW={['300px', '500px']}
        w='100%'
      >
        <Switches options={options} />
        <Links mt={2} />
      </Flex>
    </Modal>
  )
}

export default SettingsModal
