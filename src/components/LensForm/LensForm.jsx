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
import React, { useState } from "react";
import axios from "axios";

const LensForm = ({ formData, handleChange, setLenses, lenses }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("jwt"); // Retrieve the token

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!formData.brand || !formData.type || !formData.power || !formData.startDate || !formData.eyeSide) {
      setError("Please fill in all fields.");
      return;
    }

    // Check if the token exists
    if (!token) {
      setError("No token found. Please log in again.");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL;

    // Create the request body based on what the backend expects
    const lensData = {
      lens_name: formData.brand, // lens brand
      replacement_schedule: formData.type === 'Daily' ? 1 : formData.type === 'Bi-weekly' ? 14 : 30, // Replacement schedule based on the type
      start_date: formData.startDate,
      end_date: formData.endDate || formData.startDate, // Assuming end date is optional and defaults to the start date
      lens_power: formData.power,
      eye_side: formData.eyeSide, // Eye side (right/left)
    };

    setIsLoading(true);
    setError(null); // Reset the error

    try {
      // Send the new lens data to the backend
      const response = await axios.post(
        `${API_URL}/lenses`,
        lensData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Check if the response is valid (status code 200 or 201)
      if (response.status === 200 || response.status === 201) {
        // Ensure lenses is an array before updating
        const updatedLenses = Array.isArray(lenses) ? lenses : [];

        // Add the new lens to the history
        setLenses([response.data, ...updatedLenses]);

        // Reset form data
        handleChange({ target: { name: "brand", value: "" } });
        handleChange({ target: { name: "type", value: "" } });
        handleChange({ target: { name: "power", value: "" } });
        handleChange({ target: { name: "startDate", value: "" } });
        handleChange({ target: { name: "eyeSide", value: "" } });
        handleChange({ target: { name: "endDate", value: "" } });

        // Clear any previous error messages
        setError(null);
      } else {
        setError("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error submitting lens data:", error);

      // Handle and display error messages
      if (error.response) {
        if (error.response.status === 401) {
          // If token is invalid or expired
          setError("Invalid or expired token. Please log in again.");
          localStorage.removeItem("jwt"); // Clear the invalid token
        } else {
          console.error("Response Error:", error.response.data);
          setError(`Error: ${error.response.data.message || "Failed to submit new lens data."}`);
        }
      } else {
        console.error("Network Error:", error.message);
        setError("Network error: Could not reach the server.");
      }
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <section className="lens-form">
      <h2>Log New Lens</h2>

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
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label>Eye Side</label>
        <select name="eyeSide" value={formData.eyeSide} onChange={handleChange}>
          <option value="">Select Eye Side</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>

      <button type="submit" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Saving..." : "Add Lens"}
      </button>

      {error && <p className="error-message">{error}</p>} {/* Error message display */}
    </section>
  );
};

export default LensForm;