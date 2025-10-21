// Schedule.jsx
// Purpose: Main schedule section — shows all workouts and manages popup + state
// References:
// - React useState Hook: https://react.dev/reference/react/useState
// - MDN Web Docs: Array.sort(), Date.now(), and HTML <select>

import { useState } from "react";
import ScheduleList from "./ScheduleList";
import SchedulePopup from "./SchedulePopup";
import RewardSystem from "../Rewards/Rewards.jsx";
import "./Schedule.css";

export default function Schedule() {
  const [workouts, setWorkouts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [rewardTrigger, setRewardTrigger] = useState(false);

  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function handleAddWorkout(newWorkout) {
    const updated = [...workouts, newWorkout].sort(
      (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    );
    setWorkouts(updated);
  }

  function handleStatusChange(id, newStatus) {
    setWorkouts((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: newStatus } : w))
    );

    if (newStatus === "Done") {
      // ✅ Trigger reward system
      setRewardTrigger(true);

      // Reset trigger after showing
      setTimeout(() => setRewardTrigger(false), 500);
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

      {/* Reward popup */}
      <RewardSystem triggerReward={rewardTrigger} />
    </div>
  );
}
