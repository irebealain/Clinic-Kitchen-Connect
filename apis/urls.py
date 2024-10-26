from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, StudentViewSet, SpecialFoodViewSet, PrescriptionViewSet
from .views import UserDeleteView, StudentDeleteView

router = DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'students', StudentViewSet)
router.register(r'special_foods', SpecialFoodViewSet)
router.register(r'prescriptions', PrescriptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/<int:pk>/', UserDeleteView.as_view(), name='user-delete'),
    path('students/<int:pk>/', StudentDeleteView.as_view(), name='student-delete'),
]