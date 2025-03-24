from django.test import TestCase
from api.models.car import Car
from django.core.exceptions import ValidationError


class CarModelTest(TestCase):

    def test_create_car(self):
        car = Car.objects.create(
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

        self.assertEqual(str(car), "Ford GT (2024)")

    def test_create_car_invalid_engine_size(self):
        car_1 = Car(
            make="Ford",
            model="GT",
            year=2024,
            engine_size=3.55,
            horsepower=650,
            cylinders=12,
            torque=500,
            top_speed=380,
            kph_from_zero_to_hundred=2.5,
            model_asset_path="some/path/to/model",
        )

        car_2 = Car(
            make="Ford",
            model="GT",
            year=2024,
            engine_size=355.5,
            horsepower=650,
            cylinders=12,
            torque=500,
            top_speed=380,
            kph_from_zero_to_hundred=2.5,
            model_asset_path="some/path/to/model",
        )

        with self.assertRaises(ValidationError):
            car_1.full_clean()

        with self.assertRaises(ValidationError):
            car_2.full_clean()

    def test_create_car_invalid_kph_seconds(self):
        car_1 = Car(
            make="Ford",
            model="GT",
            year=2024,
            engine_size=3.5,
            horsepower=650,
            cylinders=12,
            torque=500,
            top_speed=380,
            kph_from_zero_to_hundred=2.55,
            model_asset_path="some/path/to/model",
        )

        car_2 = Car(
            make="Ford",
            model="GT",
            year=2024,
            engine_size=3.5,
            horsepower=650,
            cylinders=12,
            torque=500,
            top_speed=380,
            kph_from_zero_to_hundred=2222.5,
            model_asset_path="some/path/to/model",
        )

        with self.assertRaises(ValidationError):
            car_1.full_clean()

        with self.assertRaises(ValidationError):
            car_2.full_clean()

    def test_create_car_missing_make_field(self):
        car = Car.objects.create(
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

        with self.assertRaises(ValidationError):
            car.full_clean()
