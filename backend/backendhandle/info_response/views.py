from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from dbs.models import Product
from .serializers import ProductSerializer
from userprofile.models import UserProfile
from recentlyview.models import RecentlyViewed
from rest_framework.permissions import AllowAny

class ProductDetailView(APIView):
    # permission_classes = [AllowAny]

    def get(self, request, barcode):
        try:
            # Fetch the product and prefetch related data
            product = (
                Product.objects
                .select_related('nutrition')  # Assuming nutrition is a ForeignKey
                .prefetch_related('ingredients')  # Assuming ingredients is a ManyToManyField
                .get(barcode=barcode)
                
            )
            

            # Check if the user is authenticated
            if request.user.is_authenticated:
                
                # Retrieve the user profile
                current_user = request.user
                print("infro responce user" )
                print(current_user)

            # Get or create the RecentlyViewed entry
                recently_viewed, created = RecentlyViewed.objects.get_or_create(
                    user=current_user,  # Use the authenticated user directly
                    product=product,
                    defaults={'viewed_at': timezone.now()}
                )
                
                print(recently_viewed)

                # Update the timestamp if the entry already exists
                if not created:
                    recently_viewed.viewed_at = timezone.now()
                    recently_viewed.save()

            # Return serialized product data
            serializer = ProductSerializer(product)
            # print(serializer.data)
            return Response({
                'product_details': serializer.data,
                'message': 'Product viewed successfully'
            }, status=status.HTTP_200_OK)

        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)



# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.shortcuts import get_object_or_404
# from django.utils import timezone
# from dbs.models import Product
# from userprofile.models import UserProfile
# from recentlyview.models import RecentlyViewed
# from .serializers import ProductSerializer

# class ProductDetailView(APIView):
#     def get(self, request, barcode):
#         try:
#             # Fetch the product and prefetch related data
#             product = (
#                 Product.objects
#                 .select_related('nutrition')  # Fetch related nutrition in one query
#                 .prefetch_related('ingredients')  # Prefetch related ingredients
#                 .get(barcode=barcode)
#             )

#             # Simulate logged-in user (replace this with request.user in production)
#             user_profile = UserProfile.objects.get(user__username="pravesh")
#             user = user_profile.user

#             # Get or create the RecentlyViewed entry
#             recently_viewed, created = RecentlyViewed.objects.get_or_create(user=user, product=product)

#             # Update the timestamp if the product was already viewed
#             if not created:
#                 recently_viewed.viewed_at = timezone.now()
#                 recently_viewed.save()

#             # Serialize the product data
#             serializer = ProductSerializer(product)

#             return Response({
#                 'product_details': serializer.data,
#                 'message': 'Product viewed successfully'
#             }, status=status.HTTP_200_OK)
#         except Product.DoesNotExist:
#             return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
