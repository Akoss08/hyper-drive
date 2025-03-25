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

    def test_get_all_track(self):
        url = reverse("track_list_create")
        response = self.client.get(
            url,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(CustomUser.objects.count(), 2)
        self.assertEqual(response.data[0]["name"], "Sylverstone")

    def test_create_new_track_admin(self):
        url = reverse("track_list_create")
        login_url = reverse("get_token")

        login_response = self.client.post(
            login_url, {"username": "admin", "password": "pass"}, format="json"
        )

        response = self.client.post(
            url,
            {
                "name": "Nurnberg",
                "location": "Germany",
                "distance_km": 1.92,
                "avg_lap_time_minute": 1.23,
                "difficulty": "Hard",
                "model_asset_path": "some/path/to/model",
            },
            HTTP_AUTHORIZATION=f"Bearer {login_response.data["access"]}",
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Nurnberg")

    def test_create_new_track_user(self):
        url = reverse("track_list_create")
        login_url = reverse("get_token")

        login_response = self.client.post(
            login_url,
            {"username": "testuser", "password": "pass"},
            format="json",
        )

        response = self.client.post(
            url,
            {
                "name": "Austral GP",
                "location": "Melbourne",
                "distance_km": 3.92,
                "avg_lap_time_minute": 1.53,
                "difficulty": "Hard",
                "model_asset_path": "some/path/to/model",
            },
            HTTP_AUTHORIZATION=f"Bearer {login_response.data["access"]}",
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

