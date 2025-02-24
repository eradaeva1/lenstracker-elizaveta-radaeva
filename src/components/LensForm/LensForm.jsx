// import React from "react";

// const LensForm = ({ formData, handleChange }) => (
//   <section className="lens-form">
//     <h2>Log New Lens</h2>
//     <div className="input-group">
//       <label>Lens Brand</label>
//       <select name="brand" value={formData.brand} onChange={handleChange}>
//         <option value="">Select brand</option>
//         <option value="Acuvue">Acuvue</option>
//         <option value="Air Optix">Air Optix</option>
//         <option value="Biofinity">Biofinity</option>
//       </select>
//     </div>
//     <div className="input-group">
//       <label>Type</label>
//       <select name="type" value={formData.type} onChange={handleChange}>
//         <option value="">Select type</option>
//         <option value="Daily">Daily</option>
//         <option value="Bi-weekly">Bi-weekly</option>
//         <option value="Monthly">Monthly</option>
//       </select>
//     </div>
//     <div className="input-group">
//       <label>Power</label>
//       <input
//         type="number"
//         name="power"
//         step="0.25"
//         value={formData.power}
//         onChange={handleChange}
//         placeholder="-2.50"
//       />
//     </div>
//     <div className="input-group">
//       <label>Wear Start Date</label>
//       <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
//     </div>
//   </section>
// );

// export default LensForm;

// import React, { useState } from "react";
// import axios from "axios";

// const LensForm = ({ formData, handleChange, setLenses, lenses }) => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const token = localStorage.getItem("jwt"); // Retrieve the token

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation for required fields
//     if (!formData.brand || !formData.type || !formData.power || !formData.startDate || !formData.eyeSide) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     const API_URL = import.meta.env.VITE_API_URL;
//     // Create the request body based on what the backend expects
//     const lensData = {
//       lens_name: formData.brand, // lens brand
//       replacement_schedule: formData.type === 'Daily' ? 1 : formData.type === 'Bi-weekly' ? 14 : 30, // Replacement schedule based on the type
//       start_date: formData.startDate,
//       end_date: formData.endDate || formData.startDate, // Assuming end date is optional and defaults to the start date
//       lens_power: formData.power,
//       eye_side: formData.eyeSide, // Eye side (right/left)
//     };

//     setIsLoading(true);
//     setError(null); // Reset the error

//     try {
//       // Send the new lens data to the backend
//       const response = await axios.post(
//         `${API_URL}/lenses`,
//         lensData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // Check if the response is valid (status code 200 or 201)
//       if (response.status === 200 || response.status === 201) {
//         // Add the new lens to the history
//         setLenses([response.data, ...lenses]);

//         // Reset form data
//         handleChange({ target: { name: "brand", value: "" } });
//         handleChange({ target: { name: "type", value: "" } });
//         handleChange({ target: { name: "power", value: "" } });
//         handleChange({ target: { name: "startDate", value: "" } });
//         handleChange({ target: { name: "eyeSide", value: "" } });
//         handleChange({ target: { name: "endDate", value: "" } });

//         // Clear any previous error messages
//         setError(null);
//       } else {
//         setError("Unexpected response from server.");
//       }
//     } catch (error) {
//       console.error("Error submitting lens data:", error);

//       // Handle and display error messages
//       if (error.response) {
//         console.error("Response Error:", error.response.data);
//         setError(`Error: ${error.response.data.message || "Failed to submit new lens data."}`);
//       } else {
//         console.error("Network Error:", error.message);
//         setError("Network error: Could not reach the server.");
//       }
//     } finally {
//       setIsLoading(false); // End loading state
//     }
//   };

//   return (
//     <section className="lens-form">
//       <h2>Log New Lens</h2>

//       <div className="input-group">
//         <label>Lens Brand</label>
//         <select name="brand" value={formData.brand} onChange={handleChange}>
//           <option value="">Select brand</option>
//           <option value="Acuvue">Acuvue</option>
//           <option value="Air Optix">Air Optix</option>
//           <option value="Biofinity">Biofinity</option>
//         </select>
//       </div>

//       <div className="input-group">
//         <label>Type</label>
//         <select name="type" value={formData.type} onChange={handleChange}>
//           <option value="">Select type</option>
//           <option value="Daily">Daily</option>
//           <option value="Bi-weekly">Bi-weekly</option>
//           <option value="Monthly">Monthly</option>
//         </select>
//       </div>

//       <div className="input-group">
//         <label>Power</label>
//         <input
//           type="number"
//           name="power"
//           step="0.25"
//           value={formData.power}
//           onChange={handleChange}
//           placeholder="-2.50"
//         />
//       </div>

//       <div className="input-group">
//         <label>Wear Start Date</label>
//         <input
//           type="date"
//           name="startDate"
//           value={formData.startDate}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="input-group">
//         <label>Eye Side</label>
//         <select name="eyeSide" value={formData.eyeSide} onChange={handleChange}>
//           <option value="">Select Eye Side</option>
//           <option value="left">Left</option>
//           <option value="right">Right</option>
//         </select>
//       </div>

//       <button type="submit" onClick={handleSubmit} disabled={isLoading}>
//         {isLoading ? "Saving..." : "Add Lens"}
//       </button>

//       {error && <p className="error-message">{error}</p>} {/* Error message display */}
//     </section>
//   );
// };

// export default LensForm;
import React, { useEffect, useState } from "react";
import axios from "axios";

const LensForm = ({ fetchLensesData }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const token = localStorage.getItem("jwt");
 const [token, setToken] = useState(null);
 const [ userId, setUserId ] = useState(null);


 

  const [formData, setFormData] = useState({
      brand: "",
      type: "",
      power: "",
      startDate: "",
      eyeSide: "",
    });

    const getCurrentUser = async (token) => {
      const response = await axios.get(`${API_URL}/users/current`, {
        headers: { Authorization: `Bearer ${token}` },
      }); 
      setUserId(response.data.id);
    }

    useEffect(() => {
      setToken(localStorage.getItem("jwt"));
      // getCurrentUser(token);
      setUserId(localStorage.getItem("user"))
    })

    
  // const userId = token ?  : null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!formData.brand || !formData.type || !formData.power || !formData.startDate || !formData.eyeSide) {
      setError("Please fill in all fields.");
      return;
    }

    if (!token) {
      setError("No token found. Please log in again.");
      return;
    }

    if (!userId) {
      setError("Invalid or missing user data.");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL;
    const lensData = {
      user_id: userId,
      lens_name: formData.brand,
      replacement_schedule: formData.type === "Daily" ? 1 : 
                            formData.type === "Bi-weekly" ? 14 : 
                            formData.type === "Monthly" ? 30 : null ,
      start_date: formData.startDate,
      lens_power: formData.power,
      eye_side: formData.eyeSide,
    };

    setError(null);

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/lenses`, lensData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // if (response.status === 200 || response.status === 201) {
      //   setLenses([response.data, ...lenses]);
      fetchLensesData()
        // Reset form data
        setFormData({ brand: "", type: "", power: "", startDate: "", eyeSide: "" });
      } catch (error) {
      console.error("Error submitting lens data:", error);
      setError("Failed to submit new lens data.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="lens-form">
      <h2>Log New Lens</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Lens Brand</label>
          <select name="brand" value={formData.brand} onChange={handleChange}>
            <option value="">Select brand</option>
            <option value="Acuvue">Acuvue</option>
            <option value="Air Optix">Air Optix</option>
            <option value="Biofinity">Biofinity</option>
          </select>
        </div>

        <div className="input-group">
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="">Select type</option>
            <option value="Daily">Daily</option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <div className="input-group">
          <label>Power</label>
          <input
            type="number"
            name="power"
            step="0.25"
            value={formData.power}
            onChange={handleChange}
            placeholder="-2.50"
          />
        </div>

        <div className="input-group">
          <label>Wear Start Date</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Eye Side</label>
          <select name="eyeSide" value={formData.eyeSide} onChange={handleChange}>
            <option value="">Select Eye Side</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Add Lens"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default LensForm;