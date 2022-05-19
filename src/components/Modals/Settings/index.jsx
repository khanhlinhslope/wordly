import { Flex } from '@chakra-ui/react'
import Modal from '@components/Modal'
import Header from '@components/Header'
import { MdOutlineClose as CloseIcon } from 'react-icons/md'
import Switches from '@components/Modals/Settings/Switches'
import Links from '@components/Modals/Settings/Links'

const SettingsModal = ({ isOpen, onClose, options, ...rest }) => {
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      motionPreset='slideInBottom'
      scrollBehavior='inside'
      showCloseIcon={false}
      size='lg'
      title={
        <Header
          headerCaption='Settings'
          rightIconHandler={onClose}
          rigthIcon={<CloseIcon />}
          showBorder={false}
        />
      }
      onClose={onClose}
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
