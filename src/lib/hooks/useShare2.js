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

  const share = async data => {
    if (!shareRef.current) {
      console.error('Your browser does not support the Share API')
      return false
    }

    if (isShareable(data)) {
      try {
        await navigator.share(data)
        return true
      } catch (err) {
        console.warn(err)
        return false
      }
    } else {
      console.error('Can\'t share this data, check its validity https://developer.mozilla.org/en-US/docs/Web/API/Navigator/canShare ')
      return false
    }
  }

  const isShareable = data => {
    console.log(data)
    if (!navigator.canShare) return false
    return navigator.canShare(data)
  }

  return { share, isShareable, isSupported }
}

export default useShare
