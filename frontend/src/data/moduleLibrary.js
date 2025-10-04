/**
 * NASA-based module library with sizing constraints
 * Based on NASA-STD-3001 Human Systems Integration Requirements
 */

export const MODULE_TYPES = {
  LIFE_SUPPORT: {
    id: 'life_support',
    name: 'Environmental Control & Life Support (ECLSS)',
    color: '#4caf50',
    description: 'Air revitalization, water recovery, temperature control',
    minVolumePerCrew: 2.0, // m³ per crew member
    baseVolume: 8.0, // m³ minimum
    priority: 'critical',
    adjacencyPreferences: ['hygiene', 'stowage'],
    icon: '🌬️',
  },
  HYGIENE: {
    id: 'hygiene',
    name: 'Hygiene & Waste Management',
    color: '#9c27b0',
    description: 'Toilet, shower, waste collection',
    minVolumePerCrew: 1.5,
    baseVolume: 4.0,
    priority: 'critical',
    adjacencyPreferences: ['life_support'],
    adjacencyRestrictions: ['food_prep', 'sleeping'],
    icon: '🚿',
  },
  SLEEPING: {
    id: 'sleeping',
    name: 'Crew Quarters',
    color: '#2196f3',
    description: 'Sleep stations, privacy, rest areas',
    minVolumePerCrew: 2.5, // NASA standard: ~2.5 m³ per crew
    baseVolume: 6.0,
    priority: 'critical',
    adjacencyPreferences: ['hygiene'],
    adjacencyRestrictions: ['exercise', 'maintenance'],
    icon: '🛏️',
  },
  FOOD_PREP: {
    id: 'food_prep',
    name: 'Galley & Food Preparation',
    color: '#ff9800',
    description: 'Food storage, heating, meal prep, dining',
    minVolumePerCrew: 1.0,
    baseVolume: 5.0,
    priority: 'critical',
    adjacencyPreferences: ['stowage'],
    adjacencyRestrictions: ['hygiene', 'maintenance'],
    icon: '🍽️',
  },
  EXERCISE: {
    id: 'exercise',
    name: 'Exercise & Fitness',
    color: '#f44336',
    description: 'Treadmill, resistance equipment, cardiovascular',
    minVolumePerCrew: 1.5,
    baseVolume: 8.0, // Needs space for equipment
    priority: 'high',
    adjacencyRestrictions: ['sleeping', 'medical'],
    icon: '🏃',
  },
  MEDICAL: {
    id: 'medical',
    name: 'Medical Bay',
    color: '#e91e63',
    description: 'First aid, medical equipment, examination',
    minVolumePerCrew: 0.8,
    baseVolume: 6.0,
    priority: 'high',
    adjacencyPreferences: ['sleeping'],
    adjacencyRestrictions: ['exercise', 'maintenance'],
    icon: '⚕️',
  },
  STOWAGE: {
    id: 'stowage',
    name: 'Storage & Logistics',
    color: '#607d8b',
    description: 'Equipment, supplies, spare parts',
    minVolumePerCrew: 2.0,
    baseVolume: 10.0,
    priority: 'high',
    adjacencyPreferences: ['food_prep', 'maintenance'],
    icon: '📦',
  },
  MAINTENANCE: {
    id: 'maintenance',
    name: 'Maintenance & Repair',
    color: '#ff5722',
    description: 'Tools, workbench, repair activities',
    minVolumePerCrew: 0.5,
    baseVolume: 4.0,
    priority: 'medium',
    adjacencyPreferences: ['stowage'],
    adjacencyRestrictions: ['sleeping', 'medical', 'food_prep'],
    icon: '🔧',
  },
  RECREATION: {
    id: 'recreation',
    name: 'Recreation & Crew Interaction',
    color: '#00bcd4',
    description: 'Social space, entertainment, communication',
    minVolumePerCrew: 1.0,
    baseVolume: 6.0,
    priority: 'medium',
    adjacencyPreferences: ['sleeping'],
    icon: '🎮',
  },
  RESEARCH: {
    id: 'research',
    name: 'Research & Science',
    color: '#3f51b5',
    description: 'Laboratory, experiments, data analysis',
    minVolumePerCrew: 1.5,
    baseVolume: 8.0,
    priority: 'medium',
    adjacencyRestrictions: ['hygiene', 'exercise'],
    icon: '🔬',
  },
  AIRLOCK: {
    id: 'airlock',
    name: 'Airlock & EVA Prep',
    color: '#795548',
    description: 'Suit donning, depressurization, egress',
    minVolumePerCrew: 0.0, // Fixed size
    baseVolume: 10.0,
    priority: 'high',
    adjacencyPreferences: ['maintenance'],
    icon: '🚪',
  },
  COMMAND: {
    id: 'command',
    name: 'Command & Control',
    color: '#ffc107',
    description: 'Navigation, communications, mission control',
    minVolumePerCrew: 0.5,
    baseVolume: 6.0,
    priority: 'high',
    adjacencyPreferences: ['research'],
    icon: '🖥️',
  },
};

/**
 * Calculate minimum required volume for a module type
 */
export function calculateMinModuleVolume(moduleType, crewSize) {
  const module = MODULE_TYPES[moduleType.toUpperCase()];
  if (!module) return 4.0; // Default minimum
  
  return module.baseVolume + (module.minVolumePerCrew * crewSize);
}

/**
 * Get recommended dimensions for a module
 */
export function getRecommendedDimensions(moduleType, crewSize) {
  const minVolume = calculateMinModuleVolume(moduleType, crewSize);
  
  // Calculate cube root for roughly cubic dimensions
  const side = Math.pow(minVolume, 1/3);
  
  return {
    width: Math.ceil(side * 10) / 10,
    height: Math.ceil(side * 10) / 10,
    depth: Math.ceil(side * 10) / 10,
  };
}

/**
 * Validate module placement
 */
export function validateModulePlacement(module, adjacentModules, crewSize) {
  const moduleInfo = MODULE_TYPES[module.type.toUpperCase()];
  if (!moduleInfo) return { valid: true, warnings: [], errors: [] };
  
  const warnings = [];
  const errors = [];
  
  // Check minimum volume
  const minVolume = calculateMinModuleVolume(module.type, crewSize);
  const actualVolume = module.size[0] * module.size[1] * module.size[2];
  
  if (actualVolume < minVolume) {
    errors.push(`Module too small: ${actualVolume.toFixed(1)} m³ (minimum: ${minVolume.toFixed(1)} m³)`);
  }
  
  // Check adjacency restrictions
  if (moduleInfo.adjacencyRestrictions) {
    adjacentModules.forEach(adj => {
      if (moduleInfo.adjacencyRestrictions.includes(adj.type)) {
        warnings.push(`Not recommended: ${moduleInfo.name} adjacent to ${MODULE_TYPES[adj.type.toUpperCase()].name}`);
      }
    });
  }
  
  return {
    valid: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * Get all critical modules (must-have)
 */
export function getCriticalModules() {
  return Object.values(MODULE_TYPES).filter(m => m.priority === 'critical');
}

/**
 * Calculate total recommended volume for all critical modules
 */
export function calculateMinimumHabitatVolume(crewSize, missionDuration) {
  const criticalModules = getCriticalModules();
  let totalVolume = 0;
  
  criticalModules.forEach(module => {
    totalVolume += calculateMinModuleVolume(module.id, crewSize);
  });
  
  // Add buffer for circulation and flexibility (20%)
  totalVolume *= 1.2;
  
  // Add mission duration factor (longer missions need more storage)
  if (missionDuration > 90) {
    totalVolume += (missionDuration / 30) * 2; // +2 m³ per month
  }
  
  return totalVolume;
}
