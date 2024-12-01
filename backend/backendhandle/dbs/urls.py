# dbs/urls.py

from django.urls import path
from .views import save_product_view
from .searches_view import ProductSearchView
from .reccomendation import RecommendedProductsView
from .categories_view import ProductListByCategoryView

urlpatterns = [
    path('product/<str:barcode>/', save_product_view, name='save_product'),
    path('recommended/', RecommendedProductsView.as_view(), name='get_recommended_products'),
    path('search/', ProductSearchView.as_view(), name='product_search'), 
    path('category/<str:category>/', ProductListByCategoryView.as_view(), name='product-list-by-category'),
]

