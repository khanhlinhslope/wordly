import nc from 'next-connect'
import { onError, onNoMatch } from '@lib/middlewares/nc'
import cache from '@lib/middlewares/cache'
import withDev from '@lib/middlewares/withDev'
import { checkLang, checkLetters } from '@lib/middlewares/checkParams'
import { filter } from '@utils/dictionary'
import { getDictionary } from '@utils/game-methods'

const handler = nc({ onError, onNoMatch })
  .use(cache(12 * 60 * 60)) // 12 hours cache
  .use(checkLetters)
  .use(checkLang)
  .use(withDev)
  .get(async (req, res) => {
    let { letters = 5, lang = 'es' } = req.query
    letters = parseInt(letters)

    const source = getDictionary(lang)
    const dictionary = filter(source, letters)

    return res.status(200).json({
      success: true,
      data: dictionary
    })
  })

export default handler
