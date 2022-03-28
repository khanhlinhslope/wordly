import { useEffect } from 'react'

const useKeys = (handler, condition = true) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (condition) {
        event.preventDefault()
        handler(event.key)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handler])
}

export default useKeys
