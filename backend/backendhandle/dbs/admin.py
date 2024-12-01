from django.contrib import admin

from django.contrib import admin
from .models import Product,Ingredient,Nutrition

admin.site.register(Product)  # Register the Product model
admin.site.register(Ingredient)
admin.site.register(Nutrition)