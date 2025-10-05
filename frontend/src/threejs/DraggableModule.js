import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { MODULE_TYPES } from '../data/moduleLibrary';

export default function DraggableModule({ 
  module, 
  isSelected, 
  onSelect, 
  onPositionChange,
  onDoubleClick,
  habitatBounds 
}) {
  const meshRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { camera, gl, raycaster, scene } = useThree();
  const lastClickTimeRef = useRef(0);

  const moduleInfo = MODULE_TYPES[module.type.toUpperCase()];
  const [width, height, depth] = module.size;

  // Choose geometry by module type for more realistic shapes
  const { geometryElement, edgesBaseGeometry } = useMemo(() => {
    const type = module.type.toUpperCase();

    // Helpers
    const minWD = Math.min(width, depth);

    switch (type) {
      case 'AIRLOCK': {
        // Pressurized cylindrical chamber
        const radius = minWD / 2;
        return {
          geometryElement: (
            <cylinderGeometry args={[radius, radius, height, 24]} />
          ),
          edgesBaseGeometry: new THREE.CylinderGeometry(radius, radius, height, 12)
        };
      }
      case 'SLEEPING': {
        // Crew quarters as capsule
        const radius = Math.min(minWD / 2, height / 2);
        const straight = Math.max(0.01, height - 2 * radius);
        return {
          geometryElement: (
            <capsuleGeometry args={[radius, straight, 8, 16]} />
          ),
          edgesBaseGeometry: new THREE.CapsuleGeometry(radius, straight, 4, 8)
        };
      }
      case 'EXERCISE': {
        // Open ring area
        const major = minWD / 2;
        const tube = Math.max(0.1, Math.min(width, depth) / 6);
        return {
          geometryElement: (
            <torusGeometry args={[major, tube, 12, 24]} />
          ),
          edgesBaseGeometry: new THREE.TorusGeometry(major, tube, 8, 16)
        };
      }
      case 'RECREATION': {
        // Lounge sphere/dome
        const radius = Math.min(width, height, depth) / 2;
        return {
          geometryElement: (
            <sphereGeometry args={[radius, 24, 16]} />
          ),
          edgesBaseGeometry: new THREE.SphereGeometry(radius, 12, 8)
        };
      }
      case 'LIFE_SUPPORT':
      case 'FOOD_PREP':
      case 'HYGIENE':
      case 'MEDICAL':
      case 'STOWAGE':
      case 'MAINTENANCE':
      case 'RESEARCH':
      case 'COMMAND':
      default: {
        // Default to rectangular module
        return {
          geometryElement: (
            <boxGeometry args={[width, height, depth]} />
          ),
          edgesBaseGeometry: new THREE.BoxGeometry(width, height, depth)
        };
      }
    }
  }, [module.type, width, height, depth]);

  // Handle drag and double-click
  const handlePointerDown = (e) => {
    e.stopPropagation(); // Prevent camera controls from activating
    
    // Check for double-click
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - lastClickTimeRef.current;
    
    if (timeSinceLastClick < 300) { // 300ms double-click threshold
      // Double-click detected
      if (onDoubleClick) {
        onDoubleClick(module);
      }
      lastClickTimeRef.current = 0; // Reset
    } else {
      // Single click - start dragging
      setIsDragging(true);
      onSelect(module.id);
      gl.domElement.style.cursor = 'grabbing';
      lastClickTimeRef.current = currentTime;
    }
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
        {geometryElement}
        <meshStandardMaterial
          color={moduleInfo.color}
          transparent
          opacity={isSelected ? 0.95 : hovered ? 0.9 : 0.85}
          metalness={0.0}
          roughness={1.0}
          flatShading={true}
          emissive={moduleInfo.color}
          emissiveIntensity={isSelected ? 0.4 : hovered ? 0.3 : 0.15}
        />
      </mesh>

      {/* Wireframe outline */}
      <lineSegments position={module.position}>
        <edgesGeometry args={[edgesBaseGeometry]} />
        <lineBasicMaterial 
          color={isSelected ? '#000000' : '#222222'} 
          linewidth={3}
          opacity={isSelected ? 1 : 0.7}
          transparent
        />
      </lineSegments>

      {/* Label */}
      {(isSelected || hovered) && (
        <Html position={[module.position[0], module.position[1] + height / 2 + 0.5, module.position[2]]}>
          <div style={{
            background: '#2d2d2d',
            color: '#ffff55',
            padding: '8px 12px',
            borderRadius: '0',
            border: '3px solid #000000',
            fontSize: '10px',
            fontWeight: '400',
            fontFamily: '"Press Start 2P", monospace',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            textAlign: 'center',
            boxShadow: '4px 4px 0px #000000',
            textShadow: '2px 2px 0px #000000',
          }}>
            {moduleInfo.icon} {moduleInfo.name}
            <div style={{ fontSize: '8px', color: '#55ff55', marginTop: '4px', textShadow: '1px 1px 0px #000000' }}>
              {(width * height * depth).toFixed(1)} m³
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
