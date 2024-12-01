# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.permissions import AllowAny
# from django.contrib.auth import authenticate
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.utils import timezone
# from .models import OTP, User
# from .utils import generate_otp
# import re
# from userprofile.models import UserProfile

# class RequestOTPView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email_or_phone = request.data.get('email_or_phone')
#         is_resend = request.data.get('is_resend', False)

#         # Validate if input is email or phone
#         if self.is_valid_email(email_or_phone):
#             user = User.objects.filter(email=email_or_phone).first()
#             if not user:
#                 username = email_or_phone.split('@')[0]  # Generate a username from email
#                 # Ensure the username is unique
#                 if User.objects.filter(username=username).exists():
#                     return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
#                 user = User.objects.create_user(username=username, email=email_or_phone)
#         elif self.is_valid_phone(email_or_phone):
#             user_profile = UserProfile.objects.filter(phone_number=email_or_phone).first()
#             user = user_profile.user if user_profile else None
#             if not user:
#                 user = User.objects.create_user(username=email_or_phone, email=None)
#                 UserProfile.objects.create(user=user, phone_number=email_or_phone)
#         else:
#             return Response({'error': 'Invalid email or phone number format.'}, status=status.HTTP_400_BAD_REQUEST)

#         # Generate and send OTP
#         otp_code = generate_otp(user)
#         message = "OTP resent to your email or phone." if is_resend else "OTP sent to your email or phone."
#         print(message)

#         return Response({'message': message}, status=status.HTTP_200_OK)

#     @staticmethod
#     def is_valid_email(email):
#         regex = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
#         return re.match(regex, email)

#     @staticmethod
#     def is_valid_phone(phone):
#         regex = r'^[6-9]\d{9}$'
#         return re.match(regex, phone)


# class VerifyOTPView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email_or_phone = request.data.get('email_or_phone')
#         otp_code = request.data.get('otp')

#         # Determine if the input is an email or phone
#         try:
#             if self.is_valid_email(email_or_phone):
#                 user = User.objects.get(email=email_or_phone)
#             elif self.is_valid_phone(email_or_phone):
#                 user_profile = UserProfile.objects.get(phone_number=email_or_phone)
#                 user = user_profile.user  # Retrieve the associated user through the UserProfile model
#             else:
#                 return Response({'error': 'Invalid email or phone number format.'}, status=status.HTTP_400_BAD_REQUEST)
#         except (User.DoesNotExist, UserProfile.DoesNotExist):
#             return Response({'error': 'User does not exist. Please register first.'}, status=status.HTTP_404_NOT_FOUND)

#         try:
#             otp_record = OTP.objects.get(user=user, otp_code=otp_code)

#             # Check if OTP is expired
#             OTP_EXPIRY_TIME = 2  # Expiry time in minutes
#             if timezone.now() > otp_record.created_at + timezone.timedelta(minutes=OTP_EXPIRY_TIME):
#                 return Response({'error': 'OTP expired.'}, status=status.HTTP_400_BAD_REQUEST)

#             # If OTP is valid, delete it (for one-time use)
#             otp_record.delete()

#             # Generate JWT token after successful OTP verification
#             refresh = RefreshToken.for_user(user)
#             access_token = str(refresh.access_token)
#             user_profile, created = UserProfile.objects.get_or_create(user=user)

#             return Response({
#                 'message': 'OTP verified successfully.',
#                 'access_token': access_token,
#                 'refresh': str(refresh),
#             }, status=status.HTTP_200_OK)

#         except OTP.DoesNotExist:
#             return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)

#     @staticmethod
#     def is_valid_email(email):
#         regex = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
#         return re.match(regex, email)

#     @staticmethod
#     def is_valid_phone(phone):
#         regex = r'^[6-9]\d{9}$'
#         return re.match(regex, phone)


# class RefreshTokenView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         refresh_token = request.data.get('refresh')
#         try:
#             refresh = RefreshToken(refresh_token)
#             access_token = str(refresh.access_token)
#             print("new tocken is %s" % access_token)
#             return Response({'access': access_token}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'error': 'Invalid refresh token.'}, status=status.HTTP_400_BAD_REQUEST)

from django.middleware.csrf import get_token

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from .models import OTP, User
from .utils import generate_otp
import re
from userprofile.models import UserProfile
from datetime import timedelta
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes


class RequestOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email_or_phone = request.data.get('email_or_phone')
        is_resend = request.data.get('is_resend', False)

        # Validate if input is email or phone
        if self.is_valid_email(email_or_phone):
            user = User.objects.filter(email=email_or_phone).first()
            if not user:
                username = email_or_phone.split('@')[0]  # Generate a username from email
                # Ensure the username is unique
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
                user = User.objects.create_user(username=username, email=email_or_phone)
        elif self.is_valid_phone(email_or_phone):
            user_profile = UserProfile.objects.filter(phone_number=email_or_phone).first()
            user = user_profile.user if user_profile else None
            if not user:
                user = User.objects.create_user(username=email_or_phone, email=None)
                UserProfile.objects.create(user=user, phone_number=email_or_phone)
        else:
            return Response({'error': 'Invalid email or phone number format.'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate and send OTP
        otp_code = generate_otp(user)
        message = "OTP resent to your email or phone." if is_resend else "OTP sent to your email or phone."
        print(message)

        return Response({'message': message}, status=status.HTTP_200_OK)

    @staticmethod
    def is_valid_email(email):
        regex = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
        return re.match(regex, email)

    @staticmethod
    def is_valid_phone(phone):
        regex = r'^[6-9]\d{9}$'
        return re.match(regex, phone)


class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email_or_phone = request.data.get('email_or_phone')
        otp_code = request.data.get('otp')

        # Determine if the input is an email or phone
        try:
            if self.is_valid_email(email_or_phone):
                user = User.objects.get(email=email_or_phone)
            elif self.is_valid_phone(email_or_phone):
                user_profile = UserProfile.objects.get(phone_number=email_or_phone)
                user = user_profile.user  # Retrieve the associated user through the UserProfile model
            else:
                return Response({'error': 'Invalid email or phone number format.'}, status=status.HTTP_400_BAD_REQUEST)
        except (User.DoesNotExist, UserProfile.DoesNotExist):
            return Response({'error': 'User does not exist. Please register first.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            otp_record = OTP.objects.get(user=user, otp_code=otp_code)

            # Check if OTP is expired
            OTP_EXPIRY_TIME = 2  # Expiry time in minutes
            if timezone.now() > otp_record.created_at + timezone.timedelta(minutes=OTP_EXPIRY_TIME):
                return Response({'error': 'OTP expired.'}, status=status.HTTP_400_BAD_REQUEST)

            # If OTP is valid, delete it (for one-time use)
            otp_record.delete()

            # Generate JWT token after successful OTP verification
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            
            user_profile, created = UserProfile.objects.get_or_create(user=user)

            # Set JWT tokens in cookies
            response = Response({
                'message': 'OTP verified successfully.',
            }, status=status.HTTP_200_OK)

            # Set access and refresh token as cookies (with HttpOnly and SameSite), max_age=timedelta(hours=1),
            response.set_cookie(
                'access_token', access_token ,httponly=True, secure=False, samesite='Lax'
            )
            response.set_cookie(
                'refresh_token', str(refresh), max_age=timedelta(days=7), httponly=True, secure=False, samesite='Lax'
            )
            
            csrf_token = get_token(request)  # Get CSRF token
            response.set_cookie('csrftoken', csrf_token, httponly=False, secure=False, samesite='Lax')  # Not HttpOnly, because it's used client-side


            return response

        except OTP.DoesNotExist:
            return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def is_valid_email(email):
        regex = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
        return re.match(regex, email)

    @staticmethod
    def is_valid_phone(phone):
        regex = r'^[6-9]\d{9}$'
        return re.match(regex, phone)


class RefreshTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh')
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            print("new token is %s" % access_token)

            # Set the new access token in the response cookies
            response = Response({'access': access_token}, status=status.HTTP_200_OK)
            response.set_cookie(
                'access_token', access_token, max_age=timedelta(hours=1), httponly=True, secure=False, samesite='Lax'
            )
            return response
        except Exception as e:
            return Response({'error': 'Invalid refresh token.'}, status=status.HTTP_400_BAD_REQUEST)
