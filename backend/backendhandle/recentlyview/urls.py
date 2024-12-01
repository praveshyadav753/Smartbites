from django.urls import path
from .views import  RecentlyViewedList

urlpatterns = [
   
    path('recent-viewed-items/', RecentlyViewedList.as_view(), name='recent_viewed_items'),
]
