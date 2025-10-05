import React, { useState, useEffect } from "react";

function WelcomePopup() {
  const [show, setShow] = useState(true);
  const [bgIndex, setBgIndex] = useState(0);

  const images = [
    "https://www.ces.tech/media/ibqdfluu/how-an-inflatable-habitat-will-sustain-life-in-space-600x334png-ext.png?width=1200&height=600&bgcolor=white",
    "https://media.istockphoto.com/id/1423440263/video/astronaut-in-outer-space-against-the-planet-earth.jpg?s=640x640&k=20&c=Fv8S7mtKwcmU4WlQF1NaAqyC0ghS_eDrOYgs9Ma1U_c=",
    "https://magazine.impactscool.com/wp-content/uploads/2019/11/astronaut-1946806_1920-800x540.jpg",
    "https://cdn.mos.cms.futurecdn.net/wMJghVUrwqTjuM4rkDQTrP-1200-80.jpg",
    "https://i.insider.com/5c7a398ebde70f7ba179fc57?width=700",
  ];

  // Change background every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        ...styles.overlay,
        backgroundImage: `url(${images[bgIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div style={styles.modal}>
        <h1 style={styles.title}>🚀 Welcome to Habitat Creator 🚀</h1>
        <p style={styles.text}>
          Design your own space habitat and explore layout options.
        </p>
        <button
          style={styles.button}
          onClick={() => setShow(false)}
          onMouseOver={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #00ffff, #0077ff)";
            e.currentTarget.style.boxShadow =
              "0 0 20px #00ffff, 0 0 40px #0077ff";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #ff6f61, #ff2e63)";
            e.currentTarget.style.boxShadow =
              "0 0 10px rgba(255,111,97,0.6)";
          }}
        >
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    overflow: "hidden",
  },
  modal: {
    background:
      "linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(10, 10, 40, 0.8))",
    border: "2px solid rgba(0, 255, 255, 0.3)",
    borderRadius: "20px",
    padding: "40px 50px",
    textAlign: "center",
    boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)",
    color: "#fff",
    animation: "fadeIn 1s ease-in-out",
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "20px",
    background: "linear-gradient(90deg, #00ffff, #ff00ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 15px rgba(255,255,255,0.6)",
  },
  text: {
    fontSize: "24px",
    color: "#e0e0e0",
    marginBottom: "30px",
    textShadow: "0 0 10px rgba(255,255,255,0.5)",
  },
  button: {
    padding: "12px 30px",
    background: "linear-gradient(90deg, #ff6f61, #ff2e63)",
    color: "#fff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: "1px",
    boxShadow: "0 0 10px rgba(255,111,97,0.6)",
    transition: "all 0.3s ease",
  },
};

export default WelcomePopup;
