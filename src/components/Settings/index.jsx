import { Flex } from '@chakra-ui/react'
import Header from 'components/Settings/Header'
import Options from 'components/Settings/Options'

const Settings = ({ settingsIsOpen, closeSettings, ...rest }) => {
  if (!settingsIsOpen) return null

  return (
    <Flex
      flexDir='column'
      w={['100%', '90%', '65%', '45%', '40%']}
      {...rest}
    >
      <Header
        closeSettings={closeSettings}
        h='calc(var(--vh, 1vh) * 7)'
      />

      <Options
        h='calc(var(--vh, 1vh) * 93)'
      />
    </Flex>
  )
}

export default Settings
