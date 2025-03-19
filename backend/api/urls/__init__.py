from django.urls import path, include

urlpatterns = [
    path("car/", include("api.urls.car_url")),
    path("track/", include("api.urls.track_url")),
]
