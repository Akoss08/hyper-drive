from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models import CustomUser

    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "username": "testuser",
            "first_name": "Test",
            "last_name": "User",
            "email": "testuser@gmail.com",
            "password": "pass",
        }
        self.user = CustomUser.objects.create_user(**self.user_data)

