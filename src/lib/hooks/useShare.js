// ref: https://github.com/roedoejet/AnyLanguage-Wordle/blob/main/src/lib/share.ts
// ref: https://github.com/cwackerfuss/react-wordle/blob/main/src/lib/share.ts
import { UAParser } from 'ua-parser-js'

const useShare = () => {
  // if (typeof window === 'undefined') {
  //   return null
  // }

  const webShareApiDeviceTypes = ['mobile', 'smarttv', 'wearable']
  const parser = new UAParser()
  const browser = parser.getBrowser()
  const device = parser.getDevice()

  const share = async ({ text }) => {
    let shareSuccess = false

    try {
      const sharable = isShareable(text)

      if (sharable) {
        await navigator.share({ text })
        shareSuccess = true
      }
    } catch (error) {
      shareSuccess = false
      console.log(error)
    }

    if (!shareSuccess) {
      console.log('Unable to share')
    }
  }

  const isShareable = text => {
    if (!navigator.canShare) {
      return false
    }

    if (!navigator.share) {
      return false
    }

    if (!navigator.canShare({ text })) {
      return false
    }

    if (webShareApiDeviceTypes.indexOf(device.type ?? '') === -1) {
      return false
    }

    if (browser.name?.toUpperCase().indexOf('FIREFOX') !== -1) {
      return false
    }

    // const canShare = navigator.canShare !== undefined
    // const hasShareMethod = navigator.share !== undefined
    // const canShareData = navigator?.canShare({ text }) ?? false
    // const isValidDevice = webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1
    // const isNotFirefox = browser.name?.toUpperCase().indexOf('FIREFOX') === -1

    // // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    // return (
    //   isNotFirefox &&
    //   isValidDevice &&
    //   canShare &&
    //   canShareData &&
    //   hasShareMethod
    // )
  }

  return { isShareable, share }
}

export default useShare
