import { useEffect } from 'react'
import useStore from '@lib/store'
import GAME_CONFIG from '@lib/constants'
import { decrypt } from '@utils/crypto'
import { toast } from 'react-toastify'
import useStats from '@hooks/useStats'

const useGameOver = () => {
  const {
    wordleWord: encryptedWord,
    inputIndex,
    wordleGuessed,
    setGameLose
  } = useStore()
  const { addLoss } = useStats()

  useEffect(() => {
    const maxTries = GAME_CONFIG?.tries ?? 6
    const currentTry = inputIndex + 1

    if (currentTry > maxTries && !wordleGuessed) {
      const secretWord = decrypt(encryptedWord)?.toUpperCase()
      wordleLost(secretWord)
    }
  }, [inputIndex])

  const gameLostToast = word => {
    toast(`The word was ${word}`, { autoClose: 5000 })
  }

  function wordleLost(secretWord) {
    setGameLose()
    gameLostToast(secretWord)
    addLoss()
  }
}

export default useGameOver
