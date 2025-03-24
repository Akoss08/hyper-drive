from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models import CustomUser


class UserIntegrationTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "username": "testuser",
            "first_name": "Test",
            "last_name": "User",
            "email": "testuser@gmail.com",
            "password": "pass",
        }
        self.user = CustomUser.objects.create_user(**self.user_data)

    def test_register_user(self):
        url = reverse("register")
        response = self.client.post(
            url,
            {
                "username": "testuser2",
                "first_name": "Test",
                "last_name": "User",
                "email": "testuser2@gmail.com",
                "password": "pass",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CustomUser.objects.count(), 2)
        self.assertEqual(response.data["username"], "testuser2")

    def test_register_user_username_duplicate(self):
        url = reverse("register")
        response = self.client.post(
            url,
            {
                "username": "testuser",
                "first_name": "Test",
                "last_name": "User",
                "email": "testuser2@gmail.com",
                "password": "pass",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_user_email_duplicate(self):
        url = reverse("register")
        response = self.client.post(
            url,
            {
                "username": "testuser2",
                "first_name": "Test",
                "last_name": "User",
                "email": "testuser@gmail.com",
                "password": "pass",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_user(self):
        url = reverse("get_token")
        response = self.client.post(
            url,
            {
                "username": self.user.username,
                "password": self.user_data["password"],
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("ey", response.data["access"])

    def test_login_user_bad_credentials(self):
        url = reverse("get_token")
        response = self.client.post(
            url,
            {
                "username": "someuser",
                "password": self.user_data["password"],
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

