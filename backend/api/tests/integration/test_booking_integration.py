from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models import CustomUser, Track, Car, Booking


class BookingIntegrationTest(TestCase):

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
        self.track = Track.objects.create(
            name="Sylverstone",
            location="UK",
            distance_km=1.23,
            avg_lap_time_minute=1.03,
            difficulty="Easy",
            model_asset_path="some/path/to/model",
        )
        self.car = Car.objects.create(
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
        self.booking = Booking.objects.create(
            user=self.user,
            car=self.car,
            track=self.track,
            booked_date="2025-03-26 15:30:00",
        )

        login_url = reverse("get_token")
        login_response = self.client.post(
            login_url,
            {"username": "testuser", "password": "pass"},
            format="json",
        )
        self.token = login_response.data["access"]

