import { useState } from 'react'
import GameLayout from '@layouts/main'
import Confetti from '@components/Confetti'
import Settings from '@components/Settings'
import Game from '@components/Game'
import useKeys from '@hooks/useKeys'
import useViewport from '@hooks/useViewport'
import useGameLogic from '@hooks/useGameLogic'
import useStore from '@lib/store'
import 'isomorphic-fetch'

const App = ({ wordData }) => {
  const { wordleGuessed } = useStore()
  const [settingsIsOpen, setSettingsIsOpen] = useState(false)
  const { keyHandler } = useGameLogic(wordData)
  useKeys(keyHandler, !wordleGuessed)
  useViewport()

  const closeSettings = () => setSettingsIsOpen(false)
  const openSettings = () => setSettingsIsOpen(true)

  return (
    <GameLayout>
      {!settingsIsOpen && (
        <Game
          openSettings={openSettings}
          keyHandler={keyHandler}
        />
      )}

      <Settings
        settingsIsOpen={settingsIsOpen}
        closeSettings={closeSettings}
      />

      <Confetti launchFireworks={wordleGuessed} />
    </GameLayout>
  )
}

export async function getServerSideProps() {
  // const { data: cardsData } = await fetch(`${server}/api/get-word`)
  const wordData = await fetch('http://localhost:5000/api/get-word')
    .then(r => r.json())
    .then(data => {
      if (data.success) return data.data
      throw new Error('Bad response from server')
    })

  return { props: { wordData } }
}

export default App
