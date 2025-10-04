from django.db import models
from django.core.validators import MinValueValidator


class Habitat(models.Model):
    """
    Model representing a space habitat layout design.
    """
    SHAPE_CHOICES = [
        ('cylinder', 'Cylinder'),
        ('sphere', 'Sphere'),
        ('dome', 'Dome'),
        ('torus', 'Torus'),
        ('cube', 'Cube'),
    ]
    
    MISSION_CHOICES = [
        ('moon', 'Moon'),
        ('mars', 'Mars'),
        ('orbit', 'Orbit'),
    ]
    
    # Basic metadata
    name = models.CharField(max_length=200, default='Untitled Habitat')
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Habitat configuration
    shape = models.CharField(max_length=20, choices=SHAPE_CHOICES, default='cylinder')
    crew_size = models.IntegerField(validators=[MinValueValidator(1)], default=4)
    mission_duration = models.IntegerField(
        help_text='Mission duration in days',
        validators=[MinValueValidator(1)],
        default=30
    )
    mission_type = models.CharField(max_length=20, choices=MISSION_CHOICES, default='moon')
    
    # Dimensions (in meters)
    dimension_x = models.FloatField(validators=[MinValueValidator(0.1)], default=10.0)
    dimension_y = models.FloatField(validators=[MinValueValidator(0.1)], default=10.0)
    dimension_z = models.FloatField(validators=[MinValueValidator(0.1)], default=10.0)
    
    # Layout data stored as JSON
    layout_data = models.JSONField(
        default=dict,
        blank=True,
        help_text='JSON data containing module positions and configurations'
    )
    
    # Calculated metrics
    total_volume = models.FloatField(default=0.0, help_text='Total habitat volume in cubic meters')
    usable_space = models.FloatField(default=0.0, help_text='Usable space percentage')
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.shape} - {self.mission_type})"
    
    def calculate_volume(self):
        """Calculate total volume based on shape and dimensions."""
        import math
        
        if self.shape == 'cylinder':
            radius = self.dimension_x / 2
            height = self.dimension_y
            return math.pi * radius ** 2 * height
        elif self.shape == 'sphere':
            radius = self.dimension_x / 2
            return (4/3) * math.pi * radius ** 3
        elif self.shape == 'dome':
            radius = self.dimension_x / 2
            height = self.dimension_y
            return (2/3) * math.pi * radius ** 2 * height
        elif self.shape == 'torus':
            major_radius = self.dimension_x / 2
            minor_radius = self.dimension_y / 2
            return 2 * math.pi ** 2 * major_radius * minor_radius ** 2
        else:  # cube
            return self.dimension_x * self.dimension_y * self.dimension_z
    
    def save(self, *args, **kwargs):
        """Override save to auto-calculate volume."""
        self.total_volume = self.calculate_volume()
        super().save(*args, **kwargs)
