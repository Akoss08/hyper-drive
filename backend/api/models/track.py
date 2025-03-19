from django.db import models


class Track(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=50)
    distance_km = models.DecimalField(max_digits=4, decimal_places=2)
    avg_lap_time_minute = models.DecimalField(max_digits=4, decimal_places=2)
    difficulty = models.CharField(max_length=20)
    model_asset_path = models.CharField()

    def __str__(self):
        return f"{self.name} - {self.location}"
