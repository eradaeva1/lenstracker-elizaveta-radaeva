import React from "react";
import "./Header.scss";
import accountCircle from "../../assets/logos/account-red.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 className="header__logo">LensTracker</h1>
      <div className="header__actions">
        <button className="header__icon-button">
          <img src={accountCircle} className="fa-regular fa-bell" onClick={() => navigate("/users/login")}></img>
        </button>
        {/* <img
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
          alt="User"
          className="header__avatar"
        /> */}
      </div>
    </header>
  );
};

export default Header;
