import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function MinecraftControls({ 
  enableZoom = true, 
  enablePan = true, 
  enableRotate = true,
  minDistance = 5,
  maxDistance = 100,
  zoomSpeed = 1.5,
  followCursor = true,
  followSpeed = 0.05
}) {
  const { camera, gl } = useThree();
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentZoomRef = useRef(15);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({
    radius: 15,
    theta: Math.PI / 4,
    phi: Math.PI / 3
  });

  useEffect(() => {
    const domElement = gl.domElement;

    // Handle mouse wheel zoom
    const handleWheel = (event) => {
      if (!enableZoom) return;
      event.preventDefault();
      
      const delta = event.deltaY;
      const zoomDelta = delta > 0 ? zoomSpeed : -zoomSpeed;
      
      sphericalRef.current.radius = THREE.MathUtils.clamp(
        sphericalRef.current.radius + zoomDelta,
        minDistance,
        maxDistance
      );
    };

    // Handle keyboard zoom (+/-)
    const handleKeyDown = (event) => {
      if (!enableZoom) return;
      
      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        sphericalRef.current.radius = THREE.MathUtils.clamp(
          sphericalRef.current.radius - zoomSpeed,
          minDistance,
          maxDistance
        );
      } else if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        sphericalRef.current.radius = THREE.MathUtils.clamp(
          sphericalRef.current.radius + zoomSpeed,
          minDistance,
          maxDistance
        );
      }
    };

    // Handle mouse movement for cursor following
    const handleMouseMove = (event) => {
      const rect = domElement.getBoundingClientRect();
      mousePositionRef.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1
      };

      // Handle rotation when dragging
      if (isDraggingRef.current && enableRotate) {
        const deltaX = event.clientX - lastMouseRef.current.x;
        const deltaY = event.clientY - lastMouseRef.current.y;

        sphericalRef.current.theta -= deltaX * 0.005;
        sphericalRef.current.phi = THREE.MathUtils.clamp(
          sphericalRef.current.phi - deltaY * 0.005,
          0.1,
          Math.PI - 0.1
        );

        lastMouseRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseDown = (event) => {
      if (event.button === 0 && enableRotate) { // Left click
        isDraggingRef.current = true;
        lastMouseRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Add event listeners
    domElement.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    domElement.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      domElement.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      domElement.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gl, enableZoom, enableRotate, minDistance, maxDistance, zoomSpeed]);

  // Update camera position every frame
  useFrame(() => {
    const { radius, theta, phi } = sphericalRef.current;

    // Smooth zoom transition
    currentZoomRef.current = THREE.MathUtils.lerp(
      currentZoomRef.current,
      radius,
      0.1
    );

    // Calculate camera position from spherical coordinates
    const x = currentZoomRef.current * Math.sin(phi) * Math.cos(theta);
    const y = currentZoomRef.current * Math.cos(phi);
    const z = currentZoomRef.current * Math.sin(phi) * Math.sin(theta);

    // Apply cursor following effect
    if (followCursor && !isDraggingRef.current) {
      const offsetX = mousePositionRef.current.x * followSpeed * currentZoomRef.current * 0.3;
      const offsetY = mousePositionRef.current.y * followSpeed * currentZoomRef.current * 0.3;
      
      targetRef.current.x = THREE.MathUtils.lerp(targetRef.current.x, offsetX, 0.05);
      targetRef.current.y = THREE.MathUtils.lerp(targetRef.current.y, offsetY, 0.05);
    }

    // Set camera position
    camera.position.set(
      x + targetRef.current.x,
      y + targetRef.current.y,
      z
    );

    // Look at target
    camera.lookAt(targetRef.current.x, targetRef.current.y, 0);
  });

  return null;
}
