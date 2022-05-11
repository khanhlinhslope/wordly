import Header from '@components/Header'
import Options from '@components/Settings/Options'
import { MdOutlineClose as CloseIcon } from 'react-icons/md'

const Settings = ({ settingsIsOpen, closeSettings }) => {
  if (!settingsIsOpen) return null

  return (
    <>
      <Header
        rigthIcon={<CloseIcon />}
        rightIconHandler={closeSettings}
        headerCaption='Settings'
        showBorder={false}
        h='calc(var(--vh, 1vh) * 8)'
        // border='2px solid aqua'
      />

      <Options h='calc(var(--vh, 1vh) * 92)' />
    </>
  )
}

export default Settings
