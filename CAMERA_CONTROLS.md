# Camera Controls Documentation

## Mouse Controls

### 🔄 Rotation (Left Mouse Button)
- **Action**: Press and hold **Left Mouse Button** + Drag
- **Effect**: Rotates the camera around the scene
- **Usage**: Look around the habitat from different angles
- **Cursor**: Changes to "grabbing" cursor
- **Note**: When clicking on a module, it will drag the module instead of rotating

### ✋ Panning (Middle Mouse Button / Scroll Wheel Click)
- **Action**: Press and hold **Middle Mouse Button** (scroll wheel) + Drag
- **Effect**: Moves the camera position in space
- **Usage**: Navigate through the scene without rotating
- **Cursor**: Changes to "move" cursor
- **Direction**: 
  - Drag left/right → Pan left/right
  - Drag up/down → Pan up/down

### 🔍 Zoom (Mouse Wheel)
- **Action**: Scroll **Mouse Wheel** up/down
- **Effect**: Zoom in/out
- **Range**: 0.5 to 500 units (extreme zoom capability)
- **Speed**: Dynamic - faster when far, slower when close
- **Extreme Close-Up**: Get as close as 0.5 units (inside objects)
- **Extreme Wide**: Pull back to 500 units (bird's eye view)

## Keyboard Controls

### Zoom
- **+** or **=** → Zoom in
- **-** or **_** → Zoom out

### Module Library
- **N** → Open module selection wheel

## Object Interaction

### 📦 Module Dragging
- **Action**: Click on a module + Drag
- **Effect**: Moves the selected module in 3D space
- **Constraint**: Modules stay within habitat bounds
- **Visual**: Selected module glows and bounces
- **Note**: Clicking on a module prevents camera rotation

### Module Selection
- **Click on module**: Selects it
- **Hover over module**: Shows module info tooltip

## Advanced Features

### 🎯 Cursor Following
- **Automatic**: Camera subtly follows mouse position
- **Effect**: Creates dynamic, responsive view
- **Disabled**: When rotating or panning
- **Smoothness**: Lerp interpolation for natural movement

### Visual Feedback
- **Default Cursor**: Standard pointer
- **Rotating**: Grabbing hand cursor
- **Panning**: Move/crosshair cursor
- **Module Hover**: Grab cursor
- **Module Drag**: Grabbing cursor

## Control Priority

1. **Module Dragging** (highest priority)
   - When clicking on a module, it takes precedence
   - Camera controls are disabled during module drag

2. **Camera Panning** (middle button)
   - Independent of rotation
   - Can pan while maintaining view angle

3. **Camera Rotation** (left button)
   - Only activates when not clicking on objects
   - Smooth spherical coordinate rotation

4. **Cursor Following** (automatic)
   - Lowest priority
   - Disabled during any manual control

## Technical Details

### Rotation System
- Uses spherical coordinates (radius, theta, phi)
- Theta: Horizontal rotation (azimuth)
- Phi: Vertical rotation (elevation)
- Phi clamped: 0.1 to π-0.1 (prevents gimbal lock)

### Panning System
- Moves in camera space (not world space)
- Uses camera's right and up vectors
- Accumulates offset over time
- Pan speed: 0.02 units per pixel

### Zoom System
- Adjusts spherical radius
- Smooth lerp transition (0.1 factor)
- **Dynamic Speed**: Zoom speed scales with distance
  - Close (< 10 units): Very slow, precise control
  - Medium (10-50 units): Moderate speed
  - Far (> 50 units): Fast movement
- Formula: `speed = max(0.1, currentDistance * 0.05)` for scroll
- Formula: `speed = max(0.5, currentDistance * 0.1)` for keyboard
- Range: 0.5 to 500 units (1000x zoom range!)

### Cursor Following
- Offset proportional to zoom level (30%)
- Follow speed: 0.05
- Smooth lerp interpolation
- Disabled during user interaction

## Tips

1. **Smooth Navigation**: Use middle-click pan for precise positioning
2. **Quick Rotation**: Left-click drag for fast view changes
3. **Zoom First**: Zoom to desired distance, then rotate/pan
4. **Module Placement**: Select module, then drag to position
5. **Reset View**: Refresh page to reset camera position

## Troubleshooting

### Camera won't rotate
- Make sure you're not clicking on a module
- Try clicking on empty space first

### Panning not working
- Ensure you're using middle mouse button (scroll wheel click)
- Some mice require pressing the scroll wheel firmly

### Module won't drag
- Click directly on the module (not near it)
- Module must be selected (glowing)

### Cursor following too sensitive
- This is normal behavior
- It's disabled during rotation/panning

---

**Version**: 2.0.0
**Last Updated**: 2025-10-05
**Compatibility**: Modern browsers with WebGL support
