# Extreme Zoom Feature

## Overview
The camera now supports **extreme zoom in and zoom out** capabilities with a dynamic speed system for smooth navigation at any scale.

## Zoom Range

### 📏 Distance Range
- **Minimum**: 0.5 units (extreme close-up)
- **Maximum**: 500 units (extreme wide view)
- **Total Range**: 1000x zoom capability!

### 🔬 Extreme Close-Up (0.5 - 5 units)
- Get **inside objects** and modules
- See individual details up close
- Perfect for inspecting module interiors
- Very slow, precise zoom control

### 🏠 Normal View (5 - 50 units)
- Standard habitat viewing distance
- Comfortable working range
- Moderate zoom speed
- Default starting position: 15 units

### 🌍 Wide View (50 - 200 units)
- See entire habitat layout
- Overview perspective
- Fast zoom speed
- Good for planning

### 🛰️ Extreme Wide (200 - 500 units)
- Bird's eye view
- See everything at once
- Very fast zoom speed
- Strategic overview

## Dynamic Zoom Speed

### How It Works
The zoom speed **automatically adjusts** based on your current distance:

```javascript
// Mouse Wheel
dynamicSpeed = max(0.1, currentDistance * 0.05)

// Keyboard (+/-)
dynamicSpeed = max(0.5, currentDistance * 0.1)
```

### Benefits
1. **Precise Control When Close**: Slow zoom when near objects
2. **Fast Travel When Far**: Quick zoom when viewing from distance
3. **Natural Feel**: Speed matches your perspective
4. **No Frustration**: Never too slow or too fast

### Examples
| Distance | Scroll Speed | Keyboard Speed |
|----------|--------------|----------------|
| 0.5 units | 0.1 units/scroll | 0.5 units/press |
| 10 units | 0.5 units/scroll | 1.0 units/press |
| 50 units | 2.5 units/scroll | 5.0 units/press |
| 100 units | 5.0 units/scroll | 10.0 units/press |
| 500 units | 25.0 units/scroll | 50.0 units/press |

## Usage Scenarios

### 🔍 Detailed Inspection
1. Zoom in close (< 5 units)
2. Inspect module details
3. Check spacing and alignment
4. View interior layouts

### 🏗️ Building & Editing
1. Medium zoom (5-30 units)
2. Place and arrange modules
3. Drag objects around
4. Fine-tune positions

### 📐 Planning & Overview
1. Zoom out far (50-200 units)
2. See entire habitat
3. Plan module placement
4. Check overall design

### 🎯 Strategic View
1. Extreme zoom out (200-500 units)
2. Full scene overview
3. Compare multiple habitats
4. Presentation mode

## Controls

### Mouse Wheel
- **Scroll Up**: Zoom in (get closer)
- **Scroll Down**: Zoom out (get farther)
- **Speed**: Automatically adjusts to distance

### Keyboard
- **+ or =**: Zoom in (2x faster than scroll)
- **- or _**: Zoom out (2x faster than scroll)
- **Hold Key**: Continuous zoom

### Tips
1. **Quick Zoom**: Use keyboard for rapid distance changes
2. **Fine Control**: Use scroll wheel for precise adjustments
3. **Combine**: Use both for optimal navigation
4. **Reset**: Refresh page to return to default (15 units)

## Technical Details

### Smooth Transitions
- All zoom changes use **lerp interpolation**
- Interpolation factor: 0.1
- Result: Smooth, cinematic zoom
- No jarring jumps

### Performance
- Optimized for all zoom levels
- No lag at extreme distances
- Efficient rendering
- Smooth 60 FPS

### Collision
- No collision detection
- Can zoom **through objects**
- Useful for inspection
- Camera never gets stuck

## Comparison

### Before (Old System)
- Range: 5 to 80 units (16x)
- Fixed speed: 1.5 units
- Limited close-up
- Limited wide view

### After (New System)
- Range: 0.5 to 500 units (1000x) ✅
- Dynamic speed: 0.1 to 50 units ✅
- Extreme close-up ✅
- Extreme wide view ✅
- Intelligent speed scaling ✅

## Use Cases

### Architecture & Design
- Zoom in to see module connections
- Zoom out to see overall layout
- Perfect for presentations

### Inspection & Quality Control
- Get extremely close to check details
- Verify module placement
- Check clearances

### Education & Training
- Show details up close
- Demonstrate full habitat
- Interactive exploration

### Gaming & Exploration
- Minecraft-style navigation
- Free camera movement
- Immersive experience

---

**Version**: 2.1.0
**Feature**: Extreme Zoom
**Range**: 0.5 - 500 units
**Speed**: Dynamic (distance-based)
