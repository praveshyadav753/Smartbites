from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from rest_framework.permissions import AllowAny

from .serializers import UserProfileSerializer,DietaryPreferencesSerializer,MedicalConditionsSerializer

class UpdateProfileView(APIView):
    
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user  
        print(user)   
        print(request.data)
        
        try:
            
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
       
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
        print(request.data) 
        if serializer.is_valid():
            # Save the updated profile data
            serializer.save()
            return Response({"message": "Profile updated successfully!", "profile": serializer.data}, status=status.HTTP_200_OK)
        else:
            # Return validation errors if the serializer is not valid
            print("Validation errors:", serializer.errors)
            return Response({"error": "Validation failed", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UpdateMedicalView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user  
        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

        
        serializer = MedicalConditionsSerializer(user_profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Medical conditions updated successfully!", "profile": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update dietary preferences view
class UpdatePreferencesView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user  
        try:
            user_profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response({"error": "User profile does not exist."}, status=status.HTTP_404_NOT_FOUND)

       
        serializer = DietaryPreferencesSerializer(user_profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Dietary preferences updated successfully!", "profile": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
        
        