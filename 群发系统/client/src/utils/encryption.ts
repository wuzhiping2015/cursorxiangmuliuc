import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

export class SecurityUtils {
  private static instance: SecurityUtils
  private aesKey: string
  private rsaPublicKey: string
  private encryptor: JSEncrypt

  private constructor() {
    this.aesKey = ''
    this.rsaPublicKey = ''
    this.encryptor = new JSEncrypt()
  }

  static getInstance(): SecurityUtils {
    if (!SecurityUtils.instance) {
      SecurityUtils.instance = new SecurityUtils()
    }
    return SecurityUtils.instance
  }

  async initialize() {
    try {
      // 从服务器获取RSA公钥
      const response = await fetch('/api/security/public-key')
      const { publicKey } = await response.json()
      this.rsaPublicKey = publicKey
      this.encryptor.setPublicKey(this.rsaPublicKey)
      
      // 生成AES密钥
      this.aesKey = CryptoJS.lib.WordArray.random(256/8).toString()
      
      // 使用RSA加密AES密钥并发送到服务器
      const encryptedAesKey = this.encryptor.encrypt(this.aesKey)
      await fetch('/api/security/exchange-key', {
        method: 'POST',
        body: JSON.stringify({ key: encryptedAesKey }),
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error) {
      console.error('密钥交换失败:', error)
      throw error
    }
  }

  encryptMessage(message: string): string {
    return CryptoJS.AES.encrypt(message, this.aesKey).toString()
  }

  decryptMessage(encrypted: string): string {
    const bytes = CryptoJS.AES.decrypt(encrypted, this.aesKey)
    return bytes.toString(CryptoJS.enc.Utf8)
  }
}

export const security = SecurityUtils.getInstance() 