# urls.py
from django.urls import path
from .views import UpdateProfileView,UpdateMedicalView,UpdatePreferencesView
from .userdatafetch import UserProfileView

urlpatterns = [
    path('update/', UpdateProfileView.as_view(), name='update-profile'),
    path('medical/', UpdateMedicalView.as_view(), name='update-medicalview'),
    path('preferences/', UpdatePreferencesView.as_view(), name='update-preferences'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),  # For logged-in users
    # path('guest-profile/', GuestProfileView.as_view(), name='guest-profile'),
]
   

