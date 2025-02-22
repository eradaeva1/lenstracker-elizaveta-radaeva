import React, { useState, useEffect } from "react";
import axios from "axios";

const LensHistory = ({ token }) => {
  const [lenses, setLenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLenses = async () => {
        const authToken = token || localStorage.getItem("jwt");  // Use token from props or localStorage
      
        if (!authToken) {
          setError("No token provided");
          setLoading(false);
          return;
        }
      
        try {
          const response = await axios.get("/lenses", {
            headers: { Authorization: `Bearer ${authToken}` },
          });
      
          // Log the response to inspect its structure
          console.log("Response:", response);
      
          // Ensure the response is an array before using map
          if (Array.isArray(response.data)) {
            setLenses(response.data);
          } else {
            setError("Invalid response format.");
          }
        } catch (err) {
          setError("Failed to fetch lenses");
        } finally {
          setLoading(false);
        }
      };
    // const fetchLenses = async () => {
    //   if (!token) {
    //     setError("No token provided");
    //     setLoading(false);
    //     return;
    //   }

    //   try {
    //     const response = await axios.get("/lenses", {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     setLenses(response.data);
    //   } catch (err) {
    //     setError("Failed to fetch lenses");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchLenses();
  }, [token]);

  if (loading) return <p>Loading lenses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="lens-history">
      <h2>Track Wear History</h2>
      {lenses.length > 0 ? (
        lenses.map((lens, index) => (
          <div className="lens-history__item" key={index}>
            <div className="lens-history__details">
              <div>
                <h3>{lens.brand}</h3>
                <p>{lens.type} • {lens.power}</p>
              </div>
              <span className={lens.status === "Active" ? "active" : "replaced"}>
                {lens.status === "Active" ? `Replace in ${lens.daysLeft} days` : "Replaced"}
              </span>
            </div>
            <p>Worn since: {lens.startDate}</p>
          </div>
        ))
      ) : (
        <p>No history yet.</p>
      )}
    </section>
  );
};

export default LensHistory;