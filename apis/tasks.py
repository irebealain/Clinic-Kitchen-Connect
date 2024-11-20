from celery import shared_task
from datetime import date
from .models import Prescription

@shared_task
def delete_expired_prescriptions():
    today = date.today()
    expired_prescriptions = Prescription.objects.filter(expiry_date__lt=today)
    count = expired_prescriptions.count()
    expired_prescriptions.delete()
    return f'{count} expired prescription(s) deleted.'
