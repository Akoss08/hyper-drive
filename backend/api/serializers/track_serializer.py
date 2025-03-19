from rest_framework import serializers
from ..models import Track


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = [
            "id",
            "name",
            "location",
            "distance_km",
            "avg_lap_time_minute",
            "difficulty",
            "model_asset_path",
        ]
