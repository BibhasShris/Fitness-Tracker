import "./Schedule.css";

export default function Schedule() {
  return (
    <div className="schedule-card">
      <h2>Schedule</h2>

      <div className="schedule-list">
        <div className="schedule-entry">
          <p>
            <strong>Run</strong> — Mon, 7:00 AM
          </p>
        </div>

        <div className="schedule-entry">
          <p>
            <strong>Gym</strong> — Tue, 7:00 AM
          </p>
        </div>

        <div className="schedule-entry">
          <p>
            <strong>Rest Day</strong> — Wed
          </p>
        </div>
      </div>
    </div>
  );
}
