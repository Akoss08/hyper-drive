from django.db import models
from .user import CustomUser
from .car import Car
from .track import Track
from django.core.exceptions import ValidationError


class Booking(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="bookings"
    )
    car = models.ForeignKey(Car, on_delete=models.CASCADE, null=False)
    track = models.ForeignKey(Track, on_delete=models.CASCADE, null=False)
    booked_date = models.DateTimeField()

    class Meta:
        unique_together = ("user", "booked_date")

    def clean(self):
        booked_day = self.booked_date.date()

        existing_bookings = Booking.objects.filter(
            user=self.user, booked_date__date=booked_day
        ).exclude(id=self.id)

        if existing_bookings.exists():
            raise ValidationError(
                "You cannot book multiple times on the same day."
            )

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"""{self.user.username} ({self.booked_date}):
        {self.car.make}, {self.car.model} - {self.track.location}"""
