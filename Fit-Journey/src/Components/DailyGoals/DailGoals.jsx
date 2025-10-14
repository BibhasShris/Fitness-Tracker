import React, { useState } from "react";
import "./DailyGoals.css";

export default function DailyGoals({
  goals = { steps: 10000, calories: 2500, heartRate: 60 },
  todayEntry = { steps: 0, calories: 0, heartRate: 0 },
  onUpdate = () => {},
}) {
  const [inputs, setInputs] = useState(todayEntry);

  const handleChange = (key, value) => {
    const updated = { ...inputs, [key]: Number(value) || 0 };
    setInputs(updated);
  };

  const handleSave = () => {
    onUpdate(inputs);
  };

  const percent = (key) => {
    const val = inputs[key] || 0;
    const goal = goals[key] || 1;
    return Math.min(100, Math.round((val / goal) * 100));
  };

  return (
    <section className="dailyGoals">
      <h2>Daily Goals</h2>

      <div className="goalItem">
        <label>Steps:</label>
        <input
          type="number"
          value={inputs.steps}
          onChange={(e) => handleChange("steps", e.target.value)}
        />
        <p>
          {inputs.steps}/{goals.steps} ({percent("steps")}%)
        </p>
      </div>

      <div className="goal-item">
        <label>Calories:</label>
        <input
          type="number"
          value={inputs.calories}
          onChange={(e) => handleChange("calories", e.target.value)}
        />
        <p>
          {inputs.calories}/{goals.calories} ({percent("calories")}%)
        </p>
      </div>

      <div className="goal-item">
        <label>Heart Rate:</label>
        <input
          type="number"
          value={inputs.heartRate}
          onChange={(e) => handleChange("heartRate", e.target.value)}
        />
        <p>
          {inputs.heartRate}/{goals.heartRate} ({percent("heartRate")}%)
        </p>
      </div>

      <button onClick={handleSave}>Save Goals</button>
    </section>
  );
}
