import { useEffect } from 'react'

const useKeys = (handler, condition = true) => {
  useEffect(() => {
    if (!condition) return

    const handleKeyDown = e => {
      // event.preventDefault()
      const isMultiKey = e.ctrlKey || e.metaKey || e.altKey || e.shiftKey
      if (!isMultiKey) handler(e.key)
    }

    document.addEventListener('keyup', handleKeyDown)
    return () => document.removeEventListener('keyup', handleKeyDown)
  }, [handler])
}

export default useKeys
