import React, { useState } from "react";
import axios from "axios";

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    medical_history: "",
  });

  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await axios.post("http://localhost:5000/api/patients", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(response.data.message);
      setFormData({
        user_id: "",
        name: "",
        age: "",
        gender: "",
        contact: "",
        address: "",
        medical_history: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.error || "Error registering patient.");
    }
  };

  return (
<div style={{ maxWidth: "400px", margin: "auto", textAlign: "center", padding: "50px" ,justifyContent:"center"}}>
<h2>Register Patient</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text"style={styles.inputField} name="user_id" placeholder="User ID" value={formData.user_id} onChange={handleChange} required />
        <input type="text"style={styles.inputField} name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="number" style={styles.inputField}name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <select name="gender"style={styles.inputField} value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="text"style={styles.inputField} name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <input type="text"style={styles.inputField} name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <textarea name="medical_history"style={styles.inputField} placeholder="Medical History" value={formData.medical_history} onChange={handleChange}></textarea>
        <button type="submit" style={{ padding: "5px",fontSize: "12px", cursor: "pointer",width: "100px",display: "block",margin: "10px auto"}}>Register
</button>
      </form>
    </div>
  );
};
// Simple styling
const styles = { inputField: {width: "auto",padding:"5px 10px",margin: "10px 5px",border:"1px solid #ccc",borderRadius: "5px",fontSize: "12px"},
  form: { display: "flex", flexDirection: "column", gap: "5px" },
  message: { color: "green", fontWeight: "bold" }
};

export default PatientRegistration;
