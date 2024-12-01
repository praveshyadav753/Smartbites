from rest_framework import serializers
from dbs.models import Product, Nutrition, Ingredient

class NutritionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nutrition
        fields = '__all__'

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name']  # Include only the `name` field

class ProductSerializer(serializers.ModelSerializer):
    nutrition = NutritionSerializer()
    ingredients = IngredientSerializer(many=True, read_only=True)  # Add ingredients with only `name`

    class Meta:
        model = Product
        fields = '__all__'

    def to_representation(self, instance):
        """
        Override to dynamically include only non-null fields,
        including related Nutrition and Ingredients data.
        """
        representation = super().to_representation(instance)

        # Filter out null fields from the main Product fields
        representation = {key: value for key, value in representation.items() if value is not None}

        # Handle Nutrition separately
        if instance.nutrition:
            nutrition_fields = NutritionSerializer(instance.nutrition).data
            representation['nutrition'] = {key: value for key, value in nutrition_fields.items() if value is not None}
        else:
            representation['nutrition'] = None

        # Handle Ingredients separately with only names
        ingredients_queryset = Ingredient.objects.filter(product=instance)  # Adjust if relationship differs
        ingredients_data = IngredientSerializer(ingredients_queryset, many=True).data
        representation['ingredients'] = [ingredient['name'] for ingredient in ingredients_data]  # Extract names

        return representation
    