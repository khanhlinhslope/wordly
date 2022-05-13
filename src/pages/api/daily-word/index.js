import nc from 'next-connect'
import { onError, onNoMatch } from '@lib/middlewares/nc'
import cache from '@lib/middlewares/cache'
import { checkLang } from '@lib/middlewares/checkParams'
import { getShuffledDictionary, getWordOfDay } from '@utils/game-methods'
import { encrypt } from '@utils/crypto'

const handler = nc({ onError, onNoMatch })
  .use(cache(12 * 60 * 60)) // 12 hours cache
  .use(checkLang)
  .get(async (req, res) => {
    const { lang = 'es' } = req.query

    const dictionary = getShuffledDictionary(lang)
    const wotd = getWordOfDay(dictionary)
    const { word } = wotd
    const encrypted = encrypt(word)

    return res.status(200).json({
      success: true,
      data: encrypted
    })
  })

export default handler
