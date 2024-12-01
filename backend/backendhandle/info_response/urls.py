from django.urls import path
from .views import ProductDetailView

app_name = 'info_response'

urlpatterns = [
    path('products/<str:barcode>/nutrition/', ProductDetailView.as_view(), name='product-detail'),
]
