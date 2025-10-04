import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Sidebar from './components/Sidebar';
import MetricsBar from './components/MetricsBar';
import HabitatScene from './threejs/HabitatScene';
import { habitatApi } from './api/habitatApi';
import './App.css';

export default function App() {
  const [config, setConfig] = useState({
    name: 'My Habitat',
    shape: 'cylinder',
    crew_size: 4,
    mission_duration: 30,
    mission_type: 'moon',
    dimension_x: 10.0,
    dimension_y: 10.0,
    dimension_z: 10.0,
    layout_data: {},
  });

  const [totalVolume, setTotalVolume] = useState(0);
  const [savedHabitats, setSavedHabitats] = useState([]);

  // Calculate volume whenever config changes
  useEffect(() => {
    const volume = calculateVolume(config);
    setTotalVolume(volume);
  }, [config]);

  const calculateVolume = (cfg) => {
    const { shape, dimension_x, dimension_y, dimension_z } = cfg;
    const PI = Math.PI;

    switch (shape) {
      case 'cylinder':
        const radius = dimension_x / 2;
        return PI * radius * radius * dimension_y;
      case 'sphere':
        const r = dimension_x / 2;
        return (4 / 3) * PI * r * r * r;
      case 'dome':
        const rDome = dimension_x / 2;
        return (2 / 3) * PI * rDome * rDome * dimension_y;
      case 'torus':
        const majorRadius = dimension_x / 2;
        const minorRadius = dimension_y / 2;
        return 2 * PI * PI * majorRadius * minorRadius * minorRadius;
      default: // cube
        return dimension_x * dimension_y * dimension_z;
    }
  };

  const handleSave = async () => {
    try {
      const dataToSave = {
        ...config,
        total_volume: totalVolume,
      };
      const result = await habitatApi.createHabitat(dataToSave);
      alert(`Habitat "${result.name}" saved successfully! ID: ${result.id}`);
      loadHabitats();
    } catch (error) {
      console.error('Error saving habitat:', error);
      alert('Failed to save habitat. Make sure the backend is running.');
    }
  };

  const loadHabitats = async () => {
    try {
      const habitats = await habitatApi.listHabitats();
      setSavedHabitats(habitats);
      console.log('Loaded habitats:', habitats);
    } catch (error) {
      console.error('Error loading habitats:', error);
    }
  };

  const handleLoad = async () => {
    try {
      await loadHabitats();
      if (savedHabitats.length > 0) {
        const lastHabitat = savedHabitats[0];
        const fullHabitat = await habitatApi.getHabitat(lastHabitat.id);
        setConfig(fullHabitat);
        alert(`Loaded habitat: ${fullHabitat.name}`);
      } else {
        alert('No saved habitats found.');
      }
    } catch (error) {
      console.error('Error loading habitat:', error);
      alert('Failed to load habitat. Make sure the backend is running.');
    }
  };

  return (
    <div className="app">
      <Sidebar
        config={config}
        onConfigChange={setConfig}
        onSave={handleSave}
        onLoad={handleLoad}
      />
      
      <div className="canvas-container">
        <Canvas
          camera={{ position: [15, 15, 15], fov: 50 }}
          shadows
        >
          <HabitatScene config={config} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
          />
        </Canvas>
      </div>

      <MetricsBar config={config} totalVolume={totalVolume} />
    </div>
  );
}
