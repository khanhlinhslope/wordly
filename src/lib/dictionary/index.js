import esWords from '@assets/dictionary/es/words.json'
import enWords from '@assets/dictionary/en/words.json'
import { GAME_CONFIG } from '@lib/constants'

const { startDate } = GAME_CONFIG

const dictionaries = {
  es: esWords,
  en: enWords
}

export const getShuffledDictionary = lang => {
  return dictionaries[lang] || dictionaries.es
}

export const getTodayWordIndex = () => {
  const start = new Date(startDate)
  const today = new Date()
  const diff = today.getTime() - start.getTime()
  const dayIndex = Math.floor(diff / (1000 * 60 * 60 * 24))
  return dayIndex
}

export const getWordOfDay = (dictionary, dayOffset = 0) => {
  const dayIndex = getTodayWordIndex() + dayOffset
  const word = dictionary[dayIndex % dictionary.length]
  
  return {
    word,
    dayIndex
  }
}

export const formatWordlist = words => {
  return words.map((word, index) => ({
    word,
    index
  }))
} 