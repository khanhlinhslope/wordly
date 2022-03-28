import CryptoJS from 'crypto-js'

const secret = import.meta.env.VITE_SECRET_PHRASE

export const encrypt = text => {
  return CryptoJS.AES.encrypt(text, secret).toString()
}

export const decrypt = data => {
  return CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8)
}
