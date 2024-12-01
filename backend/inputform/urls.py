# dbs/urls.py
from django.urls import path
from .views import add_product_view

urlpatterns = [
    path('add-product/', add_product_view, name='add_product'),
    
]
