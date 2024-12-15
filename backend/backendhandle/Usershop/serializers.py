from rest_framework import serializers
from .models import Product, CartItem, ShoppingCart

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('barcode', 'name',  'description', 'image')

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'quantity')

class ShoppingCartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = ShoppingCart
        fields = ('id', 'user', 'created_at', 'updated_at', 'is_active', 'items')
