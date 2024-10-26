from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, PermissionDenied
from .models import User, Student, SpecialFood, Prescription
from .serializers import UserSerializer, StudentSerializer, SpecialFoodSerializer, PrescriptionSerializer
from .permissions import *

# Users view set only
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Require authentication for all actions

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data)

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]  # Require authentication for all actions

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student = serializer.save()
        return Response(StudentSerializer(student).data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        student = self.get_object()
        serializer = self.get_serializer(student, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        student = serializer.save()
        return Response(StudentSerializer(student).data)

    def destroy(self, request, *args, **kwargs):
        student = self.get_object()
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, *args, **kwargs):
        student = self.get_object()
        serializer = self.get_serializer(student)
        return Response(serializer.data)
class SpecialFoodViewSet(viewsets.ModelViewSet):
    queryset = SpecialFood.objects.all()
    serializer_class = SpecialFoodSerializer
    permission_classes = [IsAuthenticated]  # Require authentication for all actions

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        special_food = serializer.save()
        return Response(SpecialFoodSerializer(special_food).data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        special_food = self.get_object()
        serializer = self.get_serializer(special_food, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        special_food = serializer.save()
        return Response(SpecialFoodSerializer(special_food).data)

    def destroy(self, request, *args, **kwargs):
        special_food = self.get_object()
        special_food.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, *args, **kwargs):
        special_food = self.get_object()
        serializer = self.get_serializer(special_food)
        return Response(serializer.data)

class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAuthenticated, IsClinicStaff]  # Only Clinic Staff can create/update prescriptions

    def perform_create(self, serializer):
        if self.request.user.role == 'ClinicStaff':
            serializer.save(issued_by=self.request.user)
        else:
            return Response({"error": "You do not have permission to create a prescription."}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        prescription = self.get_object()
        serializer = self.get_serializer(prescription, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        prescription = serializer.save()
        return Response(PrescriptionSerializer(prescription).data)

    def destroy(self, request, *args, **kwargs):
        prescription = self.get_object()
        prescription.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def retrieve(self, request, *args, **kwargs):
        prescription = self.get_object()
        serializer = self.get_serializer(prescription)
        return Response(serializer.data)

