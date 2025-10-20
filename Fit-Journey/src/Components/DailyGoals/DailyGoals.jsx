import React, { useState, useMemo } from "react";
import "./DailyGoals.css";

export default function DailyGoals({
  todayEntry = { steps: 0, calories: 0, heartRate: 0 },
  goals = { steps: 10000, calories: 2500, heartRate: 60 },
  onUpdate = () => {},
}) {
  const [inputs, setInputs] = useState(todayEntry);
  const [goalInputs, setGoalInputs] = useState(goals);
  const [showSaved, setShowSaved] = useState(false); // 👈 confirmation toggle

  const fields = useMemo(
    () => [
      { key: "steps", label: "Steps", unit: "", icon: "/img/steps.png" },
      { key: "calories", label: "Calories", unit: "kcal", icon: "/img/cal.png" },
      { key: "heartRate", label: "Heart Rate", unit: "bpm", icon: "/img/bpm.png" },
    ],
    []
  );

  const safeNum = (v) => (Number.isFinite(+v) && +v >= 0 ? +v : 0);
  const percent = (k) => {
    const goal = safeNum(goalInputs[k]);
    return goal === 0 ? 0 : Math.min(100, Math.round((safeNum(inputs[k]) / goal) * 100));
  };

  const handleValueChange = (k, v) => setInputs({ ...inputs, [k]: safeNum(v) });
  const handleGoalChange = (k, v) => setGoalInputs({ ...goalInputs, [k]: safeNum(v) });

  const handleSave = () => {
    onUpdate({ todayEntry: inputs, goals: goalInputs });
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000); // fades after 2s
  };

  return (
    <section className="daily-goals">
      <h2 className="dg-title">Daily Goals</h2>

      {fields.map(({ key, label, unit, icon }) => {
        const p = percent(key);
        return (
          <div className="dg-row" key={key}>
            <div className="dg-left">
              <img src={icon} alt="" className="dg-icon" />
              <div className="dg-labels">
                <span className="dg-name">{label}</span>
                <span className="dg-sub">
                  {inputs[key]}{unit && ` ${unit}`} / {goalInputs[key]}
                  {unit && ` ${unit}`}
                </span>
              </div>
            </div>

            <div className="dg-right">
              <input
                type="number"
                value={inputs[key]}
                onChange={(e) => handleValueChange(key, e.target.value)}
                placeholder="Today"
              />
              <input
                type="number"
                value={goalInputs[key]}
                onChange={(e) => handleGoalChange(key, e.target.value)}
                placeholder="Goal"
              />
            </div>

            <div className="dg-progress">
              <div className="dg-progress-bar" style={{ width: `${p}%` }} />
            </div>
            <div className="dg-percent">{p}%</div>
          </div>
        );
      })}

      <button className="dg-save" onClick={handleSave}>Save</button>

      {/* ✅ Confirmation message */}
      {showSaved && <div className="dg-toast">✅ Info saved!</div>}
    </section>
  );
}