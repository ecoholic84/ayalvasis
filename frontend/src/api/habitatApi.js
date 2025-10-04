const API_BASE_URL = 'http://localhost:8000/api';

export const habitatApi = {
  // List all habitats
  async listHabitats() {
    const response = await fetch(`${API_BASE_URL}/habitats/`);
    if (!response.ok) throw new Error('Failed to fetch habitats');
    return response.json();
  },

  // Get a specific habitat
  async getHabitat(id) {
    const response = await fetch(`${API_BASE_URL}/habitats/${id}/`);
    if (!response.ok) throw new Error('Failed to fetch habitat');
    return response.json();
  },

  // Create a new habitat
  async createHabitat(data) {
    const response = await fetch(`${API_BASE_URL}/habitats/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create habitat');
    return response.json();
  },

  // Update a habitat
  async updateHabitat(id, data) {
    const response = await fetch(`${API_BASE_URL}/habitats/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update habitat');
    return response.json();
  },

  // Delete a habitat
  async deleteHabitat(id) {
    const response = await fetch(`${API_BASE_URL}/habitats/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete habitat');
  },

  // Get NASA presets
  async getPresets() {
    const response = await fetch(`${API_BASE_URL}/habitats/presets/`);
    if (!response.ok) throw new Error('Failed to fetch presets');
    return response.json();
  },

  // Validate a habitat layout
  async validateLayout(id) {
    const response = await fetch(`${API_BASE_URL}/habitats/${id}/validate_layout/`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to validate layout');
    return response.json();
  },
};
