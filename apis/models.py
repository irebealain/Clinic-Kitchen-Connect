from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from datetime import date
class User(AbstractUser):
    ROLE_CHOICES = (
        ('clinic_staff', 'Clinic Staff'),
        ('kitchen_staff', 'Kitchen Staff'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=200)
class SpecialFood(models.Model):
    # special_food_id = models.CharField(max_length= 20, unique= True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=250)
    
    def __str__(self):
        return self.name
class Prescription(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    issued_by = models.ForeignKey(User, on_delete=models.CASCADE)
    issued_date = models.DateField(auto_now_add= True)
    expiry_date = models.DateField()
    special_food = models.ForeignKey(SpecialFood, on_delete=models.CASCADE, default=1)

    @property
    def is_expired(self):
        return self.expiry_date < date.today()