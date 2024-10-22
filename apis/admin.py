from django.contrib import admin
from .models import User, Student, SpecialFood, Prescription
# Register your models here.
admin.site.register(User)
admin.site.register(Student)
admin.site.register(SpecialFood)
admin.site.register(Prescription)