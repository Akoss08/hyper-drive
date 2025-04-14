from ..models import Car
from rest_framework import generics
from ..serializers.car_serializer import CarSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.exceptions import PermissionDenied


class CarListCreate(generics.ListCreateAPIView):
    queryset = Car.objects.all().order_by("id")
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        if not self.request.user.is_staff:
            raise PermissionDenied("You must be an admin to create a new car.")
        serializer.save()


class CarGetDetails(generics.RetrieveAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [AllowAny]
