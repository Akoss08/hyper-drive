from django.contrib import admin
from .models import Car, Track


@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Car._meta.fields]


@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Track._meta.fields]
