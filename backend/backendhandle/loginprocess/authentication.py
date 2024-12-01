# authentication.py
import jwt
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Get token from cookies
        token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
           
        if not token:
            return None  # Return None, let other authentication methods run

        try:
            # Decode token using the signing key
            decoded_token = jwt.decode(token, settings.SIMPLE_JWT['SIGNING_KEY'], algorithms=[settings.SIMPLE_JWT['ALGORITHM']])
            user_id = decoded_token.get('user_id')  # or 'user' based on how you encode in the token

            if not user_id:
                raise AuthenticationFailed('Invalid token.')

            user = User.objects.get(id=user_id)  # or use a custom user model
            return (user, token)  # Return the user and the token
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired.')
        except jwt.DecodeError:
            raise AuthenticationFailed('Invalid token.')
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found.')
