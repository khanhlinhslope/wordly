const gameDataKey = 'gameData'
const statsKey = 'playerStats'
const optionsKey = 'playerOptions'

const getLocalStorageData = key => {
  if (typeof window !== 'undefined') {
    const data = window.localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  return null
}

export const saveGameData = gameData => {
  window.localStorage.setItem(gameDataKey, JSON.stringify(gameData))
}

export const loadGameData = () => {
  return getLocalStorageData(gameDataKey)
}

export const removeGameData = () => {
  window.localStorage.removeItem(gameDataKey)
}

export const saveStats = gameStats => {
  window.localStorage.setItem(statsKey, JSON.stringify(gameStats))
}

export const loadStats = () => {
  return getLocalStorageData(statsKey)
}

export const removeStats = () => {
  window.localStorage.removeItem(statsKey)
}

export const saveOptions = options => {
  window.localStorage.setItem(optionsKey, JSON.stringify(options))
}

export const loadOptions = () => {
  return getLocalStorageData(optionsKey)
}

export const removeOptions = () => {
  window.localStorage.removeItem(optionsKey)
}
