# dbs/urls.py
from django.urls import path
# backendhandle/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dbs/', include('dbs.urls')), 
    path('api/', include('loginprocess.urls')),
    # path('fetchdata/', include('fetchdata.urls')),
    path('fetch/', include('info_response.urls')),
    path('info_response/', include('evalutiondata.urls')),
    path('recent/', include('recentlyview.urls')),
    path('profile/', include('userprofile.urls')),    
    path('fetch-items/',include('Usershop.urls')),
]


