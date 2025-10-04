# 🚀 Quick Start Guide

## Step 1: Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start Django server
python manage.py runserver
```

✅ Backend should now be running at `http://localhost:8000`

---

## Step 2: Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

✅ Frontend should automatically open at `http://localhost:3000`

---

## Step 3: Test the Application

1. **Create a Habitat:**
   - Use the sidebar to configure your habitat
   - Select shape: Cylinder, Sphere, Dome, Torus, or Cube
   - Set crew size and mission parameters
   - Adjust dimensions

2. **View 3D Visualization:**
   - The 3D scene updates in real-time
   - Use mouse to orbit, zoom, and pan
   - Watch the metrics bar for validation feedback

3. **Save Your Design:**
   - Click "💾 Save Habitat"
   - Your design is persisted to the Django backend

4. **Load Saved Designs:**
   - Click "📂 Load Habitat"
   - Retrieve your previously saved designs

---

## Troubleshooting

### Backend Issues
- **Port already in use:** Change port with `python manage.py runserver 8001`
- **Module not found:** Ensure virtual environment is activated and dependencies installed

### Frontend Issues
- **Port 3000 in use:** React will prompt to use another port
- **Module not found:** Run `npm install` again
- **CORS errors:** Ensure backend is running and CORS settings are correct

---

## API Testing

You can test the API directly:

```bash
# List all habitats
curl http://localhost:8000/api/habitats/

# Get NASA presets
curl http://localhost:8000/api/habitats/presets/

# Create a habitat (POST)
curl -X POST http://localhost:8000/api/habitats/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Habitat",
    "shape": "cylinder",
    "crew_size": 4,
    "mission_type": "moon",
    "dimension_x": 10,
    "dimension_y": 10,
    "dimension_z": 10
  }'
```

---

## Next Steps

- Explore different habitat shapes and configurations
- Check out the NASA presets for inspiration
- Experiment with crew sizes and mission durations
- Monitor the validation feedback for NASA compliance

---

**Happy Building! 🛰️**
