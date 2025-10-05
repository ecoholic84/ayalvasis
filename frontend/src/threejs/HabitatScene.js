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
      <mesh ref={meshRef} position={[0, 0, 0]} receiveShadow castShadow>
        {renderGeometry()}
        <meshStandardMaterial
          color="#55ff55"
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={showWireframe ? 0.2 : 0.4}
          side={THREE.DoubleSide}
          flatShading={true}
        />
      </mesh>
      
      {/* Wireframe outline */}
      {showWireframe && (
        <lineSegments position={[0, 0, 0]}>
          <edgesGeometry attach="geometry" args={[meshRef.current?.geometry]} />
          <lineBasicMaterial color="#000000" opacity={0.8} transparent linewidth={2} />
        </lineSegments>
      )}
    </group>
  );
}

function Grid() {
  return (
    <>
      <gridHelper args={[50, 50, '#555555', '#2d2d2d']} position={[0, -0.01, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#3c3c3c" 
          roughness={1.0}
          metalness={0.0}
          flatShading={true}
        />
      </mesh>
    </>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} color="#ffffff" />
      <directionalLight
        position={[20, 30, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        color="#ffffff"
      />
      <pointLight position={[-15, 10, -15]} intensity={0.3} color="#ffaa00" />
      <pointLight position={[15, 10, 15]} intensity={0.3} color="#55ff55" />
      <hemisphereLight intensity={0.4} color="#87ceeb" groundColor="#3c3c3c" />
    </>
  );
}

export default function HabitatScene({ 
  config, 
  modules = [], 
  selectedModuleId, 
  onSelectModule, 
  onModulePositionChange,
  onModuleDoubleClick 
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
      {/* Minecraft-style sky */}
      <color attach="background" args={['#87ceeb']} />
      <fog attach="fog" args={['#87ceeb', 30, 100]} />
      
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
          onDoubleClick={onModuleDoubleClick}
          habitatBounds={habitatBounds}
        />
      ))}
    </>
  );
}
