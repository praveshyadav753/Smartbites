from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone


User = get_user_model()  # Use this to ensure compatibility with custom user models 

class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp_code = models.CharField(max_length=6)  
    created_at = models.DateTimeField(auto_now_add=True)
    phone_number= models.CharField(max_length=12 ,blank=True, null=True)

    def is_expired(self):
        # Define expiration as 2 minutes
        return timezone.now() > self.created_at + timezone.timedelta(minutes=2)

    def __str__(self):
        return f"OTP for {self.user.email}: {self.otp_code}"
