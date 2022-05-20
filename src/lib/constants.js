export const GAME_CONFIG = {
  dictionaryPath: 'src/assets/dictionary',
  tries: 6,
  startDate: '05/12/2022 00:00:00',
  availableLangs: ['es', 'en'],
  minWordLength: 4,
  maxWordLength: 11,
  defaultWordLength: 5,
  revealAnimationTime: 350,
  typeAnimationTime: 150,
  shakeAnimationTime: 750,
  bounceAnimationTime: 1000,
  defaultOptions: {
    lang: 'es',
    darkMode: false,
    confetti: true,
    accessibility: false,
    swapSpecialKeys: false,
    fatFingers: false
  }
}

export const keyboardKeys = [
  [
    { key: 'q' },
    { key: 'w' },
    { key: 'e' },
    { key: 'r' },
    { key: 't' },
    { key: 'y' },
    { key: 'u' },
    { key: 'i' },
    { key: 'o' },
    { key: 'p' }
  ],
  [
    { key: 'a' },
    { key: 's' },
    { key: 'd' },
    { key: 'f' },
    { key: 'g' },
    { key: 'h' },
    { key: 'j' },
    { key: 'k' },
    { key: 'l' },
    { key: 'ñ' }
  ],
  [
    { key: 'enter', special: true },
    { key: 'z' },
    { key: 'x' },
    { key: 'c' },
    { key: 'v' },
    { key: 'b' },
    { key: 'n' },
    { key: 'm' },
    { key: 'backspace', special: true }
  ]
]
