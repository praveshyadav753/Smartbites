import random
import re
from .models import OTP
from django.core.mail import send_mail
from twilio.rest import Client
from django.conf import settings
from userprofile.models import UserProfile

def is_valid_email(email):
    # Regular expression for validating email
    regex = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'
    return re.match(regex, email)

def generate_otp(user):
    otp_code = random.randint(100000, 999999)  # Generate a 6-digit OTP
    
    # Save OTP to database without expiry time
    OTP.objects.create(user=user, otp_code=str(otp_code))
    
    subject = "Your OTP for SmartBites Login"
    message = f"""
    <p>Dear {user.username or 'User'},</p>
    <p>Your One-Time Password (OTP) for logging into SmartBites is <strong>{otp_code}</strong>.</p>
    <p>This OTP is valid for 2 minutes only. If it expires, please request a new one.</p>
    <p>If you did not request this OTP, please ignore this message.</p>
    <br>
    <p>Thank you,<br>SmartBites Team</p>
    """

    # Check if the user provided a valid email address
    if user.email and is_valid_email(user.email):
        try:
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER, 
                [user.email],
                fail_silently=False,
                html_message=message  # Send the HTML content
            )
            print(f"OTP sent to email: {user.email}")
        except Exception as e:
            print(f"Failed to send email: {e}")
    else:
        # Attempt to send SMS if the email is not valid
        try:
            # Retrieve the user's phone number from UserProfile
            user_profile = UserProfile.objects.get(user=user)
            if user_profile.phone_number:
                client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
                # Make sure the phone number is in E.164 format (+1234567890)
                sms_message = client.messages.create(
                    body=f'Your OTP for SmartBites login is: {otp_code}',
                    from_=settings.TWILIO_PHONE_NUMBER,  # Your Twilio phone number
                    to=user_profile.phone_number  # Access the phone number correctly
                )
                print(f"OTP sent to SMS: {user_profile.phone_number}")
            else:
                print("User does not have a valid phone number.")
        except UserProfile.DoesNotExist:
            print("User profile not found.")
        except Exception as e:
            print(f"Failed to send SMS: {e}")

    return otp_code
