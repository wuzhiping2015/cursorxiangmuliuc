from app import db
from datetime import datetime
from app.utils.encryption import encryption

class Message(db.Model):
    __tablename__ = 'messages'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    scheduled_time = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='draft')  # draft, scheduled, sent
    
    # 关联收件人
    receivers = db.relationship('MessageReceiver', backref='message', lazy='dynamic')

    def set_content(self, content: str):
        """设置加密后的消息内容"""
        self.content = encryption.encrypt(content)
    
    def get_content(self) -> str:
        """获取解密后的消息内容"""
        return encryption.decrypt(self.content)
    
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.get_content(),  # 返回解密后的内容
            'created_by': self.created_by,
            'created_at': self.created_at.isoformat(),
            'scheduled_time': self.scheduled_time.isoformat() if self.scheduled_time else None,
            'status': self.status,
            'receivers': [r.to_dict() for r in self.receivers]
        }

class MessageReceiver(db.Model):
    __tablename__ = 'message_receivers'
    
    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey('messages.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, sent, failed
    sent_at = db.Column(db.DateTime)
    
    def to_dict(self):
        return {
            'id': self.id,
            'message_id': self.message_id,
            'user_id': self.user_id,
            'status': self.status,
            'sent_at': self.sent_at.isoformat() if self.sent_at else None
        } 