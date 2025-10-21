// Schedule.jsx
// References:
// - MDN Web Docs: Array.sort(), Date.now(), and HTML <select>

import { useState } from "react";
import ScheduleList from "./ScheduleList";
import SchedulePopup from "./SchedulePopup";
import "./Schedule.css";

export default function Schedule() {
  // Store all workout objects added by the user
  const [workouts, setWorkouts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Keep workouts sorted by weekday
  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Add a new workout
  function handleAddWorkout(newWorkout) {
    const updated = [...workouts, newWorkout].sort(
      (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    );
    setWorkouts(updated);
  }

  // Change progress status for a workout
  function handleStatusChange(id, newStatus) {
    setWorkouts((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: newStatus } : w))
    );
  }

  return (
    <div className="schedule-card">
      <h2 className="schedule-title">Workout Schedule</h2>

      <ScheduleList workouts={workouts} onStatusChange={handleStatusChange} />

      {workouts.length === 0 && (
        <p className="empty-text">No workouts scheduled yet.</p>
      )}

      <button className="add-workout-btn" onClick={() => setShowPopup(true)}>
        + Add Workout
      </button>

      {showPopup && (
        <SchedulePopup
          onClose={() => setShowPopup(false)}
          onSave={(newWorkout) => {
            handleAddWorkout(newWorkout);
            setShowPopup(false);
          }}
        />
      )}
    </div>
  );
}
