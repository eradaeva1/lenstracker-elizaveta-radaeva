import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-screen">
      {/* Background Image */}
      <div className="login-screen__background">
        <img
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b718ad714b-9c76befa5e5b21a79fce.png"
          alt="Close-up of a blue human eye with contact lens"
          className="login-screen__image"
        />
      </div>

      {/* Main Content */}
      <div className="login-screen__content">
        {/* Logo */}
        <div className="logo">
          <i className="fa-solid fa-eye logo__icon"></i>
          <span className="logo__text">LensTracker</span>
        </div>

        {/* Welcome Text */}
        <div className="welcome-text">
          <h1>Welcome Back!</h1>
          <p>Sign in to manage your lenses</p>
        </div>

        {/* Login Form */}
        <div className="login-form">
          <div className="input-group">
            <i className="fa-regular fa-envelope input-icon"></i>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
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
            />
          </div>

          <div className="forgot-password">
            <span className="forgot-password__text">Forgot your password?</span>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="login-btn">Login</button>
            <button className="signup-btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="login-footer">
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
        <span>Need Help?</span>
      </footer>
    </div>
  );
}

export default LoginPage;
