import { useEffect } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import 'isomorphic-fetch'
import GameLayout from '@layouts/main'
import Confetti from '@components/Confetti'
import Game from '@components/Game'
import GameOverModal from '@components/Modals/GameOver'
import SettingsModal from '@components/Modals/Settings'
import useViewport from '@hooks/useViewport'
import useGameLogic from '@hooks/useGameLogic'
import useOptions from '@hooks/useOptions'
import useStore from '@lib/store'
import { defaultUrl as PRODUCTION_URL } from 'next-seo.config'
import { GAME_CONFIG } from '@lib/constants'

const App = ({ wordData }) => {
  const { revealAnimationTime, defaultWordLength: wordLength } = GAME_CONFIG
  const { gameState, launchFireworks } = useStore()
  const { keyHandler } = useGameLogic(wordData)
  const options = useOptions()
  useViewport()

  const { showConfetti } = options

  const {
    isOpen: showGameOverModal,
    onOpen: openGameOverModal,
    onClose: closeGameOverModal
  } = useDisclosure()

  const {
    isOpen: showSettingsModal,
    onOpen: openSettingsModal,
    onClose: closeSettingsModal
  } = useDisclosure()

  useEffect(() => {
    if (gameState !== 'IN_PROGRESS') {
      setTimeout(() => {
        openGameOverModal()
      }, revealAnimationTime * (wordLength + 3))
    }
  }, [gameState])

  return (
    <GameLayout>
      <Game
        keyHandler={keyHandler}
        openSettings={openSettingsModal}
        options={options}
      />

      {showConfetti && <Confetti launchFireworks={launchFireworks} />}

      <SettingsModal
        isOpen={showSettingsModal}
        options={options}
        onClose={closeSettingsModal}
      />

      <GameOverModal isOpen={showGameOverModal} onClose={closeGameOverModal} />
    </GameLayout>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const proto = req.headers['x-forwarded-proto'] || req.headers.referer?.split('://')[0] || 'https'
  const { NODE_ENV, PORT } = process.env
  const DEVELOPMENT_URL = `${proto}://localhost:${PORT}`

  const SERVER_URL = NODE_ENV === 'production'
    ? PRODUCTION_URL
    : DEVELOPMENT_URL

  const dailyWordUrl = `${SERVER_URL}/api/daily-word`

  const wordData = await fetch(dailyWordUrl)
    .then(r => r.json())
    .then(data => {
      if (data.success) return data.data
      throw new Error('Bad response from server')
    })

  return { props: { wordData } }
}

export default App
