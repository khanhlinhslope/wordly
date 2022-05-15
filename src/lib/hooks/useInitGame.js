import { useEffect } from 'react'
import useStore from '@lib/store'

const useInitGame = () => {
  const { wordList, wordleWord, resetWordInput, resetWordList } = useStore()

  useEffect(() => {
    if (wordList.length === 0 && wordleWord) {
      resetWordInput()
      resetWordList()
    }
  }, [wordleWord])
}

export default useInitGame
