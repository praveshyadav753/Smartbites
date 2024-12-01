from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.db.models import Q, Case, When, BooleanField

from dbs.models import Product

class ProductSearchView(APIView):
    permission_classes = [IsAuthenticated]
    print(IsAuthenticated)
    def get(self, request):
        print("user search ")
        print(request.user)
        query = request.query_params.get('q', '').strip()  # Get and sanitize the search query
        if not query:
            return Response({'error': 'Search query is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Annotate products to prioritize names starting with the query
        products = Product.objects.annotate(
            starts_with_query=Case(
                When(name__istartswith=query, then=True),
                default=False,
                output_field=BooleanField()
            )
        ).filter(
            Q(name__icontains=query) |
            Q(category__icontains=query) |
            Q(barcode__icontains=query)
        ).order_by(
            '-starts_with_query',  # True (1) first, then False (0)
            'name'                 # Alphabetical order
        )

        # Manually construct the response
        products_data = [
            {
                "barcode": product.barcode,
                "name": product.name,
                "category": product.category,
                # Add other fields as needed
            }
            for product in products
        ]

        return Response(products_data, status=status.HTTP_200_OK)
