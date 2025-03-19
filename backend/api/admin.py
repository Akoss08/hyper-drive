from django.contrib import admin
from .models import Car, Track, Booking


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Car._meta.fields]


@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Track._meta.fields]


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Booking._meta.fields]
