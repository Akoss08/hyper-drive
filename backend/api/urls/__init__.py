from django.urls import path, include

urlpatterns = [
    path("car/", include("api.urls.car_url")),
]
