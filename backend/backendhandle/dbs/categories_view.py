# # dbs/categories_view.py

# from django.http import JsonResponse
# from django.db.models import Q
# from .models import Product
# from rest_framework.permissions import AllowAny,IsAuthenticated
# from django.contrib.auth.decorators import login_required

# # Helper function to check if category words match the backend category
# def match_category(category_name, backend_category):
#     """Check if any word in category_name matches the backend category."""
#     return any(word.lower() in backend_category.lower() for word in category_name.lower().split())

# def product_list_by_category(request, category):
#     """
#     Fetch products by category, dynamically matching category names from the database.
#     """
    

#     try:
#         # Fetch all unique categories from the database (assuming 'Product' has a 'category' field)
#         backend_categories = Product.objects.values_list('category', flat=True).distinct()

#         # Match the category by checking if any backend category matches the words in the frontend category name
#         matched_categories = [
#             category_name for category_name in backend_categories if match_category(category, category_name)
#         ]

#         # If no categories matched, return an empty list
#         if not matched_categories:
#             return JsonResponse({'products': []})

#         # Fetch all products matching the found categories using Q for dynamic filtering
#         products = Product.objects.filter(Q(category__in=matched_categories))
        

#         # Prepare product data to return
#         product_data = []
#         for product in products:
#             product_data.append({
#                 'id': product.barcode,  
#                 'name': product.name,
#                 'image': product.image if product.image else None,
#                 'category': product.category,
#                 'description': product.description,
#             })
#         print(product_data)
#         print("hello")
#         return JsonResponse({'products': product_data})

#     except Exception as e:
#         # Handle any unexpected errors
#         print("error")
#         return JsonResponse({'error': str(e)}, status=500)
from django.http import JsonResponse
from django.db.models import Q
from .models import Product
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Helper function to check if category words match the backend category
def match_category(category_name, backend_category):
    """Check if any word in category_name matches the backend category."""
    return any(word.lower() in backend_category.lower() for word in category_name.lower().split())

class ProductListByCategoryView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request, category, format=None):
        """
        Fetch products by category, dynamically matching category names from the database.
        """
        try:
            # Fetch all unique categories from the database (assuming 'Product' has a 'category' field)
            backend_categories = Product.objects.values_list('category', flat=True).distinct()

            # Match the category by checking if any backend category matches the words in the frontend category name
            matched_categories = [
                category_name for category_name in backend_categories if match_category(category, category_name)
            ]

            # If no categories matched, return an empty list
            if not matched_categories:
                return JsonResponse({'products': []})

            # Fetch all products matching the found categories using Q for dynamic filtering
            products = Product.objects.filter(Q(category__in=matched_categories))

            # Prepare product data to return
            product_data = []
            for product in products:
                product_data.append({
                    'id': product.barcode,
                    'name': product.name,
                    'image': product.image if product.image else None,
                    'category': product.category,
                    'description': product.description,
                })
            
            return JsonResponse({'products': product_data})
        
        except Exception as e:
            # Handle any unexpected errors
            return JsonResponse({'error': str(e)}, status=500)
