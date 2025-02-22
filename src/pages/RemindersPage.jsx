// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./RemindersPage.scss";

// const API_URL = import.meta.env.VITE_API_URL;

// const RemindersPage = () => {
//   const [reminders, setReminders] = useState([]);

//   const token = localStorage.getItem("jwt");

//   useEffect(() => {
//     if (token) {
//       const fetchReminders = async () => {
//         try {
//           const response = await axios.get(`${API_URL}/reminders`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setReminders(response.data);
//         } catch (error) {
//           console.error("Error fetching reminders:", error);
//         }
//       };
//       fetchReminders();
//     }
//   }, [token]);

//   return (
//     <div className="reminders-screen">
//       <Header />
//       <main className="reminders-list">
//         {reminders.length > 0 ? (
//           reminders.map((reminder, index) => (
//             <ReminderItem key={index} reminder={reminder} />
//           ))
//         ) : (
//           <p className="no-reminders">No reminders yet.</p>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// const Header = () => (
//   <header className="header">
//     <div className="header__content">
//       <h1>Your Reminders</h1>
//       <button className="add-button">
//         <i className="fa-solid fa-plus"></i>
//       </button>
//     </div>
//   </header>
// );

// const ReminderItem = ({ reminder }) => (
//   <div className="reminder-item">
//     <div className="reminder-content">
//       <i
//         className={`fa-solid ${reminder.completed ? "fa-check-circle text-gray-400" : "fa-exclamation-circle text-red-500"}`}
//       ></i>
//       <div>
//         <h3 className={reminder.completed ? "completed" : "active"}>{reminder.title}</h3>
//         <p className={reminder.completed ? "completed-text" : "active-text"}>{reminder.time}</p>
//       </div>
//     </div>
//     <button className="options-button">
//       <i className="fa-solid fa-ellipsis-vertical"></i>
//     </button>
//   </div>
// );

// const Footer = () => (
//   <footer className="footer">
//     <button className="create-reminder-button">
//       <i className="fa-solid fa-plus"></i>
//       <span>Create New Reminder</span>
//     </button>
//   </footer>
// );

// export default RemindersPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RemindersPage.scss";
import whiteAdd from "../../src/assets/logos/plus-white.svg";
import trashGrey from "../../src/assets/logos/trash-grey.svg";

const API_URL = import.meta.env.VITE_API_URL;

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("jwt");

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

  const addReminder = async () => {
    try {
      const newReminder = {
        title: "New Reminder",
        time: "Today, 6:00 PM",
        status: "pending",
      };
      const response = await axios.post(`${API_URL}/reminders`, newReminder, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReminders([...reminders, response.data]);
    } catch (error) {
      console.error("Error adding reminder:", error);
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

  return (
    <div className="reminders-screen">
      <header className="header">
        <h1>Your Reminders</h1>
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
                  <h3 classname="reminder__title">{reminder.title}</h3>
                  <p>{reminder.message}</p>
                  <p classname="reminder__detail">{reminder.time}</p>
                  <p>{reminder.date}</p>
                </div>
              </div>
              <button className="delete-button" onClick={() => deleteReminder(reminder.id)}>
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
