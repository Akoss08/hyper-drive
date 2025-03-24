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

    def test_get_login_user_data(self):
        login_url = reverse("get_token")
        profile_url = reverse("user_get_update")

        login_response = self.client.post(
            login_url,
            {
                "username": self.user.username,
                "password": self.user_data["password"],
            },
            format="json",
        )

        profile_response = self.client.get(
            profile_url,
            HTTP_AUTHORIZATION=f"Bearer {login_response.data["access"]}",
        )

        self.assertEqual(profile_response.status_code, status.HTTP_200_OK)
        self.assertEqual(profile_response.data["username"], "testuser")

    def test_get_login_user_data_no_token_provided(self):
        profile_url = reverse("user_get_update")

        profile_response = self.client.get(profile_url)

        self.assertEqual(
            profile_response.status_code, status.HTTP_401_UNAUTHORIZED
        )

    def test_update_login_user(self):
        login_url = reverse("get_token")
        profile_url = reverse("user_get_update")

        login_response = self.client.post(
            login_url,
            {
                "username": self.user.username,
                "password": self.user_data["password"],
            },
            format="json",
        )

        profile_response = self.client.patch(
            profile_url,
            {"username": "changed"},
            HTTP_AUTHORIZATION=f"Bearer {login_response.data["access"]}",
        )

        self.assertEqual(profile_response.status_code, status.HTTP_200_OK)
        self.assertEqual(profile_response.data["username"], "changed")

    def test_delete_user(self):
        login_url = reverse("get_token")
        profile_url = reverse("delete_user")

        login_response = self.client.post(
            login_url,
            {
                "username": self.user.username,
                "password": self.user_data["password"],
            },
            format="json",
        )

        profile_response = self.client.delete(
            profile_url,
            HTTP_AUTHORIZATION=f"Bearer {login_response.data["access"]}",
        )

        self.assertEqual(
            profile_response.status_code, status.HTTP_204_NO_CONTENT
        )

    def test_delete_user_no_token_provided(self):
        profile_url = reverse("user_get_update")

        profile_response = self.client.delete(profile_url)

        self.assertEqual(
            profile_response.status_code, status.HTTP_401_UNAUTHORIZED
        )
