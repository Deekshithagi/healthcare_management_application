import React from "react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh", 
      textAlign: "center"
    }}>
      <h2>Doctor Dashboard</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
        <button style={buttonStyle}>
          <Link to="/register-doctor" style={linkStyle}>Register</Link>
        </button>
        <button style={buttonStyle}>
          <Link to="/doctor-appointments" style={linkStyle}>Appointments</Link>
        </button>
        <button style={buttonStyle}>
          <Link to="/doctor-medicalrecords" style={linkStyle}>Medical Records</Link>
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
  backgroundColor: "skyblue",
  color: "white",
  cursor: "pointer",
  textAlign: "center"
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  display: "block"
};

export default DoctorDashboard;
