# Capsule Shape Feature

## Overview
Added **capsule** shape option for habitats, inspired by airstream trailers and pill-shaped spacecraft designs with rounded ends.

## What's New

### 🏕️ Capsule Shape
- **Geometry**: Rounded cylinder with hemispherical caps on both ends
- **Visual**: Smooth, aerodynamic profile like a travel trailer or pharmaceutical capsule
- **Use Case**: Compact, efficient habitats with streamlined design
- **Calculation**: Radius based on min(width, depth) / 2, length from height minus 2 radii

### Where to Use It

**1. Habitat Shape Selector (Sidebar)**
- Select "Capsule" from the Shape dropdown
- Automatically renders the habitat boundary as a capsule
- Dimensions control the overall size

**2. New Preset: Airstream Habitat 🚐**
- 4 crew, 60 days, Earth orbit
- 8m × 16m × 8m capsule shape
- 7 modules in compact layout
- Perfect for short-term missions
- Mobile habitat concept

## Technical Details

### Geometry Parameters
```javascript
const radius = Math.min(x, z) / 2;
const length = Math.max(0.1, y - 2 * radius);
<capsuleGeometry args={[radius, length, 8, 24]} />
```

### Shape Options (Complete List)
1. **Cube** - Rectangular box (default)
2. **Cylinder** - Circular cross-section
3. **Capsule** - Pill shape with rounded ends ✨ NEW
4. **Sphere** - Perfect ball
5. **Dome** - Half-sphere
6. **Torus** - Donut/ring shape

## Files Updated
- `frontend/src/components/Sidebar.js` - Added capsule option
- `frontend/src/threejs/HabitatScene.js` - Capsule geometry rendering
- `frontend/src/data/habitatPresets.js` - New Airstream Habitat preset

## Usage Examples

### Create Custom Capsule Habitat
1. Open sidebar
2. Select Shape: **Capsule**
3. Set dimensions (e.g., 8m × 20m × 8m)
4. Add modules inside
5. Save your design

### Load Airstream Preset
1. Click "🚀 Load Preset"
2. Select **Airstream Habitat 🚐**
3. See capsule shape in action
4. Customize as needed

## Design Philosophy

### Why Capsule Shape?
- **Aerodynamic**: Smooth profile for atmospheric entry/exit
- **Efficient**: Maximizes internal volume
- **Structural**: Rounded ends distribute stress evenly
- **Iconic**: Recognizable travel trailer aesthetic
- **Compact**: Perfect for small crews and tight spaces

### Real-World Inspiration
- Airstream travel trailers
- SpaceX Dragon capsule
- Apollo command module
- Pharmaceutical capsules
- Submarine pressure hulls

## Benefits

### Structural
- No sharp corners (stress concentrators)
- Even pressure distribution
- Strong end caps
- Efficient material use

### Aesthetic
- Sleek, modern look
- Retro-futuristic vibe
- Recognizable silhouette
- Professional appearance

### Practical
- Easy to pressurize
- Good for re-entry vehicles
- Compact footprint
- Efficient packing

## Preset Comparison

| Preset | Shape | Crew | Duration | Use Case |
|--------|-------|------|----------|----------|
| ISS-Inspired | Cylinder | 6 | 180 days | Research station |
| Lunar Gateway | Cylinder | 4 | 90 days | Moon missions |
| Mars Base | Dome | 6 | 500 days | Surface habitat |
| Deep Space | Cylinder | 8 | 1000 days | Interplanetary |
| Minimal Station | Cylinder | 2 | 30 days | Short research |
| Orbital Hotel | Torus | 12 | 14 days | Tourism |
| Asteroid Mining | Cube | 10 | 365 days | Industrial |
| Biosphere | Sphere | 8 | 730 days | Self-sustaining |
| **Airstream** | **Capsule** | **4** | **60 days** | **Mobile/Compact** ✨ |

## Future Enhancements

Potential additions:
- **Tapered capsule** (cone on one end)
- **Multi-segment capsule** (train-like)
- **Rotating capsule** (artificial gravity)
- **Docked capsules** (modular expansion)

---

**Version**: 3.1.0
**Feature**: Capsule Shape
**Status**: Production Ready
**Presets**: 9 (including new Airstream Habitat)
