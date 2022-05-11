import nc from 'next-connect'
import { onError, onNoMatch } from '@lib/middlewares/nc'
import cache from '@lib/middlewares/cache'
import localDictionary from '@assets/words-es.json'
import { filter } from '@lib/utils/dictionary'
import { isNumeric } from '@lib/utils/validation'

const handler = nc({ onError, onNoMatch })
  .use(cache(12 * 60 * 60)) // 12 hours cache
  .get(async (req, res) => {
    let { letters = 5 } = req.query

    if (!isNumeric(letters)) letters = 5
    letters = parseInt(letters)

    const dictionary = filter(localDictionary, letters)
    return res.status(200).json({ success: true, data: dictionary })
  })

export default handler
