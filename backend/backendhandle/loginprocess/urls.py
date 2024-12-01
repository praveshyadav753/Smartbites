from django.urls import path
from .views import RequestOTPView, VerifyOTPView,RefreshTokenView
from .logout import LogoutView

urlpatterns = [
    path('request-otp/', RequestOTPView.as_view(), name='api-request-otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
    path('token/refresh/', RefreshTokenView.as_view(), name='refresh-token'),
    path('logout/', LogoutView.as_view(), name='logout-token'),
    ]
   
