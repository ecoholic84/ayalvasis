from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitatViewSet

router = DefaultRouter()
router.register(r'habitats', HabitatViewSet, basename='habitat')

urlpatterns = [
    path('', include(router.urls)),
]
