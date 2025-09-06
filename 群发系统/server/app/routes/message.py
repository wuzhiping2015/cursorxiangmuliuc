from flask import Blueprint, request, jsonify
from app.models.message import Message, MessageReceiver
from app.models.user import User
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from app.tasks.message import send_message
from flask import current_app

bp = Blueprint('message', __name__)

@bp.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    messages = Message.query.order_by(Message.created_at.desc()).all()
    return jsonify([message.to_dict() for message in messages])

@bp.route('/messages', methods=['POST'])
@jwt_required()
def create_message():
    data = request.get_json()
    current_user = get_jwt_identity()
    
    if not data or 'content' not in data:
        return jsonify({'error': '缺少消息内容'}), 400
    
    message = Message(
        content=data['content'],
        created_by=current_user,
        scheduled_time=datetime.fromisoformat(data['scheduled_time']) if 'scheduled_time' in data else None,
        status='scheduled' if 'scheduled_time' in data else 'draft'
    )
    
    # 添加接收者
    if 'receivers' in data:
        for user_id in data['receivers']:
            receiver = MessageReceiver(user_id=user_id)
            message.receivers.append(receiver)
    
    db.session.add(message)
    db.session.commit()
    
    return jsonify(message.to_dict()), 201

@bp.route('/messages/<int:id>', methods=['PUT'])
@jwt_required()
def update_message(id):
    message = Message.query.get_or_404(id)
    data = request.get_json()
    
    if 'content' in data:
        message.content = data['content']
    
    if 'scheduled_time' in data:
        message.scheduled_time = datetime.fromisoformat(data['scheduled_time'])
        message.status = 'scheduled'
    
    if 'receivers' in data:
        # 清除现有接收者
        MessageReceiver.query.filter_by(message_id=id).delete()
        
        # 添加新接收者
        for user_id in data['receivers']:
            receiver = MessageReceiver(message_id=id, user_id=user_id)
            db.session.add(receiver)
    
    db.session.commit()
    return jsonify(message.to_dict())

@bp.route('/messages/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_message(id):
    message = Message.query.get_or_404(id)
    db.session.delete(message)
    db.session.commit()
    return '', 204

@bp.route('/messages/<int:id>/send', methods=['POST'])
@jwt_required()
def send_message_api(id):
    message = Message.query.get_or_404(id)
    
    # 检查消息状态
    if message.status == 'sent':
        return jsonify({'error': '消息已发送'}), 400
    
    try:
        # 将发送任务加入队列
        task = send_message.delay(id)
        
        return jsonify({
            'message': '消息已加入发送队列',
            'task_id': task.id
        })
        
    except Exception as e:
        current_app.logger.error(f"发送消息失败: {e}")
        return jsonify({'error': '发送失败'}), 500

@bp.route('/messages/<int:id>/status', methods=['GET'])
@jwt_required()
def get_message_status(id):
    message = Message.query.get_or_404(id)
    
    receivers = MessageReceiver.query.filter_by(message_id=id).all()
    stats = {
        'total': len(receivers),
        'sent': sum(1 for r in receivers if r.status == 'sent'),
        'failed': sum(1 for r in receivers if r.status == 'failed'),
        'pending': sum(1 for r in receivers if r.status == 'pending')
    }
    
    return jsonify({
        'message_id': id,
        'status': message.status,
        'stats': stats
    }) 