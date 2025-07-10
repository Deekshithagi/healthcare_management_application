import React, { useState } from "react";
import axios from "axios";

const DoctorRegistration = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    specialization: "",
    experience: "",
    contact: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post("http://localhost:5000/api/doctors", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(response.data.message);
      setFormData({
        user_id: "",
        specialization: "",
        experience: "",
        contact: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.error || "Error registering doctor.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register Doctor</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" style={styles.inputField} name="user_id" placeholder="User ID" value={formData.user_id} onChange={handleChange} required />
        <input type="text" style={styles.inputField} name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} required />
        <input type="number" style={styles.inputField} name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} required />
        <input type="text" style={styles.inputField} name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "auto", textAlign: "center", padding: "50px" },
  inputField: { width: "auto", padding: "10px 10px", margin: "10px 5px", border: "2px solid #ccc", borderRadius: "5px", fontSize: "12px" },
  form: { display: "flex", flexDirection: "column", gap: "5px" },
  button: { padding: "5px", fontSize: "12px", cursor: "pointer", width: "100px", display: "block", margin: "10px auto",backgroundColor: "#4CAF50"},
  message: { color: "green", fontWeight: "bold" },
};

export default DoctorRegistration;
