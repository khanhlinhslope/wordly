import { GAME_CONFIG } from '@lib/constants'
import { isNumeric } from '@utils/validation'

export const checkLetters = (req, res, next) => {
  const { minWordLength, maxWordLength, defaultWordLength } = GAME_CONFIG

  let { letters = 5 } = req.query
  if (!isNumeric(letters)) letters = defaultWordLength

  letters = parseInt(letters)
  if (letters < minWordLength || letters > maxWordLength) {
    return res.status(400).json({
      success: false,
      data: `Letters must be between ${minWordLength} and ${maxWordLength}`
    })
  }

  req.query.letters = letters

  next()
}

export const checkLang = (req, res, next) => {
  const { availableLangs } = GAME_CONFIG
  const { lang = 'es' } = req.query

  if (!availableLangs.includes(lang.toLowerCase())) {
    return res.status(400).json({
      success: false,
      data: 'No valid language'
    })
  }

  next()
}
