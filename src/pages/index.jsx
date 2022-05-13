import { useState } from 'react'
import GameLayout from '@layouts/main'
import Confetti from '@components/Confetti'
import Settings from '@components/Settings'
import Game from '@components/Game'
import useViewport from '@hooks/useViewport'
import useGameLogic from '@hooks/useGameLogic'
import useStore from '@lib/store'
import 'isomorphic-fetch'
import { SERVER_URL } from '@lib/constants'
import useOptions from '@hooks/useOptions'

const App = ({ wordData }) => {
  const { wordleGuessed } = useStore()
  const [settingsIsOpen, setSettingsIsOpen] = useState(false)
  const { keyHandler } = useGameLogic(wordData)
  const options = useOptions()
  useViewport()

  const { showConfetti } = options

  const closeSettings = () => setSettingsIsOpen(false)
  const openSettings = () => setSettingsIsOpen(true)

  return (
    <GameLayout>
      {!settingsIsOpen && (
        <Game openSettings={openSettings} keyHandler={keyHandler} />
      )}

      <Settings
        settingsIsOpen={settingsIsOpen}
        closeSettings={closeSettings}
        options={options}
      />

      {showConfetti && <Confetti launchFireworks={wordleGuessed} />}
    </GameLayout>
  )
}

export async function getServerSideProps() {
  const wordData = await fetch(`${SERVER_URL}/api/daily-word`)
    .then(r => r.json())
    .then(data => {
      if (data.success) return data.data
      throw new Error('Bad response from server')
    })

  return { props: { wordData } }
}

export default App
