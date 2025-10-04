from rest_framework import serializers
from .models import Habitat


class HabitatSerializer(serializers.ModelSerializer):
    """
    Serializer for Habitat model with all fields.
    """
    class Meta:
        model = Habitat
        fields = [
            'id',
            'name',
            'description',
            'created_at',
            'updated_at',
            'shape',
            'crew_size',
            'mission_duration',
            'mission_type',
            'dimension_x',
            'dimension_y',
            'dimension_z',
            'layout_data',
            'total_volume',
            'usable_space',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'total_volume']


class HabitatListSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer for listing habitats.
    """
    class Meta:
        model = Habitat
        fields = [
            'id',
            'name',
            'shape',
            'crew_size',
            'mission_type',
            'created_at',
            'total_volume',
        ]
