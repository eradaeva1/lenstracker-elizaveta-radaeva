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


// const API_URL = import.meta.env.VITE_API_URL;

// const LensesPage = () => {
//   const location = useLocation();
//   const { lensesData } = location.state || {};

//   const [lenses, setLenses] = useState(lensesData || []);
//   const [formData, setFormData] = useState({
//     brand: "",
//     type: "",
//     power: "",
//     startDate: "",
//   });

//   const token = localStorage.getItem("jwt");

//   useEffect(() => {
//     if (!lensesData && token) {
//       const fetchLensesData = async () => {
//         try {
//           const response = await axios.get(`${API_URL}/lenses`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setLenses(response.data);
//         } catch (error) {
//           console.error("Error fetching lenses data:", error);
//         }
//       };
//       fetchLensesData();
//     }
//   }, [token, lensesData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="lens-tracking-container">
//       <Header />
//       <main className="main-content">
//         <LensForm formData={formData} handleChange={handleChange} />
//         <LensHistory lenses={lenses} token={token} />
//       </main>
//       <FooterLensesPage />
//     </div>
//   );
// };

// export default LensesPage;
// 
const API_URL = import.meta.env.VITE_API_URL;

const LensesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { lensesData } = location.state || {};

  const [lenses, setLenses] = useState(lensesData || []);
  const [formData, setFormData] = useState({
    brand: "",
    type: "",
    power: "",
    startDate: "",
    eyeSide: "",
  });

  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (!lensesData && token) {
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
      fetchLensesData();
    }
  }, [lensesData, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.brand || !formData.type || !formData.power || !formData.startDate || !formData.eyeSide) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Send the new lens data to the backend
      const response = await axios.post(
        `${API_URL}/lenses`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Add the new lens to the history (using functional setState)
      setLenses((prevLenses) => [response.data, ...prevLenses]);

      // Reset form data
      setFormData({ brand: "", type: "", power: "", startDate: "", eyeSide: "" });

      // Clear error message
      setError(null);
    } catch (error) {
      console.error("Error submitting lens data:", error);
      setError("Failed to submit new lens data.");
    }
  };

  return (
    <div className="lens-tracking-container">
      <Header />
      <main className="main-content">
        <div className="lens-section">
          <h2>Your Lenses History</h2>
          {error && <p className="error-message">{error}</p>}

          <LensForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setLenses={setLenses} // Passing setLenses to LensForm
          />

          <LensHistory lenses={lenses} />

          {lenses.length === 0 && !error && <p>No lenses found. Please add some lenses.</p>}
        </div>
      </main>
      <FooterLensesPage />
    </div>
  );
};

export default LensesPage;