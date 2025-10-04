import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import DraggableModule from './DraggableModule';

function Habitat({ shape, dimensions, showWireframe }) {
  const meshRef = useRef();
  
  const renderGeometry = () => {
    const [x, y, z] = dimensions;
    
    switch (shape) {
      case 'cylinder':
        return <cylinderGeometry args={[x / 2, x / 2, y, 32]} />;
      case 'sphere':
        return <sphereGeometry args={[x / 2, 32, 32]} />;
      case 'dome':
        return <sphereGeometry args={[x / 2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />;
      case 'torus':
        return <torusGeometry args={[x / 2, y / 4, 16, 100]} />;
      default: // cube
        return <boxGeometry args={[x, y, z]} />;
    }
  };

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]} receiveShadow>
        {renderGeometry()}
        <meshStandardMaterial
          color="#29b6f6"
          metalness={0.6}
          roughness={0.4}
          transparent
          opacity={showWireframe ? 0.15 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Wireframe outline */}
      {showWireframe && (
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry attach="geometry" args={[meshRef.current?.geometry]} />
          <lineBasicMaterial color="#29b6f6" opacity={0.4} transparent />
        </lineSegments>
      )}
    </group>
  );
}

function Grid() {
  return (
    <gridHelper args={[50, 50, '#29b6f6', '#1e2235']} position={[0, -0.01, 0]} />
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={1.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[-10, 5, -10]} intensity={0.4} color="#4dd0e1" />
      <pointLight position={[10, -5, 10]} intensity={0.4} color="#29b6f6" />
      <hemisphereLight intensity={0.3} color="#4dd0e1" groundColor="#1e2235" />
    </>
  );
}

export default function HabitatScene({ 
  config, 
  modules = [], 
  selectedModuleId, 
  onSelectModule, 
  onModulePositionChange 
}) {
  const dimensions = [
    config.dimension_x || 10,
    config.dimension_y || 10,
    config.dimension_z || 10,
  ];

  const habitatBounds = {
    x: dimensions[0],
    y: dimensions[1],
    z: dimensions[2],
  };

  return (
    <>
      <Lights />
      <Habitat shape={config.shape} dimensions={dimensions} showWireframe={modules.length > 0} />
      <Grid />
      
      {/* Render all modules */}
      {modules.map(module => (
        <DraggableModule
          key={module.id}
          module={module}
          isSelected={selectedModuleId === module.id}
          onSelect={onSelectModule}
          onPositionChange={onModulePositionChange}
          habitatBounds={habitatBounds}
        />
      ))}
    </>
  );
}
