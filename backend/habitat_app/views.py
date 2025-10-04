from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Habitat
from .serializers import HabitatSerializer, HabitatListSerializer


class HabitatViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Habitat objects.
    
    Provides CRUD operations:
    - GET /api/habitats/ - List all habitats
    - POST /api/habitats/ - Create new habitat
    - GET /api/habitats/{id}/ - Retrieve specific habitat
    - PUT /api/habitats/{id}/ - Update habitat
    - PATCH /api/habitats/{id}/ - Partial update
    - DELETE /api/habitats/{id}/ - Delete habitat
    """
    queryset = Habitat.objects.all()
    serializer_class = HabitatSerializer
    
    def get_serializer_class(self):
        """Use lightweight serializer for list view."""
        if self.action == 'list':
            return HabitatListSerializer
        return HabitatSerializer
    
    @action(detail=False, methods=['get'])
    def presets(self, request):
        """
        Return NASA preset habitat layouts.
        GET /api/habitats/presets/
        """
        presets = [
            {
                'name': 'NASA Artemis Base Camp',
                'shape': 'cylinder',
                'crew_size': 4,
                'mission_duration': 180,
                'mission_type': 'moon',
                'dimension_x': 8.0,
                'dimension_y': 6.0,
                'dimension_z': 8.0,
                'layout_data': {
                    'modules': [
                        {'type': 'life_support', 'position': [0, 0, 0], 'size': [2, 2, 2]},
                        {'type': 'sleeping', 'position': [3, 0, 0], 'size': [2, 2, 2]},
                        {'type': 'food_prep', 'position': [0, 0, 3], 'size': [2, 2, 2]},
                        {'type': 'hygiene', 'position': [3, 0, 3], 'size': [1.5, 2, 1.5]},
                    ]
                }
            },
            {
                'name': 'Mars Transit Habitat',
                'shape': 'cylinder',
                'crew_size': 6,
                'mission_duration': 270,
                'mission_type': 'mars',
                'dimension_x': 12.0,
                'dimension_y': 8.0,
                'dimension_z': 12.0,
                'layout_data': {
                    'modules': [
                        {'type': 'life_support', 'position': [0, 0, 0], 'size': [3, 2, 3]},
                        {'type': 'sleeping', 'position': [4, 0, 0], 'size': [3, 2, 3]},
                        {'type': 'exercise', 'position': [0, 0, 4], 'size': [2, 2, 2]},
                        {'type': 'medical', 'position': [3, 0, 4], 'size': [2, 2, 2]},
                    ]
                }
            },
            {
                'name': 'ISS Module',
                'shape': 'cylinder',
                'crew_size': 3,
                'mission_duration': 90,
                'mission_type': 'orbit',
                'dimension_x': 6.0,
                'dimension_y': 10.0,
                'dimension_z': 6.0,
                'layout_data': {
                    'modules': [
                        {'type': 'life_support', 'position': [0, 0, 0], 'size': [2, 2, 2]},
                        {'type': 'sleeping', 'position': [0, 3, 0], 'size': [2, 2, 2]},
                        {'type': 'stowage', 'position': [0, 6, 0], 'size': [2, 2, 2]},
                    ]
                }
            }
        ]
        return Response(presets)
    
    @action(detail=True, methods=['post'])
    def validate_layout(self, request, pk=None):
        """
        Validate habitat layout against NASA constraints.
        POST /api/habitats/{id}/validate_layout/
        """
        habitat = self.get_object()
        
        # Basic validation rules
        validation_results = {
            'valid': True,
            'warnings': [],
            'errors': [],
        }
        
        # Check minimum volume per crew member (15 m³ per person minimum)
        min_volume_per_crew = 15
        volume_per_crew = habitat.total_volume / habitat.crew_size
        
        if volume_per_crew < min_volume_per_crew:
            validation_results['valid'] = False
            validation_results['errors'].append(
                f'Insufficient volume per crew member: {volume_per_crew:.2f} m³ '
                f'(minimum: {min_volume_per_crew} m³)'
            )
        elif volume_per_crew < 20:
            validation_results['warnings'].append(
                f'Low volume per crew member: {volume_per_crew:.2f} m³ '
                f'(recommended: 20+ m³)'
            )
        
        # Check if layout has required modules
        layout_data = habitat.layout_data
        if layout_data and 'modules' in layout_data:
            module_types = [m.get('type') for m in layout_data['modules']]
            required_modules = ['life_support', 'sleeping', 'hygiene']
            
            for required in required_modules:
                if required not in module_types:
                    validation_results['warnings'].append(
                        f'Missing recommended module: {required}'
                    )
        
        return Response(validation_results)
