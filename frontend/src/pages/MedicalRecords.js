import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setPatientId(decodedToken.id); 
      } catch (error) {
        console.error("Error decoding token:", error);
        setError("Invalid authentication token.");
      }
    } else {
      setError("No authentication token found.");
    }
  }, []);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      if (!patientId) return; 

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/medical-records/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRecords(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching medical records.");
      }
    };

    fetchMedicalRecords();
  }, [patientId]);

  return (
    <div style={styles.container}>
      <h2>Medical Records</h2>
      {error && <p style={styles.error}>{error}</p>}
      {records.length > 0 ? (
        <ul style={styles.list}>
          {records.map((record) => (
            <li key={record.id} style={styles.listItem}>
              <strong>Doctor ID:</strong> {record.doctor_id} <br />
              <strong>Diagnosis:</strong> {record.diagnosis} <br />
              <strong>Prescription:</strong> {record.prescription}
            </li>
          ))}
        </ul>
      ) : (
        <p>No medical records found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
    padding: "60px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

export default MedicalRecords;
