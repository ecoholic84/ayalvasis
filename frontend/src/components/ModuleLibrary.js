import React, { useState, useEffect } from 'react';
import { MODULE_TYPES, calculateMinModuleVolume, getRecommendedDimensions } from '../data/moduleLibrary';
import './ModuleLibrary.css';

export default function ModuleLibrary({ crewSize, onAddModule, onClose }) {
  const [selectedType, setSelectedType] = useState(null);
  const [customSize, setCustomSize] = useState({ width: 2, height: 2, depth: 2 });
  const [hoveredType, setHoveredType] = useState(null);

  const handleSelectType = (typeKey) => {
    setSelectedType(typeKey);
    const recommended = getRecommendedDimensions(typeKey, crewSize);
    // Override height to always be 2
    setCustomSize({ ...recommended, height: 2 });
  };

  // Get array of module types for circular layout
  const moduleEntries = Object.entries(MODULE_TYPES);
  const totalModules = moduleEntries.length;

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

  const displayInfo = selectedType ? moduleInfo : (hoveredType ? MODULE_TYPES[hoveredType.toUpperCase()] : null);

  return (
    <div className="module-library-overlay" onClick={onClose}>
      <div className="radial-menu-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Circular Module Selector */}
        <div className="radial-menu">
          {/* Outer ring with module icons */}
          {moduleEntries.map(([key, module], index) => {
            // Evenly distribute around the circle starting from top (0°)
            const angle = (index * 360 / totalModules); // Start from 0° (top)
            const isSelected = selectedType === key;
            const isHovered = hoveredType === key;
            
            return (
              <div
                key={key}
                className={`radial-item ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
                style={{
                  transform: `rotate(${angle}deg) translate(240px) rotate(-${angle}deg)`
                }}
                onClick={() => handleSelectType(key)}
                onMouseEnter={() => setHoveredType(key)}
                onMouseLeave={() => setHoveredType(null)}
              >
                <div className="radial-icon">{module.icon}</div>
              </div>
            );
          })}

          {/* Center circle with details */}
          <div className="radial-center">
            {displayInfo ? (
              <>
                <div className="center-icon">{displayInfo.icon}</div>
                <div className="center-name">{displayInfo.name}</div>
                <div className="center-priority">{displayInfo.priority}</div>
                {selectedType && (
                  <div className="center-description">{displayInfo.description}</div>
                )}
              </>
            ) : (
              <div className="center-placeholder">
                <div className="placeholder-icon">📦</div>
                <div className="placeholder-text">Select Module</div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration panel below the wheel */}
        {selectedType && (
          <div className="config-panel">
            <div className="config-header">
              <h4>Configure Size</h4>
            </div>
            
            <div className="size-inputs-inline">
              <label>
                W
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={customSize.width}
                  onChange={(e) => setCustomSize({ ...customSize, width: parseFloat(e.target.value) })}
                />
              </label>
              <label>
                H
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={customSize.height}
                  onChange={(e) => setCustomSize({ ...customSize, height: parseFloat(e.target.value) })}
                />
              </label>
              <label>
                D
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={customSize.depth}
                  onChange={(e) => setCustomSize({ ...customSize, depth: parseFloat(e.target.value) })}
                />
              </label>
            </div>

            <div className="volume-compact">
              <span>Vol: {currentVolume.toFixed(1)}m³</span>
              <span className={currentVolume >= minVolume ? 'valid' : 'invalid'}>
                Min: {minVolume.toFixed(1)}m³
              </span>
            </div>

            <button 
              className="add-module-btn-radial" 
              onClick={handleAddModule}
              disabled={currentVolume < minVolume * 0.8}
            >
              ✓ Add to Habitat
            </button>
          </div>
        )}

        {/* Close button */}
        <button className="close-btn-radial" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
