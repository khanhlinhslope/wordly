import { GAME_CONFIG } from '@lib/constants'

const oneDayInMs = 86400000

export const getTodayWordIndex = () => {
  const gameStartedAt = new Date(GAME_CONFIG.startDate).getTime()
  const now = Date.now()
  const todayIndex = Math.floor((now - gameStartedAt) / oneDayInMs)
  return todayIndex
}

export const nextWordTs = () => {
  const gameStartedAt = new Date(GAME_CONFIG.startDate).getTime()
  const todayIndex = getTodayWordIndex()
  const nextWordTs = ((todayIndex + 1) * oneDayInMs) + gameStartedAt
  return nextWordTs
}

// @ref: https://github.com/roedoejet/AnyLanguage-Wordle/blob/main/src/lib/words.ts
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
