import Header from '@components/Header'
import Options from '@components/Settings/Options'
import { MdOutlineClose as CloseIcon } from 'react-icons/md'
import useOptions from '@hooks/useOptions'

const Settings = ({ settingsIsOpen, closeSettings }) => {
  const options = useOptions()

  if (!settingsIsOpen) return null

  return (
    <>
      <Header
        rigthIcon={<CloseIcon />}
        rightIconHandler={closeSettings}
        headerCaption='Settings'
        showBorder={false}
        h='calc(var(--vh, 1vh) * 8)'
      />

      <Options
        options={options}
        h='calc(var(--vh, 1vh) * 92)'
      />
    </>
  )
}

export default Settings
