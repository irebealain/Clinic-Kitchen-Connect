from rest_framework import permissions

class IsClinicStaff(permissions.BasePermission):
    """
    Custom permission to only allow Clinic Staff to create or modify prescriptions.
    """

    def has_permission(self, request, view):
        # Allow access if user is authenticated and has the 'ClinicStaff' role
        return request.user.is_authenticated and request.user.role == 'ClinicStaff'


class IsKitchenStaff(permissions.BasePermission):
    """
    Custom permission to only allow Kitchen Staff to view prescriptions.
    """

    def has_permission(self, request, view):
        # Allow access if user is authenticated and has the 'KitchenStaff' role
        return request.user.is_authenticated and request.user.role == 'KitchenStaff'


class IsClinicOrKitchenStaff(permissions.BasePermission):
    """
    Custom permission to allow either Clinic Staff to create/update or Kitchen Staff to view prescriptions.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            # Allow any authenticated user to view
            return request.user.is_authenticated
        
        # Allow only Clinic Staff to create/update
        return request.user.is_authenticated and request.user.role == 'ClinicStaff'
