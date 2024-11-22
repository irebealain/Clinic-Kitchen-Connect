from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from .models import User, Student, SpecialFood, Prescription
from .serializers import UserSerializer, StudentSerializer, SpecialFoodSerializer, PrescriptionSerializer, LoginSerializer, SignupSerializer
from rest_framework.response import Response
from django.contrib.auth import login
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied, ValidationError
from datetime import date




class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]
class SpecialFoodViewSet(viewsets.ModelViewSet):
    queryset = SpecialFood.objects.all()
    serializer_class = SpecialFoodSerializer
    permission_classes = [AllowAny]
class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    # permission_classes = [IsAuthenticated]
    # # Only authenticated users can access
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Prescription.objects.filter(expiry_date__gte=date.today())

    def perform_create(self, serializer):
        if not hasattr(self.request.user, 'role') or self.request.user.role != 'clinic_staff':
            raise PermissionDenied("Only clinic staff can create prescriptions.")

        special_food_id = self.request.data.get('special_food')  # Use the correct field
        if not special_food_id:
            raise ValidationError({"special_food_id": "This field is required."})

        try:
            # Fetch the SpecialFood instance using the provided ID
            special_food_instance = SpecialFood.objects.get(id=special_food_id)
        except SpecialFood.DoesNotExist:
            raise ValidationError({"special_food": "Invalid special food ID provided."})

        serializer.save(special_food=special_food_instance, issued_by=self.request.user)
        
    @action(detail=False, methods=['delete'], url_path='delete-expired')
    def delete_expired_prescriptions(self, request, *args, **kwargs):
        expired_prescriptions = Prescription.objects.filter(expiry_date__lt=date.today())
        count = expired_prescriptions.count()
        expired_prescriptions.delete()
        return Response({'message': f'{count} expired prescription(s) deleted.'})
class AuthViewSet(viewsets.GenericViewSet):
    serializer_class = SignupSerializer  # default serializer as fallback
    permission_classes = [AllowAny] 
    def get_serializer_class(self):
        if self.action == 'sign_up':
            return SignupSerializer
        elif self.action == 'login':
            return LoginSerializer
        return super().get_serializer_class()

    @action(detail=False, methods=['post'])
    def sign_up(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "user": {
                    "username": user.username,
                    "email": user.email,
                    "role": user.role
                },
                "token": token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            return Response({
                "user": {
                    "username": user.username,
                    "email": user.email,
                    "role": user.role
                },
                "token": token.key
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)