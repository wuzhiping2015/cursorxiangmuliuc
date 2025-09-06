import CryptoJS from 'crypto-js'

const SECRET_KEY = 'your-secret-key' // 实际开发中应该从环境变量获取

export const security = {
    encryptMessage(message) {
        return CryptoJS.AES.encrypt(message, SECRET_KEY).toString()
    },

    decryptMessage(ciphertext) {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
        return bytes.toString(CryptoJS.enc.Utf8)
    }
}