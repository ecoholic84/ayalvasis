import React, { useState, useEffect } from 'react';
import { MODULE_TYPES, calculateMinModuleVolume } from '../data/moduleLibrary';
import './ModuleProperties.css';

export default function ModuleProperties({ module, crewSize, onUpdate, onClose, onDelete }) {
  const [size, setSize] = useState({
    width: module.size[0],
    height: module.size[1],
    depth: module.size[2]
  });

  const [position, setPosition] = useState({
    x: module.position[0],
    y: module.position[1],
    z: module.position[2]
  });

  const moduleInfo = MODULE_TYPES[module.type.toUpperCase()];
  const minVolume = calculateMinModuleVolume(module.type, crewSize);
  const currentVolume = size.width * size.height * size.depth;

  const handleSave = () => {
    onUpdate({
      ...module,
      size: [size.width, size.height, size.depth],
      position: [position.x, position.y, position.z]
    });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Delete ${moduleInfo.name}?`)) {
      onDelete(module.id);
      onClose();
    }
  };

  return (
    <div className="module-properties-overlay" onClick={onClose}>
      <div className="module-properties-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="properties-header">
          <div className="header-icon">{moduleInfo.icon}</div>
          <div className="header-info">
            <h3>{moduleInfo.name}</h3>
            <span className="priority-badge">{moduleInfo.priority}</span>
          </div>
          <button className="close-btn-props" onClick={onClose}>✕</button>
        </div>

        {/* Description */}
        <div className="properties-section">
          <p className="module-desc">{moduleInfo.description}</p>
        </div>

        {/* Size Configuration */}
        <div className="properties-section">
          <h4>📏 Dimensions</h4>
          <div className="dimension-grid">
            <label>
              Width (m)
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={size.width}
                onChange={(e) => setSize({ ...size, width: parseFloat(e.target.value) || 0.5 })}
              />
            </label>
            <label>
              Height (m)
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={size.height}
                onChange={(e) => setSize({ ...size, height: parseFloat(e.target.value) || 0.5 })}
              />
            </label>
            <label>
              Depth (m)
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={size.depth}
                onChange={(e) => setSize({ ...size, depth: parseFloat(e.target.value) || 0.5 })}
              />
            </label>
          </div>
        </div>

        {/* Position Configuration */}
        <div className="properties-section">
          <h4>📍 Position</h4>
          <div className="dimension-grid">
            <label>
              X
              <input
                type="number"
                step="0.5"
                value={position.x.toFixed(1)}
                onChange={(e) => setPosition({ ...position, x: parseFloat(e.target.value) || 0 })}
              />
            </label>
            <label>
              Y
              <input
                type="number"
                step="0.5"
                value={position.y.toFixed(1)}
                onChange={(e) => setPosition({ ...position, y: parseFloat(e.target.value) || 0 })}
              />
            </label>
            <label>
              Z
              <input
                type="number"
                step="0.5"
                value={position.z.toFixed(1)}
                onChange={(e) => setPosition({ ...position, z: parseFloat(e.target.value) || 0 })}
              />
            </label>
          </div>
        </div>

        {/* Volume Info */}
        <div className="properties-section">
          <h4>📦 Volume</h4>
          <div className="volume-display">
            <div className="volume-row">
              <span>Current:</span>
              <span className={currentVolume >= minVolume ? 'valid' : 'invalid'}>
                {currentVolume.toFixed(2)} m³
              </span>
            </div>
            <div className="volume-row">
              <span>Required:</span>
              <span>{minVolume.toFixed(2)} m³</span>
            </div>
            <div className="volume-row">
              <span>Status:</span>
              <span className={currentVolume >= minVolume ? 'valid' : 'invalid'}>
                {currentVolume >= minVolume ? '✓ Valid' : '✗ Too Small'}
              </span>
            </div>
          </div>
        </div>

        {/* Warning */}
        {currentVolume < minVolume && (
          <div className="warning-message">
            ⚠️ Module is below minimum size for {crewSize} crew members
          </div>
        )}

        {/* Actions */}
        <div className="properties-actions">
          <button className="btn-delete" onClick={handleDelete}>
            🗑️ Delete
          </button>
          <button 
            className="btn-save" 
            onClick={handleSave}
            disabled={currentVolume < minVolume * 0.8}
          >
            ✓ Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
