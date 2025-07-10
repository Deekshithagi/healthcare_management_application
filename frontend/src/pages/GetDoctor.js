import React, { useEffect, useState } from "react";
import axios from "axios";

const GetDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token"); // Get JWT token
        const response = await axios.get("http://localhost:5000/api/getdoctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(response.data.doctors); // Store doctors data
      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch doctors.");
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>
      <h2>Available Doctors</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {doctors.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Experience (Years)</th>
              <th>Specialization</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.experience}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No doctors available.</p>
      )}
    </div>
  );
};

export default GetDoctor;
