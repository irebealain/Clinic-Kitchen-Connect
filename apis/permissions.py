from rest_framework import permissions

class IsClinicStaff(permissions.BasePermission):
    """
    Custom permission to allow only clinic staff to create, update, or delete prescriptions.
    """
    def has_permission(self, request, view):
        # Only allow if the user is in the ClinicStaff group
        return request.user and request.user.groups.filter(name='ClinicStaff').exists()

class IsKitchenStaff(permissions.BasePermission):
    """
    Custom permission to allow kitchen staff to only view and search prescriptions.
    """
    def has_permission(self, request, view):
        # Kitchen staff can only view or search (safe methods)
        return (request.user and request.user.groups.filter(name='KitchenStaff').exists() 
                and request.method in permissions.SAFE_METHODS)

class IsClinicOrKitchenStaff(permissions.BasePermission):
    """
    Allows both clinic and kitchen staff to view the prescription but restricts modification to clinic staff.
    """
    def has_permission(self, request, view):
        is_clinic_staff = request.user.groups.filter(name='ClinicStaff').exists()
        is_kitchen_staff = request.user.groups.filter(name='KitchenStaff').exists()
        if is_clinic_staff:
            return True  # Full access to clinic staff
        if is_kitchen_staff and request.method in permissions.SAFE_METHODS:
            return True  # Kitchen staff can only view (GET) requests
        return False