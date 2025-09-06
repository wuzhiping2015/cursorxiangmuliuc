from cryptography.fernet import Fernet
from base64 import b64encode, b64decode
import os
from app.config import Config

class MessageEncryption:
    def __init__(self):
        self.key = os.environ.get('ENCRYPTION_KEY') or Config.ENCRYPTION_KEY
        self.fernet = Fernet(self.key)
    
    def encrypt(self, message: str) -> str:
        """加密消息内容"""
        if not message:
            return message
        encrypted = self.fernet.encrypt(message.encode())
        return b64encode(encrypted).decode()
    
    def decrypt(self, encrypted_message: str) -> str:
        """解密消息内容"""
        if not encrypted_message:
            return encrypted_message
        try:
            decrypted = self.fernet.decrypt(b64decode(encrypted_message))
            return decrypted.decode()
        except Exception as e:
            print(f"解密失败: {e}")
            return None

encryption = MessageEncryption() 