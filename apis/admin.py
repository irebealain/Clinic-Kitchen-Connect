from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, StudentViewSet, SpecialFoodViewSet, PrescriptionViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'students', StudentViewSet)
router.register(r'special-foods', SpecialFoodViewSet)
router.register(r'prescriptions', PrescriptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
