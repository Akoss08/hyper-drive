from django.urls import path
from ..views import booking_view

urlpatterns = [
    path("", booking_view.BookingListCreate.as_view(), name="booking-list")
]
