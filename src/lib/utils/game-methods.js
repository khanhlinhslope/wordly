/* @ref https://github.com/roedoejet/AnyLanguage-Wordle/blob/main/src/lib/words.ts */
import fs from 'fs'
import { GAME_CONFIG } from '@lib/constants'

export const shuffleArray = array => array.sort(() => 0.5 - Math.random())

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

export const getDictionary = lang => {
  const { dictionaryPath } = GAME_CONFIG
  const filePath = `${dictionaryPath}/${lang}/words.json`
  const file = fs.readFileSync(filePath)
  const dictionary = JSON.parse(file)
  return dictionary
}

export const getShuffledDictionary = lang => {
  const { dictionaryPath } = GAME_CONFIG
  const filePath = `${dictionaryPath}/${lang}/words-shuffled.json`
  const file = fs.readFileSync(filePath)
  const dictionary = JSON.parse(file)
  return dictionary
}

export const shuffleDictionary = (lang, dictionary) => {
  const { dictionaryPath } = GAME_CONFIG

  const shuffled = shuffleArray(dictionary)
  // .slice(0, 1000)

  const newPath = `${dictionaryPath}/${lang}/words-shuffled.json`
  fs.writeFileSync(newPath, JSON.stringify(shuffled))
  return shuffled
}

export const removeWordById = (lang, dictionary, id) => {
  const { dictionaryPath } = GAME_CONFIG

  const updated = dictionary.filter((_, index) => index !== id)
  const newPath = `${dictionaryPath}/${lang}/words-shuffled.json`
  fs.writeFileSync(newPath, JSON.stringify(updated))
  return updated
}

export const removeWordByWord = (lang, dictionary, word) => {
  const { dictionaryPath } = GAME_CONFIG

  const updated = dictionary.filter(w => w !== word)
  const newPath = `${dictionaryPath}/${lang}/words-shuffled.json`
  fs.writeFileSync(newPath, JSON.stringify(updated))
  return updated
}

export const formatWordlist = words => {
  const gameStartedAt = new Date(GAME_CONFIG.startDate).getTime()
  const todayIndex = getTodayWordIndex()

  const data = words.map((w, i) => {
    const dayIndex = todayIndex + i
    const daysInMS = i * 86400000
    const day = new Date(gameStartedAt + daysInMS)
    const dayString = day.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
    const removeUrl = `http://localhost:5000/api/word-list/remove?word=${w}`

    return {
      index: dayIndex,
      word: w,
      date: dayString,
      removeUrl
    }
  })

  return data
}
