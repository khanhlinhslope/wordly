import { useEffect } from 'react'
import useStore from '@lib/store'

const useGameSolved = () => {
  const { wordList, wordleWord, resetWordInput, resetWordList } = useStore()

  useEffect(() => {
    if (wordList.length === 0 && wordleWord) {
      resetWordInput()
      resetWordList()
    }
  }, [wordleWord])
}

export default useGameSolved
