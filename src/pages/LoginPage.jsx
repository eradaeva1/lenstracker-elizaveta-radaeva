import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./LoginPage.scss";

const API_URL = "http://localhost:5000"; 

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(""); // To show login errors
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      try {
        // Send login request to the backend
        const response = await axios.post(`${API_URL}/users/login`, formData);
  
        console.log("Server response:", response.data); // Log the entire response
  
        if (response.data.token) {
          // Store token and user data in localStorage
          localStorage.setItem("jwt", response.data.token); // Save JWT token as 'jwt'
          localStorage.setItem("user", JSON.stringify(response.data.user.id)); // Save user data
  
          navigate("/"); // Redirect to home 
        } else {
          setError("Token not found in response"); // If no token is received
        }
      } catch (error) {
        console.error("Login error:", error);
        setError(error.response?.data?.error || "Invalid login credentials");
      }
    };
  
    return (
      <div className="login-screen">
        <div className="login-screen__background">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b718ad714b-9c76befa5e5b21a79fce.png"
            alt="Close-up of a blue human eye with contact lens"
            className="login-screen__image"
          />
        </div>
  
        <div className="login-screen__content">
          <div className="logo">
            <i className="fa-solid fa-eye logo__icon"></i>
            <span className="logo__text">LensTracker</span>
          </div>
  
          <div className="welcome-text">
            <h1>Welcome Back!</h1>
            <p>Sign in to manage your lenses</p>
          </div>
  
          <form className="login-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>}
  
            <div className="input-group">
              <i className="fa-regular fa-envelope input-icon"></i>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
  
            <div className="input-group">
              <i className="fa-regular fa-lock input-icon"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
  
            <div className="forgot-password">
              <span className="forgot-password__text">Forgot your password?</span>
            </div>
  
            <div className="action-buttons">
              <button className="login-btn" type="submit">Login</button>
              <button className="signup-btn" onClick={() => navigate("/users/signup")}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
  
        <footer className="login-footer">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Need Help?</span>
        </footer>
      </div>
    );
  }
  
  export default LoginPage;