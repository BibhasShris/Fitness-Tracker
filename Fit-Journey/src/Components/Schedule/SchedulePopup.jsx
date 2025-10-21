// SchedulePopup.jsx
// Purpose: Popup form for creating a new workout entry
// Source for time conversion logic: MDN Date and Time Inputs
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time

import { useState } from "react";

export default function SchedulePopup({ onClose, onSave }) {
  // Form field states
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("Not Started");

  // Convert 24-hour time (from <input type="time">) to 12-hour AM/PM
  function formatTime(time) {
    if (!time) return "";
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  }

  // Handles form submit
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !day) return;

    onSave({
      id: Date.now(), // generates unique ID
      name,
      day,
      time: formatTime(time),
      status,
    });

    // Reset form
    setName("");
    setDay("");
    setTime("");
    setStatus("Not Started");
  }

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h3>Add New Workout</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Workout name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Day</option>
            <option>Mon</option>
            <option>Tue</option>
            <option>Wed</option>
            <option>Thu</option>
            <option>Fri</option>
            <option>Sat</option>
            <option>Sun</option>
          </select>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <div className="popup-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
