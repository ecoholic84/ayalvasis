# 🛰️ Habitat Layout Creator - Project Summary

## Overview
A full-stack web application for the **NASA Space Apps Challenge 2025** that allows users to design and visualize space habitats for lunar, Martian, or orbital missions.

---

## ✅ Completed Features

### Backend (Django + DRF)
- ✅ **Django Project Structure** - Fully configured with REST Framework
- ✅ **Habitat Model** - Complete data model with volume calculations
- ✅ **REST API Endpoints** - CRUD operations for habitats
- ✅ **NASA Presets** - Pre-configured habitat layouts
- ✅ **Validation Engine** - Volume and spacing constraint checks
- ✅ **CORS Configuration** - Enabled for React frontend
- ✅ **SQLite Database** - Development database setup
- ✅ **Admin Interface** - Django admin for habitat management

### Frontend (React + Three.js)
- ✅ **React Application** - Modern React 18 setup
- ✅ **3D Visualization** - Real-time Three.js rendering
- ✅ **Interactive Controls** - Orbit, zoom, pan camera controls
- ✅ **Sidebar UI** - Configuration panel for habitat settings
- ✅ **Metrics Bar** - Real-time statistics and validation feedback
- ✅ **API Integration** - Full REST API client implementation
- ✅ **Multiple Shapes** - Cylinder, Sphere, Dome, Torus, Cube support
- ✅ **Volume Calculations** - Real-time volume computation
- ✅ **Save/Load Functionality** - Persist designs to backend
- ✅ **Space-themed UI** - Dark theme with neon blue accents

---

## 📁 File Structure

```
ayalvasis/
├── backend/
│   ├── habitat_api/
│   │   ├── __init__.py
│   │   ├── settings.py          # Django settings with CORS
│   │   ├── urls.py               # Main URL configuration
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── habitat_app/
│   │   ├── migrations/
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   ├── admin.py              # Admin interface config
│   │   ├── apps.py
│   │   ├── models.py             # Habitat data model
│   │   ├── serializers.py        # REST serializers
│   │   ├── views.py              # API viewsets
│   │   ├── urls.py               # App URL routing
│   │   └── tests.py              # Unit tests
│   ├── data/
│   │   └── nasa_presets.json     # NASA preset layouts
│   ├── manage.py
│   ├── requirements.txt          # Python dependencies
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   └── index.html            # HTML template
│   ├── src/
│   │   ├── api/
│   │   │   └── habitatApi.js     # API client
│   │   ├── components/
│   │   │   ├── Sidebar.js        # Configuration sidebar
│   │   │   ├── Sidebar.css
│   │   │   ├── MetricsBar.js     # Metrics display
│   │   │   └── MetricsBar.css
│   │   ├── threejs/
│   │   │   └── HabitatScene.js   # 3D scene component
│   │   ├── App.js                # Main app component
│   │   ├── App.css
│   │   ├── index.js              # React entry point
│   │   └── index.css
│   ├── package.json              # Node dependencies
│   └── README.md
│
├── README.md                     # Main project documentation
├── QUICKSTART.md                 # Quick start guide
├── PROJECT_SUMMARY.md            # This file
└── .gitignore                    # Git ignore rules
```

---

## 🔌 API Endpoints

### Habitat Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/habitats/` | List all habitats |
| POST | `/api/habitats/` | Create new habitat |
| GET | `/api/habitats/{id}/` | Get specific habitat |
| PUT | `/api/habitats/{id}/` | Update habitat |
| DELETE | `/api/habitats/{id}/` | Delete habitat |

### Additional Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/habitats/presets/` | Get NASA preset layouts |
| POST | `/api/habitats/{id}/validate_layout/` | Validate habitat design |

---

## 🎨 UI Components

### Sidebar (Left Panel)
- **Basic Configuration**
  - Habitat name input
  - Shape selector (Cube, Cylinder, Sphere, Dome, Torus)
  - Mission type selector (Moon, Mars, Orbit)
  
- **Crew & Duration**
  - Crew size input (1-20)
  - Mission duration in days
  
- **Dimensions**
  - Width (X), Height (Y), Depth (Z) in meters
  
- **Actions**
  - Save Habitat button
  - Load Habitat button

### 3D Canvas (Center)
- Real-time 3D visualization
- Interactive camera controls
- Habitat shape rendering
- Grid helper for scale reference
- Dynamic lighting

### Metrics Bar (Bottom)
- Total volume display
- Volume per crew member
- Crew size
- Mission duration
- Validation status (✅/❌)

---

## 🧮 Volume Calculations

The app calculates habitat volume based on shape:

- **Cylinder**: π × r² × h
- **Sphere**: (4/3) × π × r³
- **Dome**: (2/3) × π × r² × h
- **Torus**: 2 × π² × R × r²
- **Cube**: width × height × depth

**Validation Rule**: Minimum 15 m³ per crew member (NASA standard)

---

## 🚀 How to Run

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🌟 Key Technologies

### Frontend Stack
- **React 18** - UI framework
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers

### Backend Stack
- **Django 4.2** - Web framework
- **Django REST Framework** - API toolkit
- **django-cors-headers** - CORS middleware
- **SQLite** - Database

---

## 📊 Data Model

### Habitat Model Fields
```python
- id (auto)
- name (CharField)
- description (TextField)
- created_at (DateTimeField)
- updated_at (DateTimeField)
- shape (CharField: cylinder, sphere, dome, torus, cube)
- crew_size (IntegerField)
- mission_duration (IntegerField, days)
- mission_type (CharField: moon, mars, orbit)
- dimension_x (FloatField, meters)
- dimension_y (FloatField, meters)
- dimension_z (FloatField, meters)
- layout_data (JSONField)
- total_volume (FloatField, auto-calculated)
- usable_space (FloatField)
```

---

## 🎯 NASA Presets Included

1. **NASA Artemis Base Camp**
   - Cylinder shape, 4 crew, 180 days
   - Lunar surface habitat
   - Modules: Life Support, Sleeping, Food Prep, Hygiene

2. **Mars Transit Habitat**
   - Cylinder shape, 6 crew, 270 days
   - Long-duration transit
   - Modules: ECLSS, Sleep Stations, Fitness, Medical

3. **ISS Module**
   - Cylinder shape, 3 crew, 90 days
   - Orbital station
   - Modules: Life Support, Sleep Compartments, Storage

---

## 🔮 Future Enhancements

### Phase 2 (Recommended Next Steps)
- [ ] **Module Placement System**
  - Drag-and-drop 3D module positioning
  - Collision detection
  - Snap-to-grid functionality

- [ ] **Enhanced Validation**
  - Adjacency rules (e.g., hygiene near sleeping)
  - Access path validation
  - Emergency egress requirements

- [ ] **Preset Management**
  - Load NASA presets into editor
  - Modify and save as custom designs
  - Compare with baseline designs

### Phase 3 (Advanced Features)
- [ ] **Multi-level Support**
  - Multiple deck/floor system
  - Vertical access (ladders, stairs)
  - Per-level volume calculations

- [ ] **AI Layout Suggestions**
  - Constraint-based layout generation
  - Optimization for crew efficiency
  - Safety and ergonomics scoring

- [ ] **Export Functionality**
  - Export as `.glb` (3D model)
  - Export as `.json` (data)
  - Generate PDF reports

- [ ] **Collaboration Features**
  - User accounts and authentication
  - Share designs via URL
  - Community gallery
  - Voting and comments

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
```

Current tests:
- Cylinder volume calculation
- Sphere volume calculation

### Frontend Testing
```bash
cd frontend
npm test
```

---

## 🐛 Known Issues / Limitations

1. **Load Functionality** - Currently loads the most recent habitat only
   - Future: Add habitat selection dialog

2. **Module Placement** - Not yet implemented
   - Currently stores module data but doesn't render in 3D

3. **Validation** - Basic volume checks only
   - Future: Add comprehensive NASA constraint validation

4. **Responsive Design** - Optimized for desktop
   - Future: Add mobile/tablet support

---

## 💡 Design Decisions

### Why Django + React?
- **Django**: Robust backend with excellent ORM and admin interface
- **React**: Component-based UI with excellent 3D library support
- **Separation**: Clean API boundary allows independent scaling

### Why Three.js?
- Industry-standard 3D library
- Excellent React integration via @react-three/fiber
- Rich ecosystem of helpers and tools

### Why SQLite?
- Zero configuration for prototype
- Easy to migrate to PostgreSQL for production
- Sufficient for single-user/demo scenarios

---

## 📚 Resources

### Documentation
- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)

### NASA References
- [NASA Human Spaceflight Standards](https://standards.nasa.gov/)
- [Artemis Base Camp Concept](https://www.nasa.gov/artemis)
- [ISS Habitable Volume](https://www.nasa.gov/mission_pages/station/)

---

## 🏆 Challenge Alignment

This project addresses the NASA Space Apps Challenge by:

1. **Educational Value** - Teaches habitat design principles
2. **Accessibility** - Easy-to-use interface for all skill levels
3. **Real-world Application** - Based on actual NASA constraints
4. **Innovation** - Interactive 3D visualization of space habitats
5. **Scalability** - Foundation for advanced features

---

## 👥 Team / Credits

**Built for NASA Space Apps Challenge 2025**

- Full-stack architecture
- Modern web technologies
- NASA-inspired design constraints
- Educational and professional use cases

---

## 📝 License

This project is created for the NASA Space Apps Challenge 2025.
Open for educational and non-commercial use.

---

**Status: ✅ Core Features Complete - Ready for Demo**

Last Updated: 2025-10-04
