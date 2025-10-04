// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";


import Home from "./Components/Home";
import WelcomePopup from "./Components/Welcomepopup";


function App() {
  return (
    <div>

      <WelcomePopup />


      <div style={{ paddingTop: "80px" }}>

      </div>
    </div>
  );
}

export default App;
