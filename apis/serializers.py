from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'password']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'student_id']

class SpecialFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialFood
        fields = ['id', 'name', 'description']

class PrescriptionSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    special_foods = SpecialFoodSerializer(many=True)

    class Meta:
        model = Prescription
        fields = ['id', 'student', 'special_foods', 'date_given', 'expiry_date', 'issued_by', 'given_by']