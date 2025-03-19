from ..models import CustomUser
from rest_framework import generics
from ..serializers.user_serializer import CustomUserSerializer
from rest_framework.permissions import AllowAny


class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
