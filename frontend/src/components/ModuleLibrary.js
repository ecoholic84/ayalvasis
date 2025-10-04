import React, { useState } from 'react';
import { MODULE_TYPES, calculateMinModuleVolume, getRecommendedDimensions } from '../data/moduleLibrary';
import './ModuleLibrary.css';

export default function ModuleLibrary({ crewSize, onAddModule, onClose }) {
  const [selectedType, setSelectedType] = useState(null);
  const [customSize, setCustomSize] = useState({ width: 2, height: 2, depth: 2 });

  const handleSelectType = (typeKey) => {
    setSelectedType(typeKey);
    const recommended = getRecommendedDimensions(typeKey, crewSize);
    setCustomSize(recommended);
  };

  const handleAddModule = () => {
    if (!selectedType) return;

    const module = {
      id: Date.now(),
      type: selectedType,
      position: [0, 0, 0],
      size: [customSize.width, customSize.height, customSize.depth],
      rotation: [0, 0, 0],
    };

    onAddModule(module);
    onClose();
  };

  const moduleInfo = selectedType ? MODULE_TYPES[selectedType.toUpperCase()] : null;
  const minVolume = selectedType ? calculateMinModuleVolume(selectedType, crewSize) : 0;
  const currentVolume = customSize.width * customSize.height * customSize.depth;

  return (
    <div className="module-library-overlay">
      <div className="module-library">
        <div className="library-header">
          <h2>📦 Add Functional Module</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="library-content">
          <div className="module-grid">
            {Object.entries(MODULE_TYPES).map(([key, module]) => (
              <div
                key={key}
                className={`module-card ${selectedType === key ? 'selected' : ''} priority-${module.priority}`}
                onClick={() => handleSelectType(key)}
              >
                <div className="module-icon">{module.icon}</div>
                <div className="module-name">{module.name}</div>
                <div className="module-priority">{module.priority}</div>
              </div>
            ))}
          </div>

          {selectedType && (
            <div className="module-config">
              <h3>{moduleInfo.icon} {moduleInfo.name}</h3>
              <p className="module-description">{moduleInfo.description}</p>

              <div className="config-section">
                <h4>Size Configuration</h4>
                
                <div className="size-inputs">
                  <label>
                    Width (m)
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={customSize.width}
                      onChange={(e) => setCustomSize({ ...customSize, width: parseFloat(e.target.value) })}
                    />
                  </label>
                  <label>
                    Height (m)
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={customSize.height}
                      onChange={(e) => setCustomSize({ ...customSize, height: parseFloat(e.target.value) })}
                    />
                  </label>
                  <label>
                    Depth (m)
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={customSize.depth}
                      onChange={(e) => setCustomSize({ ...customSize, depth: parseFloat(e.target.value) })}
                    />
                  </label>
                </div>

                <div className="volume-info">
                  <div className="volume-stat">
                    <span>Current Volume:</span>
                    <span className={currentVolume >= minVolume ? 'valid' : 'invalid'}>
                      {currentVolume.toFixed(2)} m³
                    </span>
                  </div>
                  <div className="volume-stat">
                    <span>Minimum Required:</span>
                    <span>{minVolume.toFixed(2)} m³</span>
                  </div>
                </div>

                {currentVolume < minVolume && (
                  <div className="warning-box">
                    ⚠️ Module is below minimum recommended size for {crewSize} crew members
                  </div>
                )}

                {moduleInfo.adjacencyPreferences && (
                  <div className="info-box">
                    <strong>Recommended near:</strong> {moduleInfo.adjacencyPreferences.map(p => MODULE_TYPES[p.toUpperCase()].name).join(', ')}
                  </div>
                )}

                {moduleInfo.adjacencyRestrictions && (
                  <div className="warning-box">
                    <strong>Avoid placing near:</strong> {moduleInfo.adjacencyRestrictions.map(r => MODULE_TYPES[r.toUpperCase()].name).join(', ')}
                  </div>
                )}
              </div>

              <button 
                className="add-module-btn" 
                onClick={handleAddModule}
                disabled={currentVolume < minVolume * 0.8}
              >
                Add Module to Habitat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
