from rest_framework import serializers
from django.contrib.auth.models import User  # Import User model
from .models import UserProfile  # Import the UserProfile model

class UserProfileSerializer(serializers.ModelSerializer):
    # Serializer for the UserProfile model
    class Meta:
        model = UserProfile
        fields = ['first_name','last_name', 'gender', 'age', 'height', 'weight' ]

class MedicalConditionsSerializer(serializers.ModelSerializer):
    # Serializer specifically for medical_conditions
    class Meta:
        model = UserProfile
        fields = ['medical_conditions','allergies']

class DietaryPreferencesSerializer(serializers.ModelSerializer):
    # Serializer for dietary preferences and restrictions
    class Meta:
        model = UserProfile
        fields = ['dietary_preferences', 'is_vegetarian', 'is_vegan', 'has_dietary_restrictions']
