from rest_framework import serializers
from ..models import Booking, Car, Track
from ..serializers.car_serializer import CarSerializer
from ..serializers.track_serializer import TrackSerializer


class BookingSerializer(serializers.ModelSerializer):
    car = serializers.PrimaryKeyRelatedField(queryset=Car.objects.all())
    track = serializers.PrimaryKeyRelatedField(queryset=Track.objects.all())

    car_details = CarSerializer(source="car", read_only=True)
    track_details = TrackSerializer(source="track", read_only=True)

    class Meta:
        model = Booking
        fields = [
            "id",
            "user",
            "car",
            "track",
            "booked_date",
            "car_details",
            "track_details",
        ]
        extra_kwargs = {"user": {"read_only": True}}
