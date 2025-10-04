import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { MODULE_TYPES } from '../data/moduleLibrary';

export default function DraggableModule({ 
  module, 
  isSelected, 
  onSelect, 
  onPositionChange,
  habitatBounds 
}) {
  const meshRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { camera, gl, raycaster, scene } = useThree();

  const moduleInfo = MODULE_TYPES[module.type.toUpperCase()];
  const [width, height, depth] = module.size;

  // Handle drag
  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    onSelect(module.id);
    gl.domElement.style.cursor = 'grabbing';
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    gl.domElement.style.cursor = hovered ? 'grab' : 'auto';
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    // Create a plane at the module's Y position for dragging
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -module.position[1]);
    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersection);

    if (intersection) {
      // Constrain to habitat bounds
      const maxX = habitatBounds.x / 2 - width / 2;
      const maxZ = habitatBounds.z / 2 - depth / 2;
      
      const newX = Math.max(-maxX, Math.min(maxX, intersection.x));
      const newZ = Math.max(-maxZ, Math.min(maxZ, intersection.z));

      onPositionChange(module.id, [newX, module.position[1], newZ]);
    }
  };

  // Hover effects
  useFrame(() => {
    if (meshRef.current) {
      if (isSelected) {
        meshRef.current.position.y = module.position[1] + Math.sin(Date.now() * 0.003) * 0.1;
      } else {
        meshRef.current.position.y = module.position[1];
      }
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={module.position}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          gl.domElement.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          setHovered(false);
          if (!isDragging) gl.domElement.style.cursor = 'auto';
        }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={moduleInfo.color}
          transparent
          opacity={isSelected ? 0.9 : hovered ? 0.85 : 0.75}
          metalness={0.3}
          roughness={0.7}
          emissive={moduleInfo.color}
          emissiveIntensity={isSelected ? 0.3 : hovered ? 0.2 : 0.1}
        />
      </mesh>

      {/* Wireframe outline */}
      <lineSegments position={module.position}>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
        <lineBasicMaterial 
          color={isSelected ? '#4dd0e1' : '#29b6f6'} 
          linewidth={2}
          opacity={isSelected ? 1 : 0.5}
          transparent
        />
      </lineSegments>

      {/* Label */}
      {(isSelected || hovered) && (
        <Html position={[module.position[0], module.position[1] + height / 2 + 0.5, module.position[2]]}>
          <div style={{
            background: 'rgba(30, 34, 53, 0.95)',
            color: '#29b6f6',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #29b6f6',
            fontSize: '12px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            textAlign: 'center',
          }}>
            {moduleInfo.icon} {moduleInfo.name}
            <div style={{ fontSize: '10px', opacity: 0.8, marginTop: '2px' }}>
              {(width * height * depth).toFixed(1)} m³
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
