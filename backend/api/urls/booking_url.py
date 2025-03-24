from django.urls import path
from ..views import booking_view

urlpatterns = [
    path("", booking_view.BookingListCreate.as_view(), name="booking_list"),
    path(
        "delete/<int:pk>/",
        booking_view.BookingDelete.as_view(),
        name="booking_delete",
    ),
    path(
        "update/<int:pk>/",
        booking_view.BookingUpdate.as_view(),
        name="booking_update",
    ),
]
