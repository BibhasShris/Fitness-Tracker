// ScheduleList.jsx
// Purpose: Displays the list of scheduled workouts with color-coded progress

export default function ScheduleList({ workouts, onStatusChange }) {
  return (
    <div className="schedule-list">
      {workouts.map((workout) => (
        <div className="schedule-entry" key={workout.id}>
          <div>
            <p>
              <strong>{workout.name}</strong> — {workout.day}
              {workout.time && `, ${workout.time}`}
            </p>
          </div>

          {/* Dropdown that shows both status and color */}
          <select
            className={`status-select ${workout.status
              .toLowerCase()
              .replace(" ", "-")}`}
            value={workout.status}
            onChange={(e) => onStatusChange(workout.id, e.target.value)}
          >
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
      ))}
    </div>
  );
}
