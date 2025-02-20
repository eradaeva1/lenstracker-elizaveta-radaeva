import React from "react";

const LensForm = ({ formData, handleChange }) => (
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
      <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
    </div>
  </section>
);

export default LensForm;