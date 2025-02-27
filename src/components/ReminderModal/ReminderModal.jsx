import React, { useState, useEffect } from 'react';
import './ReminderModal.scss'; // Import the SCSS file for styling

const ReminderModal = ({ showModal, setShowModal, handleSave, newReminder, setNewReminder }) => {
  const closeModal = () => {
    setShowModal(false);
  };


  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setNewReminder((prev) => ({
      ...prev,
      reminder_date: today,

    }));
  }, [setNewReminder]);


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
    <>
      <div className={`modal ${showModal ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="modal-close" onClick={closeModal}>&times;</span>
          <h3 className="modal-title">Create New Reminder</h3>
          <form className="modal-form">
            <label className="modal-label">
              Reminder #:
              <input
                className="modal-input"
                type="number"
                name="lens_id"
                value={newReminder.lens_id}
                onChange={handleChange}
                required
              />
            </label>

            <label className="modal-label">
              Reminder Time:
              <input
                className="modal-input modal-datetime"
                type="datetime-local"
                name="reminder_time"
                value={newReminder.reminder_time}
                onChange={handleChange}
                required
              />
            </label>

            <label className="modal-label modal-label--message">
              Message:
              <textarea
                className="modal-textarea modal-textarea--message"
                name="message"
                value={newReminder.message}
                onChange={handleChange}
                required
              />
            </label>

            <label className="modal-label">
              Reminder Type:
              <select
                className="modal-select"
                name="type"
                value={newReminder.type}
                onChange={handleChange}
              >
                <option value="replacement">Replacement</option>
                <option value="removal">Removal</option>
              </select>
            </label>

            <label className="modal-label">
              Status:
              <select
                className="modal-select"
                name="status"
                value={newReminder.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </label>

            <label className="modal-label">
              
              <input
                className="modal-input modal-date"
                type="date"
                name="reminder_date"
                value={newReminder.reminder_date}
                onChange={handleChange}
                required
                hidden
              />
            </label>

            <button className="modal-submit" type="button" onClick={handleSubmit}>
              Save Reminder
            </button>
          </form>
        </div>
      </div>
      <div className={`modal-backdrop ${showModal ? 'show' : ''}`} onClick={closeModal}></div>
    </>
  );
};

export default ReminderModal;