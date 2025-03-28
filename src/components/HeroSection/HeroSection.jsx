import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./HeroSection.scss";

const API_URL = import.meta.env.VITE_API_URL;

const HeroSection = () => {
  const [lensesData, setLensesData] = useState(null); // Store fetched lenses data
  const [username, setUsername] = useState("Guest"); // Default to "Guest"
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUsername(JSON.parse(storedUser).username); // Set the username from localStorage
    }
  }, []);

  const fetchLensesData = async () => {
    const token = localStorage.getItem("jwt"); // Retrieve the token from localStorage

    if (!token) {
      setError("No token found. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/lenses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching lenses data:", error);
      setError("Failed to fetch lenses data");
    }
  };

  const handleTrackLenses = async () => {
    setIsLoading(true); // Start loading
    setError(null); // Reset error

    try {
      const data = await fetchLensesData(); // Fetch lenses data
      setLensesData(data); // Store fetched data in state
      navigate("/lenses", { state: { lensesData: data } }); // Navigate to LensPage and pass lenses data
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
        <h2 className="hero__name">{username}John Doe</h2>{" "}
        {/* Display username or "Guest" */}
        <button
          className="hero__button"
          onClick={handleTrackLenses} // Trigger the fetch and navigation
        >
          Track Your Lenses
        </button>
      </div>
      {isLoading && <p>Loading...</p>} {/* Show loading text while fetching */}
      {error && <p>Error: {error}</p>} {/* Show error if fetch fails */}
    </section>
  );
};

export default HeroSection;
