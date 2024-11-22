from rest_framework import serializers
from .models import User, Student, SpecialFood, Prescription
from django.contrib.auth import authenticate
from datetime import date

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class SpecialFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialFood
        fields = '__all__'

class PrescriptionSerializer(serializers.ModelSerializer):
    # Use `PrimaryKeyRelatedField` for dropdown selection during creation
    special_food_id = serializers.PrimaryKeyRelatedField(
        queryset=SpecialFood.objects.all(),
        source='special_food',  # Maps to the `special_food` field in the model
        required=True,
    )
    special_food_name = serializers.CharField(source='special_food.name', read_only=True)
    expiry_date = serializers.DateField(input_formats=['%m-%d-%Y', '%Y-%m-%d'])
    # Other fields
    first_name = serializers.CharField(source='student.first_name', read_only=True)
    last_name = serializers.CharField(source='student.last_name', read_only=True)
    doctor_name = serializers.CharField(source='issued_by.username', read_only=True)

    class Meta:
        model = Prescription
        fields = [
            'id', 'student', 'issued_by', 'first_name', 'last_name',
            'special_food_id', 'special_food_name', 'doctor_name',
            'issued_date', 'expiry_date'
        ]

    # Make sure the IDs for relationships are writeable
    extra_kwargs = {
        'student': {'write_only': True},
        'issued_by': {'write_only': True},
        'special_food_id': {'write_only': True},
    }
    def validate(self, data):
        # Ensure expiry_date is after today
        if data.get('expiry_date') <= date.today():
            raise serializers.ValidationError("Expiry date must be in the future.")
        return data

    def create(self, validated_data):
        # Example custom creation logic if needed
        return Prescription.objects.create(**validated_data)
# Serializer for user signup
class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            role = validated_data['role']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

# Serializer for user login
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    role = serializers.CharField()
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid credentials")
