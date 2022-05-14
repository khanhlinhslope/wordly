import { useEffect, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import 'isomorphic-fetch'
import GameLayout from '@layouts/main'
import Confetti from '@components/Confetti'
import Settings from '@components/Settings'
import Game from '@components/Game'
import LossModal from '@components/LossModal'
import useViewport from '@hooks/useViewport'
import useGameLogic from '@hooks/useGameLogic'
import useOptions from '@hooks/useOptions'
import useStore from '@lib/store'
import { SERVER_URL } from '@lib/constants'

const App = ({ wordData }) => {
  const { wordleGuessed, gameState } = useStore()
  const [settingsIsOpen, setSettingsIsOpen] = useState(false)
  const { keyHandler } = useGameLogic(wordData)
  const options = useOptions()
  useViewport()
  const { showConfetti } = options

  const {
    isOpen: showLossModal,
    onOpen: openLossModal,
    onClose: closeLossModal
  } = useDisclosure()

  useEffect(() => {
    if (gameState === 'LOSS') {
      openLossModal()
    }
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

      {showConfetti && <Confetti launchFireworks={wordleGuessed} />}

      <LossModal isOpen={showLossModal} onClose={closeLossModal} />
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
