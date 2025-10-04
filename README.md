# 🛰️ Habitat Layout Creator

**NASA Space Apps Challenge 2025**

A full-stack web application for designing and visualizing space habitats for lunar, Martian, or orbital missions. Built with React + Three.js (frontend) and Django REST Framework (backend).

---

## 🎯 Features

### Core Functionalities
- **Interactive 3D Visualization** - Real-time habitat rendering with Three.js
- **Drag-and-Drop Module Placement** - Interactive 3D module positioning system
- **12 Functional Module Types** - NASA-standard areas (Life Support, Hygiene, Sleeping, etc.)
- **Multiple Habitat Shapes** - Cylinder, Sphere, Dome, Torus, Cube
- **Mission Configuration** - Set crew size, mission duration, and destination (Moon/Mars/Orbit)
- **Intelligent Sizing** - Auto-calculate minimum module sizes based on crew and mission
- **Volume Calculations** - Real-time total volume and per-crew space tracking
- **Constraint Validation Engine** - Real-time feedback on NASA volume/spacing/adjacency rules
- **Space Utilization Tracking** - Monitor how efficiently habitat volume is used
- **Data Persistence** - Save and load complete habitat designs with module layouts
- **NASA Presets** - Pre-configured layouts based on real mission designs

### UI Features
- **Space-themed dark UI** with neon blue highlights
- **Sidebar controls** for habitat configuration
- **Module Library** with 12 functional area types and sizing guidance
- **Module Manager Panel** for real-time module overview and validation
- **Floating Action Buttons** for quick access to module tools
- **Enhanced Metrics Bar** showing habitat volume, module volume, space utilization, and compliance
- **Interactive 3D camera controls** (orbit, zoom, pan)
- **Visual feedback system** with color-coded validation states
- **Hover labels** showing module details in 3D view

---

## 📂 Project Structure

```
/frontend                 # React + Three.js frontend
  /src
    /components          # UI components (Sidebar, MetricsBar)
    /threejs            # 3D scene components
    /api                # API client for backend
  /public
    index.html

/backend                 # Django REST API
  /habitat_app          # Main Django app
    models.py           # Habitat data model
    serializers.py      # REST serializers
    views.py            # API endpoints
    urls.py
  /habitat_api          # Django project settings
    settings.py
    urls.py
  /data
    nasa_presets.json   # NASA habitat presets
  requirements.txt
  manage.py
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16+)
- **Python** (3.8+)
- **pip** (Python package manager)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser (optional, for admin access):
```bash
python manage.py createsuperuser
```

6. Start the Django development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will open automatically at `http://localhost:3000/`

---

## 🔌 API Endpoints

### Habitats
- `GET /api/habitats/` - List all habitats
- `POST /api/habitats/` - Create new habitat
- `GET /api/habitats/{id}/` - Retrieve specific habitat
- `PUT /api/habitats/{id}/` - Update habitat
- `DELETE /api/habitats/{id}/` - Delete habitat

### Presets & Validation
- `GET /api/habitats/presets/` - Get NASA preset layouts
- `POST /api/habitats/{id}/validate_layout/` - Validate habitat layout

---

## 🎨 Usage

### 1. **Configure Your Habitat**
   - Use the sidebar to select shape, mission type, crew size, and dimensions
   - Watch the 3D visualization update in real-time
   - Habitat becomes semi-transparent when modules are added

### 2. **Add Functional Modules**
   - Click "➕ Add Module" to open the module library
   - Select from 12 NASA-standard module types
   - System auto-calculates minimum size based on crew
   - Adjust dimensions if needed
   - Review adjacency recommendations and restrictions

### 3. **Arrange Your Layout**
   - **Drag modules** in 3D space to position them
   - Hover over modules to see details
   - Click to select (module glows and bounces)
   - Modules stay within habitat boundaries
   - Real-time validation feedback

### 4. **Manage Modules**
   - Click "📋 Modules" to open the Module Manager
   - View all placed modules with details
   - See validation errors and warnings
   - Delete modules with 🗑️ button
   - Click module in list to select in 3D

### 5. **Monitor Metrics**
   - Check the bottom bar for real-time statistics:
     - **Habitat Volume** - Total available space
     - **Module Volume** - Space occupied
     - **Space Utilization** - Efficiency percentage
     - **Volume per Crew** - NASA compliance
     - **Status** - Overall validation
   - Color coding:
     - ✅ Green = meets NASA constraints
     - ⚠️ Orange = warnings
     - ❌ Red = errors/insufficient space

### 6. **Validate Your Design**
   - System checks for:
     - Minimum volume per crew (15 m³)
     - Module size requirements
     - Critical modules present
     - Adjacency recommendations
   - Address errors (red) before saving
   - Review warnings (orange) for optimization

### 7. **Save Your Design**
   - Click "💾 Save Habitat" to persist complete design
   - Includes habitat config + all module positions
   - Click "📂 Load Habitat" to retrieve saved designs

### 8. **Explore Presets**
   - Load NASA preset layouts for inspiration
   - Modify and save your own variations

---

## 📦 Module Types

### Critical Modules (Must-Have)
- 🌬️ **Environmental Control & Life Support** - Air, water, temperature
- 🚿 **Hygiene & Waste Management** - Toilet, shower, waste
- 🛏️ **Crew Quarters** - Sleep stations, privacy
- 🍽️ **Galley & Food Preparation** - Food storage, heating, dining

### High Priority
- 🏃 **Exercise & Fitness** - Cardiovascular equipment
- ⚕️ **Medical Bay** - First aid, medical equipment
- 📦 **Storage & Logistics** - Supplies, spare parts
- 🚪 **Airlock & EVA Prep** - Suit donning, egress
- 🖥️ **Command & Control** - Navigation, communications

### Medium Priority
- 🔧 **Maintenance & Repair** - Tools, workbench
- 🎮 **Recreation** - Social space, entertainment
- 🔬 **Research & Science** - Laboratory, experiments

Each module has:
- **Minimum volume** based on crew size
- **Adjacency preferences** (recommended neighbors)
- **Adjacency restrictions** (avoid placing near)
- **Priority level** (critical, high, medium)

See [INTERACTIVE_FEATURES.md](INTERACTIVE_FEATURES.md) for detailed usage guide.

---

## 🌟 Future Enhancements

- [x] ~~Drag-and-drop module placement in 3D space~~ ✅ **COMPLETE**
- [x] ~~Advanced validation rules (adjacency, access paths)~~ ✅ **COMPLETE**
- [ ] Snap-to-grid for precise alignment
- [ ] Module rotation controls
- [ ] Multi-level/deck support
- [ ] AI-powered layout suggestions
- [ ] Export designs as `.glb` or `.json`
- [ ] Comparison with NASA Artemis Base Camp
- [ ] Social sharing of layouts
- [ ] Collision detection between modules
- [ ] Auto-arrange feature

---

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Three.js + React Three Fiber
- React Three Drei (helpers)

**Backend:**
- Django 4.2
- Django REST Framework
- SQLite (development)

**Styling:**
- Custom CSS with space theme
- Neon blue (#29b6f6) accent color

---

## 📝 License

This project is created for the NASA Space Apps Challenge 2025.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for NASA Space Apps Challenge 2025**