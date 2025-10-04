# 🎮 Interactive Features Guide

## Overview
The Habitat Layout Creator now includes a fully interactive drag-and-drop module placement system with real-time validation and constraint checking based on NASA standards.

---

## 🎯 New Features

### 1. **Module Library** (12 Functional Areas)
A comprehensive library of NASA-standard habitat modules:

#### Critical Modules (Must-Have)
- **🌬️ Environmental Control & Life Support (ECLSS)** - Air, water, temperature
- **🚿 Hygiene & Waste Management** - Toilet, shower, waste collection
- **🛏️ Crew Quarters** - Sleep stations, privacy areas
- **🍽️ Galley & Food Preparation** - Food storage, heating, dining

#### High Priority Modules
- **🏃 Exercise & Fitness** - Treadmill, resistance equipment
- **⚕️ Medical Bay** - First aid, medical equipment
- **📦 Storage & Logistics** - Equipment, supplies, spare parts
- **🚪 Airlock & EVA Prep** - Suit donning, depressurization
- **🖥️ Command & Control** - Navigation, communications

#### Medium Priority Modules
- **🔧 Maintenance & Repair** - Tools, workbench
- **🎮 Recreation & Crew Interaction** - Social space, entertainment
- **🔬 Research & Science** - Laboratory, experiments

### 2. **Intelligent Sizing System**
Each module has:
- **Base Volume** - Minimum size regardless of crew
- **Per-Crew Volume** - Additional space per crew member
- **Auto-calculation** - Recommended dimensions based on crew size

Example: For 4 crew members
- Life Support: 8.0 m³ (base) + 2.0 m³ × 4 = **16.0 m³ minimum**
- Sleeping: 6.0 m³ (base) + 2.5 m³ × 4 = **16.0 m³ minimum**

### 3. **Constraint Validation**

#### Volume Constraints
- ✅ **Green** - Module meets minimum size requirements
- ❌ **Red** - Module is too small for crew size
- ⚠️ **Warning** - Module is below recommended size

#### Adjacency Rules
**Recommended Adjacencies:**
- Life Support ↔ Hygiene, Storage
- Sleeping ↔ Hygiene
- Food Prep ↔ Storage
- Medical ↔ Sleeping

**Restricted Adjacencies:**
- Hygiene ✗ Food Prep, Sleeping
- Exercise ✗ Sleeping, Medical
- Maintenance ✗ Sleeping, Medical, Food Prep

### 4. **3D Drag-and-Drop Interaction**

#### How to Use:
1. **Add Module**
   - Click "➕ Add Module" button
   - Select module type from library
   - Adjust size if needed
   - Click "Add Module to Habitat"

2. **Move Module**
   - Hover over module (cursor changes to grab)
   - Click and drag to reposition
   - Module stays within habitat bounds
   - Real-time position updates

3. **Select Module**
   - Click on any module to select it
   - Selected module:
     - Glows with highlight
     - Shows label with name and volume
     - Bounces gently for visibility

4. **Delete Module**
   - Open Module Manager (📋 button)
   - Click 🗑️ next to module name

### 5. **Module Manager Panel**
Real-time overview of all placed modules:
- **Module count** and total volume
- **Critical module warnings** if missing required modules
- **Per-module details**: size, volume, position
- **Validation feedback**: errors and warnings
- **Quick selection** - click to select in 3D view

### 6. **Enhanced Metrics Bar**
Now tracks:
- **Habitat Volume** - Total available space
- **Module Volume** - Space occupied by modules
- **Space Utilization** - Percentage used (color-coded)
  - 🔵 Blue (0-50%) - Low utilization
  - ✅ Green (50-85%) - Good utilization
  - ⚠️ Orange (85%+) - High utilization
- **Volume per Crew** - NASA compliance check
- **Modules Placed** - Count of functional areas
- **Status** - Overall validation

---

## 📐 NASA-Based Constraints

### Minimum Volume per Crew Member
- **15 m³** - Absolute minimum (NASA standard)
- **20 m³** - Recommended for comfort
- **25+ m³** - Optimal for long-duration missions

### Mission Duration Factors
- **Short (< 30 days)**: Basic modules only
- **Medium (30-90 days)**: Add exercise, recreation
- **Long (90+ days)**: Full suite + extra storage

### Critical Module Requirements
All habitats must include:
1. Environmental Control & Life Support
2. Hygiene & Waste Management
3. Crew Quarters
4. Galley & Food Preparation

Missing any critical module triggers a warning.

---

## 🎨 Visual Feedback System

### Module Colors
Each module type has a unique color for easy identification:
- 🟢 Green - Life Support
- 🟣 Purple - Hygiene
- 🔵 Blue - Sleeping
- 🟠 Orange - Food Prep
- 🔴 Red - Exercise
- 🟡 Yellow - Command
- ⚫ Gray - Storage
- 🟤 Brown - Airlock

### Selection States
- **Normal**: Semi-transparent, subtle glow
- **Hovered**: Brighter, cursor changes to grab
- **Selected**: Bright glow, animated bounce, label visible
- **Dragging**: Cursor changes to grabbing

### Wireframe Mode
- Habitat becomes semi-transparent when modules are added
- Wireframe outline shows habitat boundaries
- Easier to see module placement inside

---

## 🚀 Workflow Example

### Designing a Lunar Habitat for 4 Crew (30 days)

1. **Configure Habitat**
   - Shape: Cylinder
   - Dimensions: 10m × 8m × 10m
   - Crew: 4
   - Mission: Moon, 30 days
   - Total Volume: ~628 m³

2. **Add Critical Modules**
   - Life Support: 3m × 3m × 2m (18 m³)
   - Hygiene: 2m × 2m × 2m (8 m³)
   - Sleeping: 4m × 2m × 2m (16 m³)
   - Food Prep: 3m × 2m × 2m (12 m³)

3. **Add Support Modules**
   - Storage: 3m × 3m × 2m (18 m³)
   - Medical: 2.5m × 2m × 2m (10 m³)
   - Exercise: 3m × 2.5m × 2m (15 m³)

4. **Arrange Layout**
   - Drag modules to optimal positions
   - Keep Hygiene near Sleeping
   - Place Life Support centrally
   - Food Prep away from Hygiene

5. **Validate**
   - Check metrics bar for compliance
   - Review module manager for warnings
   - Adjust sizes if needed
   - Ensure space utilization is 50-85%

6. **Save Design**
   - Click "💾 Save Habitat"
   - Design stored with module positions
   - Can load later for modifications

---

## 🔧 Technical Details

### Drag System
- Uses Three.js raycasting for precise 3D interaction
- Plane-based dragging at module's Y position
- Boundary constraints prevent modules from leaving habitat
- Smooth cursor feedback

### Collision Detection
- Simplified distance-based adjacency checking
- Modules within 3m are considered adjacent
- Real-time validation on position change

### Performance
- Efficient React state management
- Three.js optimizations for smooth 60fps
- Lazy rendering of labels (only on hover/select)

---

## 📊 Validation Rules Summary

| Check | Threshold | Feedback |
|-------|-----------|----------|
| Module Volume | < Min Required | ❌ Error |
| Volume per Crew | < 15 m³ | ❌ Error |
| Volume per Crew | < 20 m³ | ⚠️ Warning |
| Space Utilization | > 85% | ⚠️ Warning |
| Missing Critical Module | Any | ⚠️ Warning |
| Bad Adjacency | Per module rules | ⚠️ Warning |

---

## 🎯 Best Practices

### Layout Design
1. **Start with critical modules** - Ensure basic needs are met
2. **Consider adjacencies** - Follow NASA recommendations
3. **Leave circulation space** - Don't exceed 85% utilization
4. **Think vertically** - Use habitat height efficiently
5. **Plan for expansion** - Leave room for future modules

### Module Sizing
1. **Use recommended sizes** - Auto-calculated for crew size
2. **Round up, not down** - Better too large than too small
3. **Consider equipment** - Some modules need extra space
4. **Account for access** - Modules need entry/exit space

### Validation
1. **Check metrics bar regularly** - Monitor compliance
2. **Address errors first** - Red indicators are critical
3. **Review warnings** - Orange indicators are recommendations
4. **Test different layouts** - Try multiple configurations

---

## 🐛 Troubleshooting

### Module won't drag
- Ensure you're clicking directly on the module
- Check that Module Manager isn't blocking the view
- Try selecting the module first

### Module disappears
- Check if it's outside habitat bounds
- Use Module Manager to see position
- Delete and re-add if needed

### Validation warnings persist
- Review adjacency rules for the module type
- Check if module size meets minimum requirements
- Ensure all critical modules are present

### Performance issues
- Reduce number of modules if experiencing lag
- Close Module Manager when not needed
- Refresh browser if issues persist

---

## 🌟 Future Enhancements

Planned features:
- **Snap-to-grid** - Align modules precisely
- **Auto-layout** - AI-suggested optimal arrangements
- **Multi-level support** - Stack modules vertically
- **Rotation controls** - Rotate modules in 3D
- **Copy/paste modules** - Duplicate configurations
- **Templates** - Save and reuse layouts
- **Export to 3D** - Download as .glb file
- **Collaboration** - Share designs with team

---

**Ready to design your space habitat! 🚀**
