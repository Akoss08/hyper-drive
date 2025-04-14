from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal


class Car(models.Model):
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    engine_size = models.DecimalField(max_digits=3, decimal_places=1)
    horsepower = models.PositiveIntegerField()
    cylinders = models.PositiveIntegerField()
    torque = models.PositiveIntegerField()
    top_speed = models.PositiveIntegerField()
    kph_from_zero_to_hundred = models.DecimalField(
        max_digits=4, decimal_places=1
    )
    price = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
    )
    model_asset_path = models.CharField()
    image_asset_path = models.CharField()

    def __str__(self):
        return f"{self.make} {self.model} ({self.year})"
