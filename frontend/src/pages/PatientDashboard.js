import React from "react";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh", 
      textAlign: "center"
    }}>
      <h2>Patient Dashboard</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
        <button style={buttonStyle}>
          <Link to="/register-patient" style={linkStyle}>Register</Link>
        </button>
        <button style={buttonStyle}>
          <Link to="/appointments" style={linkStyle}>Appointments</Link>
        </button>
        <button style={buttonStyle}>
          <Link to="/medical-records" style={linkStyle}>Medical Records</Link>
        </button>
        <button style={buttonStyle}>
          <Link to="/get-doctor" style={linkStyle}>View Doctors</Link>
        </button>
      </nav>
    </div>
  );
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  width: "350px", 
  border: "none",
  borderRadius: "5px",
  backgroundColor: "rgba(0,128, 0, 0.8)",
  color: "white",
  cursor: "pointer",
  textAlign: "center"
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  display: "block"
};

export default PatientDashboard;
