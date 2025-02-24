import React, { useState, useEffect } from 'react';

const ReminderModal = ({ showModal, setShowModal, handleSave, newReminder, setNewReminder }) => {
  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReminder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleSave(newReminder); // Use the newReminder passed from parent
    closeModal();
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h3>Create New Reminder</h3>
        <form>
          <label>
            Lens ID:
            <input
              type="number"
              name="lens_id"
              value={newReminder.lens_id}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Reminder Time:
            <input
              type="datetime-local"
              name="reminder_time"
              value={newReminder.reminder_time}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Message:
            <textarea
              name="message"
              value={newReminder.message}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Reminder Type:
            <select
              name="type"
              value={newReminder.type}
              onChange={handleChange}
            >
              <option value="replacement">Replacement</option>
              <option value="removal">Removal</option>
            </select>
          </label>

          <label>
            Status:
            <select
              name="status"
              value={newReminder.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>

          <label>
            Reminder Date:
            <input
              type="date"
              name="reminder_date"
              value={newReminder.reminder_date}
              onChange={handleChange}
              required
            />
          </label>

          <button type="button" onClick={handleSubmit}>
            Save Reminder
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReminderModal;