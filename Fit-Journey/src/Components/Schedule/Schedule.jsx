import { useState } from "react";
import "./Schedule.css";

export default function Schedule() {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Run", day: "Mon", time: "7:00 AM", status: "Not Started" },
    { id: 2, name: "Gym", day: "Tue", time: "7:00 AM", status: "In Progress" },
    { id: 3, name: "Rest Day", day: "Wed", time: "", status: "Done" },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [newWorkout, setNewWorkout] = useState("");
  const [newDay, setNewDay] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newStatus, setNewStatus] = useState("Not Started");

  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function formatTime(time) {
    if (!time) return "";
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  }

  function handleAddWorkout(e) {
    e.preventDefault();
    if (!newWorkout || !newDay) return;

    const newEntry = {
      id: Date.now(),
      name: newWorkout,
      day: newDay,
      time: newTime,
      status: newStatus,
    };

    const updated = [...workouts, newEntry].sort(
      (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    );

    setWorkouts(updated);
    setShowPopup(false);
    setNewWorkout("");
    setNewDay("");
    setNewTime("");
    setNewStatus("Not Started");
  }

  function handleStatusChange(id, newStatus) {
    setWorkouts((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: newStatus } : w))
    );
  }

  return (
    <div className="schedule-card">
      <h2 className="schedule-title">Workout Schedule</h2>

      <div className="schedule-list">
        {workouts.map((workout) => (
          <div className="schedule-entry" key={workout.id}>
            <div>
              <p>
                <strong>{workout.name}</strong> — {workout.day}
                {workout.time && `, ${workout.time}`}
              </p>
              <p
                className={`status-label ${workout.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {workout.status}
              </p>
            </div>
            <select
              value={workout.status}
              onChange={(e) => handleStatusChange(workout.id, e.target.value)}
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
        ))}

        {workouts.length === 0 && (
          <p className="empty-text">No workouts scheduled yet.</p>
        )}
      </div>

      <button className="add-workout-btn" onClick={() => setShowPopup(true)}>
        + Add Workout
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Add New Workout</h3>
            <form onSubmit={handleAddWorkout}>
              <input
                type="text"
                placeholder="Workout name"
                value={newWorkout}
                onChange={(e) => setNewWorkout(e.target.value)}
              />
              <select
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
              >
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
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
              <div className="popup-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
