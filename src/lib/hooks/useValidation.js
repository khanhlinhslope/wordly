import { toast } from 'react-toastify'
import dictionary from '@assets/dictionary/es/words.json'

const checkWord = word => {
  const isValid = dictionary.includes(word)
  return isValid
}

const useValidation = () => {
  const emptyLettersToast = () => {
    toast(' Not enough letters')
  }

  const noValidWordToast = word => {
    toast(`"${word}" not exists in our dictionary`)
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
