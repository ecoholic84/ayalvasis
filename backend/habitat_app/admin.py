from django.contrib import admin
from .models import Habitat

@admin.register(Habitat)
class HabitatAdmin(admin.ModelAdmin):
    list_display = ['name', 'shape', 'crew_size', 'mission_type', 'created_at']
    list_filter = ['shape', 'mission_type', 'created_at']
    search_fields = ['name', 'description']
