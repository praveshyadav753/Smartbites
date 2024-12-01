# evalutiondata/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('insert-ingredients/', views.insert_ingredients, name='insert_ingredients'),
]
