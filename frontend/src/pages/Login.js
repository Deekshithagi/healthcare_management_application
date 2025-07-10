import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        alert("Login Successful!");

        if (response.data.role === "patient") {
          navigate("/patient-dashboard");
        } else if (response.data.role === "doctor") {
          navigate("/doctor-dashboard");
        } else {
          alert("Invalid credentials");
        }
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login failed! Check credentials.");
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "auto",
      padding: "40px",
      textAlign: "center",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "2px 2px 10px rgba(0,0,0,1)",
      backgroundColor:"rgba(255, 255, 255, 0.7)",
    },
    input: {
      width: "90%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      width: "auto",
      padding: "5px 20px",
      marginTop: "10px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    link: {
      marginTop: "10px",
      display: "block",
      textDecoration: "none",
      color: "#007bff",
    },
  };

  return (
    <div style={styles.background}> 
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;
