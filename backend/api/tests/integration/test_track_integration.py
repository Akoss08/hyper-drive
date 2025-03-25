from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models import CustomUser, Track


class TrackIntegrationTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "username": "testuser",
            "first_name": "Test",
            "last_name": "User",
            "email": "testuser@gmail.com",
            "password": "pass",
        }
        self.admin_data = {
            "username": "admin",
            "first_name": "Ad",
            "last_name": "Min",
            "email": "admin@gmail.com",
            "password": "pass",
        }
        self.user = CustomUser.objects.create_user(**self.user_data)
        self.admin = CustomUser.objects.create_superuser(**self.admin_data)
        self.track_1 = Track.objects.create(
            name="Sylverstone",
            location="UK",
            distance_km=1.23,
            avg_lap_time_minute=1.03,
            difficulty="Easy",
            model_asset_path="some/path/to/model",
        )
        self.track_2 = Track.objects.create(
            name="Hungaroring",
            location="Mogyoros",
            distance_km=1.52,
            avg_lap_time_minute=1.13,
            difficulty="Medium",
            model_asset_path="some/path/to/model",
        )

