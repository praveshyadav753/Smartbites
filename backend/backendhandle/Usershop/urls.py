from django.urls import path
from . import views

urlpatterns = [
    path('api/cart/', views.CartAPIView.as_view(), name='cart'),
    path('api/cart/<int:cart_item_id>/', views.CartAPIView.as_view(), name='cart_item'),
   
]
