from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models import CustomUser, Car


class CarIntegrationTest(TestCase):

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
        self.car_1 = Car.objects.create(
            make="Ford",
            model="GT",
            year=2024,
            engine_size=3.5,
            horsepower=650,
            cylinders=12,
            torque=500,
            top_speed=380,
            kph_from_zero_to_hundred=2.5,
            model_asset_path="some/path/to/model",
        )
        self.car_2 = Car.objects.create(
            make="Porsche",
            model="GT 3 RS",
            year=2024,
            engine_size=3.5,
            horsepower=650,
            cylinders=12,
            torque=500,
            top_speed=380,
            kph_from_zero_to_hundred=2.5,
            model_asset_path="some/path/to/model",
        )

    def test_get_all_car(self):
        url = reverse("car_lis_create")
        response = self.client.get(
            url,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(CustomUser.objects.count(), 2)
        self.assertEqual(response.data[0]["make"], "Ford")

    def test_create_new_car_admin(self):
        url = reverse("car_lis_create")
        login_url = reverse("get_token")

        login_response = self.client.post(
            login_url, {"username": "admin", "password": "pass"}, format="json"
        )

        response = self.client.post(
            url,
            {
                "make": "Ferrari",
                "model": "Roma",
                "year": 2023,
                "engine_size": 5.5,
                "horsepower": 780,
                "cylinders": 12,
                "torque": 900,
                "top_speed": 420,
                "kph_from_zero_to_hundred": 2.3,
                "model_asset_path": "some/path/to/model",
            },
            HTTP_AUTHORIZATION=f"Bearer {login_response.data["access"]}",
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["make"], "Ferrari")

    def test_create_new_car_user(self):
        url = reverse("car_lis_create")
        login_url = reverse("get_token")

        login_response = self.client.post(
            login_url,
            {"username": "testuser", "password": "pass"},
            format="json",
        )

        response = self.client.post(
            url,
            {
                "make": "Lamborghini",
                "model": "Urus",
                "year": 2023,
                "engine_size": 5.5,
                "horsepower": 780,
                "cylinders": 12,
                "torque": 900,
                "top_speed": 420,
                "kph_from_zero_to_hundred": 2.3,
                "model_asset_path": "some/path/to/model",
            },
            HTTP_AUTHORIZATION=f"Bearer {login_response.data["access"]}",
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

