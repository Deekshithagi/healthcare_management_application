import React, { useState } from "react";
import axios from "axios";

const DoctorMedical = () => {
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    diagnosis: "",
    prescription: "",
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/medical-records", // Adjust as needed
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Medical record added successfully!");

      // Reset form fields and clear the message
      setFormData({
        patient_id: "",
        doctor_id: "",
        diagnosis: "",
        prescription: "",
      });

      setMessage(""); // Clear the message after form reset

    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.error || "Failed to add medical record.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Medical Record</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="patient_id"
          placeholder="Patient ID"
          value={formData.patient_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="doctor_id"
          placeholder="Doctor ID"
          value={formData.doctor_id}
          onChange={handleChange}
          required
        />
        <textarea
          name="diagnosis"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          required
        />
        <textarea
          name="prescription"
          placeholder="Prescription"
          value={formData.prescription}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.submitButton}>Add Record</button>
      </form>

      {/* Message will only show if it's not empty */}
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  message: {
    marginTop: "10px",
    color: "green",
  },
};

export default DoctorMedical;
