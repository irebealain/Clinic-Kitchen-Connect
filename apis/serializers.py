from rest_framework import serializers
from .models import User, Student, SpecialFood, Prescription

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

# Student serializer
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'student_id']

# SpecialFood serializer
class SpecialFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialFood
        fields = ['id', 'name', 'description']

# Prescription serializer
class PrescriptionSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    special_foods = SpecialFoodSerializer(many=True)
    issued_by = UserSerializer()
    given_by = UserSerializer()

    class Meta:
        model = Prescription
        fields = ['id', 'student', 'special_foods', 'date_given', 'expiry_date', 'issued_by', 'given_by']
