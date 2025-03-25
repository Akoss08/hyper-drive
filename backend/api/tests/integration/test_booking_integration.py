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

    def test_get_all_bookings_authorized(self):
        url = reverse("booking_list_create")
        response = self.client.get(
            url,
            HTTP_AUTHORIZATION=f"Bearer {self.token}",
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(CustomUser.objects.count(), 1)
        self.assertEqual(response.data[0]["user"], self.user.id)

    def test_get_all_bookings_unauthorized(self):
        url = reverse("booking_list_create")
        response = self.client.get(
            url,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_new_booking_authorized(self):
        url = reverse("booking_list_create")

        track = Track.objects.create(
            name="Hungaroring",
            location="Mogyorod",
            distance_km=1.23,
            avg_lap_time_minute=1.03,
            difficulty="Easy",
            model_asset_path="some/path/to/model",
        )
        car = Car.objects.create(
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

        response = self.client.post(
            url,
            {
                "car": car.id,
                "track": track.id,
                "booked_date": "2025-03-27 15:30:00",
            },
            HTTP_AUTHORIZATION=f"Bearer {self.token}",
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["car"], car.id)

    def test_create_new_booking_unauthorized(self):
        url = reverse("booking_list_create")

        track = Track.objects.create(
            name="Hungaroring",
            location="Mogyorod",
            distance_km=1.23,
            avg_lap_time_minute=1.03,
            difficulty="Easy",
            model_asset_path="some/path/to/model",
        )
        car = Car.objects.create(
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

        response = self.client.post(
            url,
            {
                "car": car.id,
                "track": track.id,
                "booked_date": "2025-03-27 15:30:00",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_booking_authorized_valid_id(self):
        url = reverse("booking_update", kwargs={"pk": self.booking.id})

        response = self.client.patch(
            url,
            {
                "booked_date": "2025-03-28 15:30:00",
            },
            HTTP_AUTHORIZATION=f"Bearer {self.token}",
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["booked_date"], "2025-03-28T15:30:00Z")

    def test_update_booking_authorized_invalid_id(self):
        url = reverse("booking_update", kwargs={"pk": 10})

        response = self.client.patch(
            url,
            {
                "booked_date": "2025-03-28 15:30:00",
            },
            HTTP_AUTHORIZATION=f"Bearer {self.token}",
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_booking_unauthorized(self):
        url = reverse("booking_update", kwargs={"pk": self.booking.id})

        response = self.client.patch(
            url,
            {
                "booked_date": "2025-03-28 15:30:00",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_booking_authorized_valid_id(self):
        url = reverse("booking_delete", kwargs={"pk": self.booking.id})

        response = self.client.delete(
            url,
            HTTP_AUTHORIZATION=f"Bearer {self.token}",
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_booking_authorized_invalid_id(self):
        url = reverse("booking_delete", kwargs={"pk": 10})

        response = self.client.delete(
            url,
            HTTP_AUTHORIZATION=f"Bearer {self.token}",
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_booking_unauthorized(self):
        url = reverse("booking_delete", kwargs={"pk": self.booking.id})

        response = self.client.delete(
            url,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
