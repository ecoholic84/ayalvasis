from django.test import TestCase
from .models import Habitat


class HabitatModelTests(TestCase):
    def test_cylinder_volume_calculation(self):
        """Test volume calculation for cylinder shape."""
        habitat = Habitat.objects.create(
            name='Test Cylinder',
            shape='cylinder',
            dimension_x=4.0,  # diameter
            dimension_y=10.0,  # height
            crew_size=4
        )
        # Volume = π * r² * h = π * 2² * 10 ≈ 125.66
        self.assertAlmostEqual(habitat.total_volume, 125.66, places=1)
    
    def test_sphere_volume_calculation(self):
        """Test volume calculation for sphere shape."""
        habitat = Habitat.objects.create(
            name='Test Sphere',
            shape='sphere',
            dimension_x=6.0,  # diameter
            crew_size=4
        )
        # Volume = (4/3) * π * r³ = (4/3) * π * 3³ ≈ 113.10
        self.assertAlmostEqual(habitat.total_volume, 113.10, places=1)
