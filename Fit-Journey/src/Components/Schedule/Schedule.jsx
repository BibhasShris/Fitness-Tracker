// - MDN Web Docs: Array.sort(), Date.now(), and HTML <select>

import React, { useState } from "react";
import ScheduleList from "./ScheduleList";
import SchedulePopup from "./SchedulePopup";
import "./Schedule.css";

export default function Schedule() {
  const [workouts, setWorkouts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showCompletePopup, setShowCompletePopup] = useState(false);

  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Add a new workout
  function handleAddWorkout(newWorkout) {
    const updated = [...workouts, newWorkout].sort(
      (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    );
    setWorkouts(updated);
  }

  // When workout status changes
  function handleStatusChange(id, newStatus) {
    if (newStatus === "Done") {
      // Remove the workout from the list
      setWorkouts((prev) => prev.filter((w) => w.id !== id));

      // Show the completion popup
      setShowCompletePopup(true);
    } else {
      // If not done, just update status
      setWorkouts((prev) =>
        prev.map((w) => (w.id === id ? { ...w, status: newStatus } : w))
      );
    }
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

      {/*Simple completion popup */}
      {showCompletePopup && (
        <div className="workout-popup">
          <div className="popup-box">
            <h3> Workout Completed!</h3>
            <p>Great job, keep on going!</p>
            <button
              className="close-popup-btn"
              onClick={() => setShowCompletePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
