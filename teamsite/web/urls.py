from django.urls import path
from . import views

urlpatterns = [
    path('scan/',views.port_scan,name='index'),
    path('results/',views.port_scan,name='port_scan')
]