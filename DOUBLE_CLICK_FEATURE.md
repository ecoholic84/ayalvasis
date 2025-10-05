# Double-Click Module Properties Feature

## Overview
Double-clicking on any module opens a comprehensive properties panel where you can resize, reposition, and manage the module.

## How to Use

### Opening Properties
1. **Double-click** on any module in the 3D view
2. Properties panel appears with full module details
3. Edit any properties you want
4. Click "Save Changes" or close to cancel

### What You Can Edit

#### 📏 Dimensions
- **Width** - Adjust module width in meters
- **Height** - Adjust module height in meters  
- **Depth** - Adjust module depth in meters
- **Step**: 0.5 meter increments
- **Validation**: Real-time volume checking

#### 📍 Position
- **X coordinate** - Left/right position
- **Y coordinate** - Up/down position
- **Z coordinate** - Forward/back position
- **Step**: 0.5 meter increments
- **Precision**: 1 decimal place display

#### 📦 Volume Information
- **Current Volume** - Calculated from dimensions
- **Required Volume** - Minimum for crew size
- **Status** - Valid/Invalid indicator
- **Color Coding**:
  - Green (✓) = Valid size
  - Red (✗) = Too small

## Properties Panel Features

### Header Section
- **Large Icon** - Module type emoji (animated pulse)
- **Module Name** - Full descriptive name
- **Priority Badge** - Critical/High/Medium indicator
- **Close Button** - X to close panel

### Description
- Full module description
- Purpose and functionality
- Minecraft-themed styling

### Dimension Controls
- 3-column grid layout
- Labeled inputs (Width, Height, Depth)
- Yellow highlighted values
- Green border on focus
- Instant calculation

### Position Controls
- 3-column grid layout
- Labeled inputs (X, Y, Z)
- Precise decimal values
- Direct coordinate editing

### Volume Display
- Current volume calculation
- Required minimum volume
- Status indicator
- Color-coded validation

### Warning Messages
- Appears when module too small
- Shows crew size requirement
- Red border and background
- Clear warning icon

### Action Buttons
- **Delete Button** (Red)
  - Removes module from habitat
  - Confirmation dialog
  - Destructive action
  
- **Save Changes** (Green)
  - Applies all edits
  - Validates before saving
  - Disabled if invalid
  - Closes panel on success

## Validation Rules

### Size Validation
```javascript
currentVolume >= minVolume * 0.8
```
- Must be at least 80% of minimum
- Based on crew size
- Module type specific

### Visual Feedback
- **Valid**: Green checkmark, enabled save
- **Invalid**: Red X, disabled save, warning shown
- **Real-time**: Updates as you type

## Keyboard Shortcuts

### While Panel Open
- **Escape** - Close panel (cancel changes)
- **Enter** - Save changes (if valid)
- **Tab** - Navigate between inputs

### Input Fields
- **Arrow Up/Down** - Increment/decrement values
- **Type directly** - Enter specific values

## Double-Click Detection

### Technical Details
- **Threshold**: 300ms between clicks
- **Single Click**: Selects and drags module
- **Double Click**: Opens properties panel
- **Triple Click**: Ignored (resets)

### Behavior
1. First click: Select module
2. Second click (< 300ms): Open properties
3. Second click (> 300ms): Start new drag

## UI Design

### Minecraft Theme
- **Pixelated font** - Press Start 2P
- **Blocky borders** - 4px solid black
- **Hard shadows** - 8px offset
- **Color palette**:
  - Background: Dark gray (#2d2d2d)
  - Borders: Black (#000000)
  - Text: White/Yellow
  - Accents: Green/Red

### Layout
- **Fixed width**: 500px
- **Max height**: 90vh (scrollable)
- **Centered**: Modal overlay
- **Backdrop**: Blurred dark overlay
- **Z-index**: 2000 (above everything)

### Responsive
- Scrollable content area
- Custom scrollbar styling
- Touch-friendly buttons
- Clear visual hierarchy

## Integration

### Module Updates
- Updates module in state
- Recalculates metrics
- Updates 3D view instantly
- Maintains module ID

### Module Deletion
- Removes from modules array
- Clears selection if selected
- Updates habitat metrics
- Confirmation required

### State Management
- React state for editing module
- Controlled inputs
- Real-time validation
- Optimistic updates

## Examples

### Resize Module
1. Double-click module
2. Change Width: 3.0 → 4.0
3. Change Height: 2.5 → 3.0
4. Volume updates: 18.75 → 36.0 m³
5. Click "Save Changes"
6. Module resizes in 3D view

### Reposition Module
1. Double-click module
2. Change X: 0.0 → 5.0
3. Change Y: 0.0 → 2.0
4. Click "Save Changes"
5. Module moves to new position

### Delete Module
1. Double-click module
2. Click "Delete" button
3. Confirm deletion
4. Module removed from scene

## Error Handling

### Invalid Sizes
- Save button disabled
- Warning message shown
- Red color indicators
- Cannot save until fixed

### Minimum Values
- Width/Height/Depth: 0.5m minimum
- Enforced by input constraints
- Cannot go below minimum

### Volume Requirements
- Checked against crew size
- Module type specific
- 80% threshold for saving

## Tips

1. **Quick Edit**: Double-click for instant access
2. **Precise Values**: Type exact numbers
3. **Visual Feedback**: Watch volume status
4. **Undo**: Close without saving to cancel
5. **Delete**: Use panel instead of selecting + delete key

## Accessibility

- **Keyboard navigation** - Tab through inputs
- **Clear labels** - All inputs labeled
- **Visual feedback** - Color-coded status
- **Confirmation** - Destructive actions confirmed
- **Escape key** - Quick close

---

**Version**: 2.2.0
**Feature**: Double-Click Properties
**Status**: Fully Implemented
**Compatibility**: All modern browsers
