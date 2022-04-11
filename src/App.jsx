import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import Header from 'components/Header'
import WordleGrid from 'components/WordleGrid'
import Keyboard from 'components/Keyboard'
import Confetti from 'components/Confetti'
import Settings from 'components/Settings'
import useKeys from 'hooks/useKeys'
import useViewport from 'hooks/useViewport'
import useStore from 'lib/store'
import { decrypt } from 'utils/crypto'
import { isValidLetter } from 'utils/validation'
import { toast } from 'react-toastify'
import { HiCog as CogIcon, HiInformationCircle as HelpIcon } from 'react-icons/hi'

const Game = ({ gameProps, openSettings, keyHandler, ...rest }) => {
  return (
    <Flex
      flexDir='column'
      justify='center'
      textAlign='center'
      align='center'
      w={['100%', '90%', '65%', '45%', '40%']}
      {...gameProps}
      {...rest}
    >
      <Header
        rigthIcon={<CogIcon />}
        rightIconHandler={openSettings}
        leftIcon={<HelpIcon />}
        leftIconHandler={() => toast('Test!')}
        headerCaption='Wordly'
        h='calc(var(--vh, 1vh) * 7)'
      />

      <WordleGrid
        minH='calc(var(--vh, 1vh) * 60)'
        py={[2, 5, 5, 5, 5]}
        // border='2px solid blue'
      />

      <Keyboard
        keyHandler={keyHandler}
        minH='calc(var(--vh, 1vh) * 33)'
        // border='2px solid red'
      />
    </Flex>
  )
}

const App = () => {
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
    setWordleWord,
    inputIndex,
    setWordList,
    lettersGuessed,
    addLetterGuessed,
    lettersPresent,
    addLetterPresent,
    lettersTried,
    addLetterTried
  } = useStore()
  const [settingsIsOpen, setSettingsIsOpen] = useState(false)
  useKeys(keyHandler, !wordleGuessed)
  useViewport()

  useEffect(() => {
    if (!wordleWord) {
      setWordleWord('mafer') // temporary
    } else {
      console.log('secret:', decrypt(wordleWord))
    }
  }, [wordleWord])

  useEffect(() => {
    if (wordList.length === 0 && wordleWord) {
      resetWordInput()
      resetWordList()
    }
  }, [wordleWord])

  function keyHandler (key) {
    if (isValidLetter(key)) {
      letterHandler(key)
    } else if (key.toLowerCase() === 'backspace') {
      backspaceHandler()
    } else if (key.toLowerCase() === 'enter') {
      enterHandler()
    }
  }

  function letterHandler (inputLetter) {
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

  function backspaceHandler () {
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

  function enterHandler () {
    const currWord = [...wordInput]
    const hasEmptyLetters = currWord.some(letter => letter.letter === '')
    if (!hasEmptyLetters) {
      const _wordleWord = decrypt(wordleWord)

      const guessedLetters = currWord.filter(({ letter }, i) => letter === _wordleWord[i])
      const existingLetters = currWord.filter(({ letter }) => _wordleWord.includes(letter))
      const nonExistingLetters = currWord.filter(({ letter }) => !_wordleWord.includes(letter))

      // insert all guessed letters first
      const currWordFormatted = currWord.map((obj, index) => {
        const g = guessedLetters.find(l => (l.letter === obj.letter && l.index === index))
        if (g) return { ...g, status: 'guessed' }
        return {}
      })

      // then insert existing but not guessed letters
      existingLetters.forEach(letter => {
        if (!currWordFormatted[letter.index].letter) {
          let letterToAdd = { ...letter, status: 'exists' }

          // check if the letter exists in currWordFormatted
          const existing = currWordFormatted.filter(l => l.letter === letter.letter)
          if (existing) {
            const letterCount = _wordleWord.split('').filter(s => s === letter.letter).length
            // check if the number of times the letter exists in wordleWord is already the same as in currWordFormatted, if so, change the status to not_exists
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

        if (isGuessed && !lettersGuessed.includes(letter)) addLetterGuessed(letter)
        else if (exists && !lettersPresent.includes(letter)) addLetterPresent(letter)
        else if (!lettersTried.includes(letter)) addLetterTried(letter)
      })

      const newWordList = [...wordList.slice(0, inputIndex), currWordFormatted, ...wordList.slice(inputIndex + 1)]
      setWordList(newWordList)

      increaseInputIndex()
      resetWordInput()

      // check if the word is guessed
      const currWordString = currWord.map(letter => letter.letter).join('').toLowerCase()
      if (currWordString === _wordleWord) {
        setWordleGuessed()
      }
    } else {
      toast.error('Word is too short!')
    }
  }

  const closeSettings = () => setSettingsIsOpen(false)
  const openSettings = () => setSettingsIsOpen(true)

  const gameProps = {
    display: settingsIsOpen ? 'none' : 'flex',
    height: settingsIsOpen ? 0 : 'full'
  }

  return (
    <Flex
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
  )
}

export default App
