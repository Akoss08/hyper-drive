from rest_framework import serializers
from ..models import Car


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = [
            "id",
            "make",
            "model",
            "year",
            "engine_size",
            "horsepower",
            "cylinders",
            "torque",
            "top_speed",
            "kph_from_zero_to_hundred",
            "price",
            "model_asset_path",
            "image_asset_path"
        ]
