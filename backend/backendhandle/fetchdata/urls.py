from django.urls import path
from .views import fetch_openfoodfact_response

urlpatterns = [
    path('fetch-product/<str:barcode>/', fetch_openfoodfact_response, name='fetch_product'),
]
