import { Flex } from '@chakra-ui/react'
import Modal from '@components/Modal'
import Header from '@components/Header'
import { MdOutlineClose as CloseIcon } from 'react-icons/md'
import Switches from '@components/Modals/Settings/Switches'
import Links from '@components/Modals/Settings/Links'

const SettingsModal = ({ isOpen, onClose, options, ...rest }) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      motionPreset='slideInBottom'
      size='lg'
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
      <Flex flexDir='column' justify='center' maxW='600px' pb={8}>
        <Switches options={options} />
        <Links />
      </Flex>
    </Modal>
  )
}

export default SettingsModal
