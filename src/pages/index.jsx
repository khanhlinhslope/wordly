import { useState } from 'react'
import GameLayout from '@layouts/main'
import { Flex } from '@chakra-ui/react'
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

  const gameProps = {
    display: settingsIsOpen ? 'none' : 'flex',
    height: settingsIsOpen ? 0 : 'full'
  }

  return (
    <GameLayout>
      <Flex
        as='main'
        flexDir='column'
        justify='center'
        textAlign='center'
        align='center'
        fontFamily='Open Sans, Roboto, sans-serif, Arial, Helvetica, monospace'
        overflow='hidden'
        minH='calc(var(--vh, 1vh) * 100)'
      >
        <Game
          gameProps={gameProps}
          openSettings={openSettings}
          keyHandler={keyHandler}
          h='calc(var(--vh, 1vh) * 100)'
          // border='2px solid green'
        />

        <Settings
          settingsIsOpen={settingsIsOpen}
          closeSettings={closeSettings}
          h='calc(var(--vh, 1vh) * 100)'
          // border='2px solid green'
        />

        <Confetti launchFireworks={wordleGuessed} />
      </Flex>
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
