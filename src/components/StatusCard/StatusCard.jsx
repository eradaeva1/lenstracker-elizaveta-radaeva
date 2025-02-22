import React from "react";
import "./StatusCard.scss";
import clockWhite from "../../assets/logos/clock-white.svg";
import eyeWhite from "../../assets/logos/eye-white.svg";
import calendarWhite from "../../assets/logos/calendar-white.svg";


const StatusCard = ({icon, modifier}) => {
  return (
    <>
    <div className={`status-cards ${modifier || ""}`}>
    <article className="status-card">
      <div className="status-card__icon">
        <img src={clockWhite} className={icon}></img>
      </div>
      <div className="status-card__content">
        <h3 className="status-card__title">Current Status</h3>
        <p className="status-card__description">Lenses due for removal in 3 hours</p>
      </div>
      </article>
      <article className="status-card">
      <div className="status-card__icon">
        <img src={calendarWhite} className={icon}></img>
      </div>
      <div className="status-card__content">
        <h3 className="status-card__title">Next Replacement</h3>
        <p className="status-card__description">Due in 2 days</p>
      </div>
      </article>
      <article className="status-card">
      <div className="status-card__icon">
        <img src={eyeWhite} className={icon}></img>
      </div>
      <div className="status-card__content">
        <h3 className="status-card__title">Today's Usage</h3>
        <p className="status-card__description">You wore your lenses for 8 hours</p>
      </div>
      </article>
     </div>
    </>
  );
};

export default StatusCard;

