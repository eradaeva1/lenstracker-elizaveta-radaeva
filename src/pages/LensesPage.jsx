import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LensesPage.scss";
import LensForm from "../../src/components/LensForm/LensForm";
import LensHistory from "../../src/components/LensHistory/LensHistory";
import FooterLensesPage from "../../src/components/Footer/FooterLensesPage";
import Header from "../../src/components/Header/Header";

const API_URL = import.meta.env.VITE_API_URL;

const LensesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { lensesData } = location.state || {};
  const [lenses, setLenses] = useState(lensesData || []);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  });

  const fetchLensesData = async () => {
    try {
      const response = await axios.get(`${API_URL}/lenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLenses(response.data);
    } catch (error) {
      console.error("Error fetching lenses data:", error);
      setError("Failed to fetch lenses data.");
    }
  };
  // Fetch lenses if not provided via props
  useEffect(() => {
    if (!lensesData && token) {
      fetchLensesData();
    }
  }, [lensesData, token]);

  return (
    <div className="lens-tracking-container">
      <Header />
      <main className="main-content">
        <div className="lens-section">
          <h2>Your Lenses History</h2>
          {/* {error && <p className="error-message">{error}</p>} */}

          <LensForm fetchLensesData={fetchLensesData} />

          {token && <LensHistory lenses={lenses} token={token} />}

          {/* {lenses.length === 0 && !error && <p>No lenses found. Please add some lenses.</p>} */}
        </div>
      </main>
      <FooterLensesPage />
    </div>
  );
};

export default LensesPage;
