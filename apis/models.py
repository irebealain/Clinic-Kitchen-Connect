from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
# Create your models here.
# User Model
class User(AbstractUser):
    # Add related_name to avoid conflicts with Django's default User model
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_groups',  # Change related_name to avoid conflict
        blank=True,
        help_text="The groups this user belongs to.",
        verbose_name="groups"
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',  # Change related_name to avoid conflict
        blank=True,
        help_text="Specific permissions for this user.",
        verbose_name="user permissions"
    )  
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
  issued_by = models.ForeignKey(User, on_delete=models.SET_NULL, null = True, related_name = 'clinic_issued', limit_choices_to = {'role': 'clinic_staff'})
  given_by = models.ForeignKey(User, on_delete=models.SET_NULL, null = True, related_name= 'kitchen_given', limit_choices_to= {'role': 'kitchen_staff'}, blank=True)
  
  def __str__(self):
    return f"Prescription for {self.student.first_name} {self.student.last_name}"