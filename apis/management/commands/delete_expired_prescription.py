from django.core.management.base import BaseCommand
from apis.models import Prescription
from datetime import date

class Command(BaseCommand):
    help = 'Delete prescriptions that are past their expiry date'

    def handle(self, *args, **kwargs):
        today = date.today()
        expired_prescriptions = Prescription.objects.filter(expiry_date__lt=today)

        count = expired_prescriptions.count()
        if count > 0:
            expired_prescriptions.delete()
            self.stdout.write(
                self.style.SUCCESS(f'Successfully deleted {count} expired prescription(s).')
            )
        else:
            self.stdout.write(self.style.SUCCESS('No expired prescriptions to delete.'))
