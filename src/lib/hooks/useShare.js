// ref: https://github.com/cwackerfuss/react-wordle/blob/main/src/lib/share.ts#L50
import { UAParser } from 'ua-parser-js'

const useShare = () => {
  const webShareApiDeviceTypes = ['mobile', 'smarttv', 'wearable']
  const parser = new UAParser()
  const browser = parser.getBrowser()
  const device = parser.getDevice()

  const share = async (data, { fallback }) => {
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
    if (browser.name?.toUpperCase().indexOf('FIREFOX') !== -1) return false
    if (webShareApiDeviceTypes.indexOf(device.type ?? '') === -1) return false
    if (!navigator.canShare) return false
    if (!navigator.canShare(data)) return false
    if (!navigator.share) return false
    return true
  }

  const isSupported = Boolean(navigator.canShare)

  return { isShareable, share, isSupported }
}

export default useShare
