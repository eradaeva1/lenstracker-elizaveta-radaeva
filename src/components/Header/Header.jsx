import React from "react";
import "./Header.scss";
import bellGrey from "../../assets/logos/bell-grey.svg";
import { useNavigate } from "react-router-dom";
import redLogo from "../../assets/logos/eye-red.svg";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      
      <img
        src={redLogo}
        className="fa-regular"
        onClick={() => navigate("/")}
      ></img><h1 className="header__logo">LensTracker</h1>
      <div className="header__actions">
        <button className="header__icon-button">
          {/* <img
            src={bellGrey}
            className="fa-regular fa-bell"
            onClick={() => navigate("/users/login")}
          ></img> */}
        </button>
        <img
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
          alt="User"
          className="header__avatar"
          onClick={() => navigate("/users/login")}
        />
      </div>
    </header>
  );
};

export default Header;
