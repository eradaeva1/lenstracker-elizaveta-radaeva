import React from "react";
import { useNavigate} from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/")
  }

  const handleSave = () => {
    navigate ("/reminders");
  }
  return (
  <footer className="footer">
    <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
    <button className="save-btn" onClick={handleSave}>Save</button>
  </footer>
);
}

export default Footer;
