from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'web/index.html')

def home(response):
    return render(response, 'web/home.html')


