export const SERVER_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'https://wordly-alpha.vercel.app'

export const GAME_CONFIG = {
  dictionaryPath: 'src/assets/dictionary',
  tries: 6,
  language: 'spanish',
  startDate: '05/12/2022 00:00:00',
  defaultLang: 'es',
  availableLangs: ['es', 'en'],
  minWordLength: 4,
  maxWordLength: 11,
  defaultWordLength: 5
}
