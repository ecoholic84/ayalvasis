import React, { useState } from "react";

function WelcomePopup() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h1 style={styles.title}>🚀 Welcome to Habitat Creator 🚀</h1>
        <p style={styles.text}>
          Design your own space habitat and explore layout options.
        </p>
        <button style={styles.button} onClick={() => setShow(false)}>
          Let's Go!
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 50, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.5s",
  },
  modal: {
    backgroundColor: "#0b0c10",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
    minWidth: "350px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.7)",
    color: "#fff",
    transform: "scale(0.8)",
    animation: "zoomIn 0.5s forwards",
  },
  title: {
    fontSize: "38px",
    marginBottom: "15px",
    color: "#00ffff",
    textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff",
  },
  text: {
    fontSize: "26px",
    marginBottom: "25px",
    color: "#d1d1d1",
  },
  button: {
    padding: "12px 25px",
    backgroundColor: "#ff6f61",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(255, 111, 97, 0.5)",
    transition: "all 0.3s ease",
  },
};

// Add hover effect using inline style
styles.button = {
  ...styles.button,
  ":hover": {
    backgroundColor: "#ff4c3b",
    transform: "scale(1.05)",
    boxShadow: "0 6px 20px rgba(255, 111, 97, 0.7)",
  },
};

export default WelcomePopup;
