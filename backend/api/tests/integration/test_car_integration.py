from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models import CustomUser, Car


class CarIntegrationTest(TestCase):

    def setUp(self):
