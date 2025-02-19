import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__logo">LensTracker</h1>
      <div className="header__actions">
        <button className="header__icon-button">
          <i className="fa-regular fa-bell"></i>
        </button>
        <img
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
          alt="User"
          className="header__avatar"
        />
      </div>
    </header>
  );
};

export default Header;
