from django.test import TestCase
from ...models.user import CustomUser
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError


class CustomUserManagerTest(TestCase):

    def test_create_user(self):
        user = CustomUser.objects.create_user(
            username="test",
            email="test@test.com",
            first_name="first",
            last_name="last",
            password="password",
        )

        self.assertEqual(str(user), "test")
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.is_active)

    def test_create_user_invalid_email_field(self):
        user = CustomUser(
            username="testuser",
            email="invalid-email",
            first_name="John",
            last_name="Doe",
            password="password123",
        )

        with self.assertRaises(ValidationError):
            user.full_clean()

    def test_create_user_missing_email_field(self):
        with self.assertRaises(ValueError):
            CustomUser.objects.create_user(
                username="test",
                email="",
                first_name="123",
                last_name="last",
                password="password",
            )

    def test_create_superuser(self):
        user = CustomUser.objects.create_superuser(
            username="test",
            email="test@test.com",
            first_name="first",
            last_name="last",
            password="password",
        )

        self.assertEqual(str(user), "test")
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_active)

    def test_username_duplicate(self):
        CustomUser.objects.create_user(
            username="test",
            email="test1@test.com",
            first_name="first",
            last_name="last",
            password="password",
        )

        with self.assertRaises(IntegrityError):
            CustomUser.objects.create_user(
                username="test",
                email="test2@test.com",
                first_name="first",
                last_name="last",
                password="password",
            )

    def test_email_duplicate(self):
        CustomUser.objects.create_user(
            username="test1",
            email="test@test.com",
            first_name="first",
            last_name="last",
            password="password",
        )

        with self.assertRaises(IntegrityError):
            CustomUser.objects.create_user(
                username="test2",
                email="test@test.com",
                first_name="first",
                last_name="last",
                password="password",
            )

    def test_hashed_password(self):
        user = CustomUser.objects.create_user(
            username="test1",
            email="test@test.com",
            first_name="first",
            last_name="last",
            password="password",
        )

        self.assertNotEqual(user.password, "password")
