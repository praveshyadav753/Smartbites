from rest_framework.permissions import BasePermission

class IsGuestOrAuthenticated(BasePermission):
    
    def has_permission(self, request, view):
        # Allow access to guest users
        if request.user and request.user.is_guest:
            return True
        # Allow access to authenticated users
        if request.user and request.user.is_authenticated:
            return True
        return False
