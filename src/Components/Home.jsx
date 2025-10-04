import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      
      <div style={{ paddingTop: "80px", textAlign: "center" }}>
        <h1>Welcome to Space Habitat 🚀</h1>
        <p>Select a page from the navigation above.</p>
        <Routes>
          {/* You can add routes later, e.g.: 
          <Route path="/builder" element={<HabitatBuilder />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
