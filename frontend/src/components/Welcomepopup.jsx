import React, { useState, useEffect, useRef } from "react";
import './Welcomepopup.css';

function WelcomePopup() {
  const [show, setShow] = useState(true);
  const [bgIndex, setBgIndex] = useState(0);
  const imagesRef = useRef([
    "https://www.ces.tech/media/ibqdfluu/how-an-inflatable-habitat-will-sustain-life-in-space-600x334png-ext.png?width=1200&height=600&bgcolor=white",
    "https://media.istockphoto.com/id/1423440263/video/astronaut-in-outer-space-against-the-planet-earth.jpg?s=640x640&k=20&c=Fv8S7mtKwcmU4WlQF1NaAqyC0ghS_eDrOYgs9Ma1U_c=",
    "https://magazine.impactscool.com/wp-content/uploads/2019/11/astronaut-1946806_1920-800x540.jpg",
    "https://cdn.mos.cms.futurecdn.net/wMJghVUrwqTjuM4rkDQTrP-1200-80.jpg",
    "https://i.insider.com/5c7a398ebde70f7ba179fc57?width=700",
  ]);

  // Change background every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % imagesRef.current.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
    <div className="welcome-overlay">
      {/* Background slideshow */}
      <div className="welcome-bg-container">
        {imagesRef.current.map((img, index) => (
          <div
            key={index}
            className={`welcome-bg-image ${index === bgIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="welcome-bg-overlay" />
      </div>

      {/* Content */}
      <div className="welcome-modal">
        <div className="welcome-header">
          <div className="welcome-icon">🛰️</div>
          <h1 className="welcome-title">Space Habitat Builder</h1>
          <div className="welcome-subtitle">NASA-Grade Design Tool</div>
        </div>

        <div className="welcome-features">
          <div className="feature-item">
            <span className="feature-icon">🚀</span>
            <span className="feature-text">Build Realistic Habitats</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📐</span>
            <span className="feature-text">NASA Standards</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎮</span>
            <span className="feature-text">Interactive 3D View</span>
          </div>
        </div>

        <div className="welcome-description">
          Design space stations for Moon, Mars, and beyond.
          <br />
          Choose from professional presets or build from scratch.
        </div>

        <button className="welcome-button" onClick={() => setShow(false)}>
          <span className="button-text">▶ Start Building</span>
        </button>

        <div className="welcome-footer">
          Press <kbd>N</kbd> to add modules • Middle-click to pan • Scroll to zoom
        </div>
      </div>
    </div>
  );
}

export default WelcomePopup;
