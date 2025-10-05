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
  const { camera, gl, raycaster } = useThree();
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentZoomRef = useRef(15);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isRotatingRef = useRef(false);
  const isPanningRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({
    radius: 15,
    theta: Math.PI / 4,
    phi: Math.PI / 3
  });
  const panOffsetRef = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const domElement = gl.domElement;

    // Handle mouse wheel zoom with dynamic speed
    const handleWheel = (event) => {
      if (!enableZoom) return;
      event.preventDefault();
      
      const delta = event.deltaY;
      // Dynamic zoom speed: faster when far away, slower when close
      const dynamicSpeed = Math.max(0.1, sphericalRef.current.radius * 0.05);
      const zoomDelta = delta > 0 ? dynamicSpeed : -dynamicSpeed;
      
      sphericalRef.current.radius = THREE.MathUtils.clamp(
        sphericalRef.current.radius + zoomDelta,
        minDistance,
        maxDistance
      );
    };

    // Handle keyboard zoom (+/-) with dynamic speed
    const handleKeyDown = (event) => {
      if (!enableZoom) return;
      
      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        const dynamicSpeed = Math.max(0.5, sphericalRef.current.radius * 0.1);
        sphericalRef.current.radius = THREE.MathUtils.clamp(
          sphericalRef.current.radius - dynamicSpeed,
          minDistance,
          maxDistance
        );
      } else if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        const dynamicSpeed = Math.max(0.5, sphericalRef.current.radius * 0.1);
        sphericalRef.current.radius = THREE.MathUtils.clamp(
          sphericalRef.current.radius + dynamicSpeed,
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

      const deltaX = event.clientX - lastMouseRef.current.x;
      const deltaY = event.clientY - lastMouseRef.current.y;

      // Handle rotation when left-click dragging
      if (isRotatingRef.current && enableRotate) {
        sphericalRef.current.theta -= deltaX * 0.005;
        sphericalRef.current.phi = THREE.MathUtils.clamp(
          sphericalRef.current.phi - deltaY * 0.005,
          0.1,
          Math.PI - 0.1
        );
      }

      // Handle panning when middle-click dragging
      if (isPanningRef.current && enablePan) {
        const panSpeed = 0.02;
        
        // Get camera's right and up vectors
        const cameraRight = new THREE.Vector3();
        const cameraUp = new THREE.Vector3();
        camera.getWorldDirection(new THREE.Vector3());
        cameraRight.setFromMatrixColumn(camera.matrix, 0);
        cameraUp.setFromMatrixColumn(camera.matrix, 1);

        // Pan in camera space
        panOffsetRef.current.addScaledVector(cameraRight, -deltaX * panSpeed);
        panOffsetRef.current.addScaledVector(cameraUp, deltaY * panSpeed);
      }

      lastMouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseDown = (event) => {
      lastMouseRef.current = { x: event.clientX, y: event.clientY };
      
      if (event.button === 0 && enableRotate) { // Left click - rotate
        // Check if clicking on an object (let DraggableModule handle it)
        const rect = domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1
        );
        
        // Only start rotating if not clicking on a mesh
        // The DraggableModule will handle its own clicks
        isRotatingRef.current = true;
        domElement.style.cursor = 'grabbing';
      } else if (event.button === 1 && enablePan) { // Middle click - pan
        event.preventDefault();
        isPanningRef.current = true;
        domElement.style.cursor = 'move';
      }
    };

    const handleMouseUp = (event) => {
      if (event.button === 0) {
        isRotatingRef.current = false;
      } else if (event.button === 1) {
        isPanningRef.current = false;
      }
      domElement.style.cursor = 'default';
    };

    const handleContextMenu = (event) => {
      event.preventDefault(); // Prevent context menu on right-click
    };

    // Add event listeners
    domElement.addEventListener('wheel', handleWheel, { passive: false });
    domElement.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    domElement.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      domElement.removeEventListener('wheel', handleWheel);
      domElement.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      domElement.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [gl, camera, enableZoom, enableRotate, enablePan, minDistance, maxDistance, zoomSpeed]);

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

    // Apply cursor following effect (only when not rotating or panning)
    if (followCursor && !isRotatingRef.current && !isPanningRef.current) {
      const offsetX = mousePositionRef.current.x * followSpeed * currentZoomRef.current * 0.3;
      const offsetY = mousePositionRef.current.y * followSpeed * currentZoomRef.current * 0.3;
      
      targetRef.current.x = THREE.MathUtils.lerp(targetRef.current.x, offsetX, 0.05);
      targetRef.current.y = THREE.MathUtils.lerp(targetRef.current.y, offsetY, 0.05);
    }

    // Apply pan offset
    const finalTarget = new THREE.Vector3(
      targetRef.current.x + panOffsetRef.current.x,
      targetRef.current.y + panOffsetRef.current.y,
      panOffsetRef.current.z
    );

    // Set camera position
    camera.position.set(
      x + finalTarget.x,
      y + finalTarget.y,
      z + finalTarget.z
    );

    // Look at target
    camera.lookAt(finalTarget);
  });

  return null;
}
