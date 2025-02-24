import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuickActions.scss";
import homeIcon from "../../assets/logos/home-red.svg";
import newLogIcon from "../../assets/logos/add-red.svg";
import remindersIcon from "../../assets/logos/bell-red.svg";
import aiHelpIcon from "../../assets/logos/robot-red.svg";
import settingsIcon from "../../assets/logos/settings-red.svg";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <nav className="quick-actions">
      <button
        className="quick-actions__button quick-actions__button--active"
        onClick={() => navigate("/")}
      >
        <img src={homeIcon} alt="home" className="quick-actions__icon"></img>
        <span className="quick-actions__label">Home</span>
      </button>
      <button
        className="quick-actions__button"
        onClick={() => navigate("/lenses")}
      >
        <img
          src={newLogIcon}
          alt="New Log"
          className="quick-actions__icon"
        ></img>
        <span className="quick-actions__label">New Log</span>
      </button>
      <button
        className="quick-actions__button"
        onClick={() => navigate("/reminders")}
      >
        <img
          src={remindersIcon}
          alt="Reminders icon"
          className="quick-actions__icon"
        ></img>
        <span className="quick-actions__label">Reminders</span>
      </button>
      <button className="quick-actions__button">
        <img
          src={aiHelpIcon}
          alt="Help Icon"
          className="quick-actions__icon"
          onClick={() => navigate("/ask-gemini")}
        ></img>
        <span className="quick-actions__label">AI Help</span>
      </button>
      {/* <button className="quick-actions__button">
        <img src={settingsIcon} alt="setting Icon" className="quick-actions__icon"></img>
        <span className="quick-actions__label">Settings</span>
      </button> */}
    </nav>
  );
}

export default QuickActions;
