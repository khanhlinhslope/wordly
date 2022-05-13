import { useEffect } from 'react'
import useKeys from '@hooks/useKeys'
import useStore from '@lib/store'
import { decrypt } from '@utils/crypto'
import { isValidLetter } from '@utils/validation'
import { toast } from 'react-toastify'
import dictionary from '@assets/dictionary/es/words.json'

const checkWord = word => {
  const isValid = dictionary.includes(word)
  return isValid
}

const useGameLogic = wordData => {
  const {
    wordList,
    resetWordList,
    wordInput,
    setWordInput,
    resetWordInput,
    increaseInputIndex,
    wordleGuessed,
    setWordleGuessed,
    wordleWord,
    setEncryptedWord,
    inputIndex,
    setWordList,
    lettersGuessed,
    addLetterGuessed,
    lettersPresent,
    addLetterPresent,
    lettersTried,
    addLetterTried
  } = useStore()

  useKeys(keyHandler, !wordleGuessed)

  useEffect(() => {
    if (!wordleWord && wordData) {
      setEncryptedWord(wordData)
    }
  }, [wordleWord])

  useEffect(() => {
    if (wordList.length === 0 && wordleWord) {
      resetWordInput()
      resetWordList()
    }
  }, [wordleWord])

  function keyHandler(key) {
    if (isValidLetter(key)) {
      onChar(key)
    } else if (key.toLowerCase() === 'backspace') {
      onDelete()
    } else if (key.toLowerCase() === 'enter') {
      onEnter()
    }
  }

  function onChar(inputLetter) {
    const currWord = [...wordInput]
    const emptyLetterIndex = currWord.findIndex(letter => letter.letter === '')

    if (emptyLetterIndex !== -1) {
      currWord[emptyLetterIndex] = {
        ...currWord[emptyLetterIndex],
        letter: inputLetter,
        status: 'not_exists'
      }

      setWordInput(currWord)
    }
  }

  function onDelete() {
    const currWord = [...wordInput]
    const reversedWord = currWord.reverse()
    const letterIndex = reversedWord.findIndex(letter => letter.letter !== '')
    if (letterIndex !== -1) {
      currWord[letterIndex] = {
        ...currWord[letterIndex],
        letter: '',
        status: 'empty'
      }
      currWord.reverse()
      setWordInput(currWord)
    }
  }

  function onEnter() {
    const currWord = [...wordInput]
    const hasEmptyLetters = currWord.some(letter => letter.letter === '')

    const currWordString = currWord
      .map(letter => letter.letter)
      .join('')
      .toLowerCase()

    const isValidWord = checkWord(currWordString)

    if (hasEmptyLetters) {
      return toast.error('Please fill all the letters')
    }

    if (!isValidWord) {
      return toast.error(`"${currWordString}" is not in our dictionary 😢`)
    }

    const _wordleWord = decrypt(wordleWord)

    const guessedLetters = currWord.filter(
      ({ letter }, i) => letter === _wordleWord[i]
    )
    const existingLetters = currWord.filter(({ letter }) =>
      _wordleWord.includes(letter)
    )
    const nonExistingLetters = currWord.filter(
      ({ letter }) => !_wordleWord.includes(letter)
    )

    // insert all guessed letters first
    const currWordFormatted = currWord.map((obj, index) => {
      const g = guessedLetters.find(
        l => l.letter === obj.letter && l.index === index
      )
      if (g) return { ...g, status: 'guessed' }
      return {}
    })

    // then insert existing but not guessed letters
    existingLetters.forEach(letter => {
      if (!currWordFormatted[letter.index].letter) {
        let letterToAdd = { ...letter, status: 'exists' }

        // check if the letter exists in currWordFormatted
        const existing = currWordFormatted.filter(
          l => l.letter === letter.letter
        )
        if (existing) {
          const letterCount = _wordleWord
            .split('')
            .filter(s => s === letter.letter).length

          if (existing.length === letterCount) {
            letterToAdd = { ...letter, status: 'not_exists' }
          }
        }

        currWordFormatted[letter.index] = letterToAdd
      }
    })

    // then insert non-existing letters
    nonExistingLetters.forEach(letter => {
      if (!currWordFormatted[letter.index].letter) {
        currWordFormatted[letter.index] = {
          ...letter,
          status: 'not_exists'
        }
      }
    })

    // update keyboard states
    currWordFormatted.forEach(({ letter }, index) => {
      const isGuessed = _wordleWord[index] === letter
      const exists = _wordleWord.includes(letter)

      if (isGuessed && !lettersGuessed.includes(letter)) {
        addLetterGuessed(letter)
      } else if (exists && !lettersPresent.includes(letter)) {
        addLetterPresent(letter)
      } else if (!lettersTried.includes(letter)) addLetterTried(letter)
    })

    const newWordList = [
      ...wordList.slice(0, inputIndex),
      currWordFormatted,
      ...wordList.slice(inputIndex + 1)
    ]
    setWordList(newWordList)

    increaseInputIndex()
    resetWordInput()

    // check if the word is guessed
    if (currWordString === _wordleWord) {
      setWordleGuessed()
    }
  }

  return { keyHandler, onChar, onDelete, onEnter }
}

export default useGameLogic
