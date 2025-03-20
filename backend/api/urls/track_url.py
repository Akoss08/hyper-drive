from django.urls import path
from ..views import track_view

urlpatterns = [
    path("", track_view.TrackListCreate.as_view(), name="track-list-create"),
    path(
        "<int:pk>/", track_view.TrackGetDetails.as_view(), name="track-detail"
    ),
]
