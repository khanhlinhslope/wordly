import CryptoJS from 'crypto-js'

const secret = process.env.SECRET_PHRASE || 'UP0IVCiXHS'

export const encrypt = text => {
  if (!text) return ''
  return CryptoJS.AES.encrypt(text, secret).toString()
}

export const decrypt = data => {
  if (!data) return ''
  return CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8)
}
