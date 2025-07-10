import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointments = () => {
  const [view, setView] = useState("home"); // Controls which section is displayed
  const [formData, setFormData] = useState({ doctor_id: "", appointment_date: "", reason: "" });
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState("");

  // Fetch appointments when "View Appointments" or "Cancel Appointment" is selected
  useEffect(() => {
    if (view === "view" || view === "cancel") {
      fetchAppointments();
    }
  }, [view]);

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/appointments/patient", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Book an appointment
  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/appointments", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Appointment booked successfully!");
      setView("home"); // Redirect back to home
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Cancel an appointment
  const handleCancel = async () => {
    if (!selectedAppointment) {
      alert("Please enter an appointment ID.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token"); // Retrieve JWT token
      const response = await axios.delete(`http://localhost:5000/api/appointments/${selectedAppointment}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert(response.data.message); // Show success message
      fetchAppointments(); // Refresh appointments after deletion
      setSelectedAppointment(""); // Clear input field
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.error || "Failed to cancel appointment.");
    }
  };
  

  return (
    <div style={styles.container}>
      <h2>Appointments</h2>

      {/* Navigation Buttons */}
      {view === "home" && (
        <div style={styles.nav}>
          <button onClick={() => setView("book")} style={styles.button}>📅 Book Appointment</button>
          <button onClick={() => setView("view")} style={styles.button}>📋 View Appointments</button>
          <button onClick={() => setView("cancel")} style={styles.button}>❌ Cancel Appointment</button>
        </div>
      )}

      {/* Book Appointment Section */}
      {view === "book" && (
        <div>
          <h3>Book an Appointment</h3>
          <form onSubmit={handleBook} style={styles.form}>
            <input type="text" name="doctor_id" placeholder="Doctor ID" onChange={handleChange} required />
            <input type="date" name="appointment_date" onChange={handleChange} required />
            <input type="text" name="reason" placeholder="Reason for appointment" onChange={handleChange} required />
            <button type="submit" style={styles.submitButton}>Book</button>
          </form>
          <button onClick={() => setView("home")} style={styles.backButton}>🔙 Back</button>
        </div>
      )}

      {/* View Appointments Section */}
      {view === "view" && (
        <div>
          <h3>Your Appointments</h3>
          <ul style={styles.list}>
            {appointments.length > 0 ? appointments.map((appt) => (
              <li key={appt.id} style={styles.listItem}>
                <strong>Doctor:</strong> {appt.doctor_id} <br />
                <strong>Date:</strong> {appt.appointment_date} <br />
                <strong>Reason:</strong> {appt.reason} <br />
                <strong>Status:</strong> {appt.status}
              </li>
            )) : <p>No appointments found.</p>}
          </ul>
          <button onClick={() => setView("home")} style={styles.backButton}>🔙 Back</button>
        </div>
      )}
      
   {view === "cancel" && (
  <div>
    <h3>Cancel Appointment</h3>
    <div style={{ display: "flex", gap: "15px", alignItems: "center",marginLeft:"35%" }}>
      <input 
        type="text" 
        placeholder="Enter Appointment ID to cancel" 
        onChange={(e) => setSelectedAppointment(e.target.value)} 
        style={styles.inputField}
      />
      <button onClick={handleCancel} style={styles.cancelButton} disabled={!selectedAppointment}>
        Cancel Appointment
      </button>
      <button onClick={() => setView("home")} style={styles.backButton}>
        🔙 Back
      </button>
    </div>
  </div>
)}

</div>
  );
};

const styles = {
  container: { 
    textAlign: "center", 
    marginTop: "50px",
    padding: "10px",// Adds space inside the container
    gap: "15px" ,
    display: "block" ,
    alignItems:"center" // Ensures elements stack properly


  },

  nav: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "50px",   // Increased gap for better spacing
    alignItems: "center",
    marginBottom: "30px", // Space below navigation buttons
  },

  button: { 
    padding: "12px", 
    width: "220px", 
    background: "#007bff", 
    color: "white", 
    border: "none", 
    cursor: "pointer", 
    borderRadius: "5px",
    fontSize: "16px",
    marginBottom: "15px" // Adds space between buttons
  },

  form: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "25px", 
    width: "350px", 
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd", // Adds a light border
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    marginBottom: "30px" // Space between forms and next section
  },

  submitButton: { 
    background: "#28a745", 
    color: "white", 
    padding: "12px", 
    cursor: "pointer", 
    border: "none", 
    borderRadius: "5px",
    fontSize: "16px",
  },

  backButton: { 
    background: "#6c757d", 
    color: "white", 
    padding: "10px", 
    cursor: "pointer", 
    border: "none", 
    borderRadius: "5px", 
    marginTop: "20px",
    fontSize: "12px",
      // More spacing above the button
  },

  list: { 
    listStyle: "none", 
    padding: 0, 
    marginBottom: "30px" // Adds space between appointment list and next section
  },

  listItem: { 
    padding: "15px", 
    borderBottom: "1px solid #ddd", 
    textAlign: "left", 
    margin: "auto", 
    width: "350px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    marginBottom: "10px", // Adds space between items
  },

  inputField: { 
    width: "210px", 
    padding: "10px", 
    marginTop: "10px", 
    border: "1px solid #ccc", 
    borderRadius: "5px",
  },

  cancelButton: { 
    background: "red", 
    color: "white", 
    padding: "10px", 
    cursor: "pointer", 
    border: "none", 
    borderRadius: "5px", 
    marginTop: "20px",
    fontSize: "12px",
  },
};


export default Appointments;
