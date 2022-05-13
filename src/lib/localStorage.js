const gameStateKey = 'gameState'
const statsKey = 'playerStats'
// const playerKey = 'isPlayer'
const optionsKey = 'playerOptions'

export const saveGameState = gameState => {
  window.localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameState = () => {
  const state = window.localStorage.getItem(gameStateKey)
  return state ? JSON.parse(state) : null
}

export const saveStats = gameStats => {
  window.localStorage.setItem(statsKey, JSON.stringify(gameStats))
}

export const loadStats = () => {
  const stats = window.localStorage.getItem(statsKey)
  return stats ? JSON.parse(stats) : null
}

export const saveOptions = options => {
  window.localStorage.setItem(optionsKey, JSON.stringify(options))
}

export const loadOptions = () => {
  const stats = window.localStorage.getItem(optionsKey)
  return stats ? JSON.parse(stats) : null
}
