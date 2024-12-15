from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Product, ShoppingCart, CartItem
from .serializers import ProductSerializer, ShoppingCartSerializer
from rest_framework import status


@api_view(['GET'])
def get_product_details(request, product_id):
    """
    API view to retrieve product details by product_id (barcode).
    """
    product = get_object_or_404(Product, barcode=product_id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]  # Ensuring the user must be authenticated

    def get(self, request):
        """
        Get the user's active shopping cart.
        """
        print("Cart request entry")
        cart = ShoppingCart.objects.filter(user=request.user, is_active=True).first()
        if cart:
            serializer = ShoppingCartSerializer(cart)
            return Response(serializer.data)
        return Response({"message": "No active cart found."}, status=404)

    def post(self, request):
        """
        Add a product to the cart.
        """
        product_id = request.data.get("product_id")
        if not product_id:
            return Response({"message": "Product ID is required."}, status=400)
        
        product = get_object_or_404(Product, barcode=product_id)  
        
        # Get or create the user's active shopping cart
        cart, created = ShoppingCart.objects.get_or_create(user=request.user, is_active=True)
        
        # Get or create the cart item
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        
        if not created:
            # If the item already exists, increase the quantity
            cart_item.quantity += 1
            cart_item.save()
        
        return Response({"message": "Product added to cart."}, status=201)
    
    def delete(self, request, cart_item_id):
        """
        Remove a product from the cart by cart_item_id.
        """
        # Corrected to use 'id' of the CartItem, not 'barcode'
        print("cardid", cart_item_id)
        cart_item = get_object_or_404(CartItem, id=cart_item_id, cart__user=request.user)
        cart_item.delete()
        return Response({"message": "Item removed from cart."}, status=200)

    def put(self, request, cart_item_id):
        """
        Update the quantity of a cart item.
        
        """
        print("enteeer enrere")
        cart_item = get_object_or_404(CartItem, id=cart_item_id, cart__user=request.user)
        new_quantity = request.data.get("quantity", 1)

        if new_quantity > 0:
            cart_item.quantity = new_quantity
            cart_item.save()
            return Response({"message": "Quantity updated successfully", "new_quantity": cart_item.quantity}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Quantity must be greater than 0"}, status=status.HTTP_400_BAD_REQUEST)
            
