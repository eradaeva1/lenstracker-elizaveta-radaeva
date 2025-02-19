import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HeroSection.scss";

const API_URL = import.meta.env.VITE_API_URL;

// Fetch lenses data
const fetchLensesData = async () => {
  const token = localStorage.getItem("jwt"); // Retrieve the token from localStorage

  if (!token) {
    console.log('No token found');
    return;
  }

  try {
    const response = await axios.get(`${API_URL}/lenses`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Send the token as a Bearer token
      },
    });

    return response.data; // Axios automatically parses JSON response
  } catch (error) {
    console.error('Error fetching lenses data:', error);
    throw new Error("Failed to fetch lenses data");
  }
};

// Fetch user data (username) from the backend
const fetchUsername = async () => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.log('No token found');
    return null; // Return null if no token is found
  }

  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data.username; // Assuming backend returns the user's username
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null; // Return null if there's an error
  }
};

function HeroSection() {
  const [lensesData, setLensesData] = useState(null); // Store fetched lenses data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [username, setUsername] = useState("Guest"); // Default to "Guest"

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUsername(); // Fetch username
        if (user) {
          setUsername(user); // If user data is found, update username
        }
      } catch (error) {
        setError(error.message); // Handle error if username fetch fails
      }
    };

    getUserData(); // Call function to fetch user data when component mounts
  }, []);

  const handleTrackLenses = async () => {
    setIsLoading(true); // Start loading
    setError(null); // Reset error

    try {
      const data = await fetchLensesData(); // Fetch lenses data
      setLensesData(data); // Store fetched data in state
    } catch (error) {
      setError(error.message); // Set error if fetch fails
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <section className="hero">
      <img
        className="hero__bg"
        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/dcab5838a0-fa52075cf1e9ef61bcf5.png"
        alt="Contact Lens"
      />
      <div className="hero__content">
        <p className="hero__greeting">Hello,</p>
        <h2 className="hero__name">{username}</h2> {/* Show username or "Guest" */}
        <button 
          className="hero__button"
          onClick={handleTrackLenses} // Trigger the fetch on click
        >
          Track Your Lenses
        </button>
      </div>

      {isLoading && <p>Loading...</p>} {/* Show loading text while fetching */}
      {error && <p>Error: {error}</p>} {/* Show error if fetch fails */}
      {lensesData && (
        <div>
          <h3>Lenses Data:</h3>
          <pre>{JSON.stringify(lensesData, null, 2)}</pre> {/* Display lenses data */}
        </div>
      )}
    </section>
  );
};

export default HeroSection;