// ref: https://github.com/roedoejet/AnyLanguage-Wordle/blob/main/src/lib/share.ts
// ref: https://github.com/cwackerfuss/react-wordle/blob/main/src/lib/share.ts
const parseGuesses = wordsData => {
  const guesses = []
  const evals = []

  wordsData.forEach(wordObj => {
    const guess = wordObj.map(l => l.letter).join('')
    const _eval = wordObj.map(l => l.status)
    guesses.push(guess)
    evals.push(_eval)
  })

  return { guesses, evals }
}

export const generateTextToShare = ({ title, wordList }) => {
  const emojis = generateEmojiGrid(wordList)
  const textToShare = title + '\n\n' + emojis
  return textToShare
}

export const generateEmojiGrid = wordList => {
  const { evals: guesses } = parseGuesses(wordList)

  return guesses
    .map(guess => {
      return guess
        .map(status => {
          if (status === 'guessed') return '🟩'
          if (status === 'exists') return '🟨'
          if (status === 'not_exists') return '⬜'
          return '⬜'
        })
        .join('')
    })
    .join('\n')
}

