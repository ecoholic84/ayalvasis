import React from 'react';
import './Sidebar.css';

export default function Sidebar({ config, onConfigChange, onSave, onLoad }) {
  const handleChange = (field, value) => {
    onConfigChange({ ...config, [field]: value });
  };

  return (
    <div className="sidebar">
      <h2>🛰️ Habitat Creator</h2>
      
      <div className="section">
        <h3>Basic Configuration</h3>
        
        <label>
          Habitat Name
          <input
            type="text"
            value={config.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter habitat name"
          />
        </label>

        <label>
          Shape
          <select
            value={config.shape}
            onChange={(e) => handleChange('shape', e.target.value)}
          >
            <option value="cube">Cube</option>
            <option value="cylinder">Cylinder</option>
            <option value="sphere">Sphere</option>
            <option value="dome">Dome</option>
            <option value="torus">Torus</option>
          </select>
        </label>

        <label>
          Mission Type
          <select
            value={config.mission_type}
            onChange={(e) => handleChange('mission_type', e.target.value)}
          >
            <option value="moon">Moon</option>
            <option value="mars">Mars</option>
            <option value="orbit">Orbit</option>
          </select>
        </label>
      </div>

      <div className="section">
        <h3>Crew & Duration</h3>
        
        <label>
          Crew Size
          <input
            type="number"
            min="1"
            max="20"
            value={config.crew_size}
            onChange={(e) => handleChange('crew_size', parseInt(e.target.value))}
          />
        </label>

        <label>
          Mission Duration (days)
          <input
            type="number"
            min="1"
            value={config.mission_duration}
            onChange={(e) => handleChange('mission_duration', parseInt(e.target.value))}
          />
        </label>
      </div>

      <div className="section">
        <h3>Dimensions (meters)</h3>
        
        <label>
          Width (X)
          <input
            type="number"
            min="1"
            step="0.5"
            value={config.dimension_x}
            onChange={(e) => handleChange('dimension_x', parseFloat(e.target.value))}
          />
        </label>

        <label>
          Height (Y)
          <input
            type="number"
            min="1"
            step="0.5"
            value={config.dimension_y}
            onChange={(e) => handleChange('dimension_y', parseFloat(e.target.value))}
          />
        </label>

        <label>
          Depth (Z)
          <input
            type="number"
            min="1"
            step="0.5"
            value={config.dimension_z}
            onChange={(e) => handleChange('dimension_z', parseFloat(e.target.value))}
          />
        </label>
      </div>

      <div className="section actions">
        <button className="btn-primary" onClick={onSave}>
          💾 Save Habitat
        </button>
        <button className="btn-secondary" onClick={onLoad}>
          📂 Load Habitat
        </button>
      </div>
    </div>
  );
}
