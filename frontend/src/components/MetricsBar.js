import React from 'react';
import './MetricsBar.css';

export default function MetricsBar({ config, totalVolume }) {
  const volumePerCrew = config.crew_size > 0 ? (totalVolume / config.crew_size).toFixed(2) : 0;
  const minVolumePerCrew = 15;
  const isValid = volumePerCrew >= minVolumePerCrew;

  return (
    <div className="metrics-bar">
      <div className="metric">
        <span className="metric-label">Total Volume</span>
        <span className="metric-value">{totalVolume.toFixed(2)} m³</span>
      </div>
      
      <div className="metric">
        <span className="metric-label">Volume per Crew</span>
        <span className={`metric-value ${isValid ? 'valid' : 'invalid'}`}>
          {volumePerCrew} m³
        </span>
      </div>
      
      <div className="metric">
        <span className="metric-label">Crew Size</span>
        <span className="metric-value">{config.crew_size}</span>
      </div>
      
      <div className="metric">
        <span className="metric-label">Mission Duration</span>
        <span className="metric-value">{config.mission_duration} days</span>
      </div>
      
      <div className="metric">
        <span className="metric-label">Status</span>
        <span className={`metric-value ${isValid ? 'valid' : 'invalid'}`}>
          {isValid ? '✅ Valid' : '❌ Insufficient Space'}
        </span>
      </div>
    </div>
  );
}
