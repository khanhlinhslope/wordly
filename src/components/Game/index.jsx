import Header from '@components/Header'
import WordleGrid from '@components/Game/WordleGrid'
import Keyboard from '@components/Game/Keyboard'
import { toast } from 'react-toastify'
import { HiCog as CogIcon, HiInformationCircle as HelpIcon } from 'react-icons/hi'

const Game = ({ openSettings, keyHandler, options }) => (
  <>
    <Header
      h='calc(var(--vh, 1vh) * 8)'
      headerCaption='Wordly'
      leftIcon={<HelpIcon />}
      leftIconHandler={() => toast('Test!')}
      rightIconHandler={openSettings}
      rigthIcon={<CogIcon />}
    />

    <WordleGrid h='calc(var(--vh, 1vh) * 67)' py={[2, 5, 5, 5, 5]} />

    <Keyboard
      keyHandler={keyHandler}
      minH='calc(var(--vh, 1vh) * 25)'
      options={options}
    />
  </>
)

export default Game
