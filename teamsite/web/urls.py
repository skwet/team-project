from django.urls import path
from . import views

urlpatterns = [
    path('',views.port_scan,name='start'),
    path('port-scan/',views.port_scan,name='port'),
    path('vulnerability-scan/',views.vuln_scanner,name='vuln'),
    path('results-port/',views.port_scan,name='port_res'),
    path('result-vulnerabilities/',views.vuln_scanner,name='vuln_res')
]