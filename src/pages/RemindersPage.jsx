import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RemindersPage.scss";
import whiteAdd from "../../src/assets/logos/plus-white.svg";
import trashGrey from "../../src/assets/logos/trash-grey.svg";
import arrowGrey from "../../src/assets/logos/arrow-grey.svg";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const API_URL = import.meta.env.VITE_API_URL;

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwt");
const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("jwt");
    // You can check if the token is null or invalid here
    if (!token) {
      console.error("No JWT token found");
    }
    const fetchReminders = async () => {
      try {
        const response = await axios.get(`${API_URL}/reminders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReminders(response.data);
      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReminders();
  }, [token]);

  const addReminder = () => {
    setShowModal(true);
  };

  const handleSaveReminder = async (newReminder) => {
    try {
      const userId = getUserIdFromToken(token);
      newReminder.user_id = userId;

      const response = await axios.post(`${API_URL}/reminders`, newReminder, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReminders([...reminders, response.data]);
      setShowModal(false); // Close the modal after saving
    } catch (error) {
      console.error("Error adding reminder:", error);
    }
  };

  // Helper function to extract user_id from JWT token
  const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.id; // Assuming the token contains the user ID
    } catch (e) {
      console.error("Error decoding token:", e);
      return null;
    }
  };

  const deleteReminder = async (id) => {
    try {
      await axios.delete(`${API_URL}/reminders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReminders(reminders.filter((reminder) => reminder.id !== id));
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  const formatDateTime = (dateString, timeString) => {
    try {
      const date = new Date (dateString);
      const formattedDate = format(date, "MMMM dd, yyyy");

      let formattedTime ="";
      if (timeString) {
        const time = new Date(`${dateString}T${timeString}`);
        formattedTime = format(time, "hh:mm a");
      }
      return `${formattedDate} ${formattedTime}`.trim();
    } catch (error){
      console.error("Error formatting date/time:", error)
      return dateString;
    }
  }

  return (
    <div className="reminders-screen">
      <header className="header">
      
      <h1 className="reminders-header"><img src={arrowGrey} alt="go back" className="arrow-back" onClick={() => navigate("/")}></img>Your Reminders</h1>
        <button className="add-button" onClick={addReminder}>
          <img src={whiteAdd} className="fa-solid fa-plus" alt="add"></img>
        </button>
      </header>

      <main className="reminders-list">
        {loading ? (
          <p>Loading...</p>
        ) : reminders.length === 0 ? (
          <div className="reminder no-reminders">
            <i className="fa-solid fa-info-circle text-gray-400"></i>
            <div>
              <h3>No Reminders</h3>
              <p>Add reminders to track your lens care.</p>
            </div>
          </div>
        ) : (
          reminders.map((reminder) => (
            <div key={reminder.id} className="reminder">
              <div className="reminder-content">
                <i
                  className={`fa-solid ${
                    reminder.status === "pending"
                      ? "fa-exclamation-circle text-red-500"
                      : "fa-check-circle text-gray-400"
                  }`}
                ></i>
                <div>
                  <h3 className="reminder__title">{reminder.title}</h3>
                  <p>{reminder.message}</p>
                  <p className="reminder__detail">
                    {formatDateTime(reminder.reminder_time)} {/* Display reminder time */}
                  </p>
                  {/* <p>{reminder.reminder_date}</p> Display reminder date */}
                </div>
              </div>
              <button
                className="delete-button"
                onClick={() => deleteReminder(reminder.id)}
              >
                <img src={trashGrey} className="fa-solid fa-trash"></img>
              </button>
            </div>
          ))
        )}
      </main>

      <footer className="footer">
        <button className="create-button" onClick={addReminder}>
          <img src={whiteAdd} className="fa-solid fa-plus" alt="add"></img>

          <span>Create New Reminder</span>
        </button>
      </footer>
    </div>
  );
};

export default RemindersPage;
