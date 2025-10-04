import React from 'react';
import './MetricsBar.css';

export default function MetricsBar({ config, totalVolume, modules = [], minRecommendedVolume = 0 }) {
  const volumePerCrew = config.crew_size > 0 ? (totalVolume / config.crew_size).toFixed(2) : 0;
  const minVolumePerCrew = 15;
  const isValid = volumePerCrew >= minVolumePerCrew;

  const totalModuleVolume = modules.reduce((sum, m) => sum + (m.size[0] * m.size[1] * m.size[2]), 0);
  const spaceUtilization = totalVolume > 0 ? ((totalModuleVolume / totalVolume) * 100).toFixed(1) : 0;
  const utilizationStatus = spaceUtilization > 85 ? 'warning' : spaceUtilization > 50 ? 'valid' : 'info';

  return (
    <div className="metrics-bar">
      <div className="metric">
        <span className="metric-label">Habitat Volume</span>
        <span className="metric-value">{totalVolume.toFixed(2)} m³</span>
      </div>
      
      <div className="metric">
        <span className="metric-label">Module Volume</span>
        <span className="metric-value">{totalModuleVolume.toFixed(2)} m³</span>
      </div>

      <div className="metric">
        <span className="metric-label">Space Utilization</span>
        <span className={`metric-value ${utilizationStatus}`}>
          {spaceUtilization}%
        </span>
      </div>
      
      <div className="metric">
        <span className="metric-label">Volume per Crew</span>
        <span className={`metric-value ${isValid ? 'valid' : 'invalid'}`}>
          {volumePerCrew} m³
        </span>
      </div>
      
      <div className="metric">
        <span className="metric-label">Modules Placed</span>
        <span className="metric-value">{modules.length}</span>
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
