import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Sidebar from './components/Sidebar';
import MetricsBar from './components/MetricsBar';
import ModuleLibrary from './components/ModuleLibrary';
import ModuleManager from './components/ModuleManager';
import ModuleProperties from './components/ModuleProperties';
import PresetSelector from './components/PresetSelector';
import ZoomIndicator from './components/ZoomIndicator';
import HabitatScene from './threejs/HabitatScene';
import MinecraftControls from './threejs/MinecraftControls';
import { habitatApi } from './api/habitatApi';
import { calculateMinimumHabitatVolume } from './data/moduleLibrary';
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
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [showModuleLibrary, setShowModuleLibrary] = useState(false);
  const [showModuleManager, setShowModuleManager] = useState(false);
  const [showPresetSelector, setShowPresetSelector] = useState(false);
  const [editingModule, setEditingModule] = useState(null);

  // 🔹 Recalculate habitat volume when config changes
  useEffect(() => {
    const volume = calculateVolume(config);
    setTotalVolume(volume);
  }, [config]);

  // 🔹 Keyboard shortcut: press "N" to open module library
  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.key === 'n' || event.key === 'N') &&
          event.target.tagName !== 'INPUT' &&
          event.target.tagName !== 'TEXTAREA') {
        setShowModuleLibrary(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // 🔹 Volume calculation logic
  const calculateVolume = (cfg) => {
    const { shape, dimension_x, dimension_y, dimension_z } = cfg;
    const PI = Math.PI;

    switch (shape) {
      case 'cylinder': {
        const radius = dimension_x / 2;
        return PI * radius * radius * dimension_y;
      }
      case 'capsule': {
        const radius = Math.min(dimension_x, dimension_z) / 2;
        const cylinderHeight = Math.max(0, dimension_y - 2 * radius);
        const cylinderVol = PI * radius * radius * cylinderHeight;
        const sphereVol = (4 / 3) * PI * radius * radius * radius;
        return cylinderVol + sphereVol;
      }
      case 'sphere': {
        const r = dimension_x / 2;
        return (4 / 3) * PI * r * r * r;
      }
      case 'dome': {
        const rDome = dimension_x / 2;
        return (2 / 3) * PI * rDome * rDome * dimension_y;
      }
      case 'torus': {
        const majorRadius = dimension_x / 2;
        const minorRadius = dimension_y / 2;
        return 2 * PI * PI * majorRadius * minorRadius * minorRadius;
      }
      default:
        return dimension_x * dimension_y * dimension_z;
    }
  };

  // 🔹 Module Management Handlers
  const handleAddModule = (module) => {
    setModules([...modules, module]);
    setSelectedModuleId(module.id);
  };

  const handleDeleteModule = (moduleId) => {
    setModules(modules.filter((m) => m.id !== moduleId));
    if (selectedModuleId === moduleId) setSelectedModuleId(null);
  };

  const handleModulePositionChange = (moduleId, newPosition) => {
    setModules(modules.map((m) =>
      m.id === moduleId ? { ...m, position: newPosition } : m
    ));
  };

  const handleModuleDoubleClick = (module) => {
    setEditingModule(module);
  };

  const handleModuleUpdate = (updatedModule) => {
    setModules(modules.map((m) =>
      m.id === updatedModule.id ? updatedModule : m
    ));
  };

  const handleLoadPreset = (presetData) => {
    setConfig({
      name: presetData.name,
      shape: presetData.shape,
      crew_size: presetData.crew_size,
      mission_duration: presetData.mission_duration,
      mission_type: presetData.mission_type,
      dimension_x: presetData.dimension_x,
      dimension_y: presetData.dimension_y,
      dimension_z: presetData.dimension_z,
      layout_data: presetData.layout_data,
    });
    setModules(presetData.layout_data.modules);
    setSelectedModuleId(null);
  };

  // 🔹 Save Habitat
  const handleSave = async () => {
    try {
      const dataToSave = {
        ...config,
        total_volume: totalVolume,
        layout_data: { modules },
      };
      const result = await habitatApi.createHabitat(dataToSave);
      alert(`Habitat "${result.name}" saved successfully! ID: ${result.id}`);
      loadHabitats();
    } catch (error) {
      console.error('Error saving habitat:', error);
      alert('Failed to save habitat. Make sure the backend is running.');
    }
  };

  // 🔹 Load Saved Habitats
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
        if (fullHabitat.layout_data?.modules) {
          setModules(fullHabitat.layout_data.modules);
        }
        alert(`Loaded habitat: ${fullHabitat.name}`);
      } else {
        alert('No saved habitats found.');
      }
    } catch (error) {
      console.error('Error loading habitat:', error);
      alert('Failed to load habitat. Make sure the backend is running.');
    }
  };

  const minRecommendedVolume = calculateMinimumHabitatVolume(
    config.crew_size,
    config.mission_duration
  );

  // ✅ Fixed return with Fragment
  return (
    <div className="app">
      <Sidebar
        config={config}
        onConfigChange={setConfig}
        onSave={handleSave}
        onLoad={handleLoad}
        onLoadPreset={() => setShowPresetSelector(true)}
      />
      
      <div className="canvas-container">
        <Canvas
          camera={{ position: [15, 15, 15], fov: 50 }}
          shadows
        >
          <HabitatScene 
            config={config} 
            modules={modules}
            selectedModuleId={selectedModuleId}
            onSelectModule={setSelectedModuleId}
            onModulePositionChange={handleModulePositionChange}
            onModuleDoubleClick={handleModuleDoubleClick}
          />
          <MinecraftControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={0.5}
            maxDistance={500}
            zoomSpeed={2.0}
            followCursor={true}
            followSpeed={0.05}
          />
        </Canvas>

          {/* Floating Buttons */}
          <div className="floating-controls">
            <button
              className="fab fab-primary"
              onClick={() => setShowModuleLibrary(true)}
              title="Add Module"
            >
              ➕ Add Module
            </button>
            <button
              className="fab fab-secondary"
              onClick={() => setShowModuleManager(!showModuleManager)}
              title="Manage Modules"
            >
              📋 Modules ({modules.length})
            </button>
          </div>

          <ZoomIndicator />

          {/* Module Manager */}
          {showModuleManager && (
            <div className="module-manager-panel">
              <ModuleManager
                modules={modules}
                selectedModuleId={selectedModuleId}
                onSelectModule={setSelectedModuleId}
                onDeleteModule={handleDeleteModule}
                crewSize={config.crew_size}
              />
            </div>
          )}
        </div>

        <MetricsBar
          config={config}
          totalVolume={totalVolume}
          modules={modules}
          minRecommendedVolume={minRecommendedVolume}
        />

        {/* Module Library Modal */}
        {showModuleLibrary && (
          <ModuleLibrary
            crewSize={config.crew_size}
            onAddModule={handleAddModule}
            onClose={() => setShowModuleLibrary(false)}
          />
        )}

      {/* Module Properties Modal */}
      {editingModule && (
        <ModuleProperties
          module={editingModule}
          crewSize={config.crew_size}
          onUpdate={handleModuleUpdate}
          onDelete={handleDeleteModule}
          onClose={() => setEditingModule(null)}
        />
      )}

      {/* Preset Selector Modal */}
      {showPresetSelector && (
        <PresetSelector
          onLoadPreset={handleLoadPreset}
          onClose={() => setShowPresetSelector(false)}
        />
      )}
    </div>
  );
}
