import useKeys from '@hooks/useKeys'
import useWotd from '@hooks/useWotd'
import useInitGame from '@hooks/useInitGame'
import useGameKeyboard from '@hooks/useGameKeyboard'
import useGameOver from '@hooks/useGameOver'
import useGameSolved from '@hooks/useGameSolved'
import useStore from '@lib/store'
import useGameData from '@hooks/useGameData'

const useGameLogic = wordData => {
  const { gameState } = useStore()
  const { keyHandler } = useGameKeyboard()
  useKeys(keyHandler, gameState === 'IN_PROGRESS')
  useWotd(wordData)
  useInitGame()
  useGameOver()
  useGameSolved()
  useGameData()

  return { keyHandler }
}

export default useGameLogic
