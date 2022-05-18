import { Flex } from '@chakra-ui/react'
import Modal from '@components/Modal'
import Options from '@components/Modals/Settings/Options'
import Header from '@components/Header'
import { MdOutlineClose as CloseIcon } from 'react-icons/md'

const SettingsModal = ({ isOpen, onClose, options, ...rest }) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      motionPreset='slideInBottom'
      size='xl'
      title={
        <Header
          rigthIcon={<CloseIcon />}
          rightIconHandler={onClose}
          headerCaption='Settings'
          showBorder={false}
        />
      }
      showCloseIcon={false}
      scrollBehavior='inside'
      {...rest}
    >
      <Flex w='100%' justify='center' maxW='600px' pb={8} px={4}>
        <Options
          options={options}
        />
      </Flex>
    </Modal>
  )
}

export default SettingsModal
