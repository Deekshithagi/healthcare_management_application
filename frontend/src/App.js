import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import PatientRegister from "./pages/PatientRegister";
import DoctorDashboard from "./pages/DoctorDashboard";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorMedical from "./pages/DoctorMedical";
import DoctorAppointment from "./pages/DoctorAppointment";
import GetDoctor from "./pages/GetDoctor";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/register-patient" element={<PatientRegister />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/register-doctor" element={<DoctorRegister />} />
        <Route path="/doctor-medicalrecords" element={<DoctorMedical/>} />
        <Route path="/doctor-appointments" element={<DoctorAppointment/>} />
        <Route path="/get-doctor" element={<GetDoctor/>}/>
      </Routes>
    </Router>
  );
}

export default App;
