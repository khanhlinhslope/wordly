// ref: https://github.com/roedoejet/AnyLanguage-Wordle/blob/main/src/lib/share.ts
// ref: https://github.com/cwackerfuss/react-wordle/blob/main/src/lib/share.ts
import { UAParser } from 'ua-parser-js'

const useShare = () => {
  const webShareApiDeviceTypes = ['mobile', 'smarttv', 'wearable']
  const parser = new UAParser()
  const browser = parser.getBrowser()
  const device = parser.getDevice()

  const share = async data => {
    if (isShareable(data)) {
      try {
        await navigator.share(data)
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
    if (!navigator.canShare) return false
    if (!navigator.share) return false
    if (!navigator.canShare(data)) return false
    if (webShareApiDeviceTypes.indexOf(device.type ?? '') === -1) return false
    if (browser.name?.toUpperCase().indexOf('FIREFOX') !== -1) return false
  }

  return { isShareable, share }
}

export default useShare
