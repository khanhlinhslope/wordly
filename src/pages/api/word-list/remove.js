import nc from 'next-connect'
import { onError, onNoMatch } from '@lib/middlewares/nc'
import { checkLang } from '@lib/middlewares/checkParams'
import withDev from '@lib/middlewares/withDev'
import { getShuffledDictionary, getWordOfDay, removeWordById, removeWord } from '@lib/dictionary'

const handler = nc({ onError, onNoMatch })
  .use(checkLang)
  .use(withDev)
  .get(async (req, res) => {
    let { id: dayIndex, word, lang = 'es' } = req.query
    dayIndex = parseInt(dayIndex)

    const dictionary = getShuffledDictionary(lang)
    const wordsBefore = dictionary.length

    let newDictionary
    if (word) {
      newDictionary = removeWord(lang, dictionary, word)
    } else if (dayIndex) {
      const wotd = getWordOfDay(dictionary, dayIndex)
      word = wotd?.word
      newDictionary = removeWordById(lang, dictionary, dayIndex)
    } else {
      return res.status(400).json({
        success: false,
        message: 'Missing dayIndex or word'
      })
    }

    const wordsAfter = newDictionary.length

    return res.status(200).json({
      success: true,
      data: { removedWord: word, wordsBefore, wordsAfter }
    })
  })

export default handler
