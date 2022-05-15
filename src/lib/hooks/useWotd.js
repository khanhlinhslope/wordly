import { useEffect } from 'react'
import useStore from '@lib/store'

const useWotd = encryptedWord => {
  const { wordleWord, setEncryptedWord } = useStore()

  useEffect(() => {
    if (!wordleWord && encryptedWord) {
      setEncryptedWord(encryptedWord)
    }
  }, [wordleWord, encryptedWord])
}

export default useWotd
