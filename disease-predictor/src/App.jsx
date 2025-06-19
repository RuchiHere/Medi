import React, { useState } from "react";
import PredictForm from "./components/PredictForm";
import Sidebar from "./components/Sidebar";
import UserBox from "./components/UserBox";
import "./App.css";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = (user) => {
    setUserInfo(user);
  };

  const handleLogout = () => {
    setUserInfo(null);
  };

  return (
    <>
      {/* ✅ Header */}
      <div id="home" style={{
        backgroundColor: "#2e7d32",
        color: "white",
        padding: "1rem",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ margin: 0 }}>MediPredict</h1>
        <p style={{ marginTop: "4px", fontSize: "1rem", fontWeight: 300 }}>
          Smart Disease Predictor Using Machine Learning
        </p>
      </div>

      {/* ✅ Navigation Bar */}
      <nav style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#c8e6c9",
        padding: "0.75rem",
        borderBottom: "1px solid #2e7d32"
      }}>
        <a href="#home" style={linkStyle}>Home</a>
        <a href="#about" style={linkStyle}>About</a>
        <a href="#contact" style={linkStyle}>Contact</a>
      </nav>

      {/* ✅ Main layout */}
      <div className="app-container">
        {userInfo ? (
          <>
            <Sidebar userInfo={userInfo} onLogout={handleLogout} />
            <div className="main-content">
              {/* ✅ Centered Prediction Form */}
              <div id="predict" className="centered-form-wrapper">
                <PredictForm />
              </div>

              {/* ✅ About Section */}
              <section id="about" style={sectionStyle}>
                <h2>About MediPredict</h2>
                <p>
                  MediPredict is a medical web app that helps users predict diseases based on symptoms using a trained Machine Learning model (Random Forest).
                  It simplifies early diagnosis and helps users understand potential illnesses based on their inputs.
                </p>
              </section>

              {/* ✅ Contact Section */}
              <section id="contact" style={sectionStyle}>
                <h2>Contact Us</h2>
                <p>Email: medipredict.support@gmail.com</p>
                <p>Phone: +91-9876543210</p>
              </section>

              {/* ✅ Footer */}
              <footer className="footer">
                <h4>Product Info</h4>
                <p>MediPredict — Disease Prediction using ML (Model: Random Forest)</p>
              </footer>
            </div>
          </>
        ) : (
          <UserBox onLogin={handleLogin} />
        )}
      </div>
    </>
  );
}

export default App;

// ✅ Styling objects
const linkStyle = {
  margin: "0 1rem",
  color: "#2e7d32",
  textDecoration: "none",
  fontWeight: "bold",
};

const sectionStyle = {
  padding: "2rem",
  backgroundColor: "#e8f5e9",
  borderTop: "1px solid #ccc",
  marginTop: "1rem",
};
