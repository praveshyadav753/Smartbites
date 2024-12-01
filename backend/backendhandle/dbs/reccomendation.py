import random
from django.http import JsonResponse
from django.views import View
from .models import Product, Nutrition
from userprofile.models import UserProfile
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

class RecommendedProductsView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request, *args, **kwargs):
        print(f"Request received at: {request.path}")
        print(f"User authenticated: {request.user.is_authenticated}")
        
        try:
            user = request.user
            print(f"Current user for recommendation is : {user.username}")
            health_condition=[]

            try:
                user_profile = UserProfile.objects.get(user=user)
                
           
                
               
                
            
            # Correctly get UserProfile by user instance
                health_condition = user_profile.medical_conditions
            
                print(health_condition)
                
            except Exception:
                pass    
            preferred_nutrients = {
                    'protein': 10,  # Default values
                    'carbs': 20,
                    'fats': 10
                }
            # Retrieve all products and their nutritional data
            products = Product.objects.all()

            recommended_products = []

            for product in products:
                # Get associated nutrition information for each product
                try:
                    nutrition = Nutrition.objects.get(product=product)
                except Nutrition.DoesNotExist:
                    continue  # Skip products with no nutrition data

                # Condition 1: Health condition filter (e.g., diabetes)
                if health_condition and "diabetes" in health_condition.lower():
                    if (nutrition.total_carbohydrates is not None and nutrition.sugars is not None and
                        nutrition.total_carbohydrates < 10 and nutrition.sugars < 5):
                        recommended_products.append(product)
                        continue

                # Condition 2: Preferred nutrients filter
                if preferred_nutrients:
                    if (nutrition.protein is not None and nutrition.total_carbohydrates is not None and
                        nutrition.total_fat is not None and
                        nutrition.protein >= preferred_nutrients.get('protein', 0) and
                        nutrition.total_carbohydrates <= preferred_nutrients.get('carbs', 100) and
                        nutrition.total_fat <= preferred_nutrients.get('fats', 100)):
                        recommended_products.append(product)
                        continue

                # Condition 3: Nutritional balance filter
                if (nutrition.protein is not None and nutrition.total_carbohydrates is not None and
                    nutrition.total_fat is not None and nutrition.sugars is not None and
                    nutrition.dietary_fiber is not None and
                    nutrition.protein >= 8 and
                    nutrition.total_carbohydrates <= 30 and
                    nutrition.total_fat <= 15 and
                    nutrition.sugars <= 5 and
                    nutrition.dietary_fiber >= 5):
                    recommended_products.append(product)
                    continue

                # Condition 4: Rating filter (rating >= 4)
                if product.rating >= 3:
                    recommended_products.append(product)

            # Remove duplicates based on barcode
            recommended_products = list({product.barcode: product for product in recommended_products}.values())

            # Shuffle the list to randomize the order
            random.shuffle(recommended_products)

            # Convert products to a dictionary for JSON response
            recommended_products_data = [
                {
                    'id': product.barcode,
                    'name': product.name,
                    'rating': product.rating,
                    'image': product.image if product.image else None,  # Handle image if exists
                }
                for product in recommended_products
            ]
            print("recommendation runned")
            print(recommended_products_data)    
            return JsonResponse({'recommended_products': recommended_products_data})

        except UserProfile.DoesNotExist:
            return JsonResponse({'error': 'User profile not found'}, status=404)
        except Nutrition.DoesNotExist:
            return JsonResponse({'error': 'Nutrition data not found for some products'}, status=404)
