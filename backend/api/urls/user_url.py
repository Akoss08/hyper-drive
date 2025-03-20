from django.urls import path
from ..views import user_view

urlpatterns = [
    path("me/", user_view.GetCurrentUserView.as_view(), name="current-user"),
    path(
        "me/delete/",
        user_view.DeleteCurrentUserView.as_view(),
        name="delete-user",
    ),
]
