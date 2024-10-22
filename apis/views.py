from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Student, SpecialFood, Prescription
from .serializers import StudentSerializer, UserSerializer, SpecialFoodSerializer, PrescriptionSerializer
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
class StudentViewSet(viewsets.ModelViewSet):
  queryset = Student.objects.all()
  serializer_class = StudentSerializer
  

class SpecialFoodViewSet(viewsets.ModelViewSet):
    queryset = SpecialFood.objects.all()
    serializer_class = SpecialFoodSerializer

class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer