import nc from 'next-connect'
import { onError, onNoMatch } from '@lib/middlewares/nc'
import { checkLang } from '@lib/middlewares/checkParams'
import withDev from '@lib/middlewares/withDev'
import {
  getTodayWordIndex,
  getShuffledDictionary,
  formatWordlist
} from '@utils/game-methods'

const parseBooleanQuery = query => {
  query = query === undefined ? false : query
  query = query.toString().trim().toLowerCase()
  query = query === 'true' || query === '1'
  return query
}

// /api/word-list?limit=14&fromToday=false&compact=false
const handler = nc({ onError, onNoMatch })
  .use(checkLang)
  .use(withDev)
  .get(async (req, res) => {
    let { lang = 'es', compact = false, limit, fromToday = true } = req.query

    compact = parseBooleanQuery(compact)
    fromToday = parseBooleanQuery(fromToday)

    const todayIndex = getTodayWordIndex()

    let data = getShuffledDictionary(lang)

    if (fromToday) {
      data = data.slice(todayIndex)
    }

    if (limit) {
      data = data.slice(0, limit)
    }

    if (compact) {
      return res.status(200).json({ success: true, data })
    }

    data = formatWordlist(data)
    return res.status(200).json({ success: true, data })
  })

export default handler
