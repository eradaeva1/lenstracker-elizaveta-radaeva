import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUpPage.scss";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreedToTerms: false,
    });
  
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value, // Use 'name' to update the correct property
      });
    };
  
    const API_URL = import.meta.env.VITE_API_URL;
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
  
      if (!formData.agreedToTerms) {
        setError("You must agree to the terms and conditions.");
        return;
      }
  
      try {
        const response = await axios.post(
            `${API_URL}/users/signup`,
            {
              username: formData.username,
              email: formData.email,
              password: formData.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );

          console.log('Request Data:', {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          });
  
        if (response.data.success) {
          navigate("/users/login");
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred.");
      }
    };
  
    return (
      <div id="signup" className="signup-container">
        <div className="signup-background">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b718ad714b-cc4c24feadda772adbd2.png"
            alt="Blurred eye with contact lens"
          />
        </div>
  
        <div className="signup-content">
          <header className="signup-header">
            <i className="fa-solid fa-eye"></i>
            <span>LensTracker</span>
          </header>
  
          <main className="signup-card">
            <h1>Join LensTracker</h1>
            <p>Create an account to track your lenses with ease</p>
  
            {error && <p className="error-message">{error}</p>}
  
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <i className="fa-regular fa-user"></i>
                <input
                  type="text"
                  name="username"  
                  placeholder="Please, enter your name"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <div className="input-group">
                <i className="fa-regular fa-envelope"></i>
                <input
                  type="email"
                  name="email"  
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <div className="input-group">
                <i className="fa-regular fa-lock"></i>
                <input
                  type="password"
                  name="password"  
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <div className="input-group">
                <i className="fa-regular fa-lock"></i>
                <input
                  type="password"
                  name="confirmPassword"  
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
  
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  name="agreedToTerms"  
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  required
                />
                <label>
                  I agree to the <span>Terms</span> & <span>Privacy Policy</span>
                </label>
              </div>
  
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
  
              <p className="login-link">
                Already have an account?{" "}
                <span onClick={() => navigate("/users/login")}>Login</span>
              </p>
            </form>
          </main>
  
          <footer className="signup-footer">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Need Help?</span>
          </footer>
        </div>
      </div>
    );
  };
  
  export default SignUpPage;