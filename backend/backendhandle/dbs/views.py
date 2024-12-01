import logging
from decimal import Decimal, InvalidOperation
from django.db import transaction
from django.http import JsonResponse
import requests
from .models import Product, Nutrition, Ingredient
from rest_framework.permissions import AllowAny

# Configure logging
logger = logging.getLogger(__name__)

def safe_decimal(value):
    """
    Safely convert a value to Decimal.
    Returns None if the value is invalid or empty.
    """
    try:
        if value in [None, '', 'N/A', 'not available']:
            return None
        return Decimal(str(value).replace(',', '').strip())
    except InvalidOperation:
        return None

def save_product_from_api(barcode):
    """
    Fetch and save product data from Open Food Facts API.
    """
    api_url = f"https://world.openfoodfacts.org/api/v0/product/{barcode}.json"
    try:
        response = requests.get(api_url)
        response_data = response.json()
    except ValueError:
        logger.error(f"Failed to decode JSON for barcode {barcode}, response text: {response.text}")
        return None, "Failed to decode JSON from Open Food Facts API.", response.text

    if response.status_code != 200:
        logger.error(f"Failed to fetch data for barcode {barcode}, status code {response.status_code}")
        return None, f"Failed to fetch data from Open Food Facts. Status Code: {response.status_code}", response_data

    product_data = response_data.get('product')
    if not product_data:
        logger.warning(f"No product data found for barcode {barcode}")
        return None, "Product not found in Open Food Facts.", response_data

    try:
        with transaction.atomic():
            # Extract product data
            name = product_data.get('product_name', f"Unknown Product {barcode}")
            category = product_data.get('categories', 'Unknown Category').split(',')[0] if product_data.get('categories') else 'Unknown Category'
            brand = product_data.get('brands', 'Unknown Brand').split(',')[0] if product_data.get('brands') else 'Unknown Brand'
            description = product_data.get('ingredients_text', None)  # Using ingredients as description for now
            image_url=product_data.get('image_url', None)
            # Create or update Product
            product, created = Product.objects.update_or_create(
                barcode=barcode,
                defaults={
                    'name': name,
                    'category': category,
                    'brand': brand,
                    'description': description,
                    'image':image_url,
                }
            )

            # Extract and save nutrition facts
            nutriments = product_data.get('nutriments', {})
            nutrition_data = {
                'serving_size': product_data.get('serving_size'),
                # 'calories': safe_decimal(nutriments.get('energy-kcal')),
                # 'total_fat': safe_decimal(nutriments.get('fat')),
                # 'saturated_fat': safe_decimal(nutriments.get('saturated-fat')),
                # 'trans_fat': safe_decimal(nutriments.get('trans-fat')),
                # 'cholesterol': safe_decimal(nutriments.get('cholesterol')),
                # 'sodium': safe_decimal(nutriments.get('sodium')),
                # 'potassium': safe_decimal(nutriments.get('potassium')),
                # 'total_carbohydrates': safe_decimal(nutriments.get('carbohydrates')),
                # 'dietary_fiber': safe_decimal(nutriments.get('fiber')),
                # 'sugars': safe_decimal(nutriments.get('sugars')),
                # 'added_sugars': safe_decimal(nutriments.get('added-sugars')),
                # 'protein': safe_decimal(nutriments.get('proteins')),
                
                
                # Add more fields if required
                
                
                

    # Merging nutrition data using the safe_decimal function for each nutrient
                'calories': safe_decimal(nutriments.get('energy-kcal')),
                'salt':safe_decimal(nutriments.get('salt')),
                'calories_from_fat': safe_decimal(nutriments.get('energy-kcal_value_computed')),
                'total_fat': safe_decimal(nutriments.get('fat')),
                'saturated_fat': safe_decimal(nutriments.get('saturated-fat')),
                'trans_fat': safe_decimal(nutriments.get('trans-fat')),
                'polyunsaturated_fat': safe_decimal(nutriments.get('polyunsaturated-fat')),
                'monounsaturated_fat': safe_decimal(nutriments.get('monounsaturated-fat')),
                'cholesterol': safe_decimal(nutriments.get('cholesterol')),
                'sodium': safe_decimal(nutriments.get('sodium')),
                'potassium': safe_decimal(nutriments.get('potassium')),
                'total_carbohydrates': safe_decimal(nutriments.get('carbohydrates')),
                'dietary_fiber': safe_decimal(nutriments.get('fiber')),
                'sugars': safe_decimal(nutriments.get('sugars')),
                'added_sugars': safe_decimal(nutriments.get('added-sugars')),
                'sugar_alcohol': safe_decimal(nutriments.get('sugar-alcohol')),
                'protein': safe_decimal(nutriments.get('proteins')),
                'vitamin_a': safe_decimal(nutriments.get('vitamin_a')),
                'vitamin_c': safe_decimal(nutriments.get('vitamin_c')),
                'calcium': safe_decimal(nutriments.get('calcium')),
                'iron': safe_decimal(nutriments.get('iron')),
                'vitamin_d': safe_decimal(nutriments.get('vitamin_d')),
                'vitamin_e': safe_decimal(nutriments.get('vitamin_e')),
                'vitamin_k': safe_decimal(nutriments.get('vitamin_k')),
                'thiamin': safe_decimal(nutriments.get('thiamin')),
                'riboflavin': safe_decimal(nutriments.get('riboflavin')),
                'niacin': safe_decimal(nutriments.get('niacin')),
                'vitamin_b6': safe_decimal(nutriments.get('vitamin_b6')),
                'folate': safe_decimal(nutriments.get('folate')),
                'vitamin_b12': safe_decimal(nutriments.get('vitamin_b12')),
                'biotin': safe_decimal(nutriments.get('biotin')),
                'pantothenic_acid': safe_decimal(nutriments.get('pantothenic_acid')),
                'phosphorus': safe_decimal(nutriments.get('phosphorus')),
                'iodine': safe_decimal(nutriments.get('iodine')),
                'magnesium': safe_decimal(nutriments.get('magnesium')),
                'zinc': safe_decimal(nutriments.get('zinc')),
                'selenium': safe_decimal(nutriments.get('selenium')),
                'copper': safe_decimal(nutriments.get('copper')),
                'manganese': safe_decimal(nutriments.get('manganese')),
                'chromium': safe_decimal(nutriments.get('chromium')),
                'molybdenum': safe_decimal(nutriments.get('molybdenum')),
                'chloride': safe_decimal(nutriments.get('chloride'))
    
                
            }

            Nutrition.objects.update_or_create(
                product=product,
                defaults=nutrition_data,
            )

            # Extract and save ingredients
            ingredients_text = product_data.get('ingredients_text', "")
            ingredients = [i.strip() for i in ingredients_text.split(',') if i.strip()]
            Ingredient.objects.filter(product=product).delete()  # Remove existing ingredients
            for index, ingredient in enumerate(ingredients):
                Ingredient.objects.create(
                    product=product,
                    name=ingredient,
                    order=index + 1
                )

            return product, None, response_data

    except Exception as e:
        logger.error(f"Error saving product data for barcode {barcode}: {str(e)}")
        return None, str(e), response_data


def save_product_view(request, barcode):
    """
    Django view to save product data by barcode.
    
    """
    permission_classes = [AllowAny]
    product, error, raw_response = save_product_from_api(barcode)
    if error:
        return JsonResponse({
            'error': error,
            'raw_response': raw_response,
            'message': 'Please try again later or check the barcode format.'
        }, status=400)

    return JsonResponse({
        'message': f'Product {product.name} saved successfully!',
        'raw_response': raw_response
    })
