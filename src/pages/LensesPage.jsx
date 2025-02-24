// import React, { useLocation } from "react";
// // import "./LensPage.scss";

// function LensPage() {
//   const location = useLocation(); // Get the passed data
//   const { lensesData } = location.state || {}; // Extract lenses data

//   return (
//     <section className="lens-page">
//       <h2 className="lens-page__title">Your Lenses</h2>

//       {lensesData ? (
//         <div>
//           <h3>Lenses Data:</h3>
//           <pre>{JSON.stringify(lensesData, null, 2)}</pre> {/* Display lenses data */}
//         </div>
//       ) : (
//         <p>No lenses data found.</p>
//       )}
//     </section>
//   );
// }

// export default LensPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LensesPage.scss";
// import HeaderLensesPage from "../../src/components/HeaderLensesPage/HeaderLensesPage";
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
    })
  
  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validation for required fields
  //   if (!formData.brand || !formData.type || !formData.power || !formData.startDate || !formData.eyeSide) {
  //     setError("Please fill in all fields.");
  //     return;
  //   }

  //   if (!token) {
  //     setError("No token found. Please log in again.");
  //     return;
  //   }

  //   const userId = getUserIdFromToken(token);

  //   if (!userId) {
  //     setError("Invalid or missing user data.");
  //     return;
  //   }

  //   const lensData = {
  //     user_id: userId,
  //     lens_name: formData.brand,
  //     replacement_schedule: formData.type === "Daily" ? 1 : 
  //                           formData.type === "Bi-weekly" ? 14 : 
  //                           formData.type === "Monthly" ? 30 : null,
  //     start_date: formData.startDate,
  //     lens_power: formData.power,
  //     eye_side: formData.eyeSide,
  //   };

  //   setError(null);
  //   try {
  //     const response = await axios.post(`${API_URL}/lenses`, lensData, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     if (response.status === 200 || response.status === 201) {
  //       setLenses([response.data, ...lenses]);

  //       // Reset form data
  //       setFormData({ brand: "", type: "", power: "", startDate: "", eyeSide: "" });
  //     } else {
  //       setError("Unexpected response from server.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting lens data:", error);
  //     setError("Failed to submit new lens data.");
  //   }
  // };

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
          
          <LensForm
  fetchLensesData={fetchLensesData}
/>
          
          {token && <LensHistory lenses={lenses} token={token} />}
          
          {/* {lenses.length === 0 && !error && <p>No lenses found. Please add some lenses.</p>} */}
        </div>
      </main>
      <FooterLensesPage />
    </div>
  );
};

export default LensesPage;