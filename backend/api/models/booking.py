from django.db import models
from .user import CustomUser


class Booking(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="bookings"
    )

    def __str__(self):
        return "something"
