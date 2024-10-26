from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
# Create your models here.
# User Model
class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, blank=True, null=True)
    ROLE_CHOICES = (
        ('ClinicStaff', 'Clinic Staff'),
        ('KitchenStaff', 'Kitchen Staff'),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',  # Unique name for reverse relation
        blank=True,
    )
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',  # Unique name for reverse relation
        blank=True,
    )
    USERNAME_FIELD = 'email'  # Use email for authentication
    REQUIRED_FIELDS = []
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"  
# Student model
class Student(models.Model):
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  student_id = models.CharField(max_length=20, unique=True)
  
  def __str__(self):
      return f"{self.first_name} {self.last_name}"
    
# Special food Model 
class SpecialFood(models.Model):
  name = models.CharField(max_length=100)
  description = models.TextField(blank=True)
  
  def __str__(self):
    return self.name
  
# Prescription Model
class Prescription(models.Model):
  student = models.ForeignKey(Student, on_delete=models.CASCADE)
  special_foods = models.ManyToManyField(SpecialFood)
  date_given = models.DateField(auto_now_add=True)
  expiry_date = models.DateField()
  issued_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='prescriptions')
  
  def __str__(self):
    return f"Prescription for {self.student.first_name} {self.student.last_name} on {self.date_given} by {self.issued_by} and it will get expired on {self.expiry_date}"