from django.urls import path
from ..views import user_view

urlpatterns = [
    path(
        "me/",
        user_view.CurrentUserGetUpdateView.as_view(),
        name="user-get-update",
    ),
    path(
        "me/delete/",
        user_view.CurrentUserDeleteView.as_view(),
        name="delete-user",
    ),
]
