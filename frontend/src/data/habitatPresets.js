/**
 * Space Habitat Presets
 * Based on real space station designs and concepts from NASA, ESA, and other agencies
 */

export const HABITAT_PRESETS = {
  ISS_INSPIRED: {
    id: 'iss_inspired',
    name: 'ISS-Inspired Station',
    description: 'Modular design inspired by the International Space Station',
    mission_type: 'earth_orbit',
    crew_size: 6,
    mission_duration: 180,
    shape: 'cylinder',
    dimension_x: 12.0,
    dimension_y: 2.0,
    dimension_z: 12.0,
    thumbnail: '🛰️',
    modules: [
      { type: 'COMMAND', position: [0, 0, 0], size: [3, 2, 3] },
      { type: 'LIFE_SUPPORT', position: [-4, 0, 0], size: [3, 2, 3] },
      { type: 'SLEEPING', position: [4, 0, 0], size: [4, 2, 3] },
      { type: 'FOOD_PREP', position: [0, 0, 4], size: [3, 2, 2.5] },
      { type: 'HYGIENE', position: [0, 0, -4], size: [2.5, 2, 2.5] },
      { type: 'EXERCISE', position: [-4, 0, 4], size: [3, 2, 3] },
      { type: 'RESEARCH', position: [4, 0, 4], size: [3.5, 2, 3] },
      { type: 'STOWAGE', position: [-4, 0, -4], size: [3, 2, 3] },
    ]
  },

  LUNAR_GATEWAY: {
    id: 'lunar_gateway',
    name: 'Lunar Gateway',
    description: 'NASA\'s planned lunar orbit station for Artemis missions',
    mission_type: 'moon',
    crew_size: 4,
    mission_duration: 90,
    shape: 'cylinder',
    dimension_x: 10.0,
    dimension_y: 2.0,
    dimension_z: 10.0,
    thumbnail: '🌙',
    modules: [
      { type: 'COMMAND', position: [0, 0, 0], size: [3, 2, 3] },
      { type: 'LIFE_SUPPORT', position: [-3.5, 0, 0], size: [2.5, 2, 2.5] },
      { type: 'SLEEPING', position: [3.5, 0, 0], size: [3, 2, 2.5] },
      { type: 'FOOD_PREP', position: [0, 0, 3.5], size: [2.5, 2, 2] },
      { type: 'HYGIENE', position: [0, 0, -3.5], size: [2, 2, 2] },
      { type: 'AIRLOCK', position: [0, 0, 0], size: [2.5, 2, 2.5] },
      { type: 'RESEARCH', position: [-3, 0, 3], size: [2.5, 2, 2.5] },
    ]
  },

  MARS_BASE: {
    id: 'mars_base',
    name: 'Mars Surface Base',
    description: 'Surface habitat for long-duration Mars missions',
    mission_type: 'mars',
    crew_size: 6,
    mission_duration: 500,
    shape: 'dome',
    dimension_x: 20.0,
    dimension_y: 2.0,
    dimension_z: 20.0,
    thumbnail: '🔴',
    modules: [
      { type: 'COMMAND', position: [0, 0, 0], size: [4, 2, 4] },
      { type: 'LIFE_SUPPORT', position: [-6, 0, 0], size: [3.5, 2, 3.5] },
      { type: 'SLEEPING', position: [6, 0, 0], size: [5, 2, 3] },
      { type: 'FOOD_PREP', position: [0, 0, 6], size: [4, 2, 3] },
      { type: 'HYGIENE', position: [0, 0, -6], size: [3, 2, 3] },
      { type: 'EXERCISE', position: [-6, 0, 6], size: [3.5, 2, 3.5] },
      { type: 'MEDICAL', position: [6, 0, 6], size: [3.5, 2, 3] },
      { type: 'RESEARCH', position: [-6, 0, -6], size: [4, 2, 3.5] },
      { type: 'STOWAGE', position: [6, 0, -6], size: [4, 2, 3.5] },
      { type: 'AIRLOCK', position: [0, 0, -9], size: [3, 2, 3] },
      { type: 'MAINTENANCE', position: [-9, 0, 0], size: [3, 2, 2.5] },
    ]
  },

  DEEP_SPACE: {
    id: 'deep_space',
    name: 'Deep Space Cruiser',
    description: 'Long-duration interplanetary spacecraft',
    mission_type: 'deep_space',
    crew_size: 8,
    mission_duration: 1000,
    shape: 'cylinder',
    dimension_x: 15.0,
    dimension_y: 2.0,
    dimension_z: 15.0,
    thumbnail: '🚀',
    modules: [
      { type: 'COMMAND', position: [0, 0, 0], size: [4, 2, 4] },
      { type: 'LIFE_SUPPORT', position: [-5, 0, 0], size: [3.5, 2, 3.5] },
      { type: 'LIFE_SUPPORT', position: [5, 0, 0], size: [3.5, 2, 3.5] },
      { type: 'SLEEPING', position: [0, 0, 5], size: [6, 2, 3] },
      { type: 'SLEEPING', position: [0, 0, -5], size: [6, 2, 3] },
      { type: 'FOOD_PREP', position: [0, 0, 3], size: [4, 2, 3] },
      { type: 'HYGIENE', position: [-5, 0, 5], size: [2.5, 2, 2.5] },
      { type: 'HYGIENE', position: [5, 0, 5], size: [2.5, 2, 2.5] },
      { type: 'EXERCISE', position: [-5, 0, -5], size: [3.5, 2, 3.5] },
      { type: 'MEDICAL', position: [5, 0, -5], size: [3.5, 2, 3] },
      { type: 'RESEARCH', position: [0, 0, -3], size: [4, 2, 3] },
      { type: 'STOWAGE', position: [3, 0, 0], size: [5, 2, 3.5] },
      { type: 'RECREATION', position: [-3, 0, 0], size: [5, 2, 4] },
      { type: 'MAINTENANCE', position: [0, 0, 7], size: [3, 2, 3] },
    ]
  },

  MINIMAL_STATION: {
    id: 'minimal_station',
    name: 'Minimal Research Station',
    description: 'Small crew station for short missions',
    mission_type: 'earth_orbit',
    crew_size: 2,
    mission_duration: 30,
    shape: 'cylinder',
    dimension_x: 6.0,
    dimension_y: 2.0,
    dimension_z: 6.0,
    thumbnail: '🔬',
    modules: [
      { type: 'COMMAND', position: [0, 0, 0], size: [2.5, 2, 2.5] },
      { type: 'LIFE_SUPPORT', position: [-2, 0, 0], size: [2, 2, 2] },
      { type: 'SLEEPING', position: [2, 0, 0], size: [2.5, 2, 2] },
      { type: 'FOOD_PREP', position: [0, 0, 2], size: [2, 2, 2] },
      { type: 'HYGIENE', position: [0, 0, -2], size: [1.5, 2, 1.5] },
      { type: 'RESEARCH', position: [0, 0, -3], size: [2.5, 2, 2.5] },
    ]
  },

  ORBITAL_HOTEL: {
    id: 'orbital_hotel',
    name: 'Orbital Hotel',
    description: 'Commercial space tourism facility',
    mission_type: 'earth_orbit',
    crew_size: 12,
    mission_duration: 14,
    shape: 'torus',
    dimension_x: 18.0,
    dimension_y: 2.0,
    dimension_z: 18.0,
    thumbnail: '🏨',
    modules: [
      { type: 'COMMAND', position: [0, 0, 0], size: [3, 2, 3] },
      { type: 'LIFE_SUPPORT', position: [6, 0, 0], size: [3, 2, 3] },
      { type: 'SLEEPING', position: [4.5, 0, 4.5], size: [4, 2, 3] },
      { type: 'SLEEPING', position: [-4.5, 0, 4.5], size: [4, 2, 3] },
      { type: 'SLEEPING', position: [4.5, 0, -4.5], size: [4, 2, 3] },
      { type: 'SLEEPING', position: [-4.5, 0, -4.5], size: [4, 2, 3] },
      { type: 'FOOD_PREP', position: [0, 0, 6], size: [4, 2, 3] },
      { type: 'HYGIENE', position: [-6, 0, 0], size: [2.5, 2, 2.5] },
      { type: 'RECREATION', position: [0, 0, -6], size: [5, 2, 4] },
      { type: 'EXERCISE', position: [6, 0, 6], size: [3, 2, 3] },
      { type: 'MEDICAL', position: [-6, 0, -6], size: [2.5, 2, 2.5] },
    ]
  },

  ASTEROID_MINING: {
    id: 'asteroid_mining',
    name: 'Asteroid Mining Outpost',
    description: 'Industrial facility for asteroid resource extraction',
    mission_type: 'deep_space',
    crew_size: 10,
    mission_duration: 365,
    shape: 'cube',
    dimension_x: 16.0,
    dimension_y: 2.0,
    dimension_z: 16.0,
    thumbnail: '⛏️',
    modules: [
      { type: 'COMMAND', position: [0, 0, 0], size: [4, 2, 4] },
      { type: 'LIFE_SUPPORT', position: [-5, 0, 0], size: [3.5, 2, 3.5] },
      { type: 'LIFE_SUPPORT', position: [5, 0, 0], size: [3.5, 2, 3.5] },
      { type: 'SLEEPING', position: [0, 0, 5], size: [5, 2, 3] },
      { type: 'FOOD_PREP', position: [0, 0, -5], size: [3.5, 2, 3] },
      { type: 'HYGIENE', position: [-5, 0, 5], size: [2.5, 2, 2.5] },
      { type: 'EXERCISE', position: [5, 0, 5], size: [3, 2, 3] },
      { type: 'MEDICAL', position: [-5, 0, -5], size: [3, 2, 2.5] },
      { type: 'STOWAGE', position: [5, 0, -5], size: [4, 2, 3.5] },
      { type: 'MAINTENANCE', position: [3, 0, 0], size: [5, 2, 5] },
      { type: 'AIRLOCK', position: [0, 0, -7], size: [3, 2, 3] },
      { type: 'AIRLOCK', position: [7, 0, 0], size: [3, 2, 3] },
      { type: 'STOWAGE', position: [-7, 0, 0], size: [4, 2, 4] },
    ]
  },

  BIOSPHERE: {
    id: 'biosphere',
    name: 'Closed Biosphere',
    description: 'Self-sustaining ecological habitat',
    mission_type: 'mars',
    crew_size: 8,
    mission_duration: 730,
    shape: 'sphere',
    dimension_x: 22.0,
    dimension_y: 2.0,
    dimension_z: 22.0,
    thumbnail: '🌿',
    modules: [
      { type: 'COMMAND', position: [0, 0, 0], size: [3.5, 2, 3.5] },
      { type: 'LIFE_SUPPORT', position: [0, 0, 8], size: [5, 2, 5] },
      { type: 'SLEEPING', position: [6, 0, 0], size: [4, 2, 3] },
      { type: 'SLEEPING', position: [-6, 0, 0], size: [4, 2, 3] },
      { type: 'FOOD_PREP', position: [0, 0, 6], size: [4, 2, 3] },
      { type: 'HYGIENE', position: [0, 0, -6], size: [3, 2, 3] },
      { type: 'EXERCISE', position: [6, 0, 6], size: [3.5, 2, 3] },
      { type: 'MEDICAL', position: [-6, 0, 6], size: [3.5, 2, 3] },
      { type: 'RESEARCH', position: [6, 0, -6], size: [4, 2, 3.5] },
      { type: 'RESEARCH', position: [-6, 0, -6], size: [4, 2, 3.5] },
      { type: 'STOWAGE', position: [3, 0, 3], size: [6, 2, 6] },
      { type: 'RECREATION', position: [0, 0, -8], size: [5, 2, 4] },
    ]
  },

  AIRSTREAM_HABITAT: {
    id: 'airstream_habitat',
    name: 'Airstream Habitat',
    description: 'Compact capsule-shaped mobile habitat inspired by travel trailers',
    mission_type: 'earth_orbit',
    crew_size: 4,
    mission_duration: 60,
    shape: 'capsule',
    dimension_x: 8.0,
    dimension_y: 2.0,
    dimension_z: 8.0,
    thumbnail: '🚐',
    modules: [
      { type: 'COMMAND', position: [0, 0, 0], size: [3, 2, 3] },
      { type: 'LIFE_SUPPORT', position: [-2.5, 0, 0], size: [2.5, 2, 2.5] },
      { type: 'SLEEPING', position: [2.5, 0, 0], size: [3, 2, 2.5] },
      { type: 'FOOD_PREP', position: [0, 0, 2.5], size: [2.5, 2, 2] },
      { type: 'HYGIENE', position: [0, 0, -2.5], size: [2, 2, 2] },
      { type: 'STOWAGE', position: [0, 0, 3.5], size: [3.5, 2, 3] },
      { type: 'RECREATION', position: [0, 0, -3.5], size: [3, 2, 3] },
    ]
  }
};

/**
 * Get preset by ID
 */
export function getPresetById(presetId) {
  return HABITAT_PRESETS[presetId.toUpperCase()];
}

/**
 * Get all presets as array
 */
export function getAllPresets() {
  return Object.values(HABITAT_PRESETS);
}

/**
 * Get presets filtered by mission type
 */
export function getPresetsByMissionType(missionType) {
  return Object.values(HABITAT_PRESETS).filter(
    preset => preset.mission_type === missionType
  );
}

/**
 * Get presets filtered by crew size
 */
export function getPresetsByCrewSize(minCrew, maxCrew) {
  return Object.values(HABITAT_PRESETS).filter(
    preset => preset.crew_size >= minCrew && preset.crew_size <= maxCrew
  );
}

/**
 * Load preset into habitat configuration
 */
export function loadPreset(presetId) {
  const preset = getPresetById(presetId);
  if (!preset) return null;

  // Generate unique IDs for modules
  const modulesWithIds = preset.modules.map((module, index) => ({
    ...module,
    id: Date.now() + index,
    rotation: [0, 0, 0]
  }));

  return {
    name: preset.name,
    shape: preset.shape,
    crew_size: preset.crew_size,
    mission_duration: preset.mission_duration,
    mission_type: preset.mission_type,
    dimension_x: preset.dimension_x,
    dimension_y: preset.dimension_y,
    dimension_z: preset.dimension_z,
    layout_data: {
      modules: modulesWithIds
    }
  };
}
