import { Flex } from '@chakra-ui/react'
import Header from '@components/Header'
import Options from '@components/Settings/Options'
import { MdOutlineClose as CloseIcon } from 'react-icons/md'

const Settings = ({ settingsIsOpen, closeSettings, ...rest }) => {
  if (!settingsIsOpen) return null

  return (
    <Flex
      flexDir='column'
      w={['100%', '90%', '65%', '45%', '40%']}
      {...rest}
    >
      <Header
        rigthIcon={<CloseIcon />}
        rightIconHandler={closeSettings}
        headerCaption='Settings'
        showBorder={false}
        h='calc(var(--vh, 1vh) * 7)'
      />

      <Options
        h='calc(var(--vh, 1vh) * 93)'
      />
    </Flex>
  )
}

export default Settings
