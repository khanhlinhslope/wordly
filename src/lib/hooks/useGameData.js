import { useState, useEffect } from 'react'
import { saveGameData, loadGameData } from '@lib/localStorage'
import useStore from '@lib/store'
import { getTodayWordIndex } from '@lib/wotd'

const defaultBoardGuesses = ['', '', '', '', '', '']
const defaultBoardEvaluation = [null, null, null, null, null, null]

// const parseGuesses = wordsData => {
//   const guesses = []
//   const evals = []

//   wordsData.forEach(wordObj => {
//     const guess = wordObj.map(l => l.letter).join('')
//     const _eval = wordObj.map(l => l.status)
//     guesses.push(guess)
//     evals.push(_eval)
//   })

//   return { guesses, evals }
// }

const useGameData = () => {
  const {
    wordList,
    setWordList,
    wordInput,
    setWordInput,
    inputIndex,
    setInputIndex,
    wordleGuessed,
    setWordleGuessed,
    lettersTried,
    setLettersTried,
    lettersGuessed,
    setLettersGuessed,
    lettersPresent,
    setLettersPresent,
    gameState,
    setGameState
  } = useStore()

  const [guesses, setGuesses] = useState(defaultBoardGuesses)
  const [evaluation, setEvaluation] = useState(defaultBoardEvaluation)
  const [lastGamePlayed, setLastGamePlayed] = useState(null)

  // read game data from local storage on mount
  useEffect(() => {
    const gameData = loadGameData()
    const currentPuzzle = getTodayWordIndex() + 1

    const savedGuesses = gameData?.guesses
    const savedEval = gameData?.evaluation
    const savedLastGame = gameData?.lastGamePlayed ?? currentPuzzle
    const savedWordList = gameData?.wordList
    const savedWordInput = gameData?.wordInput
    const savedInputIndex = gameData?.inputIndex
    const savedWordleGuessed = gameData?.wordleGuessed
    const savedLettersTried = gameData?.lettersTried
    const savedLettersGuessed = gameData?.lettersGuessed
    const savedLettersPresent = gameData?.lettersPressent
    const savedGameState = gameData?.gameState

    // if (savedLastGame !== null && savedLastGame !== currentPuzzle) {
    //   return resetGameData()
    // }

    if (savedLastGame === currentPuzzle) {
      if (savedLastGame) setLastGamePlayed(savedLastGame)
      if (savedGuesses) setGuesses(savedGuesses)
      if (savedEval) setEvaluation(savedEval)
      if (savedWordList) setWordList(savedWordList)
      if (savedWordInput) setWordInput(savedWordInput)
      if (savedInputIndex) setInputIndex(savedInputIndex)
      if (savedWordleGuessed) setWordleGuessed(savedWordleGuessed)
      if (savedLettersTried) setLettersTried(savedLettersTried)
      if (savedLettersGuessed) setLettersGuessed(savedLettersGuessed)
      if (savedLettersPresent) setLettersPresent(savedLettersPresent)
      if (savedGameState) setGameState(savedGameState)
    } // else those states will have default values
  }, [])

  // listen for changes to the game states and save them
  useEffect(() => {
    saveData()
  }, [
    evaluation,
    guesses,
    lastGamePlayed,
    wordList,
    wordInput,
    inputIndex,
    wordleGuessed,
    lettersTried,
    lettersPresent,
    lettersGuessed,
    gameState
  ])

  function saveData() {
    saveGameData({
      evaluation,
      guesses,
      lastGamePlayed,
      wordList,
      wordInput,
      inputIndex,
      wordleGuessed,
      lettersTried,
      lettersPresent,
      lettersGuessed,
      gameState
    })
  }

  // function resetGameData() {
  //   const currentPuzzle = getTodayWordIndex() + 1
  //   setGuesses(defaultBoardGuesses)
  //   setEvaluation(defaultBoardEvaluation)
  //   setLastGamePlayed(currentPuzzle)
  // }

  return {
    evaluation,
    guesses,
    lastGamePlayed,
    wordList,
    wordInput,
    inputIndex,
    wordleGuessed,
    lettersTried,
    lettersPresent,
    lettersGuessed,
    gameState
  }
}

export default useGameData
