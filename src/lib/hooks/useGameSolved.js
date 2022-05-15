import { useEffect } from 'react'
import useStore from '@lib/store'
import { decrypt } from '@utils/crypto'
import { toast } from 'react-toastify'
import useStats from '@hooks/useStats'

const useGameSolved = () => {
  const {
    wordleWord: encryptedWord,
    wordList,
    inputIndex,
    setWordleGuessed,
    setGameWin,
    gameState,
    setLaunchFireworks
  } = useStore()
  const { addWin } = useStats()

  useEffect(() => {
    if (encryptedWord && inputIndex > 0 && gameState === 'IN_PROGRESS') {
      const currWord = wordList[inputIndex - 1]

      const currentWordString = currWord
        .map(letter => letter.letter)
        .join('')
        .toLowerCase()

      const secretWord = decrypt(encryptedWord)

      if (currentWordString === secretWord) {
        wordleSolved()
      }
    }
  }, [encryptedWord, inputIndex, gameState])

  const gameWonToast = () => {
    toast('You won!', { autoClose: 5000 })
  }

  function wordleSolved() {
    setWordleGuessed()
    setGameWin()
    gameWonToast()
    addWin(inputIndex)
    setLaunchFireworks()
  }
}

export default useGameSolved
