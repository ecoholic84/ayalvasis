import React from 'react';
import { MODULE_TYPES, validateModulePlacement } from '../data/moduleLibrary';
import './ModuleManager.css';

export default function ModuleManager({ modules, onSelectModule, onDeleteModule, selectedModuleId, crewSize }) {
  const totalModuleVolume = modules.reduce((sum, m) => sum + (m.size[0] * m.size[1] * m.size[2]), 0);

  const getModuleValidation = (module) => {
    // Find adjacent modules (simplified - within 3m distance)
    const adjacentModules = modules.filter(other => {
      if (other.id === module.id) return false;
      const distance = Math.sqrt(
        Math.pow(module.position[0] - other.position[0], 2) +
        Math.pow(module.position[1] - other.position[1], 2) +
        Math.pow(module.position[2] - other.position[2], 2)
      );
      return distance < 3;
    });

    return validateModulePlacement(module, adjacentModules, crewSize);
  };

  const criticalModules = ['life_support', 'hygiene', 'sleeping', 'food_prep'];
  const missingCritical = criticalModules.filter(
    type => !modules.some(m => m.type === type)
  );

  return (
    <div className="module-manager">
      <div className="manager-header">
        <h3>🏗️ Placed Modules</h3>
        <div className="module-count">{modules.length} modules</div>
      </div>

      {missingCritical.length > 0 && (
        <div className="critical-warning">
          ⚠️ Missing critical modules: {missingCritical.map(t => MODULE_TYPES[t.toUpperCase()].name).join(', ')}
        </div>
      )}

      <div className="module-stats">
        <div className="stat-item">
          <span>Total Module Volume</span>
          <span className="stat-value">{totalModuleVolume.toFixed(2)} m³</span>
        </div>
      </div>

      <div className="module-list">
        {modules.length === 0 ? (
          <div className="empty-state">
            <p>No modules placed yet</p>
            <p className="hint">Click "Add Module" to start</p>
          </div>
        ) : (
          modules.map(module => {
            const moduleInfo = MODULE_TYPES[module.type.toUpperCase()];
            const validation = getModuleValidation(module);
            const volume = module.size[0] * module.size[1] * module.size[2];

            return (
              <div
                key={module.id}
                className={`module-item ${selectedModuleId === module.id ? 'selected' : ''} ${!validation.valid ? 'invalid' : ''}`}
                onClick={() => onSelectModule(module.id)}
              >
                <div className="module-item-header">
                  <span className="module-item-icon">{moduleInfo.icon}</span>
                  <span className="module-item-name">{moduleInfo.name}</span>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteModule(module.id);
                    }}
                  >
                    🗑️
                  </button>
                </div>

                <div className="module-item-details">
                  <div className="detail-row">
                    <span>Size:</span>
                    <span>{module.size[0]} × {module.size[1]} × {module.size[2]} m</span>
                  </div>
                  <div className="detail-row">
                    <span>Volume:</span>
                    <span>{volume.toFixed(2)} m³</span>
                  </div>
                  <div className="detail-row">
                    <span>Position:</span>
                    <span>
                      ({module.position[0].toFixed(1)}, {module.position[1].toFixed(1)}, {module.position[2].toFixed(1)})
                    </span>
                  </div>
                </div>

                {validation.errors.length > 0 && (
                  <div className="validation-errors">
                    {validation.errors.map((err, i) => (
                      <div key={i} className="error-msg">❌ {err}</div>
                    ))}
                  </div>
                )}

                {validation.warnings.length > 0 && (
                  <div className="validation-warnings">
                    {validation.warnings.map((warn, i) => (
                      <div key={i} className="warning-msg">⚠️ {warn}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
