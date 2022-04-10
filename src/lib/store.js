import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { encrypt, decrypt } from 'utils/crypto'

const MAX_TRIES = 6

const emptyWord = (WORD_LENGTH) => {
  return Array
    .from({ length: WORD_LENGTH })
    .map((_, index) => ({
      letter: '',
      status: 'empty', // -1: empty, 0: not_exists, 1: exists, 2: guessed
      index
    }))
}

const defaultWords = (WORD_LENGTH, TRIES) => {
  const words = []
  for (let i = 0; i < TRIES; i++) {
    words.push(emptyWord(WORD_LENGTH))
  }
  return words
}

const wordle = set => ({
  wordleWord: '',
  setWordleWord: word => {
    set(() => (
      { wordleWord: encrypt(word) }
    ))
  },

  wordList: [],
  setWordList: (obj) => set(() => ({ wordList: obj })),
  resetWordList: () => set((state) => ({
    wordList: defaultWords(decrypt(state.wordleWord).length, MAX_TRIES)
  })),

  wordInput: [],
  setWordInput: (obj) => set(() => ({ wordInput: obj })),
  resetWordInput: () => set((state) => ({
    wordInput: emptyWord(decrypt(state.wordleWord).length)
  })),

  inputIndex: 0,
  setInputIndex: (index) => set(() => ({ inputIndex: index })),
  increaseInputIndex: () => set(state => ({
    inputIndex: state.inputIndex + 1
  })),

  wordleGuessed: false,
  setWordleGuessed: () => set(() => ({ wordleGuessed: true })),

  // keyboard states
  lettersTried: [],
  addLetterTried: l => set(state => ({
    lettersTried: [...state.lettersTried, l]
  })),
  lettersGuessed: [],
  addLetterGuessed: l => set(state => ({
    lettersGuessed: [...state.lettersGuessed, l]
  })),
  lettersPresent: [],
  addLetterPresent: l => set(state => ({
    lettersPresent: [...state.lettersPresent, l]
  }))
})

let useStore = set => ({
  ...wordle(set)
})

useStore = devtools(useStore)
useStore = create(useStore)

export default useStore
