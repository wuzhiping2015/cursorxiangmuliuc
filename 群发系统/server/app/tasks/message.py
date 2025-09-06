from app.tasks import celery
from app.models.message import Message, MessageReceiver
from app.utils.encryption import encryption
from app import db
from datetime import datetime
import time

@celery.task
def send_message(message_id: int):
    """异步发送消息任务"""
    try:
        message = Message.query.get(message_id)
        if not message:
            return {'status': 'failed', 'error': 'Message not found'}

        # 解密消息内容
        decrypted_content = encryption.decrypt(message.content)
        
        # 获取所有接收者
        receivers = MessageReceiver.query.filter_by(message_id=message_id).all()
        
        success_count = 0
        failed_count = 0
        
        for receiver in receivers:
            try:
                # TODO: 实现实际的消息发送逻辑
                # 这里模拟发送过程
                time.sleep(0.5)
                
                # 更新发送状态
                receiver.status = 'sent'
                receiver.sent_at = datetime.utcnow()
                success_count += 1
                
            except Exception as e:
                receiver.status = 'failed'
                failed_count += 1
                print(f"发送失败: {e}")
        
        # 更新消息状态
        message.status = 'sent'
        db.session.commit()
        
        return {
            'status': 'success',
            'message_id': message_id,
            'success_count': success_count,
            'failed_count': failed_count
        }
        
    except Exception as e:
        print(f"处理消息失败: {e}")
        return {'status': 'failed', 'error': str(e)}

@celery.task
def schedule_messages():
    """定时检查并发送预定消息"""
    try:
        # 获取所有待发送的预定消息
        scheduled_messages = Message.query.filter_by(
            status='scheduled'
        ).filter(
            Message.scheduled_time <= datetime.utcnow()
        ).all()
        
        for message in scheduled_messages:
            send_message.delay(message.id)
            
        return {
            'status': 'success',
            'scheduled_count': len(scheduled_messages)
        }
        
    except Exception as e:
        print(f"处理预定消息失败: {e}")
        return {'status': 'failed', 'error': str(e)} 