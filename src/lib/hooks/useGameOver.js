import { useEffect } from 'react'
import useStore from '@lib/store'
import GAME_CONFIG from '@lib/constants'
import { decrypt } from '@utils/crypto'
import { toast } from 'react-toastify'
import useStats from '@hooks/useStats'

const useGameOver = () => {
  const {
    wordleWord: encryptedWord,
    wordList,
    inputIndex,
    wordleGuessed,
    setWordleGuessed,
    setGameWin,
    setGameLose,
    gameState,
    setLaunchFireworks
  } = useStore()
  const { addWin, addLoss } = useStats()

  useEffect(() => {
    const maxTries = GAME_CONFIG?.tries ?? 6
    const currentTry = inputIndex + 1

    if (currentTry > maxTries && !wordleGuessed && gameState === 'IN_PROGRESS') {
      const currWord = wordList[inputIndex - 1]

      const currentWordString = currWord
        .map(letter => letter.letter)
        .join('')
        .toLowerCase()

      const secretWord = decrypt(encryptedWord)

      if (currentWordString === secretWord) {
        wordleSolved()
      } else {
        wordleLost(secretWord.toUpperCase())
      }
    }
  }, [encryptedWord, inputIndex, gameState])

  const gameLostToast = word => {
    toast(`The word was ${word}`, { autoClose: 5000 })
  }

  const gameWonToast = () => {
    toast('You won! 🎉', { autoClose: 5000 })
  }

  function wordleSolved() {
    addWin(inputIndex)
    setWordleGuessed()
    setGameWin()
    gameWonToast()
    setLaunchFireworks()
  }

  function wordleLost(secretWord) {
    addLoss()
    setGameLose()
    gameLostToast(secretWord)
  }
}

export default useGameOver
