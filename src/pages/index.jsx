import { useEffect, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import 'isomorphic-fetch'
import GameLayout from '@layouts/main'
import Confetti from '@components/Confetti'
import Settings from '@components/Settings'
import Game from '@components/Game'
import GameOverModal from '@components/Modals/GameOver'
import useViewport from '@hooks/useViewport'
import useGameLogic from '@hooks/useGameLogic'
import useOptions from '@hooks/useOptions'
import useStore from '@lib/store'
import { SERVER_URL } from '@lib/constants'

const App = ({ wordData }) => {
  const { gameState, launchFireworks } = useStore()
  const [settingsIsOpen, setSettingsIsOpen] = useState(false)
  const { keyHandler } = useGameLogic(wordData)
  const options = useOptions()
  useViewport()

  const { showConfetti } = options

  const {
    isOpen: showGameOverModal,
    onOpen: openGameOverModal,
    onClose: closeGameOverModal
  } = useDisclosure()

  useEffect(() => {
    if (gameState !== 'IN_PROGRESS') openGameOverModal()
  }, [gameState])

  const closeSettings = () => setSettingsIsOpen(false)
  const openSettings = () => setSettingsIsOpen(true)

  return (
    <GameLayout>
      {!settingsIsOpen && (
        <Game
          openSettings={openSettings}
          keyHandler={keyHandler}
          options={options}
        />
      )}

      <Settings
        settingsIsOpen={settingsIsOpen}
        closeSettings={closeSettings}
        options={options}
      />

      {showConfetti && <Confetti launchFireworks={launchFireworks} />}

      <GameOverModal isOpen={showGameOverModal} onClose={closeGameOverModal} />
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
