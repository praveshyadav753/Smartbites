# dbs/forms.py
from django import forms
from dbs.models import Product, Nutrition, Ingredient

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'barcode', 'category', 'brand', 'description', 'image']

class NutritionForm(forms.ModelForm):
    class Meta:
        model = Nutrition
        exclude = ['product']  # Will be linked programmatically

class IngredientForm(forms.ModelForm):
    class Meta:
        model = Ingredient
        exclude = ['product']  # Will be linked programmatically
