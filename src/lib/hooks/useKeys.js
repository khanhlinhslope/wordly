import { useEffect } from 'react'

const useKeys = (handler, condition = true) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (condition) {
        // event.preventDefault()
        const isMultiKey = event.ctrlKey || event.metaKey || event.altKey || event.shiftKey

        if (!isMultiKey) {
          handler(event.key)
        }
      }
    }

    document.addEventListener('keyup', handleKeyDown)
    return () => {
      document.removeEventListener('keyup', handleKeyDown)
    }
  }, [handler])
}

export default useKeys
