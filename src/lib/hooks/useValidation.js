import { useRef } from 'react'
import { toast } from 'react-toastify'
import dictionary from '@assets/dictionary/es/words.json'

const checkWord = word => {
  const isValid = dictionary.includes(word)
  return isValid
}

const useValidation = () => {
  // toast refs to avoid duplicated toasts
  const toast1Id = useRef(null) // toast for empty letters
  const toast2Id = useRef(null) // toast for non-existing word

  const emptyLettersToast = () => {
    if (!toast.isActive(toast1Id.current)) {
      toast1Id.current = toast(' Not enough letters')
    }
  }

  const noValidWordToast = word => {
    if (!toast.isActive(toast2Id.current)) {
      toast2Id.current = toast(`"${word}" not exists in our dictionary`)
    }
  }

  const validateWord = wordObj => {
    const hasEmptyLetters = wordObj.some(l => l.letter === '')
    if (hasEmptyLetters) {
      emptyLettersToast()
      return false
    }

    const wordString = wordObj.map(l => l.letter).join('').toLowerCase()
    const isValidWord = checkWord(wordString)
    if (!isValidWord) {
      noValidWordToast(wordString)
      return false
    }

    return true
  }

  return { validateWord }
}

export default useValidation
