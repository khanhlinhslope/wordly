// @ref: https://github.com/sayinserdar/web-apis-with-remix/blob/181903ba765f71e1f05e9ee21ac953c638411fe1/app/routes/apis/share.tsx
import { useEffect, useRef, useState } from 'react'

const useShare = () => {
  const shareRef = useRef()
  const [isSupported, setIsSupported] = useState(null)

  useEffect(() => {
    if (!navigator.canShare) {
      console.error('Your browser does not support the Share API')
      setIsSupported(false)
    } else {
      shareRef.current = navigator.canShare
      setIsSupported(true)
    }
  }, [])

  const share = async (data, { fallback }) => {
    if (!shareRef.current) {
      console.error('Your browser does not support the Share API')
      return false
    }

    let shareSuccess = false
    if (isShareable(data)) {
      try {
        await navigator.share(data)
        shareSuccess = true
      } catch (err) {
        console.warn(err)
        shareSuccess = false
      }
    } else {
      console.warn('Can\'t share this data, check its validity https://developer.mozilla.org/en-US/docs/Web/API/Navigator/canShare ')
      shareSuccess = false
    }

    if (!shareSuccess && fallback) {
      fallback()
    }
  }

  const isShareable = data => {
    if (!navigator.canShare) return false
    if (!navigator.canShare(data)) return false
    if (!navigator.share) return false
    return true
  }

  return { share, isShareable, isSupported }
}

export default useShare
