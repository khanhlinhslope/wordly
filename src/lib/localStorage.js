const gameStateKey = 'gameState'
const statsKey = 'playerStats'
// const playerKey = 'isPlayer'
const optionsKey = 'playerOptions'

const getLocalStorageData = key => {
  if (typeof window !== 'undefined') {
    const data = window.localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  return null
}

export const saveGameState = gameState => {
  window.localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameState = () => {
  return getLocalStorageData(gameStateKey)
}

export const saveStats = gameStats => {
  window.localStorage.setItem(statsKey, JSON.stringify(gameStats))
}

export const loadStats = () => {
  return getLocalStorageData(statsKey)
}

export const saveOptions = options => {
  window.localStorage.setItem(optionsKey, JSON.stringify(options))
}

export const loadOptions = () => {
  return getLocalStorageData(optionsKey)
}
