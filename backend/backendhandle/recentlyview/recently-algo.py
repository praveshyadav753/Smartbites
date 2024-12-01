from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from userprofile.models import UserProfile
from .models import Product, RecentlyViewed
from django.utils import timezone  # For getting the current time

@api_view(['POST'])
def view_product(request, barcode):
    # Get the product or return 404 if not found
    product = get_object_or_404(Product, id=barcode)



    user=request.user
    user_profile = UserProfile.objects.get(user=user)
    user = user_profile.user

    # Get or create the RecentlyViewed entry
    recently_viewed, created = RecentlyViewed.objects.get_or_create(user=user, product=product)
    
    # Update timestamp if it already exists
    if not created:
        recently_viewed.viewed_at = timezone.now()
        recently_viewed.save()

    return Response({
        'message': 'Product viewed successfully',
        'product': product.name
    }, status=status.HTTP_200_OK)
