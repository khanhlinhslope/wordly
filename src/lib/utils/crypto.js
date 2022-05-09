import CryptoJS from 'crypto-js'

const secret = process.env.SECRET_PHRASE

export const encrypt = text => CryptoJS.AES.encrypt(text, secret).toString()

export const decrypt = data => CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8)
