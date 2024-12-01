from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import RecentlyViewed
from userprofile.models import UserProfile
from .serializer import ProductSerializer  
from rest_framework.permissions import AllowAny,IsAuthenticated


class RecentlyViewedList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        current_user = request.user
        print("recently view ,current user is :")
        print(current_user)
        print(request.user.is_authenticated)  

        # Check if the user is authenticated
        if not current_user.is_authenticated:
            return Response({'error': 'User is not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            recently_viewed_items = RecentlyViewed.objects.filter(user=current_user).order_by('-viewed_at')[:5]
            
            products = [item.product for item in recently_viewed_items]
            serializer = ProductSerializer(products, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)