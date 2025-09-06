from celery.schedules import crontab

CELERYBEAT_SCHEDULE = {
    'check-scheduled-messages': {
        'task': 'app.tasks.message.schedule_messages',
        'schedule': crontab(minute='*/1'),  # 每分钟检查一次
    }
} 