import useStore from '@lib/store'
import { decrypt } from '@utils/crypto'
import useValidation from '@hooks/useValidation'
import { isValidLetter } from '@utils/validation'

const useGameKeyboard = () => {
  const {
    wordList,
    wordInput,
    setWordInput,
    resetWordInput,
    increaseInputIndex,
    wordleWord,
    inputIndex,
    setWordList,
    lettersGuessed,
    addLetterGuessed,
    lettersPresent,
    addLetterPresent,
    lettersTried,
    addLetterTried,
    gameState
  } = useStore()

  const { validateWord } = useValidation()

  const submitWord = wordObj => {
    const newWordList = [
      ...wordList.slice(0, inputIndex),
      wordObj,
      ...wordList.slice(inputIndex + 1)
    ]
    setWordList(newWordList)

    increaseInputIndex()
    resetWordInput()
  }

  const updateKeyboardStates = (secretWord, wordObj) => {
    wordObj.forEach(({ letter }, index) => {
      const isGuessed = secretWord[index] === letter
      const exists = secretWord.includes(letter)

      if (isGuessed && !lettersGuessed.includes(letter)) {
        addLetterGuessed(letter)
      } else if (exists && !lettersPresent.includes(letter)) {
        addLetterPresent(letter)
      } else if (!lettersTried.includes(letter)) addLetterTried(letter)
    })
  }

  const splitLetters = (secretWord, wordObj) => {
    const guessed = wordObj.filter(({ letter }, i) => letter === secretWord[i])

    const existing = wordObj.filter(({ letter }) => secretWord.includes(letter))

    const nonExisting = wordObj.filter(({ letter }) => !secretWord.includes(letter))

    return { guessed, existing, nonExisting }
  }

  const fixSubmittedWord = (secretWord, wordObj) => {
    const { guessed, existing, nonExisting } = splitLetters(secretWord, wordObj)

    // insert all guessed letters first
    const fixedWord = wordObj.map((obj, index) => {
      const g = guessed.find(l => l.letter === obj.letter && l.index === index)
      if (g) return { ...g, status: 'guessed' }
      return {}
    })

    // insert existing but not guessed letters
    existing.forEach(l => {
      if (!fixedWord[l.index].letter) {
        let letterToAdd = { ...l, status: 'exists' }
        const existing = fixedWord.filter(l2 => l2.letter === l.letter)

        if (existing) {
          const letterCount = secretWord
            .split('')
            .filter(s => s === l.letter).length

          if (existing.length === letterCount) {
            letterToAdd = { ...l, status: 'not_exists' }
          }
        }

        fixedWord[l.index] = letterToAdd
      }
    })

    // insert non-existing letters
    nonExisting.forEach(l => {
      if (!fixedWord[l.index].letter) {
        fixedWord[l.index] = { ...l, status: 'not_exists' }
      }
    })

    return fixedWord
  }

  function keyHandler(key) {
    if (gameState === 'IN_PROGRESS') {
      if (isValidLetter(key)) {
        onChar(key)
      } else if (key.toLowerCase() === 'backspace') {
        onDelete()
      } else if (key.toLowerCase() === 'enter') {
        onEnter()
      }
    }
  }

  function onChar(inputLetter) {
    const submittedWord = [...wordInput]
    const emptyLetterIndex = submittedWord.findIndex(letter => letter.letter === '')

    if (emptyLetterIndex !== -1) {
      submittedWord[emptyLetterIndex] = {
        ...submittedWord[emptyLetterIndex],
        letter: inputLetter,
        status: 'not_exists'
      }

      setWordInput(submittedWord)
    }
  }

  function onDelete() {
    const submittedWord = [...wordInput]
    const reversedWord = submittedWord.reverse()
    const letterIndex = reversedWord.findIndex(letter => letter.letter !== '')
    if (letterIndex !== -1) {
      submittedWord[letterIndex] = {
        ...submittedWord[letterIndex],
        letter: '',
        status: 'empty'
      }
      submittedWord.reverse()
      setWordInput(submittedWord)
    }
  }

  function onEnter() {
    const submittedWord = [...wordInput]
    const isValid = validateWord(submittedWord)

    if (isValid) {
      const secretWord = decrypt(wordleWord)
      const fixedSubmittedWord = fixSubmittedWord(secretWord, submittedWord)
      updateKeyboardStates(secretWord, fixedSubmittedWord)
      submitWord(fixedSubmittedWord)
    }
  }

  return { keyHandler, onChar, onDelete, onEnter }
}

export default useGameKeyboard
