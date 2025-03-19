from django.urls import path
from ..views import track_view

urlpatterns = [
    path("", track_view.TrackListCreate.as_view(), name="track-list")
]
