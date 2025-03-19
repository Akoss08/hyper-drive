from django.urls import path
from ..views import car_view

urlpatterns = [
    path("", car_view.CarListCreate.as_view(), name="car-list")
]
