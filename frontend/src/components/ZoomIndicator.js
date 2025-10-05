import React from 'react';
import './ZoomIndicator.css';

export default function ZoomIndicator() {
  return (
    <div className="zoom-indicator">
      <div className="zoom-hint">
        <span className="zoom-icon">🔍</span>
        <div className="zoom-controls">
          <div className="control-item">SCROLL</div>
          <div className="control-item">+ / -</div>
        </div>
      </div>
      <div className="zoom-hint" style={{ marginTop: '8px' }}>
        <span className="zoom-icon">🔄</span>
        <div className="zoom-controls">
          <div className="control-item">L-DRAG</div>
        </div>
      </div>
      <div className="zoom-hint" style={{ marginTop: '8px' }}>
        <span className="zoom-icon">✋</span>
        <div className="zoom-controls">
          <div className="control-item">M-DRAG</div>
        </div>
      </div>
      <div className="zoom-hint" style={{ marginTop: '8px' }}>
        <span className="zoom-icon">📦</span>
        <div className="zoom-controls">
          <div className="control-item">N</div>
        </div>
      </div>
    </div>
  );
}
