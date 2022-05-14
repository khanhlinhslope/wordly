import { GAME_CONFIG } from '@lib/constants'

export const getTodayWordIndex = () => {
  const gameStartedAt = new Date(GAME_CONFIG.startDate).getTime()
  const now = Date.now()
  const oneDayInMs = 86400000
  const todayIndex = Math.floor((now - gameStartedAt) / oneDayInMs)
  return todayIndex
}

export const getWordOfDay = (dictionary, wordIndex) => {
  const wordsCount = dictionary.length
  const todayIndex = getTodayWordIndex()
  const _wordIndex = wordIndex ?? todayIndex
  const word = dictionary[_wordIndex % wordsCount]

  return {
    word,
    wordIndex: _wordIndex,
    wordsCount
  }
}
