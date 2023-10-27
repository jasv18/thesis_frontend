import CryptoJS from 'crypto-js'

const objectEncryption = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_SECRET_KEY_1).toString()
}

const objectDecryption = (cipherTextData) => {
  const bytes = CryptoJS.AES.decrypt(cipherTextData, import.meta.env.VITE_SECRET_KEY_1)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

const textEncryption = (text) => {
  return CryptoJS.AES.encrypt(text, import.meta.env.VITE_SECRET_KEY_1).toString()
}

const textDecryption = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, import.meta.env.VITE_SECRET_KEY_1)
  return bytes.toString(CryptoJS.enc.Utf8)
}

const encryptionServices = { objectEncryption, objectDecryption, textEncryption, textDecryption }

export default encryptionServices
