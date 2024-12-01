from django.contrib.auth.models import User  # Ensure you're importing the correct User model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    # Link to the User model via OneToOneField
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_guest = models.BooleanField(default=False)

    # Basic details
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    weight = models.FloatField(blank=True, null=True)  # in kilograms
    height = models.FloatField(blank=True, null=True)  # in feet
    gender = models.CharField(max_length=10, choices=[('Male', "male"), ('Female', "female"), ('Other', 'Other')], blank=True, null=True)
        
    # Medical details
    medical_conditions = models.TextField(blank=True, null=True)  # e.g. "Diabetes, Hypertension"
    allergies = models.TextField(blank=True, null=True)  # e.g. "Peanuts, Shellfish"
    
    # Dietary preferences
    dietary_preferences = models.TextField(blank=True, null=True)  # e.g. "Vegetarian, Gluten-free"
    is_vegetarian = models.BooleanField(default=False)
    is_vegan = models.BooleanField(default=False)
    has_dietary_restrictions = models.BooleanField(default=False)
    
    phone_number = models.CharField(max_length=12, null=True, blank=True)

    def __str__(self):
        return f"Profile of {self.user.username}"  # Ensure it uses 'user' to refer to the associated User model

# Signal to automatically create a UserProfile when a new User is created
# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         # Create a UserProfile for the new user
#         UserProfile.objects.create(user=instance)

# # Signal to save the UserProfile when the User is saved
# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.userprofile.save()
