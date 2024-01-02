from django.db import models
from django.contrib.auth.models import User

class Scan(models.Model):
    host = models.CharField(max_length=200)
    ports = models.CharField(max_length=250)
