from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, StudentViewSet, SpecialFoodViewSet, PrescriptionViewSet, AuthViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'users', UserViewSet)
router.register(r'students', StudentViewSet)
router.register(r'special-foods', SpecialFoodViewSet)
router.register(r'prescriptions', PrescriptionViewSet)
router.register(r'auth', AuthViewSet, basename='auth')
urlpatterns = [
    path('', include(router.urls)),
]
