import nc from 'next-connect'
import { onError, onNoMatch } from '@lib/middlewares/nc'
import cache from '@lib/middlewares/cache'
import withDev from '@lib/middlewares/withDev'
import { checkLang } from '@lib/middlewares/checkParams'
import { getShuffledDictionary, getWordOfDay } from '@lib/dictionary'

const handler = nc({ onError, onNoMatch })
  .use(cache(12 * 60 * 60)) // 12 hours cache
  .use(checkLang)
  .use(withDev)
  .get(async (req, res) => {
    const { id: dayIndex, lang = 'es' } = req.query

    const dictionary = getShuffledDictionary(lang)
    const wotd = getWordOfDay(dictionary, parseInt(dayIndex))

    return res.status(200).json({ success: true, data: wotd })
  })

export default handler
