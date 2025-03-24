from django.test import TestCase
from api.models import Booking, CustomUser, Car, Track
from django.core.exceptions import ValidationError


class bookingModelTest(TestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username="test",
            email="test@test.com",
            first_name="first",
            last_name="last",
            password="password",
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

        self.track = Track.objects.create(
            name="Hungaroring",
            location="Mogyorod",
            distance_km=1.5,
            avg_lap_time_minute=1.19,
            difficulty="easy",
            model_asset_path="/path/to/model",
        )

    def test_create_booking(self):
        booking = Booking.objects.create(
            user=self.user,
            car=self.car,
            track=self.track,
            booked_date="2025-03-25 15:30:00",
        )

        self.assertEqual(
            str(booking),
            """test (2025-03-25 15:30:00+00:00):
        Ford, GT - Mogyorod""",
        )

    def test_create_booking_same_date(self):
        Booking.objects.create(
            user=self.user,
            car=self.car,
            track=self.track,
            booked_date="2025-03-25 15:30:00",
        )

        with self.assertRaises(ValidationError):
            booking_2 = Booking(
                user=self.user,
                car=self.car,
                track=self.track,
                booked_date="2025-03-25 15:30:00",
            )
            booking_2.full_clean()

    def test_create_booking_car_not_exists(self):
        booking = Booking(
            user=self.user,
            car=None,
            track=self.track,
            booked_date="2025-03-25 15:30:00",
        )

        with self.assertRaises(ValidationError):
            booking.full_clean()

    def test_create_booking_track_not_exists(self):
        booking = Booking(
            user=self.user,
            car=self.car,
            track=None,
            booked_date="2025-03-25 15:30:00",
        )

        with self.assertRaises(ValidationError):
            booking.full_clean()

    def test_create_booking_in_past(self):
        with self.assertRaises(ValidationError):
            Booking.objects.create(
                user=self.user,
                car=self.car,
                track=self.track,
                booked_date="2025-03-23 15:30:00",
            )
