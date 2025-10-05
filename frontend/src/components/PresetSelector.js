import React, { useState } from 'react';
import { getAllPresets, loadPreset } from '../data/habitatPresets';
import './PresetSelector.css';

export default function PresetSelector({ onLoadPreset, onClose }) {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const presets = getAllPresets();

  const handleLoad = () => {
    if (selectedPreset) {
      const presetData = loadPreset(selectedPreset.id);
      onLoadPreset(presetData);
      onClose();
    }
  };

  return (
    <div className="preset-overlay" onClick={onClose}>
      <div className="preset-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="preset-header">
          <h2>🚀 Space Habitat Presets</h2>
          <button className="close-btn-preset" onClick={onClose}>✕</button>
        </div>

        {/* Description */}
        <div className="preset-intro">
          <p>Load a professionally designed space habitat based on real space station concepts</p>
        </div>

        {/* Preset Grid */}
        <div className="preset-grid">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className={`preset-card ${selectedPreset?.id === preset.id ? 'selected' : ''}`}
              onClick={() => setSelectedPreset(preset)}
            >
              <div className="preset-thumbnail">{preset.thumbnail}</div>
              <div className="preset-info">
                <h3>{preset.name}</h3>
                <p className="preset-desc">{preset.description}</p>
                <div className="preset-stats">
                  <span className="stat">
                    <span className="stat-icon">👥</span>
                    {preset.crew_size} crew
                  </span>
                  <span className="stat">
                    <span className="stat-icon">📅</span>
                    {preset.mission_duration} days
                  </span>
                </div>
                <div className="preset-mission">
                  <span className="mission-badge">{preset.mission_type.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Preset Details */}
        {selectedPreset && (
          <div className="preset-details">
            <h4>📋 Configuration Details</h4>
            <div className="details-grid">
              <div className="detail-item">
                <span>Shape:</span>
                <span>{selectedPreset.shape}</span>
              </div>
              <div className="detail-item">
                <span>Dimensions:</span>
                <span>{selectedPreset.dimension_x} × {selectedPreset.dimension_y} × {selectedPreset.dimension_z} m</span>
              </div>
              <div className="detail-item">
                <span>Modules:</span>
                <span>{selectedPreset.modules.length} units</span>
              </div>
              <div className="detail-item">
                <span>Mission:</span>
                <span>{selectedPreset.mission_type.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="preset-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn-load" 
            onClick={handleLoad}
            disabled={!selectedPreset}
          >
            🚀 Load Preset
          </button>
        </div>

      </div>
    </div>
  );
}
