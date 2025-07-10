import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch doctor’s appointments
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/appointments/doctor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load appointments.");
      setLoading(false);
    }
  };

  // Update appointment status (Approve/Reject)
  const updateStatus = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/appointments/${appointmentId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Appointment ${status} successfully!`);
      fetchAppointments(); // Refresh appointment list
    } catch (error) {
      alert("Failed to update appointment status.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Booked Appointments</h2>
      {loading && <p>Loading appointments...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && appointments.length === 0 && <p>No appointments found.</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patient_id}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.reason}</td>
              <td style={styles.status}>{appointment.status}</td>
              <td>
                {appointment.status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(appointment.id, "approved")} style={styles.approveBtn}>
                      Approve
                    </button>
                    <button onClick={() => updateStatus(appointment.id, "rejected")} style={styles.rejectBtn}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// CSS Styles
const styles = {
  container: { maxWidth: "800px", margin: "auto", textAlign: "center", padding: "20px" },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  status: { fontWeight: "bold" },
  approveBtn: { padding: "5px 10px", margin: "5px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer" },
  rejectBtn: { padding: "5px 10px", margin: "5px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" },
  error: { color: "red" },
};

export default DoctorAppointments;
