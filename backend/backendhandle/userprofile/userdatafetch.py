from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

# View to create or update the user profile
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        # Retrieve the profile of the currently logged-in user
        user_profile = get_object_or_404(UserProfile, user=request.user)

        # Return the user profile data
        profile_data = {
            "first_name": user_profile.first_name,
            "last_name": user_profile.last_name,
            "age": user_profile.age,
            "weight": user_profile.weight,
            "height": user_profile.height,
            "gender": user_profile.gender,
            "medical_conditions": user_profile.medical_conditions,
            "allergies": user_profile.allergies,
            "dietary_preferences": user_profile.dietary_preferences,
            "is_vegetarian": user_profile.is_vegetarian,
            "is_vegan": user_profile.is_vegan,
            "has_dietary_restrictions": user_profile.has_dietary_restrictions,
        }

        return Response(profile_data, status=status.HTTP_200_OK)

#     def post(self, request):
#         # Create or update the user profile for the logged-in user
#         user = request.user

#         profile_data = request.data
#         user_profile, created = UserProfile.objects.get_or_create(user=user)

#         # Update the profile fields
#         user_profile.first_name = profile_data.get("first_name", user_profile.first_name)
#         user_profile.last_name = profile_data.get("last_name", user_profile.last_name)
#         user_profile.age = profile_data.get("age", user_profile.age)
#         user_profile.weight = profile_data.get("weight", user_profile.weight)
#         user_profile.height = profile_data.get("height", user_profile.height)
#         user_profile.gender = profile_data.get("gender", user_profile.gender)
#         user_profile.medical_conditions = profile_data.get("medical_conditions", user_profile.medical_conditions)
#         user_profile.allergies = profile_data.get("allergies", user_profile.allergies)
#         user_profile.dietary_preferences = profile_data.get("dietary_preferences", user_profile.dietary_preferences)
#         user_profile.is_vegetarian = profile_data.get("is_vegetarian", user_profile.is_vegetarian)
#         user_profile.is_vegan = profile_data.get("is_vegan", user_profile.is_vegan)
#         user_profile.has_dietary_restrictions = profile_data.get("has_dietary_restrictions", user_profile.has_dietary_restrictions)

#         # Save the updated profile
#         user_profile.save()

#         message = "Profile created successfully!" if created else "Profile updated successfully!"
#         return Response({"message": message}, status=status.HTTP_200_OK)


