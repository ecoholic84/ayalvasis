# 🛰️ Habitat Layout Creator

**NASA Space Apps Challenge 2025**

A full-stack web application for designing and visualizing space habitats for lunar, Martian, or orbital missions. Built with React + Three.js (frontend) and Django REST Framework (backend).

---

## 🎯 Features

### Core Functionalities
- **Interactive 3D Visualization** - Real-time habitat rendering with Three.js
- **Multiple Habitat Shapes** - Cylinder, Sphere, Dome, Torus, Cube
- **Mission Configuration** - Set crew size, mission duration, and destination (Moon/Mars/Orbit)
- **Volume Calculations** - Auto-calculate total volume and per-crew space
- **Validation Engine** - Real-time feedback on NASA volume/spacing constraints
- **Data Persistence** - Save and load habitat designs via REST API
- **NASA Presets** - Pre-configured layouts based on real mission designs

### UI Features
- Space-themed dark UI with neon blue highlights
- Sidebar controls for habitat configuration
- Bottom metrics bar showing real-time statistics
- Interactive 3D camera controls (orbit, zoom, pan)

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

1. **Configure Your Habitat**
   - Use the sidebar to select shape, mission type, crew size, and dimensions
   - Watch the 3D visualization update in real-time

2. **Monitor Metrics**
   - Check the bottom bar for volume calculations and validation status
   - Green ✅ = meets NASA constraints
   - Red ❌ = insufficient space per crew member

3. **Save Your Design**
   - Click "💾 Save Habitat" to persist your design to the database
   - Click "📂 Load Habitat" to retrieve saved designs

4. **Explore Presets**
   - Load NASA preset layouts for inspiration
   - Modify and save your own variations

---

## 🌟 Future Enhancements

- [ ] Drag-and-drop module placement in 3D space
- [ ] Multi-level/deck support
- [ ] AI-powered layout suggestions
- [ ] Export designs as `.glb` or `.json`
- [ ] Comparison with NASA Artemis Base Camp
- [ ] Social sharing of layouts
- [ ] Advanced validation rules (adjacency, access paths)

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