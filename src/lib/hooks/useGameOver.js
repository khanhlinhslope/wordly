import { useEffect } from 'react'
import useStore from '@lib/store'
import { GAME_CONFIG } from '@lib/constants'
import { decrypt } from '@utils/crypto'
import { toast } from 'react-toastify'
import useStats from '@hooks/useStats'
import { getTotalAnimationTime } from '@lib/animations'

const totalDuration = getTotalAnimationTime()

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

  const { tries: maxTries } = GAME_CONFIG

  useEffect(() => {
    if (encryptedWord && inputIndex > 0 && !wordleGuessed && gameState === 'IN_PROGRESS') {
      const currentWord = getSubmittedWord()
      const secretWord = decrypt(encryptedWord)

      if (currentWord === secretWord) {
        wordleSolved()
      }
    }
  }, [encryptedWord, inputIndex, gameState])

  useEffect(() => {
    const currentTry = inputIndex + 1

    if (currentTry > maxTries && !wordleGuessed && gameState === 'IN_PROGRESS') {
      const currentWord = getSubmittedWord()
      const secretWord = decrypt(encryptedWord)

      if (currentWord !== secretWord) {
        wordleLost(secretWord.toUpperCase())
      }
    }
  }, [inputIndex, gameState])

  const gameLostToast = word => {
    toast(`The word was ${word}`, { autoClose: 5000 })
  }

  const gameWonToast = () => {
    toast('You won! 🎉', { autoClose: 5000 })
  }

  const getSubmittedWord = () => {
    const currWord = wordList[inputIndex - 1]
    return currWord
      .map(letter => letter.letter)
      .join('')
      .toLowerCase()
  }

  function wordleSolved() {
    addWin(inputIndex)
    setWordleGuessed()
    setGameWin()

    setTimeout(() => {
      gameWonToast()
      setLaunchFireworks()
    }, totalDuration)
  }

  function wordleLost(secretWord) {
    addLoss()
    setGameLose()

    setTimeout(() => {
      gameLostToast(secretWord)
    }, totalDuration)
  }
}

export default useGameOver
