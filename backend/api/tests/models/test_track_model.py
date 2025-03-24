from django.test import TestCase
from api.models.track import Track
from django.core.exceptions import ValidationError


class TrackModelTest(TestCase):

    def test_create_track(self):
        track = Track.objects.create(
            name="Hungaroring",
            location="Mogyorod",
            distance_km=1.5,
            avg_lap_time_minute=1.19,
            difficulty="easy",
            model_asset_path="/path/to/model",
        )

        self.assertEqual(str(track), "Hungaroring - Mogyorod")

    def test_create_track_invalid_distance(self):
        track_1 = Track(
            name="Hungaroring",
            location="Mogyorod",
            distance_km=1.555,
            avg_lap_time_minute=1.19,
            difficulty="easy",
            model_asset_path="/path/to/model",
        )

        track_2 = Track(
            name="Hungaroring",
            location="Mogyorod",
            distance_km=1111.5,
            avg_lap_time_minute=1.19,
            difficulty="easy",
            model_asset_path="/path/to/model",
        )

        with self.assertRaises(ValidationError):
            track_1.full_clean()

        with self.assertRaises(ValidationError):
            track_2.full_clean()

    def test_create_track_invalid_avg_time(self):
        track_1 = Track(
            name="Hungaroring",
            location="Mogyorod",
            distance_km=1.5,
            avg_lap_time_minute=1.199,
            difficulty="easy",
            model_asset_path="/path/to/model",
        )

        track_2 = Track(
            name="Hungaroring",
            location="Mogyorod",
            distance_km=1.5,
            avg_lap_time_minute=111.19,
            difficulty="easy",
            model_asset_path="/path/to/model",
        )

        with self.assertRaises(ValidationError):
            track_1.full_clean()

        with self.assertRaises(ValidationError):
            track_2.full_clean()

    def test_create_track_missing_name_field(self):
        track = Track.objects.create(
            location="Mogyorod",
            distance_km=1.5,
            avg_lap_time_minute=1.19,
            difficulty="easy",
            model_asset_path="/path/to/model",
        )

        with self.assertRaises(ValidationError):
            track.full_clean()
