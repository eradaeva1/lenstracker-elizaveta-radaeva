import React, { useState, useEffect } from "react";
import axios from "axios";
import trashRed from "../../assets/logos/trash-red.svg"

const API_URL = import.meta.env.VITE_API_URL;

const LensHistory = ({ token, lenses }) => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authToken = token || localStorage.getItem("jwt");

    if (!authToken) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    const fetchReminders = async () => {
      try {
        const response = await axios.get(`${API_URL}/reminders`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (Array.isArray(response.data)) {
          setReminders(response.data);
        } else {
          setError("Invalid reminders response format.");
        }
      } catch (err) {
        setError("Failed to fetch reminders");
      }
    };

    const fetchData = async () => {
      // await fetchLenses();
      await fetchReminders();
      setLoading(false);
    };

    fetchData();
  }, [token]);

  const deleteLens = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this lens?");
      if (!confirmDelete) return;
  
      await axios.delete(`${API_URL}/lenses/:${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Include auth token
      });
  
      
      alert("Lens deleted successfully!");
      
      // Optionally refresh data (if using state management)
      fetchData(); // Call this if you have a function to reload lenses
    } catch (error) {
      console.error("Error deleting lens:", error);
      alert("Failed to delete lens. Please try again.");
    }
  };

  if (loading) return <p>Loading lenses...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="lens-history">
      <h2 className="lens-history__title">Track Wear History</h2>
      {lenses.length > 0 ? (
        lenses.map((lens) => {
          const reminder = lens.end_date;

          const calculateDaysLeft = () => {
            if (!reminder) return "No reminder set";
            const today = new Date();
            const reminderDate = new Date(lens.end_date);
            const daysLeft = Math.ceil(
              (reminderDate - today) / (1000 * 60 * 60 * 24)
            );

            return daysLeft > 0 ? `Replace in ${daysLeft} days` : "Expired";
          };

          return (
            <div className="lens-history__item" key={lens.id}>
              <div className="lens-history__details">
                <div>
                  <h3 className="lens-history__brand">{lens.lens_name}</h3>
                  <p className="lens-history__info">
                    {lens.replacement_schedule} • {lens.lens_power}
                  </p>
                </div>
                <span
                  className={
                    calculateDaysLeft().includes("Expired")
                      ? "expired"
                      : "active"
                  }
                >
                  {calculateDaysLeft()}
                </span>
              </div>
              <p className="lens-history__start-date">
                Worn since: {new Date(lens.start_date).toLocaleDateString()}
              </p>
              <button
                className="delete-button"
                onClick={() => deleteLens(lens.id)}
              ><img src={trashRed} alt="delete icon" className="delete-icon" ></img></button>
              
            </div>
          );
        })
      ) : (
        <p className="lens-history__empty">No history yet.</p>
      )}
    </section>
  );
};

export default LensHistory;
