import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Habitat({ shape, dimensions }) {
  const meshRef = useRef();
  
  // Gentle rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

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
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      {renderGeometry()}
      <meshStandardMaterial
        color="#29b6f6"
        metalness={0.6}
        roughness={0.4}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function Grid() {
  return (
    <gridHelper args={[50, 50, '#29b6f6', '#1e2235']} position={[0, -5, 0]} />
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#4dd0e1" />
      <pointLight position={[10, -5, 10]} intensity={0.5} color="#29b6f6" />
    </>
  );
}

export default function HabitatScene({ config }) {
  const dimensions = [
    config.dimension_x || 10,
    config.dimension_y || 10,
    config.dimension_z || 10,
  ];

  return (
    <>
      <Lights />
      <Habitat shape={config.shape} dimensions={dimensions} />
      <Grid />
    </>
  );
}
