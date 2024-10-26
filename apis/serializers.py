from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'password', 'role']
    def create(self, validated_data):
        username = validated_data.get('username', '')
        user = User(
            username=username,
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data['role']  # This line will cause KeyError if 'role' is not provided
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name']

class SpecialFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialFood
        fields = ['id', 'name', 'description']

from rest_framework import serializers
from .models import Prescription, Student, SpecialFood

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name']  # Add other necessary fields

class PrescriptionSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())  # Ensure it expects an ID or instance
    special_foods = serializers.PrimaryKeyRelatedField(
        queryset=SpecialFood.objects.all(),  # Query for all SpecialFood entries
        many=True  # Allow selecting multiple special foods
    )

    class Meta:
        model = Prescription
        fields = ['id', 'student', 'special_foods', 'date_given', 'expiry_date', 'issued_by']

    def create(self, validated_data):
        # Extract special_foods and issued_by from validated data
        special_foods = validated_data.pop('special_foods', [])
        issued_by = validated_data.pop('issued_by', None)

        # Create the prescription instance
        prescription = Prescription.objects.create(issued_by=issued_by, **validated_data)

        # Assign special_foods after creation (because special_foods is a many-to-many relationship)
        prescription.special_foods.set(special_foods)

        return prescription

    
        
class UserSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True}  # Ensure password is write-only
        }

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role=validated_data['role'],
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user
# Login
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            if user is None:
                raise serializers.ValidationError("Invalid credentials.")
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")

        data['user'] = user
        return data