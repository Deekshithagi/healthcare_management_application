import React, { useState, useEffect } from "react";
import axios from "axios";

const Appointments = () => {
  const [view, setView] = useState("home"); 
  const [formData, setFormData] = useState({ doctor_id: "", appointment_date: "", reason: "" });
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState("");

  useEffect(() => {
    if (view === "view" || view === "cancel") {
      fetchAppointments();
    }
  }, [view]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/appointments", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Appointment booked successfully!");
      setView("home"); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = async () => {
    if (!selectedAppointment) {
      alert("Please enter an appointment ID.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");  
      const response = await axios.delete(`http://localhost:5000/api/appointments/${selectedAppointment}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert(response.data.message); 
      fetchAppointments();
      setSelectedAppointment(""); 
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.error || "Failed to cancel appointment.");
    }
  };
  

  return (
    <div style={styles.container}>
      <h2>Appointments</h2>

    
      {view === "home" && (
        <div style={styles.nav}>
          <button onClick={() => setView("book")} style={styles.button}> Book Appointment</button>
          <button onClick={() => setView("view")} style={styles.button}>View Appointments</button>
          <button onClick={() => setView("cancel")} style={styles.button}> Cancel Appointment</button>
        </div>
      )}

      
      {view === "book" && (
        <div>
          <h3>Book an Appointment</h3>
          <form onSubmit={handleBook} style={styles.form}>
            <input type="text" name="doctor_id" placeholder="Doctor ID" onChange={handleChange} required />
            <input type="date" name="appointment_date" onChange={handleChange} required />
            <input type="text" name="reason" placeholder="Reason for appointment" onChange={handleChange} required />
            <button type="submit" style={styles.submitButton}>Book</button>
          </form>
          <button onClick={() => setView("home")} style={styles.backButton}> Back</button>
        </div>
      )}

      
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
          <button onClick={() => setView("home")} style={styles.backButton}> Back</button>
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
         Back
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
    padding: "10px", 
    gap: "15px" ,
    display: "block" ,
    alignItems:"center" ,
    backgroundColor:"rgba(255, 255, 255, 0.8)",


  },

  nav: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "50px",   
    alignItems: "center",
    marginBottom: "30px",
  },

  button: { 
    padding: "12px", 
    width: "220px", 
    background: "rgba(0,128,0,0.7)", 
    color: "white", 
    border: "none", 
    cursor: "pointer", 
    borderRadius: "5px",
    fontSize: "16px",
    marginBottom: "15px" 
  },

  form: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "25px", 
    width: "350px", 
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd", 
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    marginBottom: "30px" 
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
      
  },

  list: { 
    listStyle: "none", 
    padding: 0, 
    marginBottom: "30px" 
  },

  listItem: { 
    padding: "15px", 
    borderBottom: "1px solid #ddd", 
    textAlign: "left", 
    margin: "auto", 
    width: "350px",
    backgroundColor: "#fffff",
    borderRadius: "8px",
    marginBottom: "10px", 
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
