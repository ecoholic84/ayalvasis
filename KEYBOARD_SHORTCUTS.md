# Keyboard Shortcuts Guide

## Available Shortcuts

### 🎮 Camera Controls
- **Mouse Scroll** - Zoom in/out
- **+ / =** - Zoom in
- **- / _** - Zoom out
- **Left Click + Drag** - Rotate camera view
- **Mouse Move** - Camera follows cursor (smooth tracking)

### 📦 Module Management
- **N** - Open Add Module Library (quick access)
  - Opens the module selection window
  - Works from anywhere (except when typing in input fields)
  - Press N again or click X to close

### 🎯 Module Interaction
- **Click Module** - Select module in 3D view
- **Click + Drag Module** - Move module position
- **Hover Module** - Show module info tooltip

## Visual Indicators

The bottom-right corner shows available controls:
- 🔍 **SCROLL / + / -** - Zoom controls
- 📦 **N** - Add module shortcut

## Tips

1. **Quick Module Addition**: Press `N` to instantly open the module library without clicking buttons
2. **Smooth Navigation**: The camera subtly follows your mouse for intuitive exploration
3. **Precise Zoom**: Use keyboard +/- for controlled zoom increments
4. **Input Safety**: Keyboard shortcuts won't interfere when typing in text fields

## Implementation Details

### Keyboard Event Handling
- Shortcuts are disabled when focus is on INPUT or TEXTAREA elements
- Prevents accidental triggers while editing values
- Case-insensitive (N or n both work)

### User Experience
- Non-intrusive visual hints in bottom-right corner
- Minecraft-themed indicators match overall design
- Clear, readable controls with pixelated font

---

**Last Updated**: 2025-10-05
**Version**: 1.1.0
